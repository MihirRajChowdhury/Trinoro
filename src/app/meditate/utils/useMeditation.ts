import { create } from "zustand";

interface MeditationState {
  secondsLeft: number;
  isRunning: boolean;
  duration: number; // in minutes
  start: () => void;
  pause: () => void;
  reset: (newMinutes?: number) => void;
  setDuration: (minutes: number) => void;
}

let interval: NodeJS.Timeout | null = null;

export const useMeditationStore = create<MeditationState>((set, get) => ({
  secondsLeft: 0,
  isRunning: false,
  duration: 10, // default duration in minutes
  start: () => {
    if (get().isRunning) return;
    set({ isRunning: true });
    interval = setInterval(() => {
      set((state) => {
        if (state.secondsLeft <= 1) {
          clearInterval(interval!);
          interval = null;
          return { ...state, isRunning: false, secondsLeft: 0 };
        }
        return { ...state, secondsLeft: state.secondsLeft - 1 };
      });
    }, 1000);
  },
  pause: () => {
    if (interval) clearInterval(interval);
    interval = null;
    set({ isRunning: false });
  },
  reset: (newMinutes?: number) => {
    if (interval) clearInterval(interval);
    interval = null;
    const minutes = newMinutes !== undefined ? newMinutes : get().duration;
    set({ isRunning: false, secondsLeft: minutes * 60, duration: minutes });
  },
  setDuration: (minutes: number) => {
    set({ duration: minutes, secondsLeft: minutes * 60 });
  },
}));

// Optional: legacy hook for compatibility
export function useMeditation(durationInMinutes: number) {
  const store = useMeditationStore();
  // Sync duration if changed
  if (store.duration !== durationInMinutes) {
    store.setDuration(durationInMinutes);
  }
  const minutes = String(Math.floor(store.secondsLeft / 60)).padStart(2, "0");
  const seconds = String(store.secondsLeft % 60).padStart(2, "0");
  return {
    minutes,
    seconds,
    isRunning: store.isRunning,
    start: store.start,
    pause: store.pause,
    reset: store.reset,
  };
}
