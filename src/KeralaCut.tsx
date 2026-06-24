import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors, fonts } from "./theme";
import { VO, VO_LEAD_FRAMES } from "./voMeta";
import {
  M01, M02, M03, M04, M05, MWhy, MMarket, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
  MDedication, MCredits,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis", narrated.
// Scenes in narrative order; each scene's duration and voiceover come from
// voMeta (regenerated from the actual audio by scripts/write_vometa.py).
const COMPONENTS: React.FC[] = [
  M01, M02, M03, M04, MWhy, MMarket, M05, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
];

// Bookend cards are not narrated, so they carry fixed durations (not voMeta).
const DEDICATION_FRAMES = 7 * 30; // ~7s opening dedication
const CREDITS_FRAMES = 9 * 30; // ~9s closing credits

const SCENES = [
  { c: MDedication, d: DEDICATION_FRAMES, vo: undefined as string | undefined },
  ...COMPONENTS.map((c, i) => ({
    c,
    d: VO[i]?.d ?? 600,
    vo: VO[i]?.file as string | undefined,
  })),
  { c: MCredits, d: CREDITS_FRAMES, vo: undefined as string | undefined },
];

const XFADE = 20;
export const TOTAL_FRAMES =
  SCENES.reduce((a, s) => a + s.d, 0) - XFADE * (SCENES.length - 1);

// Persistent ownership watermark — present on every frame to deter re-use.
const Watermark: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-end",
      alignItems: "flex-end",
      padding: "0 46px 34px 0",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        opacity: 0.32,
        fontFamily: fonts.sans,
        fontWeight: 500,
        fontSize: 19,
        letterSpacing: 2,
        color: colors.ink,
        textShadow: "0 1px 6px rgba(0,0,0,0.55)",
      }}
    >
      <span style={{ color: colors.gold, fontSize: 14 }}>◆</span>
      Created by Premchand Kurup
    </div>
  </AbsoluteFill>
);

export const KeralaCut: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg0 }}>
      <TransitionSeries>
        {SCENES.map((s, i) => {
          const Comp = s.c;
          return (
            <React.Fragment key={i}>
              <TransitionSeries.Sequence durationInFrames={s.d}>
                <AbsoluteFill>
                  <Comp />
                  {/* narration starts after a brief visual lead-in */}
                  {s.vo && (
                    <Sequence from={VO_LEAD_FRAMES}>
                      <Audio src={staticFile(s.vo)} volume={0.95} />
                    </Sequence>
                  )}
                </AbsoluteFill>
              </TransitionSeries.Sequence>
              {i < SCENES.length - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: XFADE })}
                />
              )}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <Watermark />
    </AbsoluteFill>
  );
};
