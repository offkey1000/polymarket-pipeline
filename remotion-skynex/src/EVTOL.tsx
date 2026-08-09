import React from 'react';
import {useCurrentFrame} from 'remotion';

// Front view of the single-seater eVTOL: cockpit bubble, two rotor arms,
// landing skids. Rotors are faked with a blurred disc plus two blades whose
// horizontal scale follows a cosine, reading as fast rotation.
export const EVTOL: React.FC<{spin?: number}> = ({spin = 1}) => {
	const frame = useCurrentFrame();

	const Rotor: React.FC<{cx: number}> = ({cx}) => {
		const angle = frame * 47 * spin + cx;
		const blade = Math.cos((angle * Math.PI) / 180);
		return (
			<g>
				<rect x={cx - 6} y={116} width={12} height={44} rx={5} fill="#20304a" />
				{spin > 0.05 && (
					<ellipse cx={cx} cy={112} rx={150} ry={13} fill="#9fd8ff" opacity={0.3} />
				)}
				<g transform={`translate(${cx} 112) scale(${blade} 1)`}>
					<rect x={-148} y={-6} width={296} height={12} rx={6} fill="#2c3e5c" />
				</g>
				<circle cx={cx} cy={112} r={11} fill="#111c2e" />
			</g>
		);
	};

	return (
		<svg width={760} height={420} viewBox="0 0 760 420">
			{/* Rotor arms */}
			<rect x={70} y={196} width={620} height={16} rx={8} fill="#24344e" />
			<Rotor cx={110} />
			<Rotor cx={650} />
			{/* Fuselage */}
			<ellipse cx={380} cy={252} rx={130} ry={92} fill="#eef4f9" />
			<ellipse cx={380} cy={252} rx={130} ry={92} fill="none" stroke="#b9c9d8" strokeWidth={5} />
			{/* Canopy with pilot silhouette */}
			<path d="M290 232 A 100 74 0 0 1 470 232 L 470 252 L 290 252 Z" fill="#8fd0f0" opacity={0.85} />
			<circle cx={380} cy={224} r={20} fill="#22314a" />
			<rect x={352} y={240} width={56} height={26} rx={12} fill="#22314a" />
			{/* Battery stripe */}
			<rect x={286} y={286} width={188} height={16} rx={8} fill="#39c98e" />
			<text
				x={380}
				y={299}
				textAnchor="middle"
				fontFamily="Arial, sans-serif"
				fontSize={13}
				fontWeight={700}
				fill="#06301e"
				letterSpacing={3}
			>
				ELECTRIC
			</text>
			{/* Landing skids */}
			<path d="M300 344 L300 376 L200 376" stroke="#20304a" strokeWidth={12} fill="none" strokeLinecap="round" />
			<path d="M460 344 L460 376 L560 376" stroke="#20304a" strokeWidth={12} fill="none" strokeLinecap="round" />
		</svg>
	);
};
