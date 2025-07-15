"use client";
import { useRef, useEffect } from "react";
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
  const initialized = useRef(false);

  // Ensure timer always displays the selected duration on initial render
  useEffect(() => {
    if (!initialized.current) {
      setDuration(duration);
      reset(duration);
      initialized.current = true;
    } else if (storeDuration !== duration) {
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
        <div className="w-full max-w-xs aspect-square rounded-full bg-gradient-to-br from-emerald-100 via-white to-purple-100 dark:from-purple-900 dark:via-slate-900 dark:to-emerald-900 backdrop-blur-md border border-emerald-100/40 dark:border-purple-900/40 flex items-center justify-center shadow-2xl dark:shadow-purple-900/30" style={{ boxShadow: '0 4px 32px 0 rgba(102, 126, 234, 0.15)', position: 'relative' }}>
          {/* Pulsing Ring Animation (only when running) */}
          {isRunning && (
            <div className="absolute inset-0 rounded-full border-2 border-emerald-300/40 dark:border-purple-400/40 animate-pulse pointer-events-none z-10" style={{ boxShadow: '0 0 32px 8px #A084E8AA' }}></div>
          )}
          {/* Progress Circle */}
          <svg className="absolute inset-0 w-full h-full max-w-xs max-h-xs transform -rotate-90 z-20" viewBox="0 0 192 192">
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
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          {/* Timer Display */}
          <div className="relative z-30 flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-light text-emerald-700 dark:text-purple-100 tracking-wider font-mono drop-shadow-md">
              {minutes}:{seconds}
            </div>
            <div className="text-base text-purple-500 dark:text-emerald-200 mt-2 font-medium tracking-wide">
              {isRunning ? "MEDITATING" : "PAUSED"}
            </div>
          </div>
        </div>
      </div>
      {/* Control Buttons */}
      <div className="flex flex-row items-center justify-center gap-6 w-full mt-6">
        {!isRunning ? (
          <button
            onClick={start}
            className="group relative p-4 rounded-full bg-gradient-to-br from-emerald-200 to-purple-200 dark:from-emerald-400 dark:to-purple-400 hover:from-emerald-300 hover:to-purple-300 dark:hover:from-emerald-300 dark:hover:to-purple-300 border border-emerald-300 dark:border-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl dark:shadow-purple-900/30 focus:outline-none"
            aria-label="Start meditation"
          >
            <PlayCircle className="w-10 h-10 text-emerald-700 dark:text-purple-200 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button
            onClick={pause}
            className="group relative p-4 rounded-full bg-gradient-to-br from-purple-200 to-emerald-200 dark:from-purple-400 dark:to-emerald-400 hover:from-purple-300 hover:to-emerald-300 dark:hover:from-purple-300 dark:hover:to-emerald-300 border border-purple-300 dark:border-emerald-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl dark:shadow-purple-900/30 focus:outline-none"
            aria-label="Pause meditation"
          >
            <PauseCircle className="w-10 h-10 text-purple-700 dark:text-emerald-200 group-hover:scale-110 transition-transform" />
          </button>
        )}
        <button
          onClick={() => reset()}
          className="group relative p-4 rounded-full bg-gradient-to-br from-white to-emerald-100 dark:from-purple-900 dark:to-emerald-900 hover:from-emerald-100 hover:to-white dark:hover:from-purple-800 dark:hover:to-emerald-800 border border-emerald-200 dark:border-purple-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl dark:shadow-purple-900/30 focus:outline-none"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-10 h-10 text-emerald-400 dark:text-purple-200 group-hover:scale-110 group-hover:rotate-180 transition-transform" />
        </button>
      </div>
    </div>
  );
}