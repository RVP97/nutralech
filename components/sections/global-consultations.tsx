"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const locations = [
	{ city: "CDMX", country: "México", timezone: "CST", flag: "🇲🇽", offset: -6 },
	{ city: "Nueva York", country: "Estados Unidos", timezone: "EST", flag: "🇺🇸", offset: -5 },
	{ city: "Bogotá", country: "Colombia", timezone: "COT", flag: "🇨🇴", offset: -5 },
	{ city: "Buenos Aires", country: "Argentina", timezone: "ART", flag: "🇦🇷", offset: -3 },
	{ city: "Londres", country: "Reino Unido", timezone: "GMT", flag: "🇬🇧", offset: 0 },
	{ city: "Tokio", country: "Japón", timezone: "JST", flag: "🇯🇵", offset: 9 },
];

export default function GlobalConsultations() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % locations.length);
			setCurrentTime(new Date());
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const getLocalTime = (offset: number) => {
		const utcMs = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
		return new Date(utcMs + offset * 3600000).toLocaleTimeString("es-ES", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const isDaytime = (offset: number) => {
		const utcMs = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
		const hour = new Date(utcMs + offset * 3600000).getHours();
		return hour >= 6 && hour < 18;
	};

	const active = locations[activeIndex];

	return (
		<section className="py-24 bg-white overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
					{/* Left: copy */}
					<div>
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							6 continentes
						</p>
						<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							Tu zona horaria, tu consulta
						</h2>
						<p className="mt-6 text-lg leading-relaxed text-[oklch(45%_0.01_12)] max-w-md">
							Consultas por videollamada adaptadas a tu horario, con
							seguimiento por WhatsApp entre sesiones. No importa si estás en
							México, Argentina o Japón.
						</p>

						<Link
							prefetch={false}
							href="#precios"
							className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#DA5F6F] px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5F6F]"
						>
							Agenda tu consulta
						</Link>
					</div>

					{/* Right: timezone display */}
					<div className="space-y-3">
						{/* Featured location card */}
						<AnimatePresence mode="wait">
							<motion.div
								key={active.city}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
								className="rounded-2xl bg-[oklch(97%_0.01_12)] p-8"
							>
								<div className="flex items-start justify-between">
									<div>
										<span className="text-3xl">{active.flag}</span>
										<h3 className="mt-3 text-2xl font-medium text-[oklch(18%_0.005_12)]">
											{active.city}
										</h3>
										<p className="mt-1 text-sm text-[oklch(50%_0.01_12)]">
											{active.country}
										</p>
									</div>
									<div className="text-right">
										<span className="block text-3xl font-medium tabular-nums text-[oklch(18%_0.005_12)]">
											{getLocalTime(active.offset)}
										</span>
										<span className="mt-1 inline-flex items-center gap-1.5 text-xs text-[oklch(55%_0.01_12)]">
											{isDaytime(active.offset) ? (
												<>
													<Sun className="h-3.5 w-3.5 text-[oklch(75%_0.15_85)]" />
													Horario disponible
												</>
											) : (
												<>
													<Moon className="h-3.5 w-3.5 text-[oklch(55%_0.1_260)]" />
													Agendamos para mañana
												</>
											)}
										</span>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>

						{/* All locations row */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
							{locations.map((loc, i) => (
								<button
									key={loc.city}
									type="button"
									onClick={() => setActiveIndex(i)}
									className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors duration-200 ${
										i === activeIndex
											? "bg-[#DA5F6F] text-white"
											: "bg-[oklch(97%_0.005_12)] text-[oklch(35%_0.005_12)] hover:bg-[oklch(94%_0.01_12)]"
									}`}
								>
									<span className="flex items-center gap-2 text-sm">
										<span>{loc.flag}</span>
										<span className="font-medium">{loc.city}</span>
									</span>
									<span className={`text-xs tabular-nums ${
										i === activeIndex
											? "text-white/80"
											: "text-[oklch(60%_0.005_12)]"
									}`}>
										{getLocalTime(loc.offset)}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
