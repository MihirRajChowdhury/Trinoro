"use client";
import { useState } from "react";

type Props = {
  onChange: (duration: number) => void;
  current: number;
};

export default function SessionControls({ onChange, current }: Props) {
  const [inputValue, setInputValue] = useState(current);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Session Duration (minutes)
      </label>
      <input
        type="number"
        min={1}
        max={120}
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        className="w-full px-4 py-2 rounded-md bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-center focus:outline-none focus:ring-2 focus:ring-amethyst"
      />
      <button
        onClick={() => onChange(inputValue)}
        className="w-full bg-greenSoft hover:bg-greenSoft/80 dark:bg-amethyst dark:hover:bg-amethyst/80 text-white font-semibold py-2 rounded transition"
      >
        Set Timer
      </button>
    </div>
  );
}
