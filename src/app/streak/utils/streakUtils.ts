import { create } from "zustand";
import { UserStats, StreakRecord } from "@/lib/models";

interface StreakState {
  stats: UserStats | null;
  calendarData: StreakRecord[];
  loading: boolean;
  error: string | null;
  currentYear: number;
  currentMonth: number;
  
  // Actions
  loadStats: () => Promise<void>;
  loadCalendar: (year?: number, month?: number) => Promise<void>;
  recordSession: (minutes: number, hasJournalEntry?: boolean) => Promise<void>;
  clearError: () => void;
  setCurrentMonth: (year: number, month: number) => void;
}

export const useStreakStore = create<StreakState>((set, get) => ({
  stats: null,
  calendarData: [],
  loading: false,
  error: null,
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,

  loadStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/user/stats");
      
      if (!response.ok) {
        throw new Error("Failed to load user stats");
      }

      const result = await response.json();
      set({ 
        stats: result.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to load stats",
        loading: false 
      });
    }
  },

  loadCalendar: async (year?: number, month?: number) => {
    const currentYear = year || get().currentYear;
    const currentMonth = month || get().currentMonth;
    
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/streak?year=${currentYear}&month=${currentMonth}`);
      
      if (!response.ok) {
        throw new Error("Failed to load calendar data");
      }

      const result = await response.json();
      set({ 
        calendarData: result.data,
        currentYear,
        currentMonth,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to load calendar",
        loading: false 
      });
    }
  },

  recordSession: async (minutes: number, hasJournalEntry = false) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/streak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ minutes, hasJournalEntry }),
      });

      if (!response.ok) {
        throw new Error("Failed to record meditation session");
      }

      // Reload stats and calendar after recording
      await Promise.all([
        get().loadStats(),
        get().loadCalendar()
      ]);
      
      set({ loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to record session",
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
  
  setCurrentMonth: (year: number, month: number) => {
    set({ currentYear: year, currentMonth: month });
    get().loadCalendar(year, month);
  },
}));

// Utility functions for streak calculations
export const calculateStreak = (records: StreakRecord[]): number => {
  if (records.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Sort records by date in descending order (most recent first)
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const record of sortedRecords) {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, continue streak
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (daysDiff === 1) {
      // Consecutive day, continue streak
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Gap found, break streak
      break;
    }
  }
  
  return streak;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const getMonthName = (month: number): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1];
};
