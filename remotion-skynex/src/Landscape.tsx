import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

// Layered Himalayan ridgelines with a rising sun, used as the backdrop
// for the opening and closing scenes.
export const Landscape: React.FC<{sunrise?: number}> = ({sunrise = 1}) => {
	const frame = useCurrentFrame();
	const sunY = interpolate(sunrise, [0, 1], [820, 520]);
	const glow = interpolate(sunrise, [0, 1], [0.15, 0.5]);
	const drift = Math.sin(frame / 40) * 6;

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, #0b1b3f 0%, #2b3a6b 38%, #b3577b 68%, #f2a25c 100%)',
				}}
			/>
			<svg
				viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0}}
				width="100%"
				height="100%"
			>
				<circle cx={960} cy={sunY} r={230} fill="#ffd9a0" opacity={glow} />
				<circle cx={960} cy={sunY} r={120} fill="#ffe9c4" opacity={0.95} />
				{/* Far ridge */}
				<path
					d={`M0 ${640 + drift} L260 ${470 + drift} L480 ${600 + drift} L760 ${420 + drift} L1040 ${620 + drift} L1330 ${450 + drift} L1620 ${610 + drift} L1920 ${500 + drift} L1920 1080 L0 1080 Z`}
					fill="#3a3f6e"
					opacity={0.9}
				/>
				{/* Mid ridge */}
				<path
					d={`M0 ${760} L320 ${600} L560 ${740} L880 ${560} L1180 ${750} L1480 ${590} L1920 ${730} L1920 1080 L0 1080 Z`}
					fill="#26294f"
				/>
				{/* Near ridge with village lights */}
				<path
					d="M0 880 L400 760 L720 870 L1100 740 L1460 880 L1920 790 L1920 1080 L0 1080 Z"
					fill="#141531"
				/>
				{[420, 690, 1120, 1400, 1650].map((x, i) => (
					<circle
						key={x}
						cx={x}
						cy={860 + (i % 3) * 30}
						r={5}
						fill="#ffca7a"
						opacity={0.6 + 0.4 * Math.sin(frame / 9 + i * 2)}
					/>
				))}
			</svg>
		</AbsoluteFill>
	);
};
