'use client';

import { useState } from 'react';
import { MoodMixLayout } from '@/components/MoodMixLayout';
import { MoodInputCard } from '@/components/MoodInputCard';

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
        <MoodInputCard
          mood={mood}
          onMoodChange={setMood}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
          exampleMoods={exampleMoods}
          onExampleClick={handleExampleClick}
        />
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

    </MoodMixLayout>
  );
}
