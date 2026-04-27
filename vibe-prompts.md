# MoodMix v0 Prompts

## Context for v0

MoodMix is a Next.js + TypeScript + Tailwind CSS 4 app — a single-page AI playlist generator. Users describe a mood, OpenAI extracts music parameters, and a playlist is returned. The UI lives in `app/page.tsx`.

**Data structures the components need to work with:**

```ts
interface Track { id: string; name: string; artist: string; album: string; duration: string; }
interface MusicParameters { genres: string[]; energy: number; valence: number; tempo: string; mood_tags: string[]; era?: string; }
interface PlaylistResponse { playlist_name: string; description: string; tracks: Track[]; parameters: MusicParameters; }
```

**State passed as props:** `mood: string`, `isGenerating: boolean`, `playlist: PlaylistResponse | null`, `error: string | null`

---

## Prompt 1 — Full Page Layout + Hero

```
Build a full-page React component for a music mood app called "MoodMix" using Next.js, TypeScript, and Tailwind CSS. Do NOT use shadcn/ui — use plain Tailwind classes only.

Design: Dark music app aesthetic. The background should be a deep dark gradient (from slate-950 via purple-950 to indigo-950). Add 3 large blurred animated floating orbs using CSS keyframe animation (blob effect, 7s cycle, staggered delays). Overlay a subtle dot-grid texture at low opacity.

Header (centered, at top of page):
- A headphones SVG icon (filled, white, 48px) next to the title
- Title: "MoodMix" in bold white text, text-5xl md:text-7xl, with a slight purple glow text-shadow
- Subtitle below: "Describe your vibe, get the perfect playlist" in text-purple-300, text-lg
- Add a thin glowing divider line below the subtitle using a gradient from transparent to purple-500 to transparent

Page layout:
- min-h-screen, container max-w-3xl mx-auto px-4 py-16
- All content centered
- Footer at bottom: small text "Powered by AI" in text-white/40

The component should accept a `children` prop rendered between the header and footer.

Export as: `MoodMixLayout`

CSS keyframes needed:
- @keyframes blob: 0% translate(0,0) scale(1), 33% translate(30px,-50px) scale(1.1), 66% translate(-20px,20px) scale(0.9), 100% translate(0,0) scale(1)
- Classes: animate-blob (7s infinite), animation-delay-2000 (2s delay), animation-delay-4000 (4s delay)
```

---

## Prompt 2 — Mood Input Form Card

```
Build a React component called `MoodInputCard` for a music playlist generator app using Next.js, TypeScript, and Tailwind CSS. Do NOT use shadcn/ui — use plain Tailwind classes only.

The component accepts these props:

interface MoodInputCardProps {
  mood: string;
  onMoodChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
  exampleMoods: string[];
  onExampleClick: (example: string) => void;
}

Design: Dark glassmorphism card. Background: bg-white/5 backdrop-blur-xl, border border-white/10, rounded-2xl, shadow-2xl. All text should be light (white/90 for labels, white/60 for placeholders).

Layout from top to bottom:

1. Label: "How are you feeling?" — text-white font-semibold text-lg

2. Textarea:
   - Placeholder: "Describe your mood or the vibe you're looking for..."
   - h-32, resize-none
   - Background: bg-white/5, border border-white/20
   - Focus ring: focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
   - Text: text-white, placeholder text-white/40
   - Character count shown bottom-right in text-white/30 text-xs (e.g. "42 / 300")

3. Generate button (full width, mt-4):
   - Background: gradient from purple-600 to blue-600, hover darkens both
   - Text: white, font-semibold, py-4, rounded-xl
   - Disabled when mood is empty or isGenerating
   - Loading state: spinning SVG circle + "Crafting your playlist..." text
   - Subtle pulse animation on the gradient when isGenerating

4. Error banner (conditional, below button):
   - bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-3 text-sm
   - Prefixed with a ⚠ icon

5. Divider with label (below error area):
   - Thin line with "or try an example" text in the center
   - Line: border-white/10, label: text-white/40 text-xs uppercase tracking-widest

6. Example mood chips grid (2 columns on md+, 1 on mobile):
   - Each chip: bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50
   - Text: text-white/70 hover:text-white, text-sm, text-left, px-4 py-3, rounded-xl
   - Each chip text is wrapped in quotation marks
   - Smooth transition on hover (border color + bg + subtle scale-[1.01])

Export as: `MoodInputCard`
```

---

## Prompt 3 — Playlist Results Card

```
Build a React component called `PlaylistResultsCard` for a music playlist generator app using Next.js, TypeScript, and Tailwind CSS. Do NOT use shadcn/ui — use plain Tailwind classes only.

Props:

interface Track { id: string; name: string; artist: string; album: string; duration: string; }
interface MusicParameters { genres: string[]; energy: number; valence: number; tempo: string; mood_tags: string[]; era?: string; }
interface PlaylistResponse { playlist_name: string; description: string; tracks: Track[]; parameters: MusicParameters; }

interface PlaylistResultsCardProps {
  playlist: PlaylistResponse;
  onStartOver: () => void;
}

Design: Dark glassmorphism card — bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl.

Layout from top to bottom:

1. Playlist header:
   - Small music note SVG (20px, text-purple-400) + "Your Playlist" label in text-purple-400 text-xs uppercase tracking-widest
   - Playlist name: text-white text-3xl font-bold mt-1
   - Description: text-white/60 text-sm mt-2 italic

2. Mood tags row:
   - flex-wrap gap-2 mt-4
   - Each tag: bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-3 py-1 text-xs font-medium

3. Music parameters grid (2 cols mobile, 4 cols md+), mt-4:
   - Energy: number + "%" with narrow horizontal progress bar below (bg-purple-500, h-1 rounded)
   - Mood (valence): same but bg-blue-500
   - Tempo: text value capitalized, no bar
   - Tracks: count, no bar
   - Each cell: bg-white/5 rounded-xl p-3, label in text-white/40 text-xs, value in text-white font-semibold text-lg

4. Track list (max-h-80 overflow-y-auto), mt-4:
   - Custom thin scrollbar (webkit-scrollbar, bg-white/5 thumb)
   - Each row: flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-white/5
   - Track number: text-white/30 w-7 text-right text-sm
   - Track info: name text-white text-sm font-medium truncate, artist • album text-white/40 text-xs truncate
   - Duration: text-white/40 text-xs

5. Actions, mt-6:
   - "Create Another Playlist" full-width button: bg-gradient-to-r from-purple-600 to-blue-600, hover darkens, text-white font-semibold py-3 rounded-xl

Export as: `PlaylistResultsCard`
```
