import { create } from "zustand";
import { JournalEntry } from "@/lib/models";

interface JournalState {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  tags: string[];
  
  // Actions
  addEntry: (entry: { mood: string; text: string; tags?: string[] }) => Promise<void>;
  loadEntries: () => Promise<void>;
  searchEntries: (query: string) => Promise<void>;
  clearError: () => void;
  setSearchQuery: (query: string) => void;
  getMoodDistribution: () => Record<string, number>;
  getEntriesByMood: (mood: string) => JournalEntry[];
  getEntriesByTag: (tag: string) => JournalEntry[];
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  loading: false,
  error: null,
  searchQuery: "",
  tags: [],

  addEntry: async (entryData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        throw new Error("Failed to save journal entry");
      }

      const result = await response.json();
      
      set((state) => ({
        entries: [result.data, ...state.entries],
        loading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to save entry",
        loading: false 
      });
    }
  },

  loadEntries: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/journal");
      
      if (!response.ok) {
        throw new Error("Failed to load journal entries");
      }

      const result = await response.json();
      
      // Extract unique tags from entries
      const allTags = result.data.flatMap((entry: JournalEntry) => entry.tags || []);
      const uniqueTags: string[] = [...new Set(allTags as string[])];
      
      set({ 
        entries: result.data,
        tags: uniqueTags,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to load entries",
        loading: false 
      });
    }
  },

  searchEntries: async (query: string) => {
    if (!query.trim()) {
      get().loadEntries();
      return;
    }

    set({ loading: true, error: null, searchQuery: query });
    try {
      const response = await fetch(`/api/journal?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error("Failed to search journal entries");
      }

      const result = await response.json();
      set({ 
        entries: result.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to search entries",
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  getMoodDistribution: () => {
    const { entries } = get();
    const distribution: Record<string, number> = {};
    
    entries.forEach(entry => {
      distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
    });
    
    return distribution;
  },

  getEntriesByMood: (mood: string) => {
    const { entries } = get();
    return entries.filter(entry => entry.mood === mood);
  },

  getEntriesByTag: (tag: string) => {
    const { entries } = get();
    return entries.filter(entry => entry.tags?.includes(tag));
  },
}));
