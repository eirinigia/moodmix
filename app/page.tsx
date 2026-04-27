'use client';

import { useState } from 'react';
import { MoodMixLayout } from '@/components/MoodMixLayout';

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
}

interface MusicParameters {
  genres: string[];
  energy: number;
  valence: number;
  tempo: string;
  mood_tags: string[];
  era?: string;
}

interface PlaylistResponse {
  playlist_name: string;
  description: string;
  tracks: Track[];
  parameters: MusicParameters;
}

export default function Home() {
  const [mood, setMood] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exampleMoods = [
    "feeling nostalgic, rainy Sunday afternoon vibes",
    "need energy for a morning workout",
    "coding flow state, instrumental focus music",
    "heartbreak but make it empowering",
    "chill evening with friends, good conversations",
    "road trip energy, windows down, feel-good vibes"
  ];

  const handleGenerate = async () => {
    if (!mood.trim()) return;

    setIsGenerating(true);
    setError(null);
    setPlaylist(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate playlist');
      }

      const data: PlaylistResponse = await response.json();
      setPlaylist(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setMood(example);
  };

  const handleStartOver = () => {
    setPlaylist(null);
    setMood('');
    setError(null);
  };

  return (
    <MoodMixLayout>
      {/* Main Input Card - Only show if no playlist */}
        {!playlist && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white/10">
            <label htmlFor="mood-input" className="block text-lg font-semibold text-white mb-4">
              How are you feeling?
            </label>

            <textarea
              id="mood-input"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Describe your mood or the vibe you're looking for..."
              className="w-full h-32 px-4 py-3 text-white placeholder-purple-300/50 bg-white/5 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
            />

            <button
              onClick={handleGenerate}
              disabled={!mood.trim() || isGenerating}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating your playlist...
                </span>
              ) : (
                'Generate Playlist'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Playlist Results */}
        {playlist && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white/10">
            {/* Playlist Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {playlist.playlist_name}
              </h2>
              <p className="text-purple-200 mb-4">{playlist.description}</p>

              {/* Mood Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {playlist.parameters.mood_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Music Parameters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-purple-300/70 mb-1">Energy</p>
                  <p className="font-semibold text-white">{playlist.parameters.energy}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-purple-300/70 mb-1">Mood</p>
                  <p className="font-semibold text-white">{playlist.parameters.valence}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-purple-300/70 mb-1">Tempo</p>
                  <p className="font-semibold text-white capitalize">{playlist.parameters.tempo}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-purple-300/70 mb-1">Tracks</p>
                  <p className="font-semibold text-white">{playlist.tracks.length}</p>
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-2 max-h-96 overflow-y-auto mb-6">
              {playlist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="text-purple-400/60 font-medium w-8 text-right">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {track.name}
                    </p>
                    <p className="text-sm text-purple-300/70 truncate">
                      {track.artist} &bull; {track.album}
                    </p>
                  </div>
                  <span className="text-sm text-purple-300/60">{track.duration}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleStartOver}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Create Another Playlist
              </button>
            </div>
          </div>
        )}

        {/* Example Prompts - Only show if no playlist */}
        {!playlist && (
          <div>
            <p className="text-sm font-semibold text-purple-200 mb-4">
              Need inspiration? Try these:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleMoods.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-purple-400/50 hover:bg-white/15 transition-all text-sm text-purple-100 hover:shadow-lg"
                >
                  &quot;{example}&quot;
                </button>
              ))}
            </div>
          </div>
        )}
    </MoodMixLayout>
  );
}
