import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  image?: string;
  streakCount: number;
  longestStreak: number;
  lastMeditationDate?: Date;
  lastAccessDate: Date;
  totalMeditationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  _id?: ObjectId;
  userId: ObjectId;
  mood: string;
  text: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StreakRecord {
  _id?: ObjectId;
  userId: ObjectId;
  date: Date;
  meditationMinutes: number;
  journalEntry: boolean;
  createdAt: Date;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number;
  journalEntries: number;
  moodDistribution: Record<string, number>;
}
