"use client";

import { ArrowBigUp, Delete, Mic, Smile } from "lucide-react";
import { type PointerEvent, useState } from "react";

const ABC = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
	["z", "x", "c", "v", "b", "n", "m"],
];
const NUM = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
	["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'],
	[".", ",", "¿", "?", "!", "'", "¡"],
];

export const KEYBOARD_H = 336;

interface Props {
	/** Key currently held on the physical keyboard, lower-cased. */
	pressed: string | null;
	autoShift: boolean;
	suggestions: string[];
	onInsert: (text: string) => void;
	onBackspace: () => void;
	onEnter: () => void;
	onSuggestion: (word: string) => void;
}

// Keeps focus in the composer so the keyboard doesn't dismiss itself.
const keep = (e: PointerEvent) => e.preventDefault();

export function IOSKeyboard({
	pressed,
	autoShift,
	suggestions,
	onInsert,
	onBackspace,
	onEnter,
	onSuggestion,
}: Props) {
	const [layer, setLayer] = useState<"abc" | "123">("abc");
	const [shift, setShift] = useState<"off" | "once" | "lock">("off");
	const [down, setDown] = useState<string | null>(null);
	const upper = layer === "abc" && (shift !== "off" || autoShift);
	const rows = layer === "abc" ? ABC : NUM;
	const active = down ?? pressed;

	const tap = (k: string) => {
		onInsert(upper ? k.toUpperCase() : k);
		if (shift === "once") setShift("off");
	};

	const press = (id: string, fn: () => void) => ({
		onPointerDown: (e: PointerEvent) => {
			keep(e);
			setDown(id);
			fn();
		},
		onPointerUp: () => setDown(null),
		onPointerLeave: () => setDown(null),
	});

	const letter = (k: string, i: number, row: string[]) => {
		const on = active === k;
		const edge = i === 0 ? "left" : i === row.length - 1 ? "right" : "mid";
		return (
			<button
				type="button"
				key={k}
				tabIndex={-1}
				aria-label={k}
				{...press(k, () => tap(k))}
				className="relative h-[42px] w-[34.2px] shrink-0 rounded-[8px] bg-white text-[23px] leading-none text-black shadow-[0_1px_0_rgba(0,0,0,0.3)]"
			>
				{upper ? k.toUpperCase() : k}
				{on && (
					<span
						className="pointer-events-none absolute bottom-0 z-10 flex h-[102px] flex-col items-center drop-shadow-[0_0_1px_rgba(0,0,0,0.35)]"
						style={{
							left: edge === "left" ? -2 : edge === "right" ? -22 : -12,
							width: 58,
						}}
					>
						<span className="flex h-[58px] w-full items-center justify-center rounded-[9px] bg-white text-[38px] font-light">
							{upper ? k.toUpperCase() : k}
						</span>
						<span
							className="-mt-[6px] h-[50px] w-[34.2px] rounded-b-[5px] bg-white"
							style={{
								marginLeft: edge === "left" ? -22 : edge === "right" ? 22 : 0,
							}}
						/>
					</span>
				)}
			</button>
		);
	};

	const special =
		"flex h-[42px] items-center justify-center rounded-[8px] text-black shadow-[0_1px_0_rgba(0,0,0,0.3)] transition-colors duration-75";
	const tone = (id: string) => (active === id ? "bg-white" : "bg-[#ABB0BA]");

	return (
		<div
			className="relative rounded-t-[30px] bg-[linear-gradient(180deg,rgba(214,217,223,0.82),rgba(208,211,218,0.92))] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.9),0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-[24px] backdrop-saturate-[180%]"
			style={{ height: KEYBOARD_H }}
		>
			{/* QuickType bar */}
			<div className="flex h-[44px] items-center px-[10px] pt-[4px] text-[17px] text-black">
				{suggestions.slice(0, 3).map((s, i) => (
					<button
						type="button"
						tabIndex={-1}
						key={`${s}-${i}`}
						onPointerDown={(e) => {
							keep(e);
							onSuggestion(s.replace(/[“”]/g, ""));
						}}
						className="relative flex h-full flex-1 items-center justify-center truncate px-2 active:rounded-[6px] active:bg-white/60"
					>
						{s}
						{i < 2 && (
							<span className="absolute right-0 top-1/2 h-[22px] w-px -translate-y-1/2 bg-[#B3B6BE]" />
						)}
					</button>
				))}
			</div>

			<div className="flex flex-col gap-[12px] px-[3px] pt-[6px]">
				<div className="flex justify-between">
					{rows[0].map((k, i) => letter(k, i, rows[0]))}
				</div>
				<div className="flex justify-between">
					{rows[1].map((k, i) => letter(k, i, rows[1]))}
				</div>
				<div className="flex items-center justify-between">
					<button
						type="button"
						tabIndex={-1}
						aria-label="Mayúsculas"
						onPointerDown={(e) => {
							keep(e);
							if (layer === "123") return;
							setShift((s) =>
								s === "off"
									? autoShift
										? "off"
										: "once"
									: s === "once"
										? "lock"
										: "off",
							);
						}}
						className={`${special} w-[44px] ${
							upper || active === "shift" ? "bg-white" : "bg-[#ABB0BA]"
						}`}
					>
						{layer === "abc" ? (
							<ArrowBigUp
								className="size-[22px]"
								strokeWidth={1.6}
								fill={upper ? "currentColor" : "none"}
							/>
						) : (
							<span className="text-[15px]">#+=</span>
						)}
					</button>
					<div className="flex gap-[6px]">
						{rows[2].map((k, i) => letter(k, i, rows[2]))}
					</div>
					<button
						type="button"
						tabIndex={-1}
						aria-label="Borrar"
						{...press("backspace", onBackspace)}
						className={`${special} w-[44px] ${tone("backspace")}`}
					>
						<Delete className="size-[22px]" strokeWidth={1.6} />
					</button>
				</div>
				<div className="flex gap-[6px]">
					<button
						type="button"
						tabIndex={-1}
						onPointerDown={(e) => {
							keep(e);
							setLayer((l) => (l === "abc" ? "123" : "abc"));
						}}
						className={`${special} w-[92px] bg-[#ABB0BA] text-[16px]`}
					>
						{layer === "abc" ? "123" : "ABC"}
					</button>
					<button
						type="button"
						tabIndex={-1}
						{...press(" ", () => onInsert(" "))}
						className={`${special} flex-1 text-[16px] ${
							active === " " ? "bg-[#ABB0BA]" : "bg-white"
						}`}
					>
						espacio
					</button>
					<button
						type="button"
						tabIndex={-1}
						{...press("enter", onEnter)}
						className={`${special} w-[92px] text-[16px] ${tone("enter")}`}
					>
						intro
					</button>
				</div>
			</div>

			<div className="flex items-start justify-between px-[22px] pt-[14px] text-[#50555C]">
				<button
					type="button"
					tabIndex={-1}
					aria-label="Emoji"
					onPointerDown={(e) => {
						keep(e);
						onInsert("😊");
					}}
				>
					<Smile className="size-[27px]" strokeWidth={1.5} />
				</button>
				<Mic className="size-[25px]" strokeWidth={1.5} aria-hidden />
			</div>
		</div>
	);
}
