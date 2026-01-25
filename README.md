# 🎵 MoodMix

**AI-powered playlist generation based on your vibe**

An app that transforms how you describe your mood into the perfect Spotify playlist. Built to demonstrate AI-native product thinking and execution.

---

## 🎯 The Problem

Finding the right music for your current mood shouldn't require scrolling through dozens of playlists or manually searching for songs. Sometimes you just know the vibe you want, but you can't articulate it in keywords.

## 💡 The Solution

Describe your mood in natural language → AI interprets and generates the perfect playlist → Save directly to Spotify.

**Examples:**
- "feeling nostalgic, rainy Sunday afternoon vibes"
- "need energy for a morning workout"
- "coding flow state, instrumental focus music"
- "heartbreak but make it empowering"

---

## 🚀 Current Status

**Project Phase:** Foundation & Setup
**Started:** January 25, 2026

### Milestones

- [x] Project setup and initialization
- [ ] Basic UI (mood input interface)
- [ ] AI mood analysis integration
- [ ] Spotify API integration
- [ ] Playlist generation logic
- [ ] Spotify authentication
- [ ] Save playlist to Spotify
- [ ] Deployment to Vercel
- [ ] Documentation & demo

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**APIs:**
- OpenAI API (mood analysis)
- Spotify Web API (playlist generation)

**Deployment:**
- Vercel

---

## 🧪 Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm or pnpm
- Spotify Developer account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/moodmix.git
cd moodmix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📖 How It Works

1. **Mood Input**: User describes their current mood/vibe in natural language
2. **AI Analysis**: OpenAI analyzes the mood and maps it to music parameters (energy, valence, tempo, genres)
3. **Track Selection**: Spotify API searches for songs matching those parameters
4. **Playlist Creation**: Generate a cohesive 15-20 track playlist
5. **Save to Spotify**: User can save the playlist directly to their Spotify account

---

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed development timeline and progress tracking.

---

## 🎓 Learning Goals

This project is built as a learning journey to demonstrate:

- **Product Thinking**: Going from idea to shipped product
- **AI Integration**: Practical AI usage beyond chatbots
- **Full-Stack Development**: End-to-end feature implementation
- **API Integration**: Working with third-party services
- **Documentation**: Proper README, code comments, decision logs

---

## 📝 Build Log

Development decisions and learnings are documented in the [build log](./docs/BUILD_LOG.md).

---

## 📄 License

MIT License - feel free to use this project for learning!

---

## 🙏 Acknowledgments

Built as part of my portfolio to demonstrate AI-native PM skills and ability to ship real products.

**Tech Stack Inspiration:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [OpenAI API](https://platform.openai.com/docs)

---

**Status:** 🚧 In Development | **Target Ship Date:** February 2026
