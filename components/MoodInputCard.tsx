'use client';

interface MoodInputCardProps {
  mood: string;
  onMoodChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
  exampleMoods: string[];
  onExampleClick: (example: string) => void;
}

export function MoodInputCard({
  mood,
  onMoodChange,
  onGenerate,
  isGenerating,
  error,
  exampleMoods,
  onExampleClick,
}: MoodInputCardProps) {
  const maxCharacters = 300;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Label */}
      <label htmlFor="mood-input" className="block text-white font-semibold text-lg mb-3">
        How are you feeling?
      </label>

      {/* Textarea with character count */}
      <div className="relative">
        <textarea
          id="mood-input"
          value={mood}
          onChange={(e) => onMoodChange(e.target.value.slice(0, maxCharacters))}
          placeholder="Describe your mood or the vibe you're looking for..."
          className="w-full h-32 px-4 py-3 text-white placeholder-white/40 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
        />
        <span className="absolute bottom-3 right-3 text-white/30 text-xs">
          {mood.length} / {maxCharacters}
        </span>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!mood.trim() || isGenerating}
        className={`w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
          isGenerating ? 'animate-pulse' : ''
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Crafting your playlist...
          </span>
        ) : (
          'Generate Playlist'
        )}
      </button>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-3 text-sm flex items-start gap-2">
          <span className="shrink-0">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Divider with label */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-white/10" />
        <span className="text-white/40 text-xs uppercase tracking-widest">
          or try an example
        </span>
        <div className="flex-1 border-t border-white/10" />
      </div>

      {/* Example mood chips grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {exampleMoods.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-xl text-white/70 hover:text-white text-sm transition-all hover:scale-[1.01]"
          >
            &quot;{example}&quot;
          </button>
        ))}
      </div>
    </div>
  );
}
