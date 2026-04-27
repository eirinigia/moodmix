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

interface PlaylistResultsCardProps {
  playlist: PlaylistResponse;
  onStartOver: () => void;
}

export function PlaylistResultsCard({ playlist, onStartOver }: PlaylistResultsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Playlist Header */}
      <div>
        <div className="flex items-center gap-2">
          {/* Music Note Icon */}
          <svg
            className="w-5 h-5 text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="text-purple-400 text-xs uppercase tracking-widest font-medium">
            Your Playlist
          </span>
        </div>
        <h2 className="text-white text-3xl font-bold mt-1">
          {playlist.playlist_name}
        </h2>
        <p className="text-white/60 text-sm mt-2 italic">
          {playlist.description}
        </p>
      </div>

      {/* Mood Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {playlist.parameters.mood_tags.map((tag, index) => (
          <span
            key={index}
            className="bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Music Parameters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {/* Energy */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-white/40 text-xs mb-1">Energy</p>
          <p className="text-white font-semibold text-lg">{playlist.parameters.energy}%</p>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${playlist.parameters.energy}%` }}
            />
          </div>
        </div>

        {/* Mood (Valence) */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-white/40 text-xs mb-1">Mood</p>
          <p className="text-white font-semibold text-lg">{playlist.parameters.valence}%</p>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${playlist.parameters.valence}%` }}
            />
          </div>
        </div>

        {/* Tempo */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-white/40 text-xs mb-1">Tempo</p>
          <p className="text-white font-semibold text-lg capitalize">
            {playlist.parameters.tempo}
          </p>
        </div>

        {/* Track Count */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-white/40 text-xs mb-1">Tracks</p>
          <p className="text-white font-semibold text-lg">{playlist.tracks.length}</p>
        </div>
      </div>

      {/* Track List */}
      <div className="mt-4 max-h-80 overflow-y-auto scrollbar-thin">
        {playlist.tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="text-white/30 w-7 text-right text-sm">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {track.name}
              </p>
              <p className="text-white/40 text-xs truncate">
                {track.artist} &bull; {track.album}
              </p>
            </div>
            <span className="text-white/40 text-xs">{track.duration}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6">
        <button
          onClick={onStartOver}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Create Another Playlist
        </button>
      </div>
    </div>
  );
}
