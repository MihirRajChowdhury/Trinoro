"use client";

import { useState, useEffect } from "react";
import { useAmbientStore } from "@/hooks/useAmbientSounds";
import { Pause, Play, X } from "lucide-react";
export default function AmbientMixer() {
  const { sounds, loading, toggle, setVolume, remove, addSound, init } = useAmbientStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Always call init on mount if sounds are empty
  useEffect(() => {
    if (sounds.length === 0) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await addSound(searchTerm.trim().toLowerCase());
      setSearchTerm("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 space-y-6 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 rounded-3xl shadow-xl dark:shadow-purple-900/30 backdrop-blur-md border border-emerald-100/60 dark:border-purple-900/60">
      <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-200 tracking-wide text-center mb-2">
        Ambient Sound Mixer
      </h3>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ambient sound (e.g. rain)"
          className="flex-1 px-4 py-2 rounded-lg bg-white/70 dark:bg-slate-800 border border-emerald-200 dark:border-purple-800 text-base text-emerald-700 dark:text-emerald-200 placeholder:text-emerald-400 dark:placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 shadow-sm"
        />
        <button
          type="submit"
          className="px-5 py-2 text-base rounded-lg bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white font-semibold shadow-md hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition disabled:opacity-60"
          disabled={loading || !searchTerm.trim()}
        >
          {loading ? "Loading..." : <span className="text-lg font-bold">+</span>}
        </button>
      </form>

      {loading && sounds.length === 0 ? (
        <div className="w-full text-center text-emerald-400 dark:text-purple-300 text-base py-4">
          Loading ambient sounds...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sounds.map((sound) => (
            <div
              key={sound.name}
              className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white/80 dark:bg-slate-800/90 rounded-2xl border border-emerald-100 dark:border-purple-800 p-4 shadow-md dark:shadow-purple-900/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => toggle(sound.name)}
                  className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 border border-emerald-200 dark:border-purple-800 hover:from-emerald-200 hover:to-purple-200 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-sm focus:outline-none"
                  aria-label={sound.isPlaying ? `Pause ${sound.name}` : `Play ${sound.name}`}
                >
                  {sound.isPlaying ? (
                    <Pause className="w-6 h-6 text-purple-500 dark:text-emerald-200" />
                  ) : (
                    <Play className="w-6 h-6 text-emerald-500 dark:text-purple-300" />
                  )}
                </button>

                <div className="capitalize text-base font-medium text-emerald-700 dark:text-emerald-200 w-28 truncate">
                  {sound.name}
                </div>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={sound.volume}
                  onChange={(e) => setVolume(sound.name, parseFloat(e.target.value))}
                  className="w-full accent-purple-400 dark:accent-emerald-400 h-2 rounded-lg cursor-pointer"
                  aria-label={`Volume for ${sound.name}`}
                />
              </div>

              <button
                onClick={() => remove(sound.name)}
                className="p-2 rounded-full bg-gradient-to-br from-white to-purple-100 dark:from-slate-900 dark:to-purple-900 border border-purple-200 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-800 transition focus:outline-none"
                aria-label={`Remove ${sound.name}`}
              >
                <X className="w-5 h-5 text-purple-400 dark:text-emerald-200" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
