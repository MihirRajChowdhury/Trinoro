"use client";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 bg-gradient-to-r from-purple-50 via-white to-emerald-50 dark:from-purple-900 dark:via-slate-900 dark:to-emerald-900 border-t border-emerald-100/40 dark:border-purple-900/40 shadow-inner dark:shadow-purple-900/30 transition-all duration-500">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-3 text-center">
        <div className="text-emerald-700 dark:text-emerald-200 text-base font-semibold">
          &copy; {new Date().getFullYear()} Trinoro. All rights reserved.
        </div>
        <div className="text-purple-500 dark:text-purple-200 text-sm italic">
          Breathe in peace, breathe out stress.
        </div>
        <div className="flex gap-6 mt-3">
          <a href="/meditate" className="text-emerald-600 dark:text-emerald-300 hover:text-purple-600 dark:hover:text-purple-200 transition text-sm font-medium">Meditate</a>
          <a href="/journal" className="text-emerald-600 dark:text-emerald-300 hover:text-purple-600 dark:hover:text-purple-200 transition text-sm font-medium">Journal</a>
          <a href="/streak" className="text-emerald-600 dark:text-emerald-300 hover:text-purple-600 dark:hover:text-purple-200 transition text-sm font-medium">Streak</a>
        </div>
      </div>
    </footer>
  );
}