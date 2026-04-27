import { ReactNode } from 'react';

interface MoodMixLayoutProps {
  children: ReactNode;
}

export function MoodMixLayout({ children }: MoodMixLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Animated floating orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-600/25 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-violet-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />

      {/* Dot grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 container max-w-3xl mx-auto px-4 py-16">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Headphones Icon */}
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
              </svg>
              <h1
                className="text-5xl md:text-7xl font-bold text-white"
                style={{
                  textShadow: '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)',
                }}
              >
                MoodMix
              </h1>
            </div>
            <p className="text-lg text-purple-300 mb-6">
              Describe your vibe, get the perfect playlist
            </p>
            {/* Glowing divider line */}
            <div
              className="h-px w-full max-w-md mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent, rgb(168 85 247), transparent)',
              }}
            />
          </header>

          {/* Children content */}
          <div className="flex-1">{children}</div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-sm text-white/40">Powered by AI</p>
        </footer>
      </div>
    </div>
  );
}

export default MoodMixLayout;
