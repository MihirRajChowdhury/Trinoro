"use client";
import { useEffect } from "react";
import { useMeditationStore } from "../utils/useMeditation";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";

type Props = {
  duration: number;
};

export default function Timer({ duration }: Props) {
  const {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    setDuration,
    duration: storeDuration,
  } = useMeditationStore();

  // Sync duration prop to store
  useEffect(() => {
    if (storeDuration !== duration) {
      setDuration(duration);
      reset(duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  // Calculate progress percentage for the circular progress indicator
  const totalSeconds = duration * 60;
  const remainingSeconds = secondsLeft;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-8 text-center w-full max-w-md mx-auto px-4 py-8">
      {/* Circular Progress Timer */}
      <div className="relative w-full flex justify-center">
        {/* Background Circle with glassmorphism */}
        <div className="w-full max-w-xs aspect-square rounded-full bg-gradient-to-br from-green-100 via-white to-amethyst-100 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 4px 32px 0 rgba(102, 126, 234, 0.15)' }}>
          {/* Progress Circle */}
          <svg className="absolute inset-0 w-full h-full max-w-xs max-h-xs transform -rotate-90" viewBox="0 0 192 192">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E0E7EF"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#timer-gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timer-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7DE2D1" />
                <stop offset="100%" stopColor="#A084E8" />
              </linearGradient>
            </defs>
          </svg>
          {/* Timer Display */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-light text-green-700 tracking-wider font-mono drop-shadow-md">
              {minutes}:{seconds}
            </div>
            <div className="text-base text-amethyst-500 mt-2 font-medium tracking-wide">
              {isRunning ? "MEDITATING" : "PAUSED"}
            </div>
          </div>
        </div>
        {/* Pulsing Ring Animation (only when running) */}
        {isRunning && (
          <div className="absolute inset-0 w-full max-w-xs aspect-square rounded-full border-2 border-green-300/40 animate-pulse pointer-events-none" style={{ boxShadow: '0 0 32px 8px #A084E8AA' }}></div>
        )}
      </div>
      {/* Control Buttons */}
      <div className="flex gap-6 justify-center w-full">
        {!isRunning ? (
          <button
            onClick={start}
            className="group relative p-4 rounded-full bg-gradient-to-br from-green-200 to-amethyst-200 hover:from-green-300 hover:to-amethyst-300 border border-green-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none"
            aria-label="Start meditation"
          >
            <PlayCircle className="w-10 h-10 text-green-700 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button
            onClick={pause}
            className="group relative p-4 rounded-full bg-gradient-to-br from-amethyst-200 to-green-200 hover:from-amethyst-300 hover:to-green-300 border border-amethyst-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none"
            aria-label="Pause meditation"
          >
            <PauseCircle className="w-10 h-10 text-amethyst-700 group-hover:scale-110 transition-transform" />
          </button>
        )}
        <button
          onClick={() => reset()}
          className="group relative p-4 rounded-full bg-gradient-to-br from-white to-green-100 hover:from-green-100 hover:to-white border border-green-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-10 h-10 text-green-400 group-hover:scale-110 group-hover:rotate-180 transition-transform" />
        </button>
      </div>
    </div>
  );
}