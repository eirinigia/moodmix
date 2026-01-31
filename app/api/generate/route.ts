import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Types for our music parameters
interface MusicParameters {
  genres: string[];
  energy: number; // 0-100
  valence: number; // 0-100 (happiness)
  tempo: string; // 'slow', 'medium', 'fast'
  mood_tags: string[];
  era?: string;
}

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
}

interface PlaylistResponse {
  playlist_name: string;
  description: string;
  tracks: Track[];
  parameters: MusicParameters;
}

export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json();

    if (!mood || typeof mood !== 'string') {
      return NextResponse.json(
        { error: 'Mood description is required' },
        { status: 400 }
      );
    }

    // Step 1: Use OpenAI to analyze the mood and extract music parameters
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and cost-effective
      messages: [
        {
          role: 'system',
          content: `You are a music expert AI that analyzes mood descriptions and converts them into specific music parameters.

Given a user's mood description, extract:
- genres: array of 2-4 music genres that fit this mood
- energy: 0-100 (0 = very calm, 100 = very energetic)
- valence: 0-100 (0 = sad/melancholic, 100 = happy/upbeat)
- tempo: 'slow', 'medium', or 'fast'
- mood_tags: array of 3-5 descriptive tags (e.g., 'relaxing', 'nostalgic', 'uplifting')
- era: optional, if user mentions a time period (e.g., '90s', '2000s', 'modern')

Respond with ONLY a JSON object, no additional text.`,
        },
        {
          role: 'user',
          content: mood,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const parametersText = completion.choices[0].message.content;
    if (!parametersText) {
      throw new Error('No response from OpenAI');
    }

    const parameters: MusicParameters = JSON.parse(parametersText);

    // Step 2: Generate a mock playlist based on the parameters
    const playlist = generateMockPlaylist(parameters, mood);

    // Step 3: Return the playlist
    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error generating playlist:', error);
    return NextResponse.json(
      { error: 'Failed to generate playlist. Please try again.' },
      { status: 500 }
    );
  }
}

// Mock playlist generator
function generateMockPlaylist(
  parameters: MusicParameters,
  originalMood: string
): PlaylistResponse {
  // Generate playlist name based on mood
  const playlistName = generatePlaylistName(parameters);

  // Generate description
  const description = `A ${parameters.mood_tags.slice(0, 2).join(' and ')} playlist curated for: "${originalMood}"`;

  // Generate mock tracks based on parameters
  const tracks = generateMockTracks(parameters);

  return {
    playlist_name: playlistName,
    description,
    tracks,
    parameters,
  };
}

function generatePlaylistName(parameters: MusicParameters): string {
  const templates = [
    `${parameters.mood_tags[0]} vibes`,
    `${parameters.genres[0]} for ${parameters.mood_tags[0]} moments`,
    `${parameters.mood_tags[0]} ${parameters.tempo} beats`,
    `pure ${parameters.mood_tags[0]} energy`,
  ];

  const name = templates[Math.floor(Math.random() * templates.length)];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateMockTracks(parameters: MusicParameters): Track[] {
  // Mock track database organized by genre and mood
  const trackDatabase: Record<string, Track[]> = {
    pop: [
      { id: '1', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
      { id: '2', name: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23' },
      { id: '3', name: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:20' },
      { id: '4', name: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: '2:47' },
    ],
    indie: [
      { id: '5', name: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49' },
      { id: '6', name: 'Take Me Out', artist: 'Franz Ferdinand', album: 'Franz Ferdinand', duration: '3:57' },
      { id: '7', name: 'Dog Days Are Over', artist: 'Florence + The Machine', album: 'Lungs', duration: '4:12' },
      { id: '8', name: 'Mr. Brightside', artist: 'The Killers', album: 'Hot Fuss', duration: '3:42' },
    ],
    rock: [
      { id: '9', name: 'Seven Nation Army', artist: 'The White Stripes', album: 'Elephant', duration: '3:51' },
      { id: '10', name: 'Everlong', artist: 'Foo Fighters', album: 'The Colour and the Shape', duration: '4:10' },
      { id: '11', name: 'Do I Wanna Know?', artist: 'Arctic Monkeys', album: 'AM', duration: '4:32' },
      { id: '12', name: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '5:01' },
    ],
    electronic: [
      { id: '13', name: 'Strobe', artist: 'Deadmau5', album: 'For Lack of a Better Name', duration: '10:38' },
      { id: '14', name: 'Midnight City', artist: 'M83', album: 'Hurry Up, Were Dreaming', duration: '4:04' },
      { id: '15', name: 'Language', artist: 'Porter Robinson', album: 'Worlds', duration: '4:43' },
      { id: '16', name: 'One More Time', artist: 'Daft Punk', album: 'Discovery', duration: '5:20' },
    ],
    'hip-hop': [
      { id: '17', name: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', duration: '2:57' },
      { id: '18', name: 'Sicko Mode', artist: 'Travis Scott', album: 'ASTROWORLD', duration: '5:12' },
      { id: '19', name: 'God\'s Plan', artist: 'Drake', album: 'Scorpion', duration: '3:18' },
      { id: '20', name: 'Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', duration: '5:26' },
    ],
    'r&b': [
      { id: '21', name: 'Redbone', artist: 'Childish Gambino', album: 'Awaken, My Love!', duration: '5:26' },
      { id: '22', name: 'Earned It', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '4:37' },
      { id: '23', name: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.', album: 'Freudian', duration: '3:29' },
      { id: '24', name: 'Ivy', artist: 'Frank Ocean', album: 'Blonde', duration: '4:09' },
    ],
    jazz: [
      { id: '25', name: 'So What', artist: 'Miles Davis', album: 'Kind of Blue', duration: '9:22' },
      { id: '26', name: 'Take Five', artist: 'Dave Brubeck', album: 'Time Out', duration: '5:24' },
      { id: '27', name: 'Fly Me to the Moon', artist: 'Frank Sinatra', album: 'It Might as Well Be Swing', duration: '2:29' },
      { id: '28', name: 'Blue in Green', artist: 'Bill Evans', album: 'Kind of Blue', duration: '5:37' },
    ],
    classical: [
      { id: '29', name: 'Clair de Lune', artist: 'Claude Debussy', album: 'Suite Bergamasque', duration: '5:00' },
      { id: '30', name: 'Moonlight Sonata', artist: 'Ludwig van Beethoven', album: 'Piano Sonata No. 14', duration: '5:50' },
      { id: '31', name: 'The Four Seasons - Spring', artist: 'Antonio Vivaldi', album: 'The Four Seasons', duration: '10:15' },
      { id: '32', name: 'Für Elise', artist: 'Ludwig van Beethoven', album: 'Bagatelle No. 25', duration: '2:42' },
    ],
  };

  // Select tracks based on genres
  let selectedTracks: Track[] = [];

  parameters.genres.forEach(genre => {
    const genreKey = genre.toLowerCase();
    if (trackDatabase[genreKey]) {
      selectedTracks = selectedTracks.concat(trackDatabase[genreKey]);
    }
  });

  // If no matching genres, use pop as default
  if (selectedTracks.length === 0) {
    selectedTracks = trackDatabase.pop;
  }

  // Shuffle and select 15-20 tracks
  const shuffled = selectedTracks.sort(() => 0.5 - Math.random());
  const playlistSize = 15 + Math.floor(Math.random() * 6); // 15-20 tracks

  return shuffled.slice(0, playlistSize);
}
