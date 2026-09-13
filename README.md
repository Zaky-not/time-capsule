# ARCHIVE — Digital Time Capsule

A cinematic, scroll-driven digital yearbook / time capsule for a graduating class.
Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. For a production build:

```bash
npm run build
npm run preview
```

> This environment had no internet access, so dependencies could not be
> installed or the dev server test-run here. Everything has been reviewed
> line-by-line for correctness, but please run `npm install && npm run dev`
> as your first step and report anything odd.

## Replacing placeholder content

Nothing here is real data — replace it before shipping:

| What | Where |
|---|---|
| Generation name, quote, year | `src/components/Identity.jsx` |
| Logo | `src/assets/logo/` + swap the "LOGO" placeholder circles in `Identity.jsx` and `Goodbye.jsx` |
| Photo-explosion images (10) | `src/assets/photos/scatter-1.jpg` … `scatter-10.jpg` |
| Gallery chapter photos + copy | `src/data/gallery.js` |
| Class members (photo, name, IG, quote) | `src/data/members.js` |
| Class video + poster | `src/assets/video/class-video.mp4`, `poster.jpg` |
| Ambient sound + main song | `src/assets/audio/ambient.mp3`, `main-song.mp3` |
| Memory Wall seed messages | `src/data/memories.js` (real messages will come from the form once wired to a backend) |
| Developer credit link | `src/components/DeveloperCredit.jsx` |

## Flow

```
Countdown (3→2→1) → "Let's go back for a while." → ENTER MEMORY
  → Identity (logo, name, quote, year)
  → Photo Explosion → Photo Collage → "Every picture has a story."
  → Gallery (4 chapters) → "...about the people in them."
  → Meet the Class (grid + Random Memory + modal)
  → "This was us." → Class Video
  → "Before you leave... leave something behind." → main song fades in
  → Memory Wall (sticky notes + Leave a Memory form)
  → Goodbye ("See you again." / FIN.)
  → Developer credit (footer, outside the story)
```

## Audio behavior

- No audio plays before the first click (browser autoplay rules + the brief's
  own pacing requirement).
- Clicking **ENTER MEMORY** unlocks a soft ambient loop only.
- The main emotional song is reserved for the Memory Wall: it starts at
  volume 0 and steps up over ~3.5s the first time that section scrolls into
  view, then fades out over the Goodbye section.
- A small `♪ MUSIC` control (bottom-right) mutes/unmutes both tracks.

## Data → real backend

`src/data/memories.js` is shaped like a real API response
(`{ id, name, message, anonymous, createdAt }`). `MemoryWall.jsx` currently
appends new entries to local state on submit — swap that handler for a
`fetch`/SDK call to Supabase, Firebase, or Appwrite and the rest of the UI
(counter, note rendering, animations) needs no changes.

## Known polish items (not yet done)

- Real assets (photos, video, audio, logo) are all placeholders.
- `useReducedMotion` from Framer Motion isn't wired into every animated
  component yet — a global CSS rule shortens most animations, but a few
  JS-driven scroll effects (Photo Explosion) will still run at full motion
  for users with `prefers-reduced-motion` set. Worth revisiting.
- The Memory Wall's absolute-positioned note layout is tuned for ~9 visible
  notes; beyond that, notes will overlap more as they wrap the fixed
  `PLACEMENTS` array — fine for now, but a masonry/columns approach would
  scale better once real submissions come in.
- No real backend wired yet (see above).
