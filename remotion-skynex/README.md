# HAPIDA SKYNeX — Remotion animation

A 30-second, 1920×1080 motion-graphics video built with [Remotion](https://remotion.dev)
that tells the story of Ravi Tamta, an innovator from Kaflikhan village in
Almora, Uttarakhand, who test-flew the HAPIDA SKYNeX — a single-seater
electric flying vehicle prototype developed under his startup, Hapida Sky.

## Scenes

1. **Intro** — sunrise over Himalayan ridgelines, locating the story in Almora, Uttarakhand
2. **The innovator** — Ravi Tamta name reveal
3. **The startup** — Hapida Sky badge
4. **The prototype** — the SKYNeX eVTOL spools up its rotors, kicks up dust, and lifts off
5. **The technology** — blueprint scene: "built on modified drone technology"
6. **Going viral** — a phone playing the first-flight video with floating reactions
7. **Outro** — "From a village in the hills — to the sky."

## Usage

```bash
npm install
npm run studio      # open Remotion Studio for live preview
npm run render      # render out/skynex.mp4
npm run typecheck
```

The `render`/`still` scripts pass `--browser-executable` pointing at the
pre-installed Playwright chrome-headless-shell used in this environment.
On a normal machine, drop that flag (or run `npx remotion render SkyNex out/skynex.mp4`)
and Remotion will download its own headless browser.
