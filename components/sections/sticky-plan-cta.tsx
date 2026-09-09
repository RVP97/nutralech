"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyPlanCta() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const pricing = document.getElementById("precios");
			if (!pricing) {
				setVisible(window.scrollY > 480);
				return;
			}
			const rect = pricing.getBoundingClientRect();
			const pastHero = window.scrollY > 420;
			const pricingInView = rect.top < window.innerHeight && rect.bottom > 80;
			setVisible(pastHero && !pricingInView);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	if (!visible) return null;

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[oklch(92%_0.005_12)] bg-white/95 p-3 backdrop-blur-md sm:hidden">
			<Link
				prefetch={false}
				href="/#precios"
				className="flex h-12 w-full items-center justify-center rounded-full bg-[#DA5F6F] text-sm font-medium text-white"
			>
				Plan a distancia desde $1,200 MXN
			</Link>
		</div>
	);
}
