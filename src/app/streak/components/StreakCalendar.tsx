"use client";
import { useEffect } from "react";
import { useStreakStore, getMonthName } from "../utils/streakUtils";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

export default function StreakCalendar() {
  const { 
    calendarData, 
    currentYear, 
    currentMonth, 
    loading, 
    loadCalendar, 
    setCurrentMonth 
  } = useStreakStore();

  useEffect(() => {
    loadCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth, loadCalendar]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newYear = currentYear;
    let newMonth = currentMonth;

    if (direction === 'prev') {
      if (currentMonth === 1) {
        newMonth = 12;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
      }
    } else {
      if (currentMonth === 12) {
        newMonth = 1;
        newYear = currentYear + 1;
      } else {
        newMonth = currentMonth + 1;
      }
    }

    setCurrentMonth(newYear, newMonth);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getDayData = (day: number) => {
    const date = new Date(currentYear, currentMonth - 1, day);
    date.setHours(0, 0, 0, 0);
    
    return calendarData.find(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === date.getTime();
    });
  };

  const getIntensityColor = (minutes: number) => {
    if (minutes >= 30) return 'bg-emerald-500 dark:bg-emerald-400';
    if (minutes >= 15) return 'bg-emerald-400 dark:bg-emerald-300';
    if (minutes >= 5) return 'bg-emerald-300 dark:bg-emerald-200';
    return 'bg-emerald-200 dark:bg-emerald-100';
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() + 1 === currentMonth;

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
        </button>
        
        <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-200">
          {getMonthName(currentMonth)} {currentYear}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 border border-emerald-100/50 dark:border-purple-800/50">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-300 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-12"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayData = getDayData(day);
            const isToday = isCurrentMonth && today.getDate() === day;
            const hasMeditation = dayData && dayData.meditationMinutes > 0;
            const hasJournal = dayData && dayData.journalEntry;

            return (
              <div
                key={day}
                className={`
                  relative h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer
                  ${isToday 
                    ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' 
                    : hasMeditation 
                      ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30'
                  }
                `}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`
                    text-sm font-medium
                    ${isToday 
                      ? 'text-emerald-700 dark:text-emerald-200' 
                      : hasMeditation 
                        ? 'text-emerald-600 dark:text-emerald-300' 
                        : 'text-gray-500 dark:text-gray-400'
                    }
                  `}>
                    {day}
                  </span>
                </div>

                {/* Meditation indicator */}
                {hasMeditation && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className={`
                      w-2 h-2 rounded-full ${getIntensityColor(dayData!.meditationMinutes)}
                    `}></div>
                  </div>
                )}

                {/* Journal indicator */}
                {hasJournal && (
                  <div className="absolute top-1 right-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-300"></div>
                  </div>
                )}

                {/* Today indicator */}
                {isToday && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-200 dark:bg-emerald-100"></div>
          <span className="text-emerald-600 dark:text-emerald-300">Light meditation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-300"></div>
          <span className="text-emerald-600 dark:text-emerald-300">Deep meditation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-300"></div>
          <span className="text-purple-600 dark:text-purple-300">Journal entry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
          <span className="text-emerald-600 dark:text-emerald-300">Today</span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
        </div>
      )}
    </div>
  );
}
