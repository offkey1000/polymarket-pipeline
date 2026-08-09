import React from 'react';
import {Composition} from 'remotion';
import {SkyNexVideo, TOTAL_DURATION} from './SkyNexVideo';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="SkyNex"
			component={SkyNexVideo}
			durationInFrames={TOTAL_DURATION}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
