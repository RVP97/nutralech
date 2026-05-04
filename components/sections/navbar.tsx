"use client";

import { Menu, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
	{ label: "Inicio", href: "/" },
	{ label: "Planes", href: "/#precios" },
	{ label: "Collabs", href: "/colaboraciones" },
	{ label: "Herramientas", href: "/herramientas" },
	{ label: "Blog", href: "/blog" },
	{ label: "Contacto", href: "/contacto" },
] as const;

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const isActive = (href: string) => {
		if (href.includes("#")) return false;
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	return (
		<div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
			<nav
				className={`w-full max-w-4xl rounded-2xl border transition-all duration-300 ${
					scrolled
						? "border-[oklch(92%_0.005_12)] bg-[oklch(99.5%_0.003_12)]/90 shadow-sm backdrop-blur-xl"
						: "border-transparent bg-[oklch(99.5%_0.003_12)]/70 backdrop-blur-lg"
				}`}
			>
				<div className="flex items-center justify-between h-14 px-5">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 shrink-0">
						<svg aria-hidden="true" viewBox="0 0 49 34" className="h-6 w-6">
							<path
								d="M 4.071 11.084 C 4.071 11.084 2.168 26.266 18.051 26.266 C 18.051 26.266 22.01 11.084 4.071 11.084 Z"
								fill="#DA5F6F"
							/>
							<path
								d="M 44.429 4.722 C 22.823 4.722 20.824 18.311 21.221 25.288 C 24.871 14.76 34.822 12.436 34.822 12.436 C 25.322 18.179 23.374 28.546 23.247 29.278 C 47.374 28.347 44.429 4.722 44.429 4.722 Z"
								fill="#DA5F6F"
							/>
						</svg>
						<span className="text-base font-semibold text-[oklch(22%_0.005_12)]">
							Nutralech
						</span>
					</Link>

					{/* Desktop links */}
					<div className="hidden lg:flex items-center gap-1">
						{links.map((link) => (
							<Link
								key={link.href}
								prefetch={false}
								href={link.href as Route}
								className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-150 ${
									isActive(link.href)
										? "bg-[#DA5F6F]/10 font-medium text-[#DA5F6F]"
										: "text-[oklch(40%_0.005_12)] hover:text-[oklch(22%_0.005_12)]"
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Right side */}
					<div className="flex items-center gap-3">
						<Link
							prefetch={false}
							href="https://wa.me/message/BLYZCVYW2MOAJ1"
							target="_blank"
							rel="noopener noreferrer"
							className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-full bg-[oklch(95%_0.005_12)] px-3.5 text-xs font-medium text-[oklch(35%_0.005_12)] transition-colors duration-150 hover:bg-[#DA5F6F]/10 hover:text-[#DA5F6F]"
							aria-label="WhatsApp"
						>
							<svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
							</svg>
							WhatsApp
						</Link>

						<button
							type="button"
							className="lg:hidden flex h-8 w-8 items-center justify-center rounded-full text-[oklch(40%_0.005_12)] transition-colors duration-150 hover:bg-[oklch(95%_0.005_12)]"
							onClick={() => setOpen(!open)}
							aria-label={open ? "Cerrar menú" : "Abrir menú"}
						>
							{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{open && (
					<div className="lg:hidden border-t border-[oklch(94%_0.005_12)] px-5 py-3">
						<nav className="flex flex-col gap-0.5">
							{links.map((link) => (
								<Link
									key={link.href}
									prefetch={false}
									href={link.href as Route}
									className={`rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
										isActive(link.href)
											? "bg-[#DA5F6F]/10 font-medium text-[#DA5F6F]"
											: "text-[oklch(35%_0.005_12)] hover:bg-[oklch(96%_0.005_12)]"
									}`}
								>
									{link.label}
								</Link>
							))}
							<Link
								prefetch={false}
								href="https://wa.me/message/BLYZCVYW2MOAJ1"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[oklch(35%_0.005_12)] hover:bg-[oklch(96%_0.005_12)]"
							>
								<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
								</svg>
								WhatsApp
							</Link>
						</nav>
					</div>
				)}
			</nav>
		</div>
	);
}
