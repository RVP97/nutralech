import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

const navLinks = [
	{ href: "/", label: "Inicio" },
	{ href: "/acerca-de-mi", label: "Acerca de mí" },
	{ href: "/blog", label: "Blog" },
	{ href: "/herramientas", label: "Herramientas" },
	{ href: "/colaboraciones", label: "Colaboraciones" },
	{ href: "/contacto", label: "Contacto" },
	{ href: "/#precios", label: "Planes" },
];

const socialLinks = [
	{ href: "https://www.instagram.com/nutralech/", label: "Instagram", icon: Instagram },
	{ href: "https://www.tiktok.com/@nutralech", label: "TikTok", icon: null },
	{ href: "https://www.facebook.com/nutralech/", label: "Facebook", icon: Facebook },
	{ href: "https://www.youtube.com/@Nutralech", label: "YouTube", icon: Youtube },
];

function TikTokIcon({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
		</svg>
	);
}

export default function Footer() {
	return (
		<footer className="border-t border-[oklch(92%_0.005_12)] bg-[oklch(98.5%_0.005_12)]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div>
						<Link href="/" className="group inline-flex items-center gap-2">
							<svg aria-hidden="true" viewBox="0 0 49 34" className="h-7 w-7">
								<path
									d="M 4.071 11.084 C 4.071 11.084 2.168 26.266 18.051 26.266 C 18.051 26.266 22.01 11.084 4.071 11.084 Z"
									fill="#DA5F6F"
								/>
								<path
									d="M 44.429 4.722 C 22.823 4.722 20.824 18.311 21.221 25.288 C 24.871 14.76 34.822 12.436 34.822 12.436 C 25.322 18.179 23.374 28.546 23.247 29.278 C 47.374 28.347 44.429 4.722 44.429 4.722 Z"
									fill="#DA5F6F"
								/>
							</svg>
							<span className="text-lg font-semibold text-[oklch(22%_0.005_12)]">
								Nutralech
							</span>
						</Link>
						<p className="mt-4 text-sm leading-relaxed text-[oklch(50%_0.01_12)] max-w-xs">
							Nutrición personalizada con Marialy Alonso. Consultas presenciales
							en CDMX y online para todo el mundo.
						</p>
					</div>

					{/* Links */}
					<div>
						<h3 className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)] mb-4">
							Navegación
						</h3>
						<nav className="flex flex-col gap-2.5">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									prefetch={false}
									href={link.href as Route}
									className="text-sm text-[oklch(40%_0.005_12)] transition-colors duration-150 hover:text-[#DA5F6F]"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)] mb-4">
							Contacto
						</h3>
						<div className="flex flex-col gap-3">
							<Link
								prefetch={false}
								href="https://wa.me/message/BLYZCVYW2MOAJ1"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-[oklch(40%_0.005_12)] transition-colors duration-150 hover:text-[#DA5F6F]"
							>
								+52 744 346 8252
							</Link>
							<Link
								prefetch={false}
								href="mailto:contacto@nutralech.com"
								className="inline-flex items-center gap-1.5 text-sm text-[oklch(40%_0.005_12)] transition-colors duration-150 hover:text-[#DA5F6F]"
							>
								<Mail className="h-3.5 w-3.5" />
								contacto@nutralech.com
							</Link>
						</div>
					</div>

					{/* Social */}
					<div>
						<h3 className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)] mb-4">
							Redes sociales
						</h3>
						<div className="flex gap-4">
							{socialLinks.map((social) => (
								<Link
									key={social.label}
									prefetch={false}
									target="_blank"
									rel="noopener noreferrer"
									href={social.href as Route}
									className="text-[oklch(55%_0.005_12)] transition-colors duration-150 hover:text-[#DA5F6F]"
									aria-label={social.label}
								>
									{social.icon ? (
										<social.icon className="h-5 w-5" />
									) : (
										<TikTokIcon className="h-5 w-5" />
									)}
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className="mt-14 border-t border-[oklch(92%_0.005_12)] pt-6 text-center text-xs text-[oklch(62%_0.005_12)]">
					Nutralech © {new Date().getFullYear()}
				</div>
			</div>
		</footer>
	);
}
