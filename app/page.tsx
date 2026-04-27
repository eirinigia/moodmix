'use client';

import { useState } from 'react';
import { MoodMixLayout } from '@/components/MoodMixLayout';
import { MoodInputCard } from '@/components/MoodInputCard';
import { PlaylistResultsCard } from '@/components/PlaylistResultsCard';

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
        <PlaylistResultsCard
          playlist={playlist}
          onStartOver={handleStartOver}
        />
      )}

    </MoodMixLayout>
  );
}
