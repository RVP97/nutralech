"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

// Liquid Glass: translucent, saturated blur with a specular top rim and a soft
// contact shadow. Content keeps its color underneath instead of being hidden.
export const GLASS =
	"bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.5))] backdrop-blur-[16px] backdrop-saturate-[180%] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.35),0_0_0_0.5px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.10)]";

export const GLASS_STRONG =
	"bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(250,250,250,0.72))] backdrop-blur-[24px] backdrop-saturate-[190%] shadow-[inset_0_1px_0.5px_rgba(255,255,255,1),0_0_0_0.5px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.16)]";

export const FLUID = {
	type: "spring",
	stiffness: 520,
	damping: 34,
	mass: 0.8,
} as const;

/** Glass control that swells slightly under the finger, like iOS 26. */
export function GlassButton({
	className = "",
	children,
	...props
}: HTMLMotionProps<"button">) {
	return (
		<motion.button
			type="button"
			whileTap={{ scale: 1.1 }}
			transition={FLUID}
			className={`${GLASS} flex items-center justify-center text-black ${className}`}
			{...props}
		>
			{children}
		</motion.button>
	);
}
