"use client";

import { motion } from "framer-motion";
import {
	Archive,
	AtSign,
	Bell,
	BellOff,
	Camera,
	ChevronLeft,
	ChevronRight,
	CircleDashed,
	Clock,
	Globe,
	Info,
	Key,
	Lock,
	Mail,
	MessageCircle,
	Mic,
	MoreHorizontal,
	Phone,
	PhoneIncoming,
	PhoneMissed,
	PhoneOutgoing,
	Pin,
	Plus,
	QrCode,
	Search,
	Settings,
	Star,
	Users,
	Video,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Avatar } from "./chat-view";
import { type Chat, previewOf } from "./data";
import { FLUID, GLASS, GlassButton } from "./glass";
import { DefaultAvatar, TickIcon } from "./icons";
import { SAFE_TOP } from "./iphone";

export const TAB_H = 64 + 22;
const BAR_H = SAFE_TOP + 44;

export type TabId = "updates" | "calls" | "communities" | "chats" | "settings";
export type Filter = "all" | "unread" | "favorites" | "groups";

/** iOS large-title screen: the big title scrolls away and a compact one fades in. */
function LargeTitle({
	title,
	left,
	right,
	children,
	bg = "bg-white",
}: {
	title: string;
	left?: ReactNode;
	right?: ReactNode;
	children: ReactNode;
	bg?: string;
}) {
	const [scrolled, setScrolled] = useState(false);
	return (
		<div className={`absolute inset-0 ${bg}`}>
			{/* Scroll-edge effect: content softly blurs out under the floating controls */}
			<div
				aria-hidden="true"
				className={`pointer-events-none absolute inset-x-0 top-0 z-10 backdrop-blur-[10px] transition-opacity duration-300 ${
					scrolled ? "opacity-100" : "opacity-0"
				}`}
				style={{
					height: BAR_H + 18,
					background:
						"linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.5) 70%,transparent)",
					WebkitMaskImage: "linear-gradient(180deg,#000 65%,transparent)",
					maskImage: "linear-gradient(180deg,#000 65%,transparent)",
				}}
			/>
			<div
				className="absolute inset-x-0 top-0 z-20 flex items-end px-[16px] pb-[2px]"
				style={{ height: BAR_H + 4 }}
			>
				<span className="flex flex-1 items-center">{left}</span>
				<motion.span
					animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 6 }}
					transition={FLUID}
					className="mb-[10px] text-[17px] font-semibold"
				>
					{title}
				</motion.span>
				<span className="flex flex-1 items-center justify-end gap-[10px]">
					{right}
				</span>
			</div>
			<div
				className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				style={{ paddingTop: BAR_H + 8, paddingBottom: TAB_H + 12 }}
				onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 36)}
			>
				<h1 className="px-[16px] pb-[8px] text-[34px] font-bold leading-[41px] tracking-[0.3px] text-black">
					{title}
				</h1>
				{children}
			</div>
		</div>
	);
}

const circleBtn = `${GLASS} flex size-[40px] items-center justify-center rounded-full text-black`;
const plusBtn =
	"flex size-[40px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),0_6px_16px_rgba(37,211,102,0.35)]";

function SearchField({
	value,
	onChange,
	placeholder = "Buscar",
}: {
	value?: string;
	onChange?: (v: string) => void;
	placeholder?: string;
}) {
	return (
		<label className="mx-[16px] mb-[10px] flex h-[36px] items-center gap-[6px] rounded-full bg-[#767680]/[0.12] px-[12px] text-[#8E8E93]">
			<Search className="size-[18px]" strokeWidth={2} />
			<input
				value={value ?? ""}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder}
				aria-label={placeholder}
				className="h-full w-full bg-transparent text-[17px] text-black outline-none placeholder:text-[#8E8E93]"
			/>
		</label>
	);
}

function rowTime(c: Chat) {
	const m = c.messages[c.messages.length - 1];
	if (!m) return "";
	return m.day ?? m.time;
}

function ChatRow({ chat, onOpen }: { chat: Chat; onOpen: () => void }) {
	const m = chat.messages[chat.messages.length - 1];
	const unread = chat.unread > 0;
	return (
		<motion.button
			layout
			transition={{ type: "spring", stiffness: 500, damping: 45 }}
			type="button"
			onClick={onOpen}
			className="flex w-full items-center bg-white pl-[16px] text-left active:bg-[#E5E5EA]"
		>
			<Avatar chat={chat} size={52} />
			<span className="ml-[12px] flex h-[80px] min-w-0 flex-1 flex-col justify-center border-b border-black/[0.09] pr-[16px]">
				<span className="flex items-baseline justify-between gap-[8px]">
					<span className="truncate text-[17px] font-semibold text-black">
						{chat.name}
					</span>
					<span
						className={`shrink-0 text-[14px] ${
							unread ? "font-medium text-[#1DAA61]" : "text-[#8E8E93]"
						}`}
					>
						{rowTime(chat)}
					</span>
				</span>
				<span className="mt-[2px] flex items-start justify-between gap-[8px]">
					<span className="line-clamp-2 min-h-[40px] text-[15px] leading-[20px] text-[#8E8E93]">
						{chat.typing ? (
							<span className="font-medium text-[#1DAA61]">escribiendo…</span>
						) : (
							<>
								{m?.from === "me" && m.status && !m.deleted && (
									<TickIcon
										status={m.status}
										className="-mt-[2px] mr-[3px] inline text-[#8E8E93]"
									/>
								)}
								{chat.group && m?.from === "them" && m.author && (
									<span className="text-black/80">{m.author}: </span>
								)}
								{m?.audio && (
									<Mic className="-mt-[3px] mr-[2px] inline size-[15px] text-[#1DAA61]" />
								)}
								{previewOf(m)}
							</>
						)}
					</span>
					<span className="mt-[2px] flex shrink-0 items-center gap-[6px] text-[#8E8E93]">
						{chat.muted && <BellOff className="size-[15px]" strokeWidth={2} />}
						{chat.pinned && !unread && (
							<Pin
								className="size-[15px] rotate-45 fill-current"
								strokeWidth={1.5}
							/>
						)}
						{unread && (
							<motion.span
								key={chat.unread}
								initial={{ scale: 0.4 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 600, damping: 20 }}
								className={`min-w-[20px] rounded-full px-[6px] text-center text-[13px] font-semibold leading-[20px] text-white ${
									chat.muted ? "bg-[#AEB4BA]" : "bg-[#25D366]"
								}`}
							>
								{chat.unread}
							</motion.span>
						)}
					</span>
				</span>
			</span>
		</motion.button>
	);
}

const FILTERS: Array<{ id: Filter; label: string }> = [
	{ id: "all", label: "Todos" },
	{ id: "unread", label: "No leídos" },
	{ id: "favorites", label: "Favoritos" },
	{ id: "groups", label: "Grupos" },
];

export function ChatsTab({
	chats,
	onOpen,
}: {
	chats: Chat[];
	onOpen: (id: string) => void;
}) {
	const [filter, setFilter] = useState<Filter>("all");
	const [query, setQuery] = useState("");
	const q = query.trim().toLowerCase();
	const visible = chats
		.filter((c) =>
			filter === "unread"
				? c.unread > 0
				: filter === "favorites"
					? c.favorite
					: filter === "groups"
						? c.group
						: true,
		)
		.filter(
			(c) =>
				!q ||
				c.name.toLowerCase().includes(q) ||
				c.messages.some((m) => m.text.toLowerCase().includes(q)),
		)
		.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.ts - a.ts);

	return (
		<LargeTitle
			title="Chats"
			left={
				<span className={circleBtn}>
					<MoreHorizontal className="size-[20px]" strokeWidth={2.2} />
				</span>
			}
			right={
				<>
					<span className={circleBtn}>
						<Camera className="size-[21px]" strokeWidth={1.7} />
					</span>
					<span className={plusBtn}>
						<Plus className="size-[22px]" strokeWidth={2.6} />
					</span>
				</>
			}
		>
			<SearchField value={query} onChange={setQuery} />
			<div className="flex gap-[8px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none]">
				{FILTERS.map((f) => (
					<button
						type="button"
						key={f.id}
						onClick={() => setFilter(f.id)}
						className={`h-[32px] shrink-0 rounded-full px-[13px] text-[15px] font-medium transition-colors ${
							filter === f.id
								? "bg-[#D8FDD2] text-[#15603E]"
								: "bg-[#767680]/[0.1] text-[#5E5E60]"
						}`}
					>
						{f.label}
					</button>
				))}
			</div>
			{filter === "all" && !q && (
				<div className="flex h-[48px] items-center gap-[18px] pl-[30px] pr-[16px] text-[17px] text-black">
					<Archive className="size-[20px] text-[#8E8E93]" strokeWidth={1.8} />
					<span className="flex h-full flex-1 items-center justify-between border-b border-black/[0.09]">
						Archivados
						<span className="text-[15px] text-[#8E8E93]">2</span>
					</span>
				</div>
			)}
			{visible.map((c) => (
				<ChatRow key={c.id} chat={c} onOpen={() => onOpen(c.id)} />
			))}
			{visible.length === 0 && (
				<p className="px-[32px] py-[40px] text-center text-[15px] text-[#8E8E93]">
					{q ? `Sin resultados para “${query}”` : "No hay chats en esta vista"}
				</p>
			)}
			<p className="flex items-center justify-center gap-[5px] py-[18px] text-[13px] text-[#8E8E93]">
				<Lock className="size-[11px]" strokeWidth={2.4} />
				Tus mensajes personales están{" "}
				<span className="text-[#1DAA61]">cifrados de extremo a extremo</span>
			</p>
		</LargeTitle>
	);
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
	return (
		<div className="mb-[22px]">
			{title && (
				<h2 className="px-[16px] pb-[8px] text-[20px] font-bold text-black">
					{title}
				</h2>
			)}
			{children}
		</div>
	);
}

export function UpdatesTab({ chats }: { chats: Chat[] }) {
	const status = [
		{
			chat: chats.find((c) => c.id === "luisa"),
			bg: "from-[#F7C59F] to-[#E96B6B]",
			emoji: "🥗",
		},
		{
			chat: chats.find((c) => c.id === "gabriel"),
			bg: "from-[#9BE3C3] to-[#2E9C74]",
			emoji: "🏃‍♂️",
		},
		{
			chat: chats.find((c) => c.id === "majo"),
			bg: "from-[#C8B6FF] to-[#7457D9]",
			emoji: "☕",
		},
	];
	const nutralech = chats.find((c) => c.business);
	return (
		<LargeTitle
			title="Novedades"
			left={
				<span className={circleBtn}>
					<MoreHorizontal className="size-[20px]" strokeWidth={2.2} />
				</span>
			}
			right={
				<>
					<span className={circleBtn}>
						<Camera className="size-[21px]" strokeWidth={1.7} />
					</span>
					<span className={plusBtn}>
						<Plus className="size-[22px]" strokeWidth={2.6} />
					</span>
				</>
			}
		>
			<SearchField />
			<Section title="Estados">
				<div className="flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none]">
					<div className="relative flex h-[150px] w-[92px] shrink-0 flex-col justify-end rounded-[14px] bg-[#F0F2F5] p-[8px]">
						<span className="absolute left-[8px] top-[8px]">
							<DefaultAvatar size={36} />
							<span className="absolute -bottom-[2px] -right-[2px] flex size-[16px] items-center justify-center rounded-full border-2 border-[#F0F2F5] bg-[#25D366] text-white">
								<Plus className="size-[10px]" strokeWidth={3.5} />
							</span>
						</span>
						<span className="text-[13px] font-medium leading-[16px] text-black">
							Añadir estado
						</span>
					</div>
					{status.map(
						({ chat, bg, emoji }) =>
							chat && (
								<div
									key={chat.id}
									className={`relative flex h-[150px] w-[92px] shrink-0 flex-col justify-end overflow-hidden rounded-[14px] bg-gradient-to-br ${bg} p-[8px]`}
								>
									<span className="absolute inset-0 flex items-center justify-center text-[40px]">
										{emoji}
									</span>
									<span className="absolute left-[8px] top-[8px] rounded-full p-[2px] ring-[2.5px] ring-[#25D366]">
										<Avatar chat={chat} size={32} />
									</span>
									<span className="relative text-[13px] font-semibold text-white drop-shadow">
										{chat.name}
									</span>
								</div>
							),
					)}
				</div>
			</Section>
			<Section title="Canales">
				{nutralech && (
					<div className="flex items-center gap-[12px] px-[16px] py-[8px]">
						<Avatar chat={nutralech} size={52} />
						<div className="min-w-0 flex-1">
							<div className="flex items-baseline justify-between">
								<span className="text-[17px] font-semibold">Nutralech</span>
								<span className="text-[14px] text-[#1DAA61]">Ayer</span>
							</div>
							<p className="line-clamp-2 text-[15px] leading-[20px] text-[#8E8E93]">
								Nuevo en el blog: desayunos altos en proteína en 10 minutos 🍳
							</p>
						</div>
					</div>
				)}
				<div className="px-[16px] pt-[10px]">
					<span className="inline-flex h-[34px] items-center rounded-full bg-[#767680]/[0.12] px-[16px] text-[15px] font-medium">
						Explorar canales
					</span>
				</div>
			</Section>
		</LargeTitle>
	);
}

export function CallsTab({ chats }: { chats: Chat[] }) {
	const by = (id: string) => chats.find((c) => c.id === id);
	const calls = [
		{ chat: by("mama"), kind: "in", video: false, when: "Hoy" },
		{ chat: by("luisa"), kind: "missed", video: false, when: "Ayer" },
		{ chat: by("gabriel"), kind: "out", video: true, when: "martes" },
		{ chat: by("mama"), kind: "out", video: false, when: "domingo" },
	];
	return (
		<LargeTitle
			title="Llamadas"
			left={
				<span
					className={`${GLASS} rounded-full px-[16px] py-[10px] text-[17px]`}
				>
					Editar
				</span>
			}
			right={
				<span className={circleBtn}>
					<Plus className="size-[22px]" strokeWidth={2} />
				</span>
			}
		>
			<SearchField />
			<div className="flex gap-[12px] px-[16px] pb-[18px]">
				{[
					{ icon: Phone, label: "Llamar" },
					{ icon: Clock, label: "Programar" },
					{ icon: Key, label: "Teclado" },
					{ icon: Star, label: "Favoritos" },
				].map((a) => (
					<span
						key={a.label}
						className="flex flex-1 flex-col items-center gap-[6px] text-[13px] text-black"
					>
						<span className="flex size-[52px] items-center justify-center rounded-full bg-[#767680]/[0.12]">
							<a.icon className="size-[22px]" strokeWidth={1.7} />
						</span>
						{a.label}
					</span>
				))}
			</div>
			<h2 className="px-[16px] pb-[6px] text-[20px] font-bold">Recientes</h2>
			{calls.map(
				(c, i) =>
					c.chat && (
						<div
							key={`${c.chat.id}-${i}`}
							className="flex items-center gap-[12px] pl-[16px]"
						>
							<Avatar chat={c.chat} size={44} />
							<div className="flex h-[64px] flex-1 items-center justify-between border-b border-black/[0.09] pr-[16px]">
								<div>
									<p
										className={`text-[17px] font-semibold ${c.kind === "missed" ? "text-[#FF3B30]" : "text-black"}`}
									>
										{c.chat.name}
									</p>
									<p className="flex items-center gap-[4px] text-[14px] text-[#8E8E93]">
										{c.kind === "missed" ? (
											<PhoneMissed className="size-[13px]" />
										) : c.kind === "in" ? (
											<PhoneIncoming className="size-[13px]" />
										) : (
											<PhoneOutgoing className="size-[13px]" />
										)}
										{c.video ? "Video" : "Voz"} ·{" "}
										{c.kind === "missed"
											? "Perdida"
											: c.kind === "in"
												? "Entrante"
												: "Saliente"}
									</p>
								</div>
								<span className="flex items-center gap-[10px] text-[15px] text-[#8E8E93]">
									{c.when}
									<Info
										className="size-[22px] text-[#1DAA61]"
										strokeWidth={1.6}
									/>
								</span>
							</div>
						</div>
					),
			)}
		</LargeTitle>
	);
}

export function CommunitiesTab() {
	return (
		<LargeTitle title="Comunidades">
			<div className="flex flex-col items-center px-[32px] pt-[40px] text-center">
				<div className="relative mb-[24px] h-[120px] w-[160px]">
					<span className="absolute left-[10px] top-[30px] size-[64px] rotate-[-10deg] rounded-[18px] bg-[#D8FDD2]" />
					<span className="absolute right-[10px] top-[18px] size-[64px] rotate-[8deg] rounded-[18px] bg-[#FFE7CC]" />
					<span className="absolute left-1/2 top-[34px] flex size-[76px] -translate-x-1/2 items-center justify-center rounded-[22px] bg-[#25D366] text-white shadow-lg">
						<Users className="size-[36px]" strokeWidth={1.8} />
					</span>
				</div>
				<h2 className="text-[22px] font-bold leading-[28px]">
					Mantente en contacto con una comunidad
				</h2>
				<p className="mt-[10px] text-[15px] leading-[20px] text-[#8E8E93]">
					Las comunidades reúnen a miembros en grupos por temas y facilitan
					recibir avisos de administradores.
				</p>
				<span className="mt-[22px] rounded-full bg-[#25D366] px-[22px] py-[11px] text-[17px] font-semibold text-white">
					Nueva comunidad
				</span>
			</div>
		</LargeTitle>
	);
}

function SettingsRow({
	icon: Icon,
	color,
	label,
	value,
}: {
	icon: typeof Bell;
	color: string;
	label: string;
	value?: string;
}) {
	return (
		<div className="flex items-center gap-[14px] pl-[16px]">
			<span
				className="flex size-[29px] items-center justify-center rounded-[7px] text-white"
				style={{ background: color }}
			>
				<Icon className="size-[18px]" strokeWidth={2} />
			</span>
			<span className="flex h-[46px] flex-1 items-center justify-between border-b border-black/[0.08] pr-[14px] text-[17px]">
				{label}
				<span className="flex items-center gap-[6px] text-[#8E8E93]">
					{value}
					<ChevronRight className="size-[18px]" strokeWidth={2} />
				</span>
			</span>
		</div>
	);
}

export function SettingsTab({ starred }: { starred: number }) {
	const group =
		"mx-[16px] mb-[24px] overflow-hidden rounded-[26px] bg-white [&>div:last-child>span:last-child]:border-b-0";
	return (
		<LargeTitle title="Configuración" bg="bg-[#F2F2F7]">
			<SearchField />
			<div className={`${group} flex items-center gap-[12px] p-[14px]`}>
				<DefaultAvatar size={60} />
				<div className="flex-1">
					<p className="text-[20px] font-semibold">Tú</p>
					<p className="text-[15px] text-[#8E8E93]">Disponible</p>
				</div>
				<span className="flex size-[34px] items-center justify-center rounded-full bg-[#767680]/[0.12]">
					<QrCode className="size-[18px]" strokeWidth={2} />
				</span>
			</div>
			<div className={group}>
				<SettingsRow
					icon={Star}
					color="#FFCC00"
					label="Mensajes destacados"
					value={starred ? String(starred) : undefined}
				/>
				<SettingsRow
					icon={Globe}
					color="#1DAA61"
					label="Dispositivos vinculados"
				/>
			</div>
			<div className={group}>
				<SettingsRow icon={Key} color="#007AFF" label="Cuenta" />
				<SettingsRow icon={Lock} color="#34C759" label="Privacidad" />
				<SettingsRow icon={MessageCircle} color="#25D366" label="Chats" />
				<SettingsRow icon={Bell} color="#FF3B30" label="Notificaciones" />
				<SettingsRow
					icon={CircleDashed}
					color="#34C759"
					label="Almacenamiento y datos"
				/>
			</div>
			<div className={group}>
				<SettingsRow icon={Info} color="#007AFF" label="Ayuda" />
				<SettingsRow icon={Users} color="#FF2D55" label="Invitar a un amigo" />
			</div>
		</LargeTitle>
	);
}

export function TabBar({
	tab,
	onTab,
	unreadChats,
}: {
	tab: TabId;
	onTab: (t: TabId) => void;
	unreadChats: number;
}) {
	const tabs: Array<{
		id: TabId;
		label: string;
		icon: typeof Phone;
		badge?: number;
	}> = [
		{ id: "updates", label: "Novedades", icon: CircleDashed },
		{ id: "calls", label: "Llamadas", icon: Phone },
		{ id: "communities", label: "Comunidades", icon: Users },
		{ id: "chats", label: "Chats", icon: MessageCircle, badge: unreadChats },
		{ id: "settings", label: "Configuración", icon: Settings },
	];
	return (
		<div
			className={`${GLASS} absolute inset-x-[16px] bottom-[22px] z-20 flex h-[64px] rounded-full p-[4px]`}
		>
			{tabs.map((t) => {
				const on = t.id === tab;
				return (
					<motion.button
						type="button"
						key={t.id}
						onClick={() => onTab(t.id)}
						whileTap={{ scale: 0.92 }}
						transition={FLUID}
						className={`relative flex flex-1 flex-col items-center justify-center gap-[1px] text-[10px] ${
							on ? "font-semibold text-[#128C4A]" : "font-medium text-black"
						}`}
					>
						{on && (
							<motion.span
								layoutId="tab-lens"
								transition={FLUID}
								className="absolute inset-0 rounded-full bg-black/[0.07] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.8)]"
							/>
						)}
						<t.icon
							className="relative size-[25px]"
							strokeWidth={on ? 2 : 1.6}
							fill={on && t.id === "chats" ? "currentColor" : "none"}
						/>
						<span className="relative">{t.label}</span>
						{!!t.badge && (
							<motion.span
								key={t.badge}
								initial={{ scale: 0.3 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 600, damping: 18 }}
								className="absolute left-1/2 top-[4px] ml-[5px] min-w-[19px] rounded-full bg-[#25D366] px-[5px] text-center text-[12px] font-semibold leading-[19px] text-white"
							>
								{t.badge}
							</motion.span>
						)}
					</motion.button>
				);
			})}
		</div>
	);
}

export function InfoView({
	chat,
	onBack,
	onCall,
	starred,
}: {
	chat: Chat;
	onBack: () => void;
	onCall: () => void;
	starred: number;
}) {
	const card = "mx-[16px] mb-[20px] overflow-hidden rounded-[26px] bg-white";
	return (
		<div className="absolute inset-0 overflow-y-auto bg-[#F2F2F7] [scrollbar-width:none]">
			<div
				className="sticky top-0 z-10 flex items-end px-[16px] pb-[2px]"
				style={{
					height: BAR_H + 4,
					background:
						"linear-gradient(180deg,rgba(242,242,247,0.95) 55%,rgba(242,242,247,0))",
				}}
			>
				<GlassButton
					aria-label="Volver"
					onClick={onBack}
					className="size-[44px] rounded-full"
				>
					<ChevronLeft className="-ml-[2px] size-[26px]" strokeWidth={2.2} />
				</GlassButton>
				<span className="absolute bottom-[14px] left-1/2 -translate-x-1/2 text-[17px] font-semibold">
					{chat.business ? "Info. de empresa" : "Info. del contacto"}
				</span>
			</div>
			<div className="flex flex-col items-center px-[16px] pb-[18px] pt-[8px]">
				<Avatar chat={chat} size={104} />
				<h2 className="mt-[12px] text-[24px] font-semibold">{chat.name}</h2>
				<p className="text-[15px] text-[#8E8E93]">
					{chat.business ? "Cuenta de empresa · Nutrióloga" : chat.subtitle}
				</p>
				<div className="mt-[18px] flex w-full gap-[8px]">
					{[
						{ icon: Phone, label: "Llamar" },
						{ icon: Video, label: "Video" },
						{ icon: Search, label: "Buscar" },
					].map((a) => (
						<button
							type="button"
							key={a.label}
							onClick={a.label === "Buscar" ? onBack : onCall}
							className="flex h-[64px] flex-1 flex-col items-center justify-center gap-[4px] rounded-[22px] bg-white text-[13px] text-black active:bg-[#E5E5EA]"
						>
							<a.icon
								className="size-[22px] text-[#1DAA61]"
								strokeWidth={1.8}
							/>
							{a.label}
						</button>
					))}
				</div>
			</div>
			{chat.business && (
				<div className={`${card} p-[14px] text-[15px] leading-[21px]`}>
					<p>
						Planes de alimentación a distancia, 100% personalizados. Sin citas
						ni videollamadas 🌱
					</p>
					<div className="mt-[12px] space-y-[10px] border-t border-black/[0.08] pt-[12px] text-[15px]">
						<p className="flex items-center gap-[10px]">
							<Clock className="size-[18px] text-[#8E8E93]" /> Respondo en menos
							de 24 h
						</p>
						<p className="flex items-center gap-[10px]">
							<Mail className="size-[18px] text-[#8E8E93]" />
							<a
								href="mailto:marialyalonso@gmail.com"
								className="text-[#027EB5]"
							>
								marialyalonso@gmail.com
							</a>
						</p>
						<p className="flex items-center gap-[10px]">
							<AtSign className="size-[18px] text-[#8E8E93]" />
							<a href="https://www.nutralech.com" className="text-[#027EB5]">
								nutralech.com
							</a>
						</p>
					</div>
				</div>
			)}
			<div className={card}>
				<SettingsRow
					icon={Star}
					color="#FFCC00"
					label="Mensajes destacados"
					value={starred ? String(starred) : "Ninguno"}
				/>
				<SettingsRow icon={Bell} color="#34C759" label="Notificaciones" />
				<SettingsRow icon={Lock} color="#007AFF" label="Cifrado" />
			</div>
			<div className="h-[40px]" />
		</div>
	);
}
