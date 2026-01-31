'use client';

import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 relative overflow-hidden">
      {/* Background texture/pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating gradient orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <main className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Headphones Icon */}
            <svg
              className="w-12 h-12 text-white drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
            </svg>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              MoodMix
            </h1>
          </div>
          <p className="text-xl text-purple-100 font-medium">
            Describe your vibe, get the perfect playlist
          </p>
        </div>

        {/* Main Input Card - Only show if no playlist */}
        {!playlist && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <label htmlFor="mood-input" className="block text-lg font-semibold text-gray-800 mb-4">
              How are you feeling?
            </label>

            <textarea
              id="mood-input"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Describe your mood or the vibe you're looking for..."
              className="w-full h-32 px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none transition-colors"
            />

            <button
              onClick={handleGenerate}
              disabled={!mood.trim() || isGenerating}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Playlist Results */}
        {playlist && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            {/* Playlist Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {playlist.playlist_name}
              </h2>
              <p className="text-gray-600 mb-4">{playlist.description}</p>

              {/* Mood Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {playlist.parameters.mood_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Music Parameters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Energy</p>
                  <p className="font-semibold text-gray-900">{playlist.parameters.energy}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Mood</p>
                  <p className="font-semibold text-gray-900">{playlist.parameters.valence}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Tempo</p>
                  <p className="font-semibold text-gray-900 capitalize">{playlist.parameters.tempo}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">Tracks</p>
                  <p className="font-semibold text-gray-900">{playlist.tracks.length}</p>
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-2 max-h-96 overflow-y-auto mb-6">
              {playlist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 font-medium w-8 text-right">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {track.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {track.artist} • {track.album}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{track.duration}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleStartOver}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Create Another Playlist
              </button>
            </div>
          </div>
        )}

        {/* Example Prompts - Only show if no playlist */}
        {!playlist && (
          <div>
            <p className="text-sm font-semibold text-white/90 mb-4">
              Need inspiration? Try these:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleMoods.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left px-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-white/30 hover:border-white hover:bg-white transition-all text-sm text-gray-700 hover:shadow-lg"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-white/70">
          <p>Powered by AI + Spotify</p>
        </div>
      </main>
    </div>
  );
}
