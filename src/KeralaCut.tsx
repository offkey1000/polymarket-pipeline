import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, M06, M07, M08, M09, MJobs, M10, M11, M12, M13,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis" (~4:30).
// The institutional-architecture thesis is the spine; the gem metaphor
// (Mine → Cut & Polish → Necklace) is the explanatory thread.
const SCENES: { c: React.FC; d: number }[] = [
  { c: M01, d: 460 }, // cold open
  { c: M02, d: 600 }, // the architect — KPP Nambiar
  { c: M03, d: 640 }, // systems, not things
  { c: M04, d: 760 }, // the unfinished architecture (build + reconnect)
  { c: M05, d: 440 }, // what KSIEP is
  { c: M06, d: 660 }, // the distinctive Kerala model (six pillars)
  { c: M07, d: 600 }, // THE MINE — every component present
  { c: M08, d: 660 }, // CUT & POLISH — the jobs of the small firms
  { c: M09, d: 680 }, // THE NECKLACE — industries → India
  { c: MJobs, d: 600 }, // JOBS — the town the mine builds
  { c: M10, d: 640 }, // capitalise the mine — investment & allocation
  { c: M11, d: 560 }, // governance & ownership
  { c: M12, d: 540 }, // the thesis
  { c: M13, d: 660 }, // finale — KPP-N 2.0
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
