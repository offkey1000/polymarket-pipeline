import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";
import {
  M01, M02, M03, M04, M05, MWhy, MMarket, MPurpose, MGoal, M06, MStack,
  M07, MRegional, M08, M09, MJobs, M10, M11, MPolicy, M12, MVision, M13,
} from "./scenes/film";

// KSIEP — "Returning with a Kerala Technology Thesis", with per-scene narration.
// ACT I heritage · ACT II the why & the opening · ACT III what KSIEP is ·
// ACT IV the mine → the diamonds · ACT V capital/governance/policy · ACT VI thesis/vision.
const SCENES: { c: React.FC; d: number; vo: string }[] = [
  { c: M01, d: 460, vo: "vo/vo01.wav" },
  { c: M02, d: 600, vo: "vo/vo02.wav" },
  { c: M03, d: 640, vo: "vo/vo03.wav" },
  { c: M04, d: 780, vo: "vo/vo04.wav" },
  { c: MWhy, d: 620, vo: "vo/vo05.wav" },
  { c: MMarket, d: 640, vo: "vo/vo06.wav" },
  { c: M05, d: 500, vo: "vo/vo07.wav" },
  { c: MPurpose, d: 520, vo: "vo/vo08.wav" },
  { c: MGoal, d: 600, vo: "vo/vo09.wav" },
  { c: M06, d: 660, vo: "vo/vo10.wav" },
  { c: MStack, d: 700, vo: "vo/vo11.wav" },
  { c: M07, d: 600, vo: "vo/vo12.wav" },
  { c: MRegional, d: 600, vo: "vo/vo13.wav" },
  { c: M08, d: 640, vo: "vo/vo14.wav" },
  { c: M09, d: 660, vo: "vo/vo15.wav" },
  { c: MJobs, d: 600, vo: "vo/vo16.wav" },
  { c: M10, d: 640, vo: "vo/vo17.wav" },
  { c: M11, d: 620, vo: "vo/vo18.wav" },
  { c: MPolicy, d: 540, vo: "vo/vo19.wav" },
  { c: M12, d: 600, vo: "vo/vo20.wav" },
  { c: MVision, d: 540, vo: "vo/vo21.wav" },
  { c: M13, d: 680, vo: "vo/vo22.wav" },
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
                <AbsoluteFill>
                  <Comp />
                  {/* narration — starts at scene start, sized to fit the scene */}
                  <Audio src={staticFile(s.vo)} volume={0.92} />
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
