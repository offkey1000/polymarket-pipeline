import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Series,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {EVTOL} from './EVTOL';
import {Landscape} from './Landscape';

const INTRO = 130;
const INNOVATOR = 110;
const STARTUP = 100;
const VEHICLE = 210;
const TECH = 120;
const VIRAL = 130;
const OUTRO = 100;

export const TOTAL_DURATION =
	INTRO + INNOVATOR + STARTUP + VEHICLE + TECH + VIRAL + OUTRO;

const FONT = "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Fades the whole scene in over 15 frames and out over its last 15.
const Fade: React.FC<{duration: number; children: React.ReactNode}> = ({
	duration,
	children,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[0, 15, duration - 15, duration],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

const SlideUp: React.FC<{
	delay?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({delay = 0, children, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
	return (
		<div
			style={{
				opacity: progress,
				transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`,
				...style,
			}}
		>
			{children}
		</div>
	);
};

const Center: React.FC<{children: React.ReactNode}> = ({children}) => (
	<AbsoluteFill
		style={{
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			fontFamily: FONT,
			textAlign: 'center',
		}}
	>
		{children}
	</AbsoluteFill>
);

const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div style={{fontSize: 34, letterSpacing: 14, color: '#ffd9a0', fontWeight: 600}}>
		{children}
	</div>
);

// ── Scene 1: the place ────────────────────────────────────────────────
const IntroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const sunrise = interpolate(frame, [0, 100], [0, 1], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	return (
		<Fade duration={INTRO}>
			<Landscape sunrise={sunrise} />
			<Center>
				<SlideUp delay={20}>
					<Kicker>KAFLIKHAN VILLAGE</Kicker>
				</SlideUp>
				<SlideUp delay={32}>
					<div style={{fontSize: 96, fontWeight: 800, color: '#fff', marginTop: 18}}>
						Almora · Uttarakhand
					</div>
				</SlideUp>
				<SlideUp delay={50}>
					<div style={{fontSize: 36, color: '#e8e3ff', marginTop: 22, opacity: 0.85}}>
						High in the Indian Himalaya, a story takes off
					</div>
				</SlideUp>
			</Center>
		</Fade>
	);
};

// ── Scene 2: the innovator ────────────────────────────────────────────
const InnovatorScene: React.FC = () => {
	const frame = useCurrentFrame();
	const line = interpolate(frame, [24, 55], [0, 560], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	return (
		<Fade duration={INNOVATOR}>
			<AbsoluteFill style={{background: 'linear-gradient(160deg, #101c38, #1d1030)'}} />
			<Center>
				<SlideUp>
					<Kicker>MEET THE INNOVATOR</Kicker>
				</SlideUp>
				<SlideUp delay={12}>
					<div style={{fontSize: 150, fontWeight: 900, color: '#fff', marginTop: 14}}>
						RAVI TAMTA
					</div>
				</SlideUp>
				<div style={{height: 6, width: line, background: '#39c98e', borderRadius: 3, marginTop: 10}} />
				<SlideUp delay={40}>
					<div style={{fontSize: 38, color: '#bcd0e8', marginTop: 26}}>
						An engineer with his eyes on the sky
					</div>
				</SlideUp>
			</Center>
		</Fade>
	);
};

// ── Scene 3: the startup ──────────────────────────────────────────────
const StartupScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const pop = spring({frame: frame - 8, fps, config: {damping: 12, mass: 0.7}});
	return (
		<Fade duration={STARTUP}>
			<AbsoluteFill style={{background: 'linear-gradient(180deg, #0e2a4a, #123c5e)'}} />
			<Center>
				<div
					style={{
						transform: `scale(${pop})`,
						border: '4px solid #6fd8ff',
						borderRadius: 32,
						padding: '48px 90px',
						background: 'rgba(10, 30, 55, 0.6)',
					}}
				>
					<div style={{fontSize: 40, letterSpacing: 12, color: '#6fd8ff', fontWeight: 600}}>
						HIS STARTUP
					</div>
					<div style={{fontSize: 130, fontWeight: 900, color: '#fff', marginTop: 8}}>
						HAPIDA SKY
					</div>
				</div>
				<SlideUp delay={35}>
					<div style={{fontSize: 36, color: '#cfe6f5', marginTop: 40}}>
						Building personal flight, from the ground up
					</div>
				</SlideUp>
			</Center>
		</Fade>
	);
};

// ── Scene 4: the machine takes off ────────────────────────────────────
const VehicleScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Rotors spool up first, then liftoff at ~frame 55.
	const spin = interpolate(frame, [10, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lift = spring({frame: frame - 55, fps, durationInFrames: 90, config: {damping: 200}});
	const hover = Math.sin(frame / 11) * 10 * lift;
	const y = interpolate(lift, [0, 1], [0, -180]) + hover;
	const tilt = Math.sin(frame / 23) * 2 * lift;
	const dust = interpolate(frame, [55, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<Fade duration={VEHICLE}>
			<AbsoluteFill
				style={{background: 'linear-gradient(180deg, #7fc2ea 0%, #bfe0f2 62%, #8a9b6e 62.5%, #6d7f55 100%)'}}
			/>
			{/* Dust kicked up at liftoff */}
			{dust > 0 && dust < 1 && (
				<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center'}}>
					<svg width={900} height={200} style={{marginBottom: 220}}>
						{[0, 1, 2, 3, 4].map((i) => (
							<ellipse
								key={i}
								cx={450 + (i - 2) * 150 * dust}
								cy={160}
								rx={60 + 90 * dust}
								ry={16 + 14 * dust}
								fill="#cbb896"
								opacity={0.5 * (1 - dust)}
							/>
						))}
					</svg>
				</AbsoluteFill>
			)}
			<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center'}}>
				<div
					style={{
						transform: `translateY(${y}px) rotate(${tilt}deg)`,
						marginBottom: 170,
					}}
				>
					<EVTOL spin={spin} />
				</div>
			</AbsoluteFill>
			<AbsoluteFill style={{fontFamily: FONT, alignItems: 'center'}}>
				<SlideUp delay={70} style={{marginTop: 90, textAlign: 'center'}}>
					<div style={{fontSize: 44, letterSpacing: 10, color: '#0e2a4a', fontWeight: 700}}>
						THE PROTOTYPE
					</div>
					<div
						style={{
							fontSize: 120,
							fontWeight: 900,
							color: '#0b1b3f',
							textShadow: '0 4px 24px rgba(255,255,255,0.5)',
						}}
					>
						HAPIDA SKYNeX
					</div>
				</SlideUp>
				<SlideUp delay={110} style={{position: 'absolute', bottom: 70}}>
					<div
						style={{
							display: 'flex',
							gap: 24,
							fontSize: 32,
							fontWeight: 700,
						}}
					>
						{['SINGLE-SEATER', 'ELECTRIC', 'TEST-FLOWN'].map((tag) => (
							<div
								key={tag}
								style={{
									background: '#0e2a4a',
									color: '#8fe6c0',
									padding: '12px 30px',
									borderRadius: 999,
								}}
							>
								{tag}
							</div>
						))}
					</div>
				</SlideUp>
			</AbsoluteFill>
		</Fade>
	);
};

// ── Scene 5: the technology ───────────────────────────────────────────
const TechScene: React.FC = () => {
	const frame = useCurrentFrame();
	const sweep = interpolate(frame, [15, 80], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.quad),
	});
	return (
		<Fade duration={TECH}>
			<AbsoluteFill style={{background: '#0a1626'}} />
			{/* Blueprint grid */}
			<svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}} width="100%" height="100%">
				{Array.from({length: 25}).map((_, i) => (
					<line key={`v${i}`} x1={i * 80} y1={0} x2={i * 80} y2={1080} stroke="#1c3a5e" strokeWidth={1} />
				))}
				{Array.from({length: 15}).map((_, i) => (
					<line key={`h${i}`} x1={0} y1={i * 80} x2={1920} y2={i * 80} stroke="#1c3a5e" strokeWidth={1} />
				))}
				<line
					x1={sweep * 1920}
					y1={0}
					x2={sweep * 1920}
					y2={1080}
					stroke="#39c98e"
					strokeWidth={3}
					opacity={0.8}
				/>
			</svg>
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 90, fontFamily: FONT}}>
				<div style={{opacity: 0.9, transform: 'scale(0.9)'}}>
					<EVTOL spin={0.4} />
				</div>
				<div style={{maxWidth: 640}}>
					<SlideUp delay={20}>
						<div style={{fontSize: 36, letterSpacing: 10, color: '#39c98e', fontWeight: 700}}>
							UNDER THE HOOD
						</div>
					</SlideUp>
					<SlideUp delay={32}>
						<div style={{fontSize: 74, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginTop: 16}}>
							Built on modified drone technology
						</div>
					</SlideUp>
					<SlideUp delay={55}>
						<div style={{fontSize: 32, color: '#9fc3e0', marginTop: 24}}>
							Multirotor flight, scaled up to carry a person
						</div>
					</SlideUp>
				</div>
			</AbsoluteFill>
		</Fade>
	);
};

// ── Scene 6: going viral ──────────────────────────────────────────────
const ViralScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const phone = spring({frame: frame - 6, fps, config: {damping: 14}});
	const hearts = Array.from({length: 9});
	return (
		<Fade duration={VIRAL}>
			<AbsoluteFill style={{background: 'linear-gradient(150deg, #23103f, #0f1c3a)'}} />
			<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 110, fontFamily: FONT}}>
				{/* Phone playing the flight video */}
				<div style={{transform: `scale(${phone})`, position: 'relative'}}>
					<div
						style={{
							width: 340,
							height: 660,
							borderRadius: 48,
							border: '10px solid #3a4a68',
							background: 'linear-gradient(180deg, #7fc2ea 60%, #6d7f55 60%)',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: 100,
								top: 200 - Math.sin(frame / 12) * 8,
								transform: 'scale(0.22)',
								transformOrigin: 'top left',
							}}
						>
							<EVTOL spin={1} />
						</div>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									width: 0,
									height: 0,
									borderLeft: '46px solid rgba(255,255,255,0.9)',
									borderTop: '28px solid transparent',
									borderBottom: '28px solid transparent',
									marginLeft: 10,
									transform: `scale(${1 + Math.sin(frame / 8) * 0.06})`,
								}}
							/>
						</div>
						<div
							style={{
								position: 'absolute',
								bottom: 24,
								left: 24,
								color: '#fff',
								fontSize: 22,
								fontWeight: 700,
								textShadow: '0 2px 8px rgba(0,0,0,0.6)',
							}}
						>
							▶ first flight · Almora
						</div>
					</div>
					{/* Floating reactions */}
					{hearts.map((_, i) => {
						const t = (frame - i * 9) / 45;
						if (t < 0 || t > 1) return null;
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									right: -20 - (i % 3) * 34,
									bottom: 80 + t * 420,
									fontSize: 44,
									opacity: 1 - t,
								}}
							>
								{['❤️', '🚁', '🔁', '👏'][i % 4]}
							</div>
						);
					})}
				</div>
				<div style={{maxWidth: 640}}>
					<SlideUp delay={18}>
						<div style={{fontSize: 36, letterSpacing: 10, color: '#ff8fb2', fontWeight: 700}}>
							THE INTERNET NOTICES
						</div>
					</SlideUp>
					<SlideUp delay={30}>
						<div style={{fontSize: 72, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginTop: 16}}>
							First-flight videos spread across social media
						</div>
					</SlideUp>
				</div>
			</AbsoluteFill>
		</Fade>
	);
};

// ── Scene 7: outro ────────────────────────────────────────────────────
const OutroScene: React.FC = () => {
	return (
		<Fade duration={OUTRO}>
			<Landscape sunrise={1} />
			<AbsoluteFill style={{background: 'rgba(8, 12, 34, 0.45)'}} />
			<Center>
				<SlideUp>
					<div style={{fontSize: 76, fontWeight: 800, color: '#fff', maxWidth: 1300, lineHeight: 1.2}}>
						From a village in the hills — to the sky.
					</div>
				</SlideUp>
				<SlideUp delay={26}>
					<div style={{fontSize: 36, color: '#ffd9a0', marginTop: 34, letterSpacing: 6}}>
						RAVI TAMTA · HAPIDA SKY · HAPIDA SKYNeX
					</div>
				</SlideUp>
			</Center>
		</Fade>
	);
};

export const SkyNexVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#0a1626'}}>
			<Series>
				<Series.Sequence durationInFrames={INTRO}>
					<IntroScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={INNOVATOR}>
					<InnovatorScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={STARTUP}>
					<StartupScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={VEHICLE}>
					<VehicleScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={TECH}>
					<TechScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={VIRAL}>
					<ViralScene />
				</Series.Sequence>
				<Series.Sequence durationInFrames={OUTRO}>
					<OutroScene />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
