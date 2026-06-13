import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, M06, M07,
  M08, M09, M10, M11, M12, M13, M14,
} from "./scenes/film";

// Streamlined 14-scene film (~3:55). Cross-fades consume a little overlap
// between each pair of scenes.
const SCENES: { c: React.FC; d: number }[] = [
  { c: M01, d: 380 }, // cold open
  { c: M02, d: 520 }, // many small masters (cut + Surat + Mittelstand)
  { c: M03, d: 560 }, // the visionary — K.P.P. Nambiar
  { c: M04, d: 500 }, // the architecture changed
  { c: M05, d: 620 }, // the mine — Kerala map + anchors
  { c: M06, d: 520 }, // the cutting wheel
  { c: M07, d: 540 }, // the five facets
  { c: M08, d: 460 }, // a different game
  { c: M09, d: 450 }, // demand before supply
  { c: M10, d: 600 }, // who owns it (CIAL + Crown Shares)
  { c: M11, d: 470 }, // master cutters
  { c: M12, d: 560 }, // the ten-year cut
  { c: M13, d: 470 }, // the ask
  { c: M14, d: 660 }, // finale
];

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
                <Comp />
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
