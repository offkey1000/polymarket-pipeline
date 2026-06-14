import { loadFont } from "@remotion/fonts";
import { staticFile, delayRender, continueRender, cancelRender } from "remotion";

// Fonts are bundled locally (public/fonts) and loaded with no runtime network,
// so renders are deterministic in any environment.
export const fonts = {
  display: "Cormorant Garamond",
  sans: "Inter",
};

const handle = delayRender("Loading fonts");
Promise.all([
  loadFont({
    family: "Cormorant Garamond",
    url: staticFile("fonts/CormorantGaramond-SemiBold.woff2"),
    weight: "600",
  }),
  loadFont({
    family: "Cormorant Garamond",
    url: staticFile("fonts/CormorantGaramond-Bold.woff2"),
    weight: "700",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("fonts/Inter-variable.woff2"),
    weight: "300 700",
  }),
])
  .then(() => continueRender(handle))
  .catch((err) => cancelRender(err));

// A restrained, premium palette: midnight navy, ice-blue diamond light, warm gold.
export const colors = {
  bg0: "#070A12",
  bg1: "#0B1020",
  bg2: "#11192E",
  ink: "#F4F7FC",
  muted: "#9AA6BE",
  faint: "#5A6684",
  line: "rgba(160,180,220,0.16)",
  gold: "#E6C068",
  goldSoft: "#F0D89A",
  ice: "#8FD8EC",
  iceSoft: "#BCEBF6",
  iceDeep: "#4FA8C9",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Ordered list of Stage-scene seeds — the single source of truth for the
// footer progress bar. Reorder scenes here (and in KeralaCut) without touching
// per-scene numbers. (Cold-open and finale are full-bleed and not listed.)
export const SCENE_ORDER = [
  "architect", "systems", "arc", "whatis", "why", "market", "purpose",
  "goal", "pillars", "stack", "assurance", "mine", "regional", "cut",
  "diamonds", "jobs", "invest", "gov", "policy", "thesis", "vision",
];
export const sceneProgress = (seed?: string): number => {
  if (!seed) return 0;
  const i = SCENE_ORDER.indexOf(seed);
  if (i < 0) return 0;
  return (i + 1) / (SCENE_ORDER.length + 1);
};

