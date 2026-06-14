import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, MWhy, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis" (~6:45).
// Spine: the institutional-architecture thesis. Explanatory thread: the gem
// metaphor (Mine → Cut & Polish → Necklace). Technical heart: the value stack.
const SCENES: { c: React.FC; d: number }[] = [
  { c: M01, d: 460 },      // cold open
  { c: M02, d: 600 },      // the architect — K.P.P. Nambiar
  { c: M03, d: 640 },      // systems, not things
  { c: M04, d: 780 },      // the unfinished architecture (build + reconnect)
  { c: M05, d: 500 },      // what KSIEP is
  { c: MWhy, d: 620 },     // the why — geopolitics + chess
  { c: MPurpose, d: 520 }, // purpose
  { c: MGoal, d: 620 },    // the goal — capability depth + AI layer
  { c: M06, d: 660 },      // the distinctive Kerala model (six pillars)
  { c: MStack, d: 720 },   // the value stack — materials → AI
  { c: M07, d: 600 },      // THE MINE — every component present
  { c: MRegional, d: 600 },// regional expertise distribution
  { c: M08, d: 660 },      // CUT & POLISH — the jobs of the small firms
  { c: M09, d: 640 },      // THE NECKLACE — industries → India
  { c: MJobs, d: 620 },    // JOBS — the town the mine builds
  { c: M10, d: 640 },      // capitalise the mine — investment & allocation
  { c: M11, d: 620 },      // governance & ownership + anchor investors
  { c: MPolicy, d: 560 },  // the Kerala policy — ABCD
  { c: M12, d: 600 },      // the thesis — balance-sheet asset for Kerala
  { c: MVision, d: 560 },  // vision 2035
  { c: M13, d: 680 },      // finale — K.P.P. Nambiar 2.0
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
