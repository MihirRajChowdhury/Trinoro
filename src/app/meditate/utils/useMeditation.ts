import { create } from "zustand";
import { useStreakStore } from "../../streak/utils/streakUtils";
import React from "react";

interface MeditationState {
  secondsLeft: number;
  isRunning: boolean;
  duration: number;
  start: () => void;
  pause: () => void;
  reset: (newDuration?: number) => void;
  setDuration: (minutes: number) => void;
  completeSession: () => Promise<void>;
}

export const useMeditationStore = create<MeditationState>((set, get) => ({
  secondsLeft: 0,
  isRunning: false,
  duration: 10,

  start: () => {
    set({ isRunning: true });
  },

  pause: () => {
    set({ isRunning: false });
  },

  reset: (newDuration?: number) => {
    const duration = newDuration || get().duration;
    set({ 
      secondsLeft: duration * 60, 
      isRunning: false,
      duration 
    });
  },

  setDuration: (minutes: number) => {
    set({ duration: minutes, secondsLeft: minutes * 60 });
  },

  completeSession: async () => {
    const { duration } = get();
    const { recordSession } = useStreakStore.getState();
    
    try {
      // Record the meditation session
      await recordSession(duration);
      console.log(`Meditation session completed: ${duration} minutes`);
    } catch (error) {
      console.error("Failed to record meditation session:", error);
    }
  },
}));

// Timer effect hook
export const useTimerEffect = () => {
  const { secondsLeft, isRunning, completeSession } = useMeditationStore();
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        useMeditationStore.setState((state) => {
          const newSecondsLeft = state.secondsLeft - 1;
          
          // Session completed
          if (newSecondsLeft === 0) {
            completeSession();
            return { 
              secondsLeft: 0, 
              isRunning: false 
            };
          }
          
          return { secondsLeft: newSecondsLeft };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, secondsLeft, completeSession]);
};
