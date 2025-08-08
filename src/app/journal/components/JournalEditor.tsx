"use client";
import { useState, useEffect } from "react";
import { useJournalStore } from "../utils/useJournal";
import { Search, Tag, Plus, X } from "lucide-react";

const MOODS = [
  { label: "😊", value: "happy", name: "Happy" },
  { label: "😌", value: "calm", name: "Calm" },
  { label: "😔", value: "sad", name: "Sad" },
  { label: "😠", value: "angry", name: "Angry" },
  { label: "😐", value: "neutral", name: "Neutral" },
  { label: "🤩", value: "excited", name: "Excited" },
];

export default function JournalEditor() {
  const { addEntry, loading, error, clearError } = useJournalStore();
  const [mood, setMood] = useState(MOODS[0].value);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  async function handleSave() {
    if (!text.trim()) return;
    
    try {
      await addEntry({ 
        mood, 
        text: text.trim(), 
        tags 
      });
      setText("");
      setMood(MOODS[0].value);
      setTags([]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  }

  return (
    <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-lg dark:shadow-purple-900/30 border border-emerald-100/60 dark:border-purple-900/60 flex flex-col gap-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Mood Selection */}
      <div className="flex items-center gap-3 mb-2">
        <span className="font-medium text-emerald-700 dark:text-emerald-200">Mood:</span>
        <div className="flex gap-2">
          {MOODS.map(m => (
            <button
              key={m.value}
              className={`text-2xl px-2 py-1 rounded-lg transition-all focus:outline-none ${
                mood === m.value 
                  ? 'bg-emerald-200 dark:bg-purple-700 scale-110 shadow-md' 
                  : 'hover:bg-emerald-100 dark:hover:bg-purple-800'
              }`}
              onClick={() => setMood(m.value)}
              aria-label={m.name}
              type="button"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
          <span className="font-medium text-emerald-700 dark:text-emerald-200">Tags:</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-emerald-900 dark:hover:text-emerald-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add a tag..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800 border border-emerald-200 dark:border-purple-800 text-emerald-700 dark:text-emerald-200 placeholder:text-emerald-400 dark:placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 text-sm"
          />
          <button
            onClick={handleAddTag}
            disabled={!newTag.trim()}
            className="px-3 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Journal Text */}
      <div className="space-y-2">
        <label className="font-medium text-emerald-700 dark:text-emerald-200">
          Your thoughts:
        </label>
        <textarea
          className="w-full min-h-[120px] p-3 rounded-lg bg-white/80 dark:bg-slate-800 border border-emerald-100 dark:border-purple-800 text-emerald-700 dark:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 shadow-sm resize-none"
          placeholder="How do you feel? Write your thoughts... (Ctrl+Enter to save)"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-emerald-600 dark:text-emerald-300">
          {saved && "✓ Entry saved successfully!"}
        </div>
        <button
          className="px-6 py-2 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white font-semibold shadow-md hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          onClick={handleSave}
          disabled={!text.trim() || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            saved ? "Saved!" : "Save Entry"
          )}
        </button>
      </div>
    </div>
  );
}
