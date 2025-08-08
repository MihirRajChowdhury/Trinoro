import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { recordMeditationSession, getStreakCalendar, getUserByEmail } from "@/lib/database";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (!user?._id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { minutes, hasJournalEntry = false } = body;

    if (!minutes || minutes <= 0) {
      return NextResponse.json(
        { error: "Valid minutes are required" },
        { status: 400 }
      );
    }

    await recordMeditationSession(user._id, minutes, hasJournalEntry);

    return NextResponse.json({
      success: true,
      message: "Meditation session recorded successfully"
    });
  } catch (error) {
    console.error("Error recording meditation session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (!user?._id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

    const calendarData = await getStreakCalendar(user._id, year, month);

    return NextResponse.json({
      success: true,
      data: calendarData
    });
  } catch (error) {
    console.error("Error fetching streak calendar:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
