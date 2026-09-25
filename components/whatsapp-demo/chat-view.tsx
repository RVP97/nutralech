"use client";

import {
	AnimatePresence,
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "framer-motion";
import {
	Camera,
	ChevronDown,
	ChevronLeft,
	Copy,
	Lock,
	Mic,
	Phone,
	Plus,
	Reply,
	Star,
	Trash2,
	Video,
	X,
} from "lucide-react";
import {
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { Bubble } from "./bubble";
import type { Chat, LinkPreview, Message, ReplyRef } from "./data";
import { FLUID, GLASS, GLASS_STRONG, GlassButton } from "./glass";
import { DefaultAvatar, SendIcon, StickerIcon, Tail } from "./icons";
import { SAFE_BOTTOM, SCREEN_H, useScale } from "./iphone";
import { IOSKeyboard, KEYBOARD_H } from "./keyboard";
import { suggest } from "./replies";
import { haptic } from "./sound";

const HEADER_H = 104;
const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
const SPRING = { type: "spring", stiffness: 520, damping: 42 } as const;

const doodles = `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260' fill='none' stroke='%23866f55' stroke-opacity='.16' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'>
<g transform='translate(24 22)'><path d='M14 8c-3-3-10-2-11 5-1 6 4 13 8 13 1 0 2-1 3-1s2 1 3 1c4 0 9-7 8-13-1-7-8-8-11-5z'/><path d='M14 8c0-3 1-5 3-6'/><path d='M15 5c2-2 5-2 6 0-2 2-4 2-6 0z'/></g>
<g transform='translate(118 16) rotate(25)'><path d='M6 10 14 36 22 10Z'/><path d='M10 10c-2-4-1-7 1-8M14 10V1M18 10c2-4 1-7-1-8M9 18h4M12 25h4'/></g>
<g transform='translate(200 18)'><path d='M16 2c-5 0-7 6-9 12-3 8 1 16 9 16s12-8 9-16C23 8 21 2 16 2z'/><circle cx='16' cy='20' r='5'/></g>
<g transform='translate(44 100)'><path d='M3 2h20l-3 28H6z'/><path d='M5 12h16'/><path d='M11 19a2 2 0 1 0 4 0c0-2-2-4-2-4s-2 2-2 4z'/></g>
<g transform='translate(140 104) rotate(-20)'><path d='M2 28C2 10 14 2 30 2c0 16-8 28-26 28z'/><path d='M2 28 22 10'/></g>
<g transform='translate(214 110)'><path d='M12 22S2 15 2 8a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 7-10 14-10 14z'/></g>
<g transform='translate(22 186)'><circle cx='15' cy='15' r='13'/><circle cx='15' cy='15' r='9'/><path d='M15 6v18M6 15h18M9 9l12 12M21 9 9 21'/></g>
<g transform='translate(112 184)'><path d='M6 2v10a4 4 0 0 0 8 0V2M10 2v34M24 2c-4 3-4 12 0 14v20'/></g>
<g transform='translate(196 190)'><path d='M14 2l3 9 9 3-9 3-3 9-3-9-9-3 9-3z'/></g>
<g fill='%23866f55' fill-opacity='.16' stroke='none'><circle cx='92' cy='72' r='2'/><circle cx='178' cy='76' r='2'/><circle cx='96' cy='152' r='2'/><circle cx='238' cy='166' r='2'/><circle cx='68' cy='244' r='2'/><circle cx='168' cy='244' r='2'/></g>
</svg>`;
export const WALLPAPER = `url("data:image/svg+xml,${doodles.replace(/\n/g, "").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}")`;

export function Avatar({ chat, size }: { chat: Chat; size: number }) {
	if (!chat.avatar) return <DefaultAvatar size={size} group={chat.group} />;
	return (
		// biome-ignore lint/performance/noImgElement: avatar inside a scaled device mockup
		<img
			src={chat.avatar}
			alt=""
			draggable={false}
			width={size}
			height={size}
			className="shrink-0 rounded-full object-cover object-[50%_30%]"
			style={{ width: size, height: size }}
		/>
	);
}

interface MenuState {
	msg: Message;
	first: boolean;
	last: boolean;
	rect: { top: number; height: number };
}

function MessageRow({
	msg,
	first,
	last,
	group,
	highlight,
	onReply,
	onMenu,
	onButton,
	onLink,
	onQuote,
}: {
	msg: Message;
	first: boolean;
	last: boolean;
	group?: boolean;
	highlight: boolean;
	onReply: (m: Message) => void;
	onMenu: (m: Message, el: HTMLElement, first: boolean, last: boolean) => void;
	onButton: (label: string) => void;
	onLink: (link: LinkPreview) => void;
	onQuote: (id: string) => void;
}) {
	const scale = useScale();
	const x = useMotionValue(0);
	const iconOpacity = useTransform(x, [12, 58], [0, 1]);
	const iconScale = useTransform(x, [12, 58], [0.5, 1]);
	const ref = useRef<HTMLDivElement>(null);
	const g = useRef({
		sx: 0,
		sy: 0,
		mode: "idle" as "idle" | "swipe" | "scroll" | "menu",
		timer: 0 as ReturnType<typeof setTimeout> | 0,
		armed: false,
	});
	const mine = msg.from === "me";
	const canSwipe = !msg.deleted;

	const openMenu = () => {
		if (!ref.current) return;
		g.current.mode = "menu";
		haptic(12);
		onMenu(msg, ref.current, first, last);
	};

	const down = (e: ReactPointerEvent) => {
		if (e.button !== 0) return;
		g.current = {
			sx: e.clientX,
			sy: e.clientY,
			mode: "idle",
			armed: false,
			timer: setTimeout(openMenu, 480),
		};
	};
	const move = (e: ReactPointerEvent) => {
		const s = g.current;
		if (s.mode === "menu" || s.mode === "scroll") return;
		if (!s.timer && s.mode === "idle") return;
		const dx = (e.clientX - s.sx) / scale;
		const dy = (e.clientY - s.sy) / scale;
		if (s.mode === "idle") {
			if (Math.abs(dy) > 8) {
				s.mode = "scroll";
				clearTimeout(s.timer);
				return;
			}
			if (canSwipe && dx > 8 && dx > Math.abs(dy)) {
				s.mode = "swipe";
				clearTimeout(s.timer);
				try {
					(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
				} catch {}
			}
		}
		if (s.mode === "swipe") {
			const v = Math.max(0, dx);
			x.set(v < 60 ? v : 60 + (v - 60) * 0.25);
			if (x.get() >= 58 && !s.armed) {
				s.armed = true;
				haptic();
			}
		}
	};
	const up = () => {
		const s = g.current;
		clearTimeout(s.timer);
		s.timer = 0;
		if (s.mode === "swipe") {
			if (x.get() >= 58) onReply(msg);
			animate(x, 0, { type: "spring", stiffness: 600, damping: 38 });
		}
		s.mode = "idle";
	};

	return (
		<div
			id={`msg-${msg.id}`}
			className="relative"
			style={{
				marginBottom: msg.reactions?.me || msg.reactions?.them ? 20 : 0,
			}}
		>
			<motion.span
				aria-hidden
				className="absolute left-[4px] top-1/2 -mt-[15px] flex size-[30px] items-center justify-center rounded-full bg-black/10 text-[#54656F]"
				style={{ opacity: iconOpacity, scale: iconScale }}
			>
				<Reply className="size-[17px]" strokeWidth={2.2} />
			</motion.span>
			<motion.div
				ref={ref}
				style={{ x, touchAction: "pan-y", WebkitTouchCallout: "none" }}
				className="select-none"
				onPointerDown={down}
				onPointerMove={move}
				onPointerUp={up}
				onPointerCancel={up}
				onContextMenu={(e) => {
					e.preventDefault();
					openMenu();
				}}
				initial={
					mine
						? { opacity: 0, y: 26, scale: 0.94 }
						: { opacity: 0, scale: 0.86, y: 6 }
				}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={SPRING}
			>
				<div style={{ transformOrigin: mine ? "100% 100%" : "0% 100%" }}>
					<Bubble
						msg={msg}
						first={first}
						last={last}
						group={group}
						highlight={highlight}
						onButton={onButton}
						onLink={onLink}
						onQuote={onQuote}
					/>
				</div>
			</motion.div>
		</div>
	);
}

function TypingBubble() {
	const reduce = useReducedMotion();
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
			style={{ transformOrigin: "0% 100%" }}
			className="relative mt-[8px] w-fit drop-shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
		>
			<div className="flex h-[36px] items-center gap-[4px] rounded-[18px] rounded-bl-[4px] bg-white px-[13px]">
				{[0, 1, 2].map((i) => (
					<motion.span
						key={i}
						className="size-[7px] rounded-full bg-[#8696A0]"
						animate={
							reduce ? undefined : { y: [0, -3.5, 0], opacity: [0.45, 1, 0.45] }
						}
						transition={{
							duration: 1,
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 0.16,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>
			<Tail side="in" color="#FFFFFF" />
		</motion.div>
	);
}

function Pill({ children }: { children: React.ReactNode }) {
	return (
		<div className="my-[10px] flex justify-center">
			<span className="rounded-[8px] bg-white/95 px-[10px] py-[5px] text-[13px] font-medium text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
				{children}
			</span>
		</div>
	);
}

interface ChatViewProps {
	chat: Chat;
	backBadge: number;
	fine: boolean;
	unreadFrom: { id: string; count: number } | null;
	onBack: () => void;
	onSend: (text: string, replyTo?: ReplyRef) => void;
	onReact: (msgId: string, emoji: string) => void;
	onDelete: (msgId: string) => void;
	onStar: (msgId: string) => void;
	onOpenInfo: () => void;
	onCall: () => void;
	onLink: (link: LinkPreview) => void;
	onEdgeDown: (e: ReactPointerEvent) => void;
}

export function ChatView({
	chat,
	backBadge,
	fine,
	unreadFrom,
	onBack,
	onSend,
	onReact,
	onDelete,
	onStar,
	onOpenInfo,
	onCall,
	onLink,
	onEdgeDown,
}: ChatViewProps) {
	const scale = useScale();
	const reduce = useReducedMotion();
	const rootRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const taRef = useRef<HTMLTextAreaElement>(null);
	const atBottomRef = useRef(true);

	const [text, setText] = useState("");
	const [focused, setFocused] = useState(false);
	const [pressedKey, setPressedKey] = useState<string | null>(null);
	const [reply, setReply] = useState<ReplyRef | null>(null);
	const [menu, setMenu] = useState<MenuState | null>(null);
	const [toast, setToast] = useState<string | null>(null);
	const [micTip, setMicTip] = useState(false);
	const [atBottom, setAtBottom] = useState(true);
	const [missed, setMissed] = useState(0);
	const [flash, setFlash] = useState<string | null>(null);
	const [hint, setHint] = useState(true);

	const kbOpen = fine && focused;
	const messages = chat.messages;
	const lastMsg = messages[messages.length - 1];

	useEffect(() => {
		const t = setTimeout(() => setHint(false), 3200);
		return () => clearTimeout(t);
	}, []);

	const toBottom = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
	}, [reduce]);

	// Land on the "unread messages" divider (or the bottom) when the chat opens.
	useLayoutEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const marker = unreadFrom && el.querySelector<HTMLElement>("[data-unread]");
		el.scrollTop = marker ? marker.offsetTop - HEADER_H - 40 : el.scrollHeight;
	}, [unreadFrom]);

	// New messages: follow if you're at the bottom or you sent it; otherwise count them.
	const count = messages.length;
	const prevCount = useRef(count);
	useEffect(() => {
		if (count <= prevCount.current) {
			prevCount.current = count;
			return;
		}
		prevCount.current = count;
		if (lastMsg?.from === "me" || atBottomRef.current) {
			requestAnimationFrame(() => toBottom());
		} else {
			setMissed((n) => n + 1);
		}
	}, [count, lastMsg?.from, toBottom]);

	useEffect(() => {
		if (chat.typing && atBottomRef.current)
			requestAnimationFrame(() => toBottom());
	}, [chat.typing, toBottom]);

	// Keep the conversation pinned to the bottom while the keyboard slides in.
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => {
			if (atBottomRef.current) el.scrollTop = el.scrollHeight;
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const onScroll = () => {
		const el = scrollRef.current;
		if (!el) return;
		const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
		atBottomRef.current = bottom;
		setAtBottom(bottom);
		if (bottom) setMissed(0);
	};

	// Grow the composer like WhatsApp: up to ~5 lines, then scroll.
	// biome-ignore lint/correctness/useExhaustiveDependencies: re-measure whenever the text changes
	useLayoutEffect(() => {
		const ta = taRef.current;
		if (!ta) return;
		ta.style.height = "0px";
		ta.style.height = `${Math.min(ta.scrollHeight, 118)}px`;
	}, [text]);

	const insert = (s: string) => {
		const ta = taRef.current;
		const start = ta?.selectionStart ?? text.length;
		const end = ta?.selectionEnd ?? start;
		setText(text.slice(0, start) + s + text.slice(end));
		requestAnimationFrame(() => {
			if (ta) ta.selectionStart = ta.selectionEnd = start + s.length;
		});
	};
	const backspace = () => {
		const ta = taRef.current;
		const start = ta?.selectionStart ?? text.length;
		const end = ta?.selectionEnd ?? start;
		if (start !== end) {
			setText(text.slice(0, start) + text.slice(end));
			requestAnimationFrame(() => {
				if (ta) ta.selectionStart = ta.selectionEnd = start;
			});
			return;
		}
		const before = Array.from(text.slice(0, start));
		before.pop();
		const head = before.join("");
		setText(head + text.slice(start));
		requestAnimationFrame(() => {
			if (ta) ta.selectionStart = ta.selectionEnd = head.length;
		});
	};

	const send = () => {
		const body = text.trim();
		if (!body) return;
		onSend(body, reply ?? undefined);
		setText("");
		setReply(null);
	};

	const startReply = (m: Message) => {
		setReply({
			id: m.id,
			author: m.from === "me" ? "Tú" : (m.author ?? chat.name),
			mine: m.from === "me",
			text: m.audio ? `Audio (${m.audio})` : m.text.replace(/[*_~]/g, ""),
			color: m.from === "me" ? "#06CF9C" : (m.authorColor ?? "#1F7AEC"),
		});
		taRef.current?.focus();
	};

	const openMenu = (
		m: Message,
		el: HTMLElement,
		first: boolean,
		last: boolean,
	) => {
		const root = rootRef.current?.getBoundingClientRect();
		const r = el.getBoundingClientRect();
		if (!root) return;
		taRef.current?.blur();
		setMenu({
			msg: m,
			first,
			last,
			rect: { top: (r.top - root.top) / scale, height: r.height / scale },
		});
	};

	const jumpTo = (id: string) => {
		const el = document.getElementById(`msg-${id}`);
		const sc = scrollRef.current;
		if (!el || !sc) return;
		sc.scrollTo({
			top: el.offsetTop - SCREEN_H / 3,
			behavior: reduce ? "auto" : "smooth",
		});
		setFlash(id);
		setTimeout(() => setFlash(null), 900);
	};

	const showToast = (t: string) => {
		setToast(t);
		setTimeout(() => setToast(null), 1300);
	};

	const status = chat.typing
		? "escribiendo…"
		: chat.online
			? "en línea"
			: hint
				? "toca aquí para ver la info del contacto"
				: chat.lastSeen
					? `últ. vez hoy a la(s) ${chat.lastSeen}`
					: (chat.subtitle ?? (chat.business ? "Cuenta de empresa" : ""));

	return (
		<div
			ref={rootRef}
			className="absolute inset-0 flex flex-col overflow-hidden bg-[#EFEAE2]"
			style={{ backgroundImage: WALLPAPER, backgroundSize: "260px 260px" }}
		>
			{/* Header: floating Liquid Glass controls over a scroll-edge blur */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 z-30 backdrop-blur-[8px]"
				style={{
					height: HEADER_H + 14,
					background:
						"linear-gradient(180deg,rgba(239,234,226,0.9),rgba(239,234,226,0.55) 70%,rgba(239,234,226,0))",
					WebkitMaskImage: "linear-gradient(180deg,#000 62%,transparent)",
					maskImage: "linear-gradient(180deg,#000 62%,transparent)",
				}}
			/>
			<div
				className="absolute inset-x-0 z-30 flex h-[48px] items-center gap-[8px] px-[12px]"
				style={{ top: HEADER_H - 50 }}
			>
				<GlassButton
					onClick={onBack}
					aria-label="Volver"
					className={`h-[48px] shrink-0 rounded-full ${backBadge > 0 ? "pl-[6px] pr-[12px]" : "w-[48px]"}`}
				>
					<ChevronLeft className="size-[28px]" strokeWidth={2.2} />
					{backBadge > 0 && (
						<span className="-ml-[2px] text-[17px] font-semibold tabular-nums">
							{backBadge}
						</span>
					)}
				</GlassButton>
				<GlassButton
					onClick={onOpenInfo}
					className="h-[48px] min-w-0 flex-1 justify-start gap-[9px] rounded-full pl-[6px] pr-[14px] text-left"
				>
					<Avatar chat={chat} size={36} />
					<span className="min-w-0 flex-1">
						<span className="block truncate text-[16px] font-semibold leading-[20px] text-black">
							{chat.name}
						</span>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={status}
								initial={{ opacity: 0, y: 3, filter: "blur(2px)" }}
								animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								exit={{ opacity: 0, y: -3, filter: "blur(2px)" }}
								transition={{ duration: 0.18 }}
								className={`block truncate text-[12.5px] leading-[16px] ${
									chat.typing ? "text-[#1DAA61]" : "text-[#6D6D72]"
								}`}
							>
								{status}
							</motion.span>
						</AnimatePresence>
					</span>
				</GlassButton>
				<div
					className={`${GLASS} flex h-[48px] shrink-0 items-center rounded-full px-[4px]`}
				>
					<motion.button
						type="button"
						aria-label="Videollamada"
						onClick={onCall}
						whileTap={{ scale: 1.15 }}
						transition={FLUID}
						className="flex size-[40px] items-center justify-center"
					>
						<Video className="size-[23px]" strokeWidth={1.7} />
					</motion.button>
					<motion.button
						type="button"
						aria-label="Llamar"
						onClick={onCall}
						whileTap={{ scale: 1.15 }}
						transition={FLUID}
						className="flex size-[40px] items-center justify-center"
					>
						<Phone className="size-[20px]" strokeWidth={1.7} />
					</motion.button>
				</div>
			</div>

			{/* Edge-swipe back target */}
			<div
				className="absolute bottom-0 left-0 top-[110px] z-20 w-[18px]"
				style={{ touchAction: "none" }}
				onPointerDown={onEdgeDown}
			/>

			{/* Messages */}
			<div
				ref={scrollRef}
				onScroll={onScroll}
				onPointerDown={() => taRef.current?.blur()}
				className="relative flex-1 overflow-y-auto overscroll-contain px-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				style={{ paddingTop: HEADER_H + 6, paddingBottom: 10 }}
			>
				<div className="mx-auto mb-[6px] mt-[6px] max-w-[330px] rounded-[8px] bg-[#FFF5C4] px-[12px] py-[7px] text-center text-[12.5px] leading-[16px] text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.1)]">
					<Lock
						className="-mt-[2px] mr-[3px] inline size-[11px]"
						strokeWidth={2.4}
					/>
					Los mensajes y las llamadas están cifrados de extremo a extremo. Solo
					las personas en este chat pueden leerlos, escucharlos o compartirlos.
				</div>
				{chat.business && (
					<div className="mx-auto mb-[4px] max-w-[330px] rounded-[8px] bg-white/90 px-[12px] py-[7px] text-center text-[12.5px] leading-[16px] text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.1)]">
						Este chat es con una cuenta de empresa. Toca para más información.
					</div>
				)}

				{messages.map((m, i) => {
					const prev = messages[i - 1];
					const next = messages[i + 1];
					const newDay = !prev || prev.day !== m.day;
					const same = (a?: Message, b?: Message) =>
						!!a &&
						!!b &&
						a.from === b.from &&
						a.author === b.author &&
						a.day === b.day;
					const first = !same(prev, m);
					const last = !same(m, next) || !!m.buttons?.length;
					return (
						<div key={m.id} className={first ? "mt-[8px]" : "mt-[2px]"}>
							{newDay && <Pill>{m.day ?? "Hoy"}</Pill>}
							{unreadFrom?.id === m.id && (
								<div
									data-unread
									className="-mx-[14px] my-[8px] bg-white/70 py-[5px] text-center text-[13px] font-medium text-[#54656F]"
								>
									{unreadFrom.count === 1
										? "1 mensaje no leído"
										: `${unreadFrom.count} mensajes no leídos`}
								</div>
							)}
							<MessageRow
								msg={m}
								first={first}
								last={last}
								group={chat.group}
								highlight={flash === m.id}
								onReply={startReply}
								onMenu={openMenu}
								onButton={(label) => onSend(label)}
								onLink={onLink}
								onQuote={jumpTo}
							/>
						</div>
					);
				})}
				<AnimatePresence>
					{chat.typing && <TypingBubble key="typing" />}
				</AnimatePresence>
			</div>

			{/* Scroll-to-bottom */}
			<AnimatePresence>
				{!atBottom && (
					<motion.button
						type="button"
						aria-label="Ir al final"
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.6 }}
						onClick={() => toBottom()}
						className={`${GLASS} absolute right-[12px] z-20 flex size-[42px] items-center justify-center rounded-full text-[#3B4A54]`}
						style={{ bottom: (kbOpen ? KEYBOARD_H : SAFE_BOTTOM) + 66 }}
					>
						<ChevronDown className="size-[24px]" strokeWidth={1.8} />
						{missed > 0 && (
							<span className="absolute -top-[6px] left-1/2 min-w-[20px] -translate-x-1/2 rounded-full bg-[#25D366] px-[5px] text-center text-[12px] font-semibold leading-[20px] text-white">
								{missed}
							</span>
						)}
					</motion.button>
				)}
			</AnimatePresence>

			{/* Composer */}
			<motion.div
				className="relative z-20 shrink-0"
				animate={{ paddingBottom: kbOpen ? 8 : SAFE_BOTTOM - 8 }}
				transition={SPRING}
			>
				<AnimatePresence initial={false}>
					{reply && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 64, opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={SPRING}
							className="overflow-hidden"
						>
							<div className="flex items-center gap-[8px] px-[12px] pt-[6px]">
								<div
									className={`${GLASS_STRONG} flex h-[52px] min-w-0 flex-1 overflow-hidden rounded-[16px]`}
								>
									<span
										className="w-[4px] shrink-0"
										style={{ background: reply.color }}
									/>
									<span className="min-w-0 px-[8px] py-[6px]">
										<span
											className="block text-[14px] font-semibold leading-[18px]"
											style={{ color: reply.color }}
										>
											{reply.mine ? "Tú" : reply.author}
										</span>
										<span className="block truncate text-[14px] leading-[18px] text-[#667781]">
											{reply.text}
										</span>
									</span>
								</div>
								<button
									type="button"
									aria-label="Cancelar respuesta"
									onPointerDown={(e) => e.preventDefault()}
									onClick={() => setReply(null)}
									className="flex size-[24px] items-center justify-center rounded-full bg-[#8E8E93]/25 text-[#54656F]"
								>
									<X className="size-[14px]" strokeWidth={2.4} />
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex items-end gap-[8px] px-[12px] pt-[6px]">
					<GlassButton
						aria-label="Adjuntar"
						className="size-[46px] shrink-0 rounded-full"
						onPointerDown={(e) => e.preventDefault()}
					>
						<Plus className="size-[24px]" strokeWidth={1.8} />
					</GlassButton>
					<div
						className={`${GLASS_STRONG} flex min-h-[46px] flex-1 items-end rounded-[23px] pl-[16px] pr-[10px]`}
					>
						<textarea
							ref={taRef}
							rows={1}
							value={text}
							placeholder=""
							aria-label="Mensaje"
							enterKeyHint="send"
							onChange={(e) => setText(e.target.value)}
							onFocus={() => {
								setFocused(true);
								atBottomRef.current = true;
							}}
							onBlur={() => {
								setFocused(false);
								setPressedKey(null);
							}}
							onKeyDown={(e) => {
								const k =
									e.key === "Enter"
										? "enter"
										: e.key === "Backspace"
											? "backspace"
											: e.key === "Shift"
												? "shift"
												: e.key.toLowerCase();
								setPressedKey(k);
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send();
								}
							}}
							onKeyUp={() => setPressedKey(null)}
							className="block max-h-[118px] w-full flex-1 resize-none bg-transparent py-[12px] text-[17px] leading-[22px] tracking-[-0.2px] text-[#111B21] caret-[#25D366] outline-none [scrollbar-width:none]"
						/>
						<span className="mb-[12px] ml-[4px] text-[#54656F]">
							<StickerIcon />
						</span>
					</div>
					<div className="relative flex h-[46px] items-center">
						<AnimatePresence mode="popLayout" initial={false}>
							{text.trim() ? (
								<motion.button
									key="send"
									type="button"
									aria-label="Enviar"
									initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
									animate={{ scale: 1, opacity: 1, rotate: 0 }}
									exit={{ scale: 0.4, opacity: 0 }}
									transition={SPRING}
									onPointerDown={(e) => e.preventDefault()}
									onClick={send}
									className="flex size-[46px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] pl-[2px] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),0_6px_16px_rgba(37,211,102,0.4)]"
								>
									<SendIcon />
								</motion.button>
							) : (
								<motion.span
									key="tools"
									initial={{ scale: 0.6, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.6, opacity: 0 }}
									transition={SPRING}
									className={`${GLASS} flex h-[46px] items-center gap-[14px] rounded-full px-[12px] text-black`}
								>
									<Camera className="size-[22px]" strokeWidth={1.7} />
									<button
										type="button"
										aria-label="Nota de voz"
										onPointerDown={(e) => e.preventDefault()}
										onClick={() => {
											setMicTip(true);
											setTimeout(() => setMicTip(false), 2200);
										}}
									>
										<Mic className="size-[22px]" strokeWidth={1.7} />
									</button>
								</motion.span>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{micTip && (
								<motion.span
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									className="absolute bottom-[46px] right-0 w-[220px] rounded-[10px] bg-[#3B4A54] px-[12px] py-[8px] text-center text-[14px] leading-[18px] text-white shadow-lg"
								>
									Mantén presionado para grabar y suelta para enviar.
								</motion.span>
							)}
						</AnimatePresence>
					</div>
				</div>
			</motion.div>

			{/* iOS keyboard (pointer devices only; phones bring their own) */}
			{fine && (
				<motion.div
					className="relative z-20 shrink-0 overflow-hidden"
					initial={false}
					animate={{ height: kbOpen ? KEYBOARD_H : 0 }}
					transition={reduce ? { duration: 0 } : SPRING}
				>
					<IOSKeyboard
						pressed={pressedKey}
						autoShift={text.length === 0 || /[.!?¿¡]\s*$/.test(text)}
						suggestions={suggest(text)}
						onInsert={insert}
						onBackspace={backspace}
						onEnter={send}
						onSuggestion={(w) => setText(text.replace(/[\p{L}]*$/u, `${w} `))}
					/>
				</motion.div>
			)}

			{/* Long-press menu */}
			<AnimatePresence>
				{menu && (
					<ContextMenu
						key="menu"
						menu={menu}
						group={chat.group}
						onClose={() => setMenu(null)}
						onReact={(e) => {
							onReact(menu.msg.id, e);
							setMenu(null);
						}}
						onReply={() => {
							startReply(menu.msg);
							setMenu(null);
						}}
						onCopy={() => {
							navigator.clipboard?.writeText(menu.msg.text).catch(() => {});
							setMenu(null);
							showToast("Copiado");
						}}
						onStar={() => {
							onStar(menu.msg.id);
							setMenu(null);
						}}
						onDelete={() => {
							onDelete(menu.msg.id);
							setMenu(null);
						}}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{toast && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0 }}
						className="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-black/75 px-[18px] py-[12px] text-[15px] font-medium text-white backdrop-blur"
					>
						{toast}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function ContextMenu({
	menu,
	group,
	onClose,
	onReact,
	onReply,
	onCopy,
	onStar,
	onDelete,
}: {
	menu: MenuState;
	group?: boolean;
	onClose: () => void;
	onReact: (emoji: string) => void;
	onReply: () => void;
	onCopy: () => void;
	onStar: () => void;
	onDelete: () => void;
}) {
	const { msg, rect } = menu;
	const mine = msg.from === "me";
	const current = msg.reactions?.me;
	const items = [
		{ label: "Responder", icon: Reply, run: onReply, show: !msg.deleted },
		{
			label: "Copiar",
			icon: Copy,
			run: onCopy,
			show: !msg.deleted && !!msg.text,
		},
		{
			label: msg.starred ? "No destacar" : "Destacar",
			icon: Star,
			run: onStar,
			show: !msg.deleted,
		},
		{
			label: "Eliminar",
			icon: Trash2,
			run: onDelete,
			show: true,
			danger: true,
		},
	].filter((i) => i.show);

	const menuH = items.length * 44;
	const bubbleH = Math.min(rect.height, 360);
	const top = Math.max(
		120,
		Math.min(rect.top, SCREEN_H - 40 - menuH - 12 - bubbleH),
	);
	const side = mine ? { right: 14 } : { left: 14 };

	return (
		<motion.div
			className="absolute inset-0 z-40"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.18 }}
		>
			<button
				type="button"
				aria-label="Cerrar menú"
				onClick={onClose}
				className="absolute inset-0 bg-black/10 backdrop-blur-[18px]"
			/>

			{!msg.deleted && (
				<motion.div
					className={`${GLASS_STRONG} absolute flex items-center gap-[2px] rounded-full px-[6px] py-[4px]`}
					style={{ ...side, top: top - 58 }}
					initial={{ scale: 0.4, opacity: 0, y: 10 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					exit={{ scale: 0.6, opacity: 0 }}
					transition={{ ...SPRING, delay: 0.03 }}
				>
					{REACTIONS.map((e, i) => (
						<motion.button
							type="button"
							key={e}
							onClick={() => onReact(e)}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ ...SPRING, delay: 0.04 + i * 0.025 }}
							whileHover={{ scale: 1.22, y: -3 }}
							whileTap={{ scale: 0.9 }}
							className={`flex size-[42px] items-center justify-center rounded-full text-[29px] ${
								current === e ? "bg-[#E9EDEF]" : ""
							}`}
						>
							{e}
						</motion.button>
					))}
					<span className="ml-[2px] flex size-[34px] items-center justify-center rounded-full bg-[#F0F2F5] text-[#54656F]">
						<Plus className="size-[20px]" strokeWidth={2} />
					</span>
				</motion.div>
			)}

			<motion.div
				className="pointer-events-none absolute inset-x-[14px] overflow-hidden"
				style={{ maxHeight: bubbleH + 22 }}
				initial={{ top: rect.top, scale: 1 }}
				animate={{ top, scale: 1.02 }}
				exit={{ top: rect.top, scale: 1, opacity: 0 }}
				transition={SPRING}
			>
				<Bubble msg={msg} first={menu.first} last={menu.last} group={group} />
			</motion.div>

			<motion.div
				className={`${GLASS_STRONG} absolute w-[240px] overflow-hidden rounded-[26px] py-[6px]`}
				style={{
					...side,
					top: top + bubbleH + 12,
					transformOrigin: mine ? "100% 0" : "0 0",
				}}
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.6, opacity: 0 }}
				transition={SPRING}
			>
				{items.map((it) => (
					<button
						type="button"
						key={it.label}
						onClick={it.run}
						className={`flex h-[44px] w-full items-center justify-between px-[18px] text-[17px] active:bg-black/5 ${
							it.danger ? "text-[#FF3B30]" : "text-black"
						}`}
					>
						{it.label}
						<it.icon className="size-[19px]" strokeWidth={1.7} />
					</button>
				))}
			</motion.div>
		</motion.div>
	);
}
