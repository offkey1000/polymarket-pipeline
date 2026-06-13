import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors } from "./theme";

import { S01Title } from "./scenes/S01Title";
import { S02Thesis } from "./scenes/S02Thesis";
import { S03Mittelstand } from "./scenes/S03Mittelstand";
import { S04Mine } from "./scenes/S04Mine";
import { S05Wheel } from "./scenes/S05Wheel";
import { S06Facets } from "./scenes/S06Facets";
import { S07Game } from "./scenes/S07Game";
import { S08Ownership } from "./scenes/S08Ownership";
import { S09Timeline } from "./scenes/S09Timeline";
import { S10Ask } from "./scenes/S10Ask";
import { S11Close } from "./scenes/S11Close";

// Footer numbering covers the nine content scenes (the title and close cards
// are full-bleed and carry no footer).
const TOTAL = 9;

// Scene lengths in frames (@30fps). The composition duration is the sum of
// these minus the overlap consumed by each transition.
const D = {
  title: 165,
  thesis: 400,
  mittelstand: 370,
  mine: 400,
  wheel: 410,
  facets: 430,
  game: 410,
  ownership: 380,
  timeline: 420,
  ask: 410,
  close: 230,
};
const XFADE = 22;

export const TOTAL_FRAMES =
  Object.values(D).reduce((a, b) => a + b, 0) - XFADE * 10;

const T = () => fade();
const timing = () => linearTiming({ durationInFrames: XFADE });

export const KeralaCut: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg0 }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D.title}>
          <S01Title />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.thesis}>
          <S02Thesis index={1} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.mittelstand}>
          <S03Mittelstand index={2} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.mine}>
          <S04Mine index={3} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.wheel}>
          <S05Wheel index={4} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.facets}>
          <S06Facets index={5} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.game}>
          <S07Game index={6} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.ownership}>
          <S08Ownership index={7} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.timeline}>
          <S09Timeline index={8} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.ask}>
          <S10Ask index={9} total={TOTAL} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={T()} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={D.close}>
          <S11Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
