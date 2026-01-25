# MoodMix Build Log

A real-time documentation of building MoodMix from idea to shipped product.

**Builder:** Product Manager learning to code and ship products
**Coach:** Claude (AI pair programmer)
**Goal:** Demonstrate "this PM ships products, not just slides"

---

## Day 1 - January 25, 2026

### 🎯 The Strategic Pivot

**Original Plan:**
- Build a full portfolio site with 3-4 passion projects (CineMatch, MoodMix, GameOS, PromptOS)
- 12-task roadmap over 4 weeks
- Portfolio template already cloned and set up

**The Pivot:**
Stepped back to focus on OUTCOMES instead of execution. Asked the key question: "What do I want someone to think after seeing my GitHub?"

**Answer:** "This PM ships products, not just slides"

**New Strategy:**
- Build ONE polished passion project instead of 3-4 half-baked ones
- Quality over quantity
- Deep documentation of the build process (PM thinking + execution)
- Flexible timeline (acknowledging variable time availability)

---

### 🎵 Why MoodMix?

**Evaluated 4 project options:**

1. **CineMatch** (AI Movie Recommendations)
   - Pro: Clear value, good for AI showcase
   - Con: Competitive space, API complexity

2. **MoodMix** (AI Playlist Generator) ← **CHOSEN**
   - Pro: Emotional connection, unique positioning, Spotify API is solid
   - Con: Auth complexity
   - **Differentiation:** "AI that creates the soundtrack for your life moments"

3. **GameOS** (Gaming Backlog Manager)
   - Pro: Solves real problem, niche audience
   - Con: Might seem hobby-focused, narrow appeal

4. **PromptOS** (Prompt Library System)
   - Pro: Most relevant to "AI native PM" positioning
   - Con: Meta, harder to make visually compelling

**Decision Factors:**
- MoodMix has emotional resonance (music connects with people)
- Fun to build and demo
- Demonstrates AI integration practically
- Simple enough to ship in 2-3 weeks
- Complex enough to show real technical skills

---

### ✅ Project Setup & Foundation

**Actions Taken:**
1. Created new Next.js 16 project from scratch
   ```bash
   npx create-next-app@latest moodmix --typescript --tailwind --eslint --app
   ```
2. Initialized git repository (automatic with create-next-app)
3. Wrote comprehensive README with:
   - Problem statement
   - Solution overview
   - Tech stack
   - Roadmap/milestones
   - Learning goals
4. Created docs folder for build documentation
5. Started BUILD_LOG.md to document journey

**Tech Stack Chosen:**
- **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (for mood analysis)
- **Music:** Spotify Web API (for playlist generation)
- **Deployment:** Vercel (free, one-click deploy)

**Why This Stack:**
- Next.js combines frontend + backend in one project (simpler for beginners)
- TypeScript catches errors early (better developer experience)
- All JavaScript (one language to learn, not switching between languages)
- Industry standard (skills transfer to other projects)
- Strong community support (lots of tutorials when stuck)

---

### 📚 Learning Checkpoints

**Concepts Explained Today:**

1. **Node.js = Backend Runtime**
   - Lets you run JavaScript on servers (not just browsers)
   - Needed to hide API keys securely
   - Runs the development tools (npm, Next.js)
   - Handles server-side logic (auth, API calls)

2. **React = UI Management**
   - Manages UI updates automatically (you don't manually update HTML)
   - Uses "state" - when state changes, React re-renders
   - Virtual DOM compares old vs new UI, only updates what changed
   - Component-based: build small reusable pieces

3. **TypeScript + React**
   - TypeScript = JavaScript + type checking
   - NOT a separate language, it's a superset (all JS is valid TS)
   - Compiles to JavaScript before running
   - Catches bugs at development time, not runtime
   - Works WITH React, not instead of it

**Key Insight:**
You write TypeScript + React → TypeScript compiler checks types → outputs JavaScript → Browser/Node.js runs JavaScript → React manages UI updates

---

### 🎯 MVP Scope (What "Shipped" Means)

**Core User Flow:**
1. User describes mood in natural language
   - "feeling nostalgic, rainy Sunday vibes"
   - "need energy for morning workout"
   - "coding flow state, instrumental focus"
2. AI interprets mood → music parameters (energy, valence, tempo, genres)
3. App generates Spotify playlist (15-20 songs)
4. User saves playlist to their Spotify account

**What's IN the MVP:**
- ✅ Simple, clean UI (one text input, one button)
- ✅ AI mood analysis
- ✅ Spotify integration (search + create playlist)
- ✅ Basic Spotify authentication
- ✅ Works end-to-end for one user

**What's OUT of the MVP:**
- ❌ User accounts/database (session-based only)
- ❌ Playlist history
- ❌ Advanced features (sharing, collaborative playlists)
- ❌ Mobile app (web-first)

---

### 🗺️ Flexible Roadmap

**Timeline:** Variable hours per week, flexible completion date

**Milestone 1: Foundation** (This Week)
- [x] Project setup ✅
- [x] README documentation ✅
- [x] Build log started ✅
- [ ] Environment variables setup
- [ ] Get Spotify API credentials
- [ ] Get OpenAI API key
- [ ] Test local dev server
- [ ] Build basic UI (mood input)

**Milestone 2: Core Functionality** (Next)
- [ ] Integrate OpenAI for mood analysis
- [ ] Connect to Spotify API
- [ ] Generate playlist based on AI output
- [ ] Display playlist in UI

**Milestone 3: Spotify Integration** (Then)
- [ ] Add Spotify OAuth authentication
- [ ] Save playlist to user's account
- [ ] Error handling
- [ ] UI polish

**Milestone 4: Ship It** 🚢
- [ ] Deploy to Vercel
- [ ] Create demo video/screenshots
- [ ] Write final documentation
- [ ] Push to GitHub
- [ ] Share (potentially on LinkedIn/Twitter)

---

### 💭 Design Decisions & Trade-offs

**Decision 1: Start Fresh vs Use Portfolio Template**
- **Chose:** Start fresh with clean Next.js project
- **Why:** Keeps things focused, learn the setup process, no inherited complexity
- **Trade-off:** Slightly slower start, but cleaner learning experience

**Decision 2: One Project vs Multiple**
- **Chose:** One polished project (MoodMix only)
- **Why:** Quality over quantity, focus all energy on shipping one thing well
- **Trade-off:** Less breadth, but more depth and higher chance of success

**Decision 3: MoodMix vs PromptOS**
- **Chose:** MoodMix
- **Why:** More emotionally engaging, fun to build, easier to demo
- **Trade-off:** PromptOS would be more unique to "AI native PM" story, but MoodMix is more motivating

---

### 🤔 Open Questions

**Technical:**
- OpenAI vs Claude API for mood analysis? (OpenAI has better structured outputs)
- How many songs per playlist? (15-20 seems like good listening session)
- Should we preview playlist before saving to Spotify? (Maybe v2 feature)
- Best mapping strategy: mood text → Spotify audio features?

**Product:**
- Should we add example mood prompts for inspiration?
- How to handle edge cases (nonsensical inputs, inappropriate content)?
- Should user be able to adjust playlist after generation?

**Learning:**
- When to ask for help vs struggle through documentation?
- How to balance learning fundamentals vs shipping fast?
- Best practices for git commits as a beginner?

---

### 📊 Current Status

```
Project Phase: Foundation & Setup
Started: January 25, 2026
Status: 🟢 Active Development

Progress:
├── [████████░░░░░░░░░░] 40% Foundation
├── [░░░░░░░░░░░░░░░░░░░░] 0% Core Features
├── [░░░░░░░░░░░░░░░░░░░░] 0% Integration
└── [░░░░░░░░░░░░░░░░░░░░] 0% Deployment
```

**Completed Today:**
- ✅ Strategic planning and project scoping
- ✅ MoodMix project created
- ✅ README with vision and roadmap
- ✅ Build log infrastructure
- ✅ Learning checkpoints (Node.js, React, TypeScript)

**Next Session Goals:**
1. Set up `.env` file with environment variables
2. Register Spotify Developer app → get credentials
3. Get OpenAI API key
4. Run `npm run dev` and see the default Next.js page
5. Start building the mood input UI

---

### 📁 Project Structure

```
moodmix/
├── app/                    # Next.js app directory (App Router)
│   ├── page.tsx           # Main page (mood input)
│   ├── layout.tsx         # Root layout
│   └── api/               # API routes (will create)
│       └── generate/      # Playlist generation endpoint
├── docs/                  # Build documentation
│   └── BUILD_LOG.md      # This file
├── public/                # Static assets
├── .env.local            # Environment variables (will create)
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

---

### 🎓 Key Learnings Today

1. **Focus on outcomes first, execution second**
   - Started with portfolio plan, pivoted to strategic thinking
   - Asking "what outcome do I want?" changed everything

2. **Quality over quantity for portfolio projects**
   - One shipped project > three half-finished projects
   - Depth of documentation matters as much as code

3. **Technical fundamentals are learnable**
   - Node.js, React, TypeScript seemed overwhelming at first
   - Breaking down "how they work together" made it click
   - It's all just JavaScript in different forms

4. **Building in public = forcing clarity**
   - Writing this build log makes decisions explicit
   - Documents the PM thinking process
   - Shows learning journey, not just end result

---

### 🙌 Coaching Notes

**What's Working:**
- Strategic pivot caught potential over-engineering early
- Clear scope definition (MVP vs future features)
- Documentation-first approach sets up success
- Learning checkpoints ensure fundamentals are understood

**What to Watch:**
- Don't get stuck in learning rabbit holes (balance learning vs shipping)
- Keep scope tight (resist feature creep)
- Regular git commits (practice good workflow habits)
- Ask questions when stuck (don't spin wheels for hours)

---

**Last Updated:** January 25, 2026 - End of Day 1

**Time Invested Today:** ~2 hours (setup + planning + documentation)

**Momentum Level:** 🔥 High - Clear direction, project scaffolded, ready to build
