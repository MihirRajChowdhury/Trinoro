  import { create } from "zustand";
  import { searchAmbientSound } from "@/lib/freesound";

  export type AmbientSound = {
    name: string;
    preview: string;
    audio: HTMLAudioElement;
    volume: number;
    isPlaying: boolean;
  };

  // Zustand store for ambient sounds
  interface AmbientSoundsState {
    sounds: AmbientSound[];
    loading: boolean;
    init: (initialTags?: string[]) => Promise<void>;
    toggle: (name: string) => void;
    setVolume: (name: string, value: number) => void;
    remove: (name: string) => void;
    addSound: (tag: string) => Promise<void>;
  }

  export const useAmbientStore = create<AmbientSoundsState>((set, get) => ({
    sounds: [],
    loading: false, // Start as false
    init: async (initialTags = ["forest"]) => {
      set({ loading: true });
      try {
        const loadedSounds: AmbientSound[] = [];
        for (const tag of initialTags) {
          const result = await searchAmbientSound(tag);
          if (result) {
            const audio = new Audio(result.preview);
            audio.loop = true;
            audio.volume = 0.5;
            loadedSounds.push({
              name: tag,
              preview: result.preview,
              audio,
              volume: 0.5,
              isPlaying: false,
            });
          }
        }
        set({ sounds: loadedSounds, loading: false });
      } catch (e) {
        set({ loading: false });
      }
    },
    toggle: (name: string) => {
      set((state) => ({
        sounds: state.sounds.map((s) => {
          if (s.name !== name) return s;
          if (s.isPlaying) s.audio.pause();
          else s.audio.play().catch(console.error);
          return { ...s, isPlaying: !s.isPlaying };
        }),
      }));
    },
    setVolume: (name: string, value: number) => {
      set((state) => ({
        sounds: state.sounds.map((s) => {
          if (s.name === name) {
            s.volume = value;
            s.audio.volume = value;
          }
          return s;
        }),
      }));
    },
    remove: (name: string) => {
      set((state) => {
        const toRemove = state.sounds.find((s) => s.name === name);
        if (toRemove && toRemove.audio) toRemove.audio.pause();
        return { sounds: state.sounds.filter((s) => s.name !== name) };
      });
    },
    addSound: async (tag: string) => {
      set({ loading: true });
      try {
        const result = await searchAmbientSound(tag);
        if (result) {
          const audio = new Audio(result.preview);
          audio.loop = true;
          audio.volume = 0.5;
          set((state) => ({
            sounds: [
              ...state.sounds,
              {
                name: tag,
                preview: result.preview,
                audio,
                volume: 0.5,
                isPlaying: false,
              },
            ],
            loading: false,
          }));
        } else {
          set({ loading: false });
        }
      } catch (e) {
        set({ loading: false });
      }
    },
  }));

  // Optional: legacy hook for compatibility
  export function useAmbientSounds() {
    return useAmbientStore();
  }