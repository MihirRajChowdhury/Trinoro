import clientPromise from "./mongodb";
import { User, JournalEntry, StreakRecord, UserStats } from "./models";
import { ObjectId } from "mongodb";

// Database collections
const USERS_COLLECTION = "users";
const JOURNAL_COLLECTION = "journal_entries";
const STREAK_COLLECTION = "streak_records";

// User Management
export async function createOrUpdateUser(userData: Partial<User>): Promise<User> {
  const client = await clientPromise;
  const db = client.db();
  
  const now = new Date();
  const user: User = {
    email: userData.email!,
    name: userData.name!,
    image: userData.image,
    streakCount: userData.streakCount || 0,
    lastAccessDate: now,
    totalMeditationMinutes: userData.totalMeditationMinutes || 0,
    createdAt: userData.createdAt || now,
    updatedAt: now,
  };

  const result = await db.collection(USERS_COLLECTION).updateOne(
    { email: user.email },
    { 
      $set: user,
      $setOnInsert: { createdAt: now }
    },
    { upsert: true }
  );

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db();
  
  return await db.collection(USERS_COLLECTION).findOne({ email }) as User | null;
}

export async function updateUserLastAccess(email: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db();
  
  await db.collection(USERS_COLLECTION).updateOne(
    { email },
    { 
      $set: { 
        lastAccessDate: new Date(),
        updatedAt: new Date()
      }
    }
  );
}

// Journal Management
export async function createJournalEntry(entry: Omit<JournalEntry, '_id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
  const client = await clientPromise;
  const db = client.db();
  
  const now = new Date();
  const journalEntry: JournalEntry = {
    ...entry,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(JOURNAL_COLLECTION).insertOne(journalEntry);
  journalEntry._id = result.insertedId;
  
  return journalEntry;
}

export async function getJournalEntries(userId: ObjectId, limit = 50, skip = 0): Promise<JournalEntry[]> {
  const client = await clientPromise;
  const db = client.db();
  
  return await db.collection(JOURNAL_COLLECTION)
    .find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray() as JournalEntry[];
}

export async function searchJournalEntries(userId: ObjectId, query: string): Promise<JournalEntry[]> {
  const client = await clientPromise;
  const db = client.db();
  
  return await db.collection(JOURNAL_COLLECTION)
    .find({
      userId,
      $or: [
        { text: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    })
    .sort({ createdAt: -1 })
    .toArray() as JournalEntry[];
}

// Streak Management
export async function recordMeditationSession(userId: ObjectId, minutes: number, hasJournalEntry = false): Promise<void> {
  const client = await clientPromise;
  const db = client.db();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if already recorded for today
  const existingRecord = await db.collection(STREAK_COLLECTION).findOne({
    userId,
    date: today
  });
  
  if (existingRecord) {
    // Update existing record
    await db.collection(STREAK_COLLECTION).updateOne(
      { _id: existingRecord._id },
      {
        $set: {
          meditationMinutes: existingRecord.meditationMinutes + minutes,
          journalEntry: existingRecord.journalEntry || hasJournalEntry,
        }
      }
    );
  } else {
    // Create new record
    const streakRecord: StreakRecord = {
      userId,
      date: today,
      meditationMinutes: minutes,
      journalEntry: hasJournalEntry,
      createdAt: new Date(),
    };
    
    await db.collection(STREAK_COLLECTION).insertOne(streakRecord);
  }
  
  // Update user's total meditation minutes
  await db.collection(USERS_COLLECTION).updateOne(
    { _id: userId },
    { $inc: { totalMeditationMinutes: minutes } }
  );
  
  // Update user's streak count by recalculating it
  const updatedStats = await getUserStats(userId);
  await db.collection(USERS_COLLECTION).updateOne(
    { _id: userId },
    { $set: { streakCount: updatedStats.currentStreak } }
  );
}

export async function getUserStats(userId: ObjectId): Promise<UserStats> {
  const client = await clientPromise;
  const db = client.db();
  
  // Get streak records
  const streakRecords = await db.collection(STREAK_COLLECTION)
    .find({ userId })
    .sort({ date: -1 })
    .toArray() as StreakRecord[];
  
  // Get journal entries for mood distribution
  const journalEntries = await db.collection(JOURNAL_COLLECTION)
    .find({ userId })
    .toArray() as JournalEntry[];
  
  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < streakRecords.length; i++) {
    const recordDate = new Date(streakRecords[i].date);
    recordDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === i) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;
  
  for (const record of streakRecords) {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    
    if (!lastDate) {
      tempStreak = 1;
    } else {
      const daysDiff = Math.floor((lastDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    lastDate = recordDate;
  }
  longestStreak = Math.max(longestStreak, tempStreak);
  
  // Calculate other stats
  const totalSessions = streakRecords.length;
  const totalMinutes = streakRecords.reduce((sum, record) => sum + record.meditationMinutes, 0);
  const averageSessionLength = totalSessions > 0 ? totalMinutes / totalSessions : 0;
  
  // Calculate mood distribution
  const moodDistribution: Record<string, number> = {};
  journalEntries.forEach(entry => {
    moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1;
  });
  
  return {
    currentStreak,
    longestStreak,
    totalSessions,
    totalMinutes,
    averageSessionLength,
    journalEntries: journalEntries.length,
    moodDistribution,
  };
}

export async function getStreakCalendar(userId: ObjectId, year: number, month: number): Promise<StreakRecord[]> {
  const client = await clientPromise;
  const db = client.db();
  
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  return await db.collection(STREAK_COLLECTION)
    .find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .toArray() as StreakRecord[];
}
