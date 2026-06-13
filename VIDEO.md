# The Kerala Cut — Remotion video

A professional ~2-minute motion-graphics presentation for the **Kerala
Electronics Consortium**, built with [Remotion](https://remotion.dev). The
story adapts the two source pitch decks (*The Kerala Cut* and *The Anchor
Seat*) into a single narrated visual sequence using a diamond-cutting metaphor.

## Output

- `KeralaCut` composition — 1920×1080, 30 fps, ~3,800 frames (~2 min 7 s).
- Rendered file: `out/KeralaCut.mp4`.

## Scene structure

| # | Scene | Beat |
|---|-------|------|
| 1 | Title | "The Kerala Cut — from rough stone to crown jewel" |
| 2 | The thesis | Value comes from the cut; the Mine → Sort → Cut → Polish → Setting journey |
| 3 | Mittelstand | Many small masters, one rich nation (99% / 6-in-10 / 1,000+) |
| 4 | The mine | Kerala's six proven "deposits" |
| 5 | The cutting wheel | Five shared tools of the consortium |
| 6 | The five facets | Space, marine, medical, power, test |
| 7 | A different game | Volume vs design vs niche — "diamonds by the carat" |
| 8 | Who owns it | The CIAL way — diaspora Crown Shares |
| 9 | The ten-year cut | Prospect → Extract → Cut & Polish → Crown |
| 10 | The ask | ₹500 crore, itemised |
| 11 | Close | "Kerala does not need a bigger mine. It needs a finer cut." |

## Project layout

```
src/
  index.ts              Remotion entry (registerRoot)
  Root.tsx              Composition registration
  KeralaCut.tsx         Master sequence (TransitionSeries + cross-fades)
  theme.ts              Palette + locally-bundled fonts
  components/           Backdrop, Diamond, SceneFrame, ui (typography/counters)
  scenes/               S01–S11, one file per scene
public/fonts/           Cormorant Garamond + Inter (woff2, bundled offline)
```

## Working on it

```bash
npm run remotion          # open Remotion Studio (live preview)
npm run build -- KeralaCut out/KeralaCut.mp4   # render to mp4
```

### Rendering notes

- Fonts are bundled in `public/fonts` and loaded with `@remotion/fonts`, so
  renders need no network access and are deterministic.
- `remotion.config.ts` points `browserExecutable` at the system headless
  Chromium so renders work without downloading Chrome Headless Shell.
