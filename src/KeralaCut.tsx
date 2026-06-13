import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, M06, M07, M08, M09,
  M10, M11, M12, M13, M14, M15, M16, M17, M18,
} from "./scenes/film";

// Scene durations in frames (@30fps). The film runs ~4:45; cross-fades consume
// a little overlap between each pair.
const SCENES: { c: React.FC; d: number }[] = [
  { c: M01, d: 360 }, // cold open
  { c: M02, d: 480 }, // the cut / thesis
  { c: M03, d: 540 }, // the journey
  { c: M04, d: 510 }, // mittelstand
  { c: M05, d: 600 }, // the mine (Kerala map)
  { c: M06, d: 480 }, // sorting house
  { c: M07, d: 540 }, // consortium machine
  { c: M08, d: 600 }, // five facets
  { c: M09, d: 480 }, // a different game (scale)
  { c: M10, d: 450 }, // demand before supply
  { c: M11, d: 570 }, // who owns it (globe)
  { c: M12, d: 450 }, // narrowing river
  { c: M13, d: 450 }, // master cutters
  { c: M14, d: 420 }, // jobs / careers
  { c: M15, d: 450 }, // proven elsewhere
  { c: M16, d: 570 }, // ten-year cut
  { c: M17, d: 480 }, // the ask
  { c: M18, d: 420 }, // close
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
