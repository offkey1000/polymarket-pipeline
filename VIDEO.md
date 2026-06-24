# The Kerala Cut — Remotion film

A ~4 min 45 s cinematic motion-graphics film for the **Kerala Electronics
Consortium**, built with [Remotion](https://remotion.dev). It adapts the two
source pitch decks (*The Kerala Cut* and *The Anchor Seat*) into a single
narrated visual story built around the diamond-cutting metaphor.

Rather than animating slides, each scene is built around a **custom animated
illustration** (the "movie"), with text reduced to a short caption.

## Output

- `KeralaCut` composition — 1920×1080, 30 fps, 8,510 frames (~4:45).
- Rendered file: `out/KeralaCut.mp4` (a committed copy lives at `video/KeralaCut.mp4`).

## Scene structure (18 scenes)

| # | Scene | Centerpiece illustration |
|---|-------|--------------------------|
| 1 | Cold open | The brilliant assembles from light |
| 2 | The cut / thesis | Wall of workshop windows lighting up (Surat) |
| 3 | The journey | Five-station conveyor; a stone refines to a brilliant |
| 4 | Mittelstand | Workshop grid + animated stat counters |
| 5 | The mine | Animated map of Kerala; deposits light up |
| 6 | The sorting house | Two-city anchor houses (Kochi / Trivandrum) |
| 7 | The cutting wheel | Meshed consortium gears turning |
| 8 | The five facets | Rotating brilliant; facets fire to industry icons |
| 9 | A different game | Jeweller's balance — glass vs the carat |
| 10 | Demand before supply | Order streams pouring into member firms |
| 11 | Who owns it | Globe; diaspora beams capital home (CIAL) |
| 12 | The narrowing river | Remittance river tapering into Crown Shares |
| 13 | Master cutters | Engineers stream home, become workshops |
| 14 | From carats to careers | Jobs counters + multiplying figures |
| 15 | Proven elsewhere | Penang · Baden-Württemberg · Surat |
| 16 | The ten-year cut | Staged timeline; the stone refining to a crown |
| 17 | The ask | ₹500 cr itemised + total counter |
| 18 | Close | The jewel is set into the crown |

## Project layout

```
src/
  index.ts                Remotion entry (registerRoot)
  Root.tsx                Composition registration
  KeralaCut.tsx           Master sequence (TransitionSeries + cross-fades)
  theme.ts                Palette + locally-bundled fonts
  components/             Backdrop, Diamond, Stage/TitleBlock, ui, icons
  illustrations/          The animated centerpieces (map, journey, globe,
                          facets, machine, scale, crown, river, …)
  scenes/film.tsx         The 18 scenes (M01–M18)
public/fonts/             Cormorant Garamond + Inter (woff2, bundled offline)
```

## Working on it

```bash
npm run remotion                               # Remotion Studio (live preview)
npm run build -- KeralaCut out/KeralaCut.mp4   # render to mp4
```

### Rendering notes

- Fonts are bundled in `public/fonts` and loaded via `@remotion/fonts`, so
  renders need no network access and are deterministic.
- `remotion.config.ts` points `browserExecutable` at the system headless
  Chromium and renders PNG frames with the `bt709` color space, so the output
  is standard limited-range `yuv420p` H.264 that plays everywhere.
