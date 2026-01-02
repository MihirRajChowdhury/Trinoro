import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GENERATIVE_AI_API_KEY is not defined" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are a compassionate meditation expert. A user is telling you how they feel. 
      Your goal is to suggest a specific meditation or mindfulness exercise that matches their current emotional state.
      
      User's feeling: "${message}"
      
      You MUST return a JSON object with the following structure, and NO other text:
      {
        "message": "A short, empathetic response acknowledging their feeling (max 2 sentences).",
        "recommendations": [
          {
            "type": "meditation", 
            "title": "Name of the technique",
            "description": "Brief description of the technique.",
            "duration": "Duration argument like '5 min' or '10 min'",
            "action": {
              "type": "set-timer",
              "label": "Start Session",
              "duration": 5 (number, in minutes),
              "ambientSound": "rain" (optional: one-word search term for ambient sound like 'soft-rain', 'forest', 'fire', 'waves', 'drone')
            }
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response to ensure it's valid JSON
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return NextResponse.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
