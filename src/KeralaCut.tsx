import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import { VO, VO_LEAD_FRAMES } from "./voMeta";
import {
  M01, M02, M03, M04, M05, MWhy, MMarket, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis", narrated.
// Scenes in narrative order; each scene's duration and voiceover come from
// voMeta (regenerated from the actual audio by scripts/write_vometa.py).
const COMPONENTS: React.FC[] = [
  M01, M02, M03, M04, MWhy, MMarket, M05, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
];

const SCENES = COMPONENTS.map((c, i) => ({
  c,
  d: VO[i]?.d ?? 600,
  vo: VO[i]?.file,
}));

const XFADE = 20;
export const TOTAL_FRAMES =
  SCENES.reduce((a, s) => a + s.d, 0) - XFADE * (SCENES.length - 1);

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
    </AbsoluteFill>
  );
};
