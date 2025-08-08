"use client";
import JournalEditor from "./components/JournalEditor";
import JournalHistory from "./components/JournalHistory";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function JournalPage() {
  return (
    <ProtectedRoute>
      <main className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden transition-all duration-500">
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-purple-600 to-teal-500 dark:from-emerald-300 dark:via-purple-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight select-none text-center mb-4">
            Journal
          </h1>
          <JournalEditor />
          <JournalHistory />
        </div>
      </main>
    </ProtectedRoute>
  );
}
