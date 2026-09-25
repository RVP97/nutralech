import type { SVGProps } from "react";
import type { Tick } from "./data";

type P = SVGProps<SVGSVGElement>;

/** Delivery state glyph: clock → ✓ → ✓✓ → blue ✓✓. */
export function TickIcon({ status, ...props }: P & { status: Tick }) {
	if (status === "pending") {
		return (
			<svg
				viewBox="0 0 16 16"
				width={14}
				height={14}
				aria-hidden="true"
				{...props}
			>
				<circle
					cx="8"
					cy="8"
					r="5.6"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.3"
				/>
				<path
					d="M8 5v3.2l2 1.3"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.3"
					strokeLinecap="round"
				/>
			</svg>
		);
	}
	const color = status === "read" ? "#53BDEB" : "currentColor";
	return (
		<svg
			viewBox="0 0 18 12"
			width={17}
			height={11}
			aria-hidden="true"
			fill="none"
			stroke={color}
			strokeWidth="1.55"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			{status === "sent" ? (
				<path d="M3.5 6.4 6.6 9.3 12.8 2.4" />
			) : (
				<>
					<path d="M1.2 6.4 4.3 9.3 10.5 2.4" />
					<path d="M7.6 8.6l.8.7 6.2-6.9" />
				</>
			)}
		</svg>
	);
}

export function Tail({ side, color }: { side: "in" | "out"; color: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 11 17"
			width={11}
			height={17}
			className="absolute bottom-0"
			style={
				side === "out"
					? { right: -6.5 }
					: { left: -6.5, transform: "scaleX(-1)" }
			}
		>
			<path
				d="M0 0v10.8C0 13.3.9 15 3 16.2c2.2 1.2 5.5.9 7.8 0C6.3 14.7 5 12.5 5 6.5V0Z"
				fill={color}
			/>
		</svg>
	);
}

export function SendIcon(props: P) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={20}
			height={20}
			aria-hidden="true"
			{...props}
		>
			<path
				fill="currentColor"
				d="M4.6 3.3c-.9-.4-1.9.4-1.6 1.4l1.9 6.2c.1.4.5.6.9.6l7.2.5-7.2.5c-.4 0-.8.3-.9.6L3 19.3c-.3 1 .7 1.8 1.6 1.4l15.9-7.6c.9-.4.9-1.7 0-2.1Z"
			/>
		</svg>
	);
}

export function StickerIcon(props: P) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={22}
			height={22}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M20.5 12.3V8a4.5 4.5 0 0 0-4.5-4.5H8A4.5 4.5 0 0 0 3.5 8v8A4.5 4.5 0 0 0 8 20.5h4.3a3 3 0 0 0 2.1-.9l5.2-5.2a3 3 0 0 0 .9-2.1Z" />
			<path d="M20.4 13.2h-3.9a3.3 3.3 0 0 0-3.3 3.3v3.9" />
			<circle cx="9" cy="10" r=".6" fill="currentColor" />
			<circle cx="14.5" cy="10" r=".6" fill="currentColor" />
		</svg>
	);
}

export function DefaultAvatar({
	size,
	group,
}: {
	size: number;
	group?: boolean;
}) {
	return (
		<svg
			viewBox="0 0 40 40"
			width={size}
			height={size}
			aria-hidden="true"
			className="shrink-0 rounded-full"
		>
			<rect width="40" height="40" fill="#DFE5E7" />
			{group ? (
				<g fill="#FFFFFF">
					<circle cx="15" cy="15.5" r="5" />
					<path d="M5.5 31c.6-5.3 4.3-8.6 9.5-8.6s8.9 3.3 9.5 8.6Z" />
					<circle cx="26.5" cy="17" r="4.2" opacity=".9" />
					<path
						d="M26.5 23.3c4.3 0 7.4 2.8 8 7.7h-8.2c-.3-3-1.5-5.4-3.4-7.1 1-.4 2.2-.6 3.6-.6Z"
						opacity=".9"
					/>
				</g>
			) : (
				<g fill="#FFFFFF">
					<circle cx="20" cy="15.5" r="6.6" />
					<path d="M6.5 36c.9-7.3 6.2-11.6 13.5-11.6S32.6 28.7 33.5 36Z" />
				</g>
			)}
		</svg>
	);
}

/** Generic chat-app glyph for notification banners. */
export function AppGlyph() {
	return (
		<span className="flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-b from-[#5BE584] to-[#20B84D] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)]">
			<svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
				<path
					fill="#fff"
					d="M12 3.2a8.6 8.6 0 0 0-7.4 13l-1.2 4.4 4.5-1.2A8.6 8.6 0 1 0 12 3.2Z"
				/>
				<path
					fill="#20B84D"
					d="M9.3 7.9c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5 0l.6-.7c.2-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.3.1.3 0 1-.3 1.4-.4.4-1.1.8-1.8.7-2.6-.3-5.4-3.1-5.7-5.7-.1-.8.3-1.5.8-1.9.2-.2.5-.3.7-.3Z"
				/>
			</svg>
		</span>
	);
}

export function SignalIcon() {
	return (
		<svg viewBox="0 0 18 12" width={18} height={12} aria-hidden="true">
			<rect x="0" y="7.5" width="3" height="4.5" rx="0.8" fill="currentColor" />
			<rect x="5" y="5" width="3" height="7" rx="0.8" fill="currentColor" />
			<rect
				x="10"
				y="2.5"
				width="3"
				height="9.5"
				rx="0.8"
				fill="currentColor"
			/>
			<rect x="15" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
		</svg>
	);
}

export function WifiIcon() {
	return (
		<svg viewBox="0 0 17 12" width={17} height={12} aria-hidden="true">
			<path
				fill="currentColor"
				d="M8.5 2.3c2.4 0 4.6.9 6.3 2.5.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4A11 11 0 0 0 8.5 0 11 11 0 0 0 .6 3.2c-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0a9 9 0 0 1 6.3-2.5Zm0 3.8c1.3 0 2.6.5 3.6 1.4.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4a7.4 7.4 0 0 0-10.4 0c-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0 1-.9 2.3-1.4 3.6-1.4Zm2.3 2.7c.1-.1.1-.3 0-.4a3.5 3.5 0 0 0-4.6 0c-.1.1-.1.3 0 .4l2.1 2.1c.1.1.3.1.4 0Z"
			/>
		</svg>
	);
}

export function BatteryIcon({ level = 0.8 }: { level?: number }) {
	return (
		<svg viewBox="0 0 28 13" width={27} height={13} aria-hidden="true">
			<rect
				x="0.5"
				y="0.5"
				width="24"
				height="12"
				rx="3.8"
				fill="none"
				stroke="currentColor"
				opacity="0.35"
			/>
			<rect
				x="2"
				y="2"
				width={21 * level}
				height="9"
				rx="2.5"
				fill="currentColor"
			/>
			<path
				d="M26 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1S26.8 4.7 26 4.4Z"
				fill="currentColor"
				opacity="0.4"
			/>
		</svg>
	);
}
