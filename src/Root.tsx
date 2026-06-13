import { Composition } from "remotion";
import { KeralaCut, TOTAL_FRAMES } from "./KeralaCut";
// Importing the theme registers the local font loading (delayRender) for renders.
import "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KeralaCut"
        component={KeralaCut}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
