"use client";
import { useEffect } from "react";
import { useStreakStore } from "./utils/streakUtils";
import StreakCalendar from "./components/StreakCalendar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Flame, Calendar, Clock, BookOpen, TrendingUp, Target } from "lucide-react";

export default function StreakPage() {
  const { stats, loading, error, loadStats, loadCalendar } = useStreakStore();

  useEffect(() => {
    loadStats();
    loadCalendar();
  }, [loadStats, loadCalendar]);

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen px-4 py-8 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-purple-100 dark:from-emerald-900/50 dark:to-purple-900/50 border border-emerald-200/50 dark:border-purple-800/50">
            <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-200">
              Streak Tracker
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-purple-600 to-teal-500 dark:from-emerald-300 dark:via-purple-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight">
            Your Meditation Journey
          </h1>
          
          <p className="text-lg text-emerald-600 dark:text-emerald-300 max-w-2xl mx-auto">
            Track your daily meditation practice and build lasting habits
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {loading && !stats ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Current Streak */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-emerald-200 dark:bg-emerald-700">
                    <Flame className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                    Current Streak
                  </h3>
                </div>
                <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-100">
                  {stats?.currentStreak || 0} days
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-2">
                  Keep it going! 🔥
                </p>
              </div>

              {/* Longest Streak */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-200 dark:bg-purple-700">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
                    Longest Streak
                  </h3>
                </div>
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-100">
                  {stats?.longestStreak || 0} days
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-300 mt-2">
                  Your best record! 🏆
                </p>
              </div>

              {/* Total Sessions */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 rounded-2xl p-6 border border-teal-200/50 dark:border-teal-800/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-teal-200 dark:bg-teal-700">
                    <Target className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-200">
                    Total Sessions
                  </h3>
                </div>
                <div className="text-3xl font-bold text-teal-800 dark:text-teal-100">
                  {stats?.totalSessions || 0}
                </div>
                <p className="text-sm text-teal-600 dark:text-teal-300 mt-2">
                  Meditation sessions
                </p>
              </div>

              {/* Total Minutes */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-200 dark:bg-blue-700">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200">
                    Total Minutes
                  </h3>
                </div>
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-100">
                  {stats?.totalMinutes || 0}
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
                  Minutes meditated
                </p>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Session */}
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-emerald-100/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-800">
                    <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                    Average Session
                  </h3>
                </div>
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-100">
                  {stats?.averageSessionLength ? Math.round(stats.averageSessionLength) : 0} min
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-2">
                  Per meditation session
                </p>
              </div>

              {/* Journal Entries */}
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-purple-100/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
                    Journal Entries
                  </h3>
                </div>
                <div className="text-2xl font-bold text-purple-800 dark:text-purple-100">
                  {stats?.journalEntries || 0}
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-300 mt-2">
                  Reflection entries
                </p>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-emerald-100/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-800">
                  <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-200">
                  Meditation Calendar
                </h2>
              </div>
              <StreakCalendar />
            </div>
          </>
        )}
      </div>
      </main>
    </ProtectedRoute>
  );
}
