"use client";
import { useState } from "react";
import Timer from "./components/Timer";
import SessionControls from "./components/SessionControls";
import AmbientMixer from "./components/AmbientMixer";
import BinauralBreathControls from "./components/BinauralBreathControls";

export default function MeditatePage() {
  const [duration, setDuration] = useState(10); // default 10 min
  const [binauralActive, setBinauralActive] = useState(false);
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-backgroundLight text-textLight dark:bg-backgroundDark dark:text-textDark transition-colors duration-300 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amethyst/5 dark:bg-greenSoft/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-greenSoft/5 dark:bg-amethyst/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-lg w-full space-y-12 text-center">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amethyst/10 to-greenSoft/10 border border-white/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-greenSoft rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-amethyst dark:text-greenSoft">
              Meditation Session
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amethyst via-purple-500 to-greenSoft dark:from-greenSoft dark:via-green-400 dark:to-amethyst bg-clip-text text-transparent">
            Find Your Center
          </h1>
          
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Take a moment to breathe deeply and connect with your inner peace
          </p>
        </div>

        {/* Session Controls */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
          <SessionControls onChange={setDuration} current={duration} />
        </div>

        {/* Timer Component */}
        <Timer duration={duration} />
        <BinauralBreathControls onBinauralActive={setBinauralActive} />
        {!binauralActive ? (
          <AmbientMixer />
        ) : (
          <div className="w-full max-w-md mx-auto px-4 py-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-xl dark:shadow-purple-900/30 border border-emerald-100/60 dark:border-purple-900/60 text-center text-lg text-purple-500 dark:text-purple-200">
            Ambient sounds are disabled while Binaural Beats are active for best effect.
          </div>
        )}

        {/* Footer Message */}
        <div className="space-y-3 pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            "The present moment is the only time over which we have dominion."
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            — Thích Nhất Hạnh
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-amethyst/50 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-greenSoft/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-0.5 h-0.5 bg-purple-400/50 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
    </main>
  );
}