import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis" (~3:55).
const SCENES: { c: React.FC; d: number }[] = [
  { c: M01, d: 460 }, // cold open — circuit becomes Kerala
  { c: M02, d: 640 }, // the architect — KPP Nambiar
  { c: M03, d: 720 }, // systems, not things
  { c: M04, d: 560 }, // 53 years, three institutions
  { c: M05, d: 540 }, // the missing link (reconnect)
  { c: M06, d: 560 }, // what KSIEP is
  { c: M07, d: 700 }, // the distinctive Kerala model (six pillars)
  { c: M08, d: 680 }, // the capability layer, live
  { c: M09, d: 560 }, // sovereign electronics — into India
  { c: M10, d: 580 }, // governance & capital
  { c: M11, d: 560 }, // the thesis
  { c: M12, d: 680 }, // finale — KPP-N 2.0
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
