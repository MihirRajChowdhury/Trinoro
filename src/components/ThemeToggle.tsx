"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      // System preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 dark:from-purple-800 dark:to-emerald-900 border border-emerald-200 dark:border-purple-800 shadow hover:from-emerald-200 hover:to-purple-200 dark:hover:from-purple-700 dark:hover:to-emerald-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-purple-700"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-emerald-300" />
      ) : (
        <Moon className="w-5 h-5 text-purple-600" />
      )}
    </button>
  );
}