"use client";

import { useState, useEffect } from "react";
import { useAmbientStore } from "@/hooks/useAmbientSounds";
import { Pause, Play, X } from "lucide-react";

export default function AmbientMixer() {
  const { sounds, loading, toggle, setVolume, remove, addSound, init } = useAmbientStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize ambient sounds on mount (if not already loaded)
  useEffect(() => {
    if (sounds.length === 0 && !loading) {
      init();
    }
  }, [init, sounds.length, loading]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await addSound(searchTerm.trim().toLowerCase());
      setSearchTerm("");
    }
  };

  return (
    <div className="w-full space-y-6 mt-8">
      <h3 className="text-lg font-semibold text-amethyst dark:text-greenSoft tracking-wide text-center">
        Ambient Sound Mixer
      </h3>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ambient sound (e.g. rain)"
          className="flex-1 px-4 py-2 rounded-md bg-white/10 dark:bg-white/5
                     border border-white/20 text-sm text-amethyst
                     placeholder:text-amethyst/50 focus:outline-none
                     focus:ring-2 focus:ring-amethyst"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm rounded-md bg-amethyst text-white hover:bg-amethyst/80"
        >
          Add
        </button>
      </form>

      {loading ? (
        <div className="w-full text-center text-gray-400 dark:text-gray-500 text-sm">
          Loading ambient sounds...
        </div>
      ) : (
        sounds.map((sound) => (
          <div
            key={sound.name}
            className="flex items-center justify-between gap-4 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/10 rounded-xl border border-white/20 p-4 shadow-md"
          >
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={() => toggle(sound.name)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                {sound.isPlaying ? (
                  <Pause className="w-5 h-5 text-amethyst" />
                ) : (
                  <Play className="w-5 h-5 text-amethyst" />
                )}
              </button>

              <div className="capitalize text-sm font-medium text-amethyst w-24 truncate">
                {sound.name}
              </div>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={sound.volume}
                onChange={(e) => setVolume(sound.name, parseFloat(e.target.value))}
                className="w-full accent-amethyst dark:accent-greenSoft"
              />
            </div>

            <button
              onClick={() => remove(sound.name)}
              className="p-1 rounded-full hover:bg-red-400/20 transition"
            >
              <X className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
