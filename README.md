# Strata (v4)

Next.js rebuild of https://breakable-lot-823908.framer.app, ported from the published site's own component code.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `src/content/site.ts`: all copy, links, images and the case studies. Swap real data in here.
- `src/app/globals.css`: type presets, layout and the three breakpoints (1200px and up, 810 to 1199px, below 810px).
- `src/components/`: one file per effect.

| Component | Effect |
| --- | --- |
| `VoxelField` | Hero and 404 WebGL2 voxel landscape with pointer ripple and parallax |
| `Loader` | Once-per-session pixel logo intro |
| `TypeCycle` | Typewriter in the nav |
| `MagneticButton` | Spring-follow button with fill sweep and rolling label |
| `CursorBlock` | Block and trail that follow the mouse, with `data-cursor` labels |
| `HeroName` | Hero name letters that can be pulled and spring back |
| `BreakableMonogram` | "TS" pixels that shatter on click and repair themselves |
| `BreakEngine` | Lets anything in "Sobre mí" shatter on click and repair itself, drawn on one canvas |
| `DragTile` | Stack tiles that can be pulled and spring back |
| `MicroEffects` | Scrambling labels, card spotlight, nav progress and away-tab title |
| `TechIcon` | Technology logo badge, using simple-icons |
| `About` | "Sobre mí" bento with animated orbit rings |
| `OrbitGallery` | Scroll-driven card orbit |
| `PixelWordmark` | Footer dots that assemble and react to the pointer |
| `RevealEngine` | Fade and rise for blocks marked `data-reveal` |

## Known quirks kept from the original

- The orange hero button sits above the loader screen while it plays (`z-index` on the link).
- The 404 voxel field is offset 300px to the left, leaving a bare strip on the right (`.nf-field`).
- `.fonts-home` loads a second font subset on the home page only, matching what the original renders.

## Before going live

- There is no contact form: the contact links open the visitor's email app using `site.email`.
- Images and copy are the original site's placeholders.
