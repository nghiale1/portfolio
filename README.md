# The AI Content Engine — Lê Minh Nghĩa

An interactive, cinematic portfolio built around **one concept**: a machine that
transforms ideas, prompts and raw assets into commercial short-form content.
The 3D environment is made of content-production elements (vertical 9:16
screens, content frames, waveforms, workflow nodes, a central processing core)
— not a single decorative abstract object.

Built with **Next.js + React + TypeScript + React Three Fiber + Three.js + Drei
+ GSAP/ScrollTrigger + Lenis**.

---

## 1. Audit of the previous version

The previous portfolio was a single `index.html` Three.js file. It was visually
clean but structurally limited:

- **One icosahedron** reused across the whole site as the only 3D object.
- The object only changed **position, colour, scale and wireframe opacity**.
- Most sections shared the **same fade-up reveal**.
- The 3D scene was **decorative and disconnected** from the actual work.
- Projects were presented as **SaaS-style dashboard cards**.
- Placeholder gradients (“[Add showreel]”) **did not demonstrate AI content**.
- There was **no signature interaction** and **no narrative** between sections.

## 2. What was removed

- The single icosahedron and its reuse as the hero/background visual.
- The repeated fade-up reveal used everywhere.
- The dashboard-style project cards and the empty gradient “showreel” boxes.
- The cyan/purple “generic tech” identity.
- The one-file HTML architecture (replaced by a real Next.js app).

## 3. Storyboard (one continuous transformation)

| Scene | Section | Motion purpose |
| ----- | ------- | -------------- |
| 0 | Hold to Activate | **Assembly** — fragments pulled to the core, light burst |
| 1 / 2 | Identity + proof | **Reveal** — mask-line reveal, metrics wired to the core |
| 3 | Camera dive | **Dive** — scrubbed camera push into the system |
| 4 | Selected Work | **Spatial navigation** — a depth gallery of 9:16 screens |
| 5 | Workflow | **Deconstruction** — a video explodes into 10 stage-nodes, then reassembles |
| 6 | Three Powers | **Fusion** — three distinct materials merge into one engine |
| 7 | Career | **Data connection** — energy flows up the role-spine into the engine |
| 8 | Contact | **Convergence** — fragments resolve into an LMN frame |

Every scene reads a single scrubbed `engine.global` progress value, so the
whole experience behaves like one machine rather than eight separate sections.

## 4. Architecture

```
src/
  app/
    layout.tsx            Fonts (Fraunces + Inter), metadata
    globals.css           Design tokens, reading zones, grain, cursor
    page.tsx              Composition + GSAP/ScrollTrigger choreography
    work/[slug]/page.tsx  Static case-study pages (generateStaticParams)
  components/
    engine/
      Experience.tsx      <Canvas> wrapper (fixed, pointer-transparent)
      SceneManager.tsx     Camera-path animation + scene composition
      ContentCore.tsx      Central processing core (frames + waveform)
      PromptField.tsx      Activation fragments that assemble
      ProjectGallery.tsx   3D depth gallery of vertical screens
      VideoScreen.tsx      Poster → muted video texture per screen
      WorkflowDeconstruct.tsx  10-layer explode / connect / reassemble
      ThreePowers.tsx      Three materials that fuse
      CareerLattice.tsx    Role nodes with energy flow
      Monogram.tsx         Final convergence frame
    overlay/
      HoldToActivate.tsx   Signature hold interaction (+ mobile/reduced)
      Nav.tsx              Top navigation
      Scenes.tsx           All accessible HTML reading layers
    ui/
      CustomCursor.tsx     Subtle cursor (off on touch + reduced motion)
      Grain.tsx            Film grain overlay
  data/
    projects.ts metrics.ts workflow.ts powers.ts career.ts
  lib/
    engine.ts            Per-frame shared state (no React re-renders)
    store.ts             Discrete UI state (useSyncExternalStore)
    range.ts             Phase ranges + scroll math
    useLenis.ts          Lenis ↔ ScrollTrigger wiring
    useVideoTexture.ts   Lazy, self-disposing video textures
    useEngineSelector.ts rAF bridge so HTML can read engine values
    useEnv.ts            mobile / touch / reduced-motion hooks
public/
  posters/   4 compressed 9:16 poster images
  previews/  4 muted preview videos
  cv/        Le-Minh-Nghia-CV.pdf (real CV)
  lmn-mark.svg
scripts/gen_assets.py    Regenerates posters/previews/monogram
```

### State model

- `engine` (lib/engine.ts) holds **per-frame** values (`global`, `activation`,
  pointer, `activeProject`, flags). It is mutated by ScrollTrigger `onUpdate`
  and read inside `useFrame` — **no React re-renders on scroll**.
- `uiStore` (lib/store.ts) holds the few **discrete** values React needs
  (`activated`, `phase`, `activeProject`).
- `useEngineSelector` rAF-polls `engine` only where the HTML layer needs to
  reflect a per-frame value (e.g. active project title, current workflow stage).

### Scroll model

- Full-height HTML `<section>`s scroll normally; the `<Canvas>` is `position:
  fixed` behind them and **pointer-transparent**, so the HTML owns scroll/clicks.
- Lenis provides smooth scroll and is wired into `ScrollTrigger.update`.
- A master ScrollTrigger (`scrub`) maps page progress → `engine.global`.
- The camera dive and all scene logic are **scrub-driven**, not IntersectionObserver
  toggles. (A few non-critical HTML accents do use enter triggers.)

### Video optimisation

- Posters load by default. A video texture is created **only** for the active
  screen and its immediate neighbours, plays **only** while active, pauses
  off-screen, and is disposed when the screen leaves the load window.

## 5. Accessibility & fallbacks

- **Hold to Activate** is skippable: a “Skip” button, plus **Enter/Space**
  activate immediately.
- **Mobile** (or coarse pointer): the hold is replaced by a clear
  **“Enter Portfolio”** button, the custom cursor is disabled, and camera
  parallax is muted.
- **prefers-reduced-motion**: Lenis smooth scroll is disabled (native scroll),
  the light burst is skipped, and the identity is shown without the mask sweep.

## 6. Run it

> Requires Node 18+ and network access to install dependencies and fetch the
> Google fonts used by `next/font`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 7. Assets & honesty notes

- `public/cv/Le-Minh-Nghia-CV.pdf` is the **real CV** (wired to every
  “Download CV” link).
- The **posters and preview videos in `public/` are tasteful generated
  placeholders** (made with `scripts/gen_assets.py`) so there are no empty
  “[Add showreel]” boxes. **Replace them with real channel exports** when
  available — keep the same filenames (`public/posters/<slug>.jpg`,
  `public/previews/<slug>.mp4`).
- **No invented numbers, clients or brands.** The only figures shown are the
  ones from the CV (5+ years SE, 3 channels, 30–50 videos/day, 1,000+
  orders/month). Per-video view/revenue numbers are intentionally left out of
  the case studies until verified figures are supplied.

## 8. Tuning

Phase boundaries live in `src/lib/range.ts` (`PHASES`) and the camera keyframes
in `src/components/engine/SceneManager.tsx` (`PATH`). Section heights in
`globals.css` (`.scene`, `.tall`) are sized to roughly match those ranges; if
you change one, nudge the other so scroll stays aligned with the content.

## 9. Build status

This project was authored in an offline sandbox **without npm access**, so
`npm install` and `npm run build` must be run on your machine. The source is
complete and self-consistent; if the build surfaces any environment-specific
type error, it will be local to a single component and easy to resolve. ESLint
is set to not block the production build (`next.config.mjs`).
