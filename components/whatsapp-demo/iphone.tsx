"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { BatteryIcon, SignalIcon, WifiIcon } from "./icons";

// iPhone 18 Pro: 2622 × 1206 px @3x → 402 × 874 pt. Everything inside the
// screen is laid out in real iOS points, then the whole device is scaled.
export const SCREEN_W = 402;
export const SCREEN_H = 874;
export const SAFE_TOP = 56;
export const SAFE_BOTTOM = 34;
const SCREEN_RADIUS = 58;
const BEZEL = 12;
const BAND = 5;
const DEVICE_W = SCREEN_W + (BEZEL + BAND) * 2;
const DEVICE_H = SCREEN_H + (BEZEL + BAND) * 2;

const FINISHES = {
	burgundy: {
		band: "linear-gradient(145deg,#8a4a55 0%,#4a1c26 16%,#3a141c 50%,#4a1c26 84%,#94525e 100%)",
		button: "linear-gradient(90deg,#3a141c,#6e3440 60%,#3a141c)",
	},
	silver: {
		band: "linear-gradient(145deg,#f4f4f6 0%,#c9cacf 16%,#b7b8bd 50%,#c9cacf 84%,#f7f7f9 100%)",
		button: "linear-gradient(90deg,#a9aab0,#e2e3e7 60%,#a9aab0)",
	},
	black: {
		band: "linear-gradient(145deg,#6a6a6e 0%,#2c2c2e 16%,#1c1c1e 50%,#2c2c2e 84%,#707074 100%)",
		button: "linear-gradient(90deg,#1c1c1e,#48484c 60%,#1c1c1e)",
	},
} as const;

export const ScaleContext = createContext(1);
export const useScale = () => useContext(ScaleContext);

function StatusBar() {
	const [time, setTime] = useState<string | null>(null);
	useEffect(() => {
		const tick = () => {
			const d = new Date();
			setTime(`${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`);
		};
		tick();
		const id = setInterval(tick, 10_000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="pointer-events-none absolute inset-x-0 top-0 z-[70] flex h-[56px] items-center justify-between pl-[48px] pr-[34px] pt-[4px] text-black">
			<span className="w-[56px] text-center text-[17px] font-semibold tracking-[-0.2px] tabular-nums">
				{time}
			</span>
			<span className="flex items-center gap-[6px]">
				<SignalIcon />
				<WifiIcon />
				<BatteryIcon level={0.82} />
			</span>
		</div>
	);
}

export function IPhone({
	children,
	maxScale = 0.8,
	finish = "burgundy",
}: {
	children: ReactNode;
	maxScale?: number;
	finish?: keyof typeof FINISHES;
}) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(maxScale);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		const ro = new ResizeObserver(([entry]) => {
			setScale(Math.min(maxScale, entry.contentRect.width / DEVICE_W));
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [maxScale]);

	const f = FINISHES[finish];
	const side = (style: React.CSSProperties) => (
		<span
			aria-hidden
			className="absolute w-[5px] rounded-[2px]"
			style={{ background: f.button, ...style }}
		/>
	);

	return (
		<div
			ref={wrapRef}
			className="relative mx-auto w-full select-none"
			style={{ maxWidth: DEVICE_W * maxScale, height: DEVICE_H * scale }}
		>
			<div
				className="absolute left-0 top-0 origin-top-left"
				style={{
					width: DEVICE_W,
					height: DEVICE_H,
					transform: `scale(${scale})`,
				}}
			>
				{side({ left: -3, top: 170, height: 34 })}
				{side({ left: -3, top: 232, height: 64 })}
				{side({ left: -3, top: 310, height: 64 })}
				{side({ right: -3, top: 262, height: 104 })}
				{/* Camera Control */}
				{side({ right: -2, top: 560, height: 58, width: 3, opacity: 0.8 })}

				<div
					className="absolute inset-0"
					style={{
						borderRadius: SCREEN_RADIUS + BEZEL + BAND,
						background: f.band,
						boxShadow:
							"inset 0 0 0 1px rgba(255,255,255,0.22), 0 0 0 1px rgba(0,0,0,0.55), 0 60px 90px -30px rgba(74,28,38,0.45), 0 30px 50px -25px rgba(0,0,0,0.4)",
					}}
				/>
				<div
					className="absolute bg-black"
					style={{
						inset: BAND,
						borderRadius: SCREEN_RADIUS + BEZEL,
						boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.1)",
					}}
				/>
				<div
					data-phone-screen
					className="absolute overflow-hidden bg-white antialiased"
					style={{
						inset: BAND + BEZEL,
						width: SCREEN_W,
						height: SCREEN_H,
						borderRadius: SCREEN_RADIUS,
						isolation: "isolate",
						fontFamily:
							'-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif',
						WebkitMaskImage: "-webkit-radial-gradient(white, black)",
					}}
				>
					<ScaleContext.Provider value={scale}>
						{children}
					</ScaleContext.Provider>
					<StatusBar />
					{/* Dynamic Island — smaller on 18 Pro thanks to under-display Face ID */}
					<div className="pointer-events-none absolute left-1/2 top-[11px] z-[80] flex h-[33px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[11px]">
						<span className="size-[10px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2b3a55,#0b0f18_60%)] shadow-[0_0_0_1.5px_#111]" />
					</div>
					<div className="pointer-events-none absolute bottom-[8px] left-1/2 z-[80] h-[5px] w-[140px] -translate-x-1/2 rounded-full bg-black" />
					<div className="pointer-events-none absolute inset-0 z-[90] bg-[linear-gradient(115deg,rgba(255,255,255,0.07),transparent_38%)]" />
				</div>
			</div>
		</div>
	);
}
