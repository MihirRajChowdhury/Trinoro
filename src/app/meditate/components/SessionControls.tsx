"use client";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

type Props = {
  onChange: (duration: number) => void;
  current: number;
};

export default function SessionControls({ onChange, current }: Props) {
  const [inputValue, setInputValue] = useState<string | number>(current);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInputValue(current);
  }, [current]);

  const handleSet = () => {
    const val = Number(inputValue);
    if (val < 1 || val > 120) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 600);
      return;
    }
    onChange(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setInputValue("");
      return;
    }
    // Remove leading zeros
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setInputValue(num);
    }
  };

  return (
    <div className={`space-y-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-xl border border-emerald-100/60 dark:border-purple-900/60 backdrop-blur-md transition-all ${invalid ? 'animate-shake border-red-300 dark:border-red-500' : ''}`}>
      <label className="flex items-center gap-2 text-base font-semibold text-emerald-700 dark:text-emerald-200 mb-2">
        <Clock className="w-5 h-5 text-purple-400 dark:text-purple-200" />
        Session Duration (minutes)
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        className={`w-full px-5 py-3 rounded-lg bg-white/80 dark:bg-slate-800 border border-emerald-200 dark:border-purple-800 text-center text-lg text-emerald-700 dark:text-emerald-200 font-mono focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 shadow-sm transition-all ${invalid ? 'border-red-400 dark:border-red-500 ring-red-200 dark:ring-red-400' : ''}`}
      />
      <button
        onClick={handleSet}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition disabled:opacity-60 text-base"
      >
        <Clock className="w-5 h-5 text-white opacity-80" />
        Set Timer
      </button>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
}
