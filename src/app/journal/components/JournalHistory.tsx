"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useJournalStore } from "../utils/useJournal";
import { Search, Tag, Calendar, Filter } from "lucide-react";

const MOOD_EMOJIS: Record<string, string> = {
  happy: "😊",
  calm: "😌",
  sad: "😔",
  angry: "😠",
  neutral: "😐",
  excited: "🤩",
};

export default function JournalHistory() {
  const { data: session } = useSession();
  const { 
    entries, 
    loading, 
    error, 
    searchQuery, 
    tags, 
    loadEntries, 
    searchEntries, 
    setSearchQuery,
    getMoodDistribution 
  } = useJournalStore();
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      loadEntries();
    }
  }, [session, loadEntries]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchEntries(searchQuery);
    } else {
      loadEntries();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedMood("");
    setSelectedTag("");
    loadEntries();
  };

  const filteredEntries = entries.filter(entry => {
    if (selectedMood && entry.mood !== selectedMood) return false;
    if (selectedTag && !entry.tags?.includes(selectedTag)) return false;
    return true;
  });

  const moodDistribution = getMoodDistribution();

  if (!session) {
    return (
      <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-lg dark:shadow-purple-900/30 border border-emerald-100/60 dark:border-purple-900/60 text-center">
        <p className="text-emerald-600 dark:text-emerald-300">
          Sign in to view your journal history
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-emerald-100/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-200">
            Journal History
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your journal entries..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800 border border-emerald-200 dark:border-purple-800 text-emerald-700 dark:text-emerald-200 placeholder:text-emerald-400 dark:placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white font-medium hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
            {/* Mood Filter */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200 mb-2">
                Filter by Mood:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMood("")}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedMood === "" 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700'
                  }`}
                >
                  All
                </button>
                {Object.entries(moodDistribution).map(([mood, count]) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
                      selectedMood === mood 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700'
                    }`}
                  >
                    {MOOD_EMOJIS[mood]} {mood} ({count})
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            {tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200 mb-2">
                  Filter by Tag:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag("")}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedTag === "" 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700'
                    }`}
                  >
                    All
                  </button>
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedTag === tag 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {(selectedMood || selectedTag || searchQuery) && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {/* Journal Entries */}
      {!loading && (
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8 text-emerald-600 dark:text-emerald-300">
              {searchQuery || selectedMood || selectedTag 
                ? "No entries match your filters" 
                : "No journal entries yet. Start writing!"
              }
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry._id?.toString()}
                className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-6 border border-emerald-100/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow"
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{MOOD_EMOJIS[entry.mood]}</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-200 capitalize">
                      {entry.mood}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-300">
                    <Calendar className="w-4 h-4" />
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Entry Text */}
                <p className="text-emerald-700 dark:text-emerald-200 leading-relaxed mb-4">
                  {entry.text}
                </p>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
