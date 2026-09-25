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
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { ChatView } from "./chat-view";
import {
	type Chat,
	clock,
	createChats,
	type LinkPreview,
	MARIALY_ID,
	type Message,
	plain,
	type ReplyRef,
	uid,
	WA_LINK,
} from "./data";
import { FLUID, GLASS_STRONG } from "./glass";
import { AppGlyph } from "./icons";
import { SCREEN_W, useScale } from "./iphone";
import { type BotMemory, buildReply, INTRO, type ReplyPart } from "./replies";
import {
	CallsTab,
	ChatsTab,
	CommunitiesTab,
	InfoView,
	SettingsTab,
	TabBar,
	type TabId,
	UpdatesTab,
} from "./screens";
import { haptic, sounds } from "./sound";

const IOS_EASE = [0.32, 0.72, 0, 1] as const;
const PUSH = { duration: 0.42, ease: IOS_EASE };

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface Banner {
	key: string;
	chatId: string;
	title: string;
	text: string;
}

export function WhatsAppDemo({ onEngage }: { onEngage?: () => void }) {
	const reduce = useReducedMotion();
	const scale = useScale();
	const rootRef = useRef<HTMLDivElement>(null);

	const [chats, setChats] = useState<Chat[] | null>(null);
	const [tab, setTab] = useState<TabId>("chats");
	const [activeId, setActiveId] = useState<string | null>(null);
	const [infoOpen, setInfoOpen] = useState(false);
	const [unreadFrom, setUnreadFrom] = useState<{
		id: string;
		count: number;
	} | null>(null);
	const [banner, setBanner] = useState<Banner | null>(null);
	const [alert, setAlert] = useState(false);
	const [fine, setFine] = useState(false);

	const activeRef = useRef<string | null>(null);
	const engaged = useRef(false);
	const alive = useRef(true);
	const bot = useRef({
		queue: [] as string[],
		busy: false,
		offlineTimer: 0 as ReturnType<typeof setTimeout> | 0,
	});
	const memory = useRef<BotMemory>({ turns: 0, ctaShown: false });
	const chatsRef = useRef<Chat[] | null>(null);
	useEffect(() => {
		chatsRef.current = chats;
	}, [chats]);

	const chatX = useMotionValue(SCREEN_W);
	const infoX = useMotionValue(SCREEN_W);
	const listX = useTransform(chatX, [0, SCREEN_W], [-SCREEN_W * 0.3, 0]);
	const listDim = useTransform(chatX, [0, SCREEN_W], [0.1, 0]);
	const chatShiftX = useTransform(
		[chatX, infoX],
		([c, i]: number[]) => c + (i - SCREEN_W) * 0.3,
	);

	useEffect(() => {
		setChats(createChats());
		setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
		return () => {
			alive.current = false;
		};
	}, []);

	const engage = useCallback(() => {
		if (!engaged.current) {
			engaged.current = true;
			onEngage?.();
		}
	}, [onEngage]);

	const patch = useCallback((id: string, fn: (c: Chat) => Chat) => {
		setChats((cs) => cs?.map((c) => (c.id === id ? fn(c) : c)) ?? cs);
	}, []);

	// ─── Marialy's side of the conversation ────────────────────────────────
	const setPresence = useCallback(
		(online: boolean, typing = false) =>
			patch(MARIALY_ID, (c) => ({
				...c,
				online,
				typing,
				lastSeen: online ? c.lastSeen : clock(),
			})),
		[patch],
	);

	const deliver = useCallback(
		(part: ReplyPart) => {
			const inChat = activeRef.current === MARIALY_ID;
			const msg: Message = {
				id: uid(),
				from: "them",
				text: part.text ?? "",
				time: clock(),
				buttons: part.buttons,
				link: part.link,
			};
			patch(MARIALY_ID, (c) => ({
				...c,
				typing: false,
				ts: Date.now(),
				unread: inChat ? 0 : c.unread + 1,
				messages: [...c.messages, msg],
			}));
			if (inChat) {
				if (engaged.current) sounds.receive();
			} else {
				if (engaged.current) sounds.notify();
				setBanner({
					key: msg.id,
					chatId: MARIALY_ID,
					title: "Marialy Alonso",
					text: plain(msg.text),
				});
			}
		},
		[patch],
	);

	const markRead = useCallback(
		(id: string) =>
			patch(id, (c) => ({
				...c,
				messages: c.messages.map((m) =>
					m.from === "me" && m.status !== "read" ? { ...m, status: "read" } : m,
				),
			})),
		[patch],
	);

	const speak = useCallback(
		async (parts: ReplyPart[]) => {
			for (const part of parts) {
				if (!alive.current) return;
				if (part.react) {
					patch(MARIALY_ID, (c) => {
						let idx = c.messages.length - 1;
						while (idx >= 0 && c.messages[idx].from !== "me") idx--;
						if (idx < 0) return c;
						const messages = [...c.messages];
						messages[idx] = {
							...messages[idx],
							reactions: { ...messages[idx].reactions, them: part.react },
						};
						return { ...c, messages };
					});
					await wait(500);
					continue;
				}
				setPresence(true, true);
				const len = (part.text ?? "").length;
				await wait(Math.min(2600, Math.max(900, len * 26)));
				if (!alive.current) return;
				deliver(part);
				await wait(420);
			}
		},
		[deliver, patch, setPresence],
	);

	const pump = useCallback(async () => {
		const b = bot.current;
		if (b.busy) return;
		b.busy = true;
		clearTimeout(b.offlineTimer);
		while (b.queue.length && alive.current) {
			const wasOnline = chatsRef.current?.find(
				(c) => c.id === MARIALY_ID,
			)?.online;
			await wait(wasOnline ? 450 : 1100);
			setPresence(true);
			markRead(MARIALY_ID);
			await wait(650);
			const text = b.queue.splice(0).join(" ");
			await speak(buildReply(text, memory.current));
		}
		b.busy = false;
		setPresence(true, false);
		b.offlineTimer = setTimeout(() => {
			if (!bot.current.busy) setPresence(false);
		}, 7000);
	}, [markRead, setPresence, speak]);

	const ready = chats !== null;

	// Intro: once the phone is on screen, Marialy says hi.
	useEffect(() => {
		const el = rootRef.current;
		if (!el || !ready) return;
		let started = false;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || started) return;
				started = true;
				io.disconnect();
				(async () => {
					const b = bot.current;
					b.busy = true;
					await wait(1100);
					await speak(INTRO);
					b.busy = false;
					setPresence(true, false);
					if (b.queue.length) pump();
					else b.offlineTimer = setTimeout(() => setPresence(false), 5000);
				})();
			},
			{ threshold: 0.55 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [ready, pump, setPresence, speak]);

	// ─── Your side ─────────────────────────────────────────────────────────
	const send = useCallback(
		(chatId: string, text: string, replyTo?: ReplyRef) => {
			engage();
			const id = uid();
			const responsive = chatId === MARIALY_ID;
			patch(chatId, (c) => ({
				...c,
				ts: Date.now(),
				messages: [
					...c.messages,
					{ id, from: "me", text, time: clock(), status: "pending", replyTo },
				],
			}));
			sounds.send();
			const setStatus = (status: Message["status"]) =>
				patch(chatId, (c) => ({
					...c,
					messages: c.messages.map((m) =>
						m.id === id && m.status !== "read" ? { ...m, status } : m,
					),
				}));
			setTimeout(() => setStatus("sent"), 350);
			setTimeout(() => setStatus("delivered"), 800);
			if (responsive) {
				bot.current.queue.push(text);
				pump();
			}
		},
		[engage, patch, pump],
	);

	const react = (chatId: string, msgId: string, emoji: string) => {
		engage();
		haptic();
		patch(chatId, (c) => ({
			...c,
			messages: c.messages.map((m) =>
				m.id === msgId
					? {
							...m,
							reactions: {
								...m.reactions,
								me: m.reactions?.me === emoji ? undefined : emoji,
							},
						}
					: m,
			),
		}));
	};

	// ─── Navigation (iOS push / pop, with interactive edge swipe) ──────────
	const openChat = (id: string) => {
		engage();
		const chat = chats?.find((c) => c.id === id);
		if (!chat) return;
		setBanner(null);
		setUnreadFrom(
			chat.unread > 0
				? {
						id: chat.messages[chat.messages.length - chat.unread]?.id ?? "",
						count: chat.unread,
					}
				: null,
		);
		activeRef.current = id;
		setActiveId(id);
		patch(id, (c) => ({ ...c, unread: 0 }));
		chatX.set(SCREEN_W);
		animate(chatX, 0, reduce ? { duration: 0 } : PUSH);
	};

	const closeChat = () => {
		activeRef.current = null;
		animate(chatX, SCREEN_W, reduce ? { duration: 0 } : PUSH).then(() => {
			if (activeRef.current === null) {
				setActiveId(null);
				setInfoOpen(false);
				setUnreadFrom(null);
			}
		});
	};

	const openInfo = () => {
		setInfoOpen(true);
		infoX.set(SCREEN_W);
		animate(infoX, 0, reduce ? { duration: 0 } : PUSH);
	};
	const closeInfo = () => {
		animate(infoX, SCREEN_W, reduce ? { duration: 0 } : PUSH).then(() =>
			setInfoOpen(false),
		);
	};

	const edgeDown = (e: ReactPointerEvent) => {
		const target = e.currentTarget as HTMLElement;
		try {
			target.setPointerCapture(e.pointerId);
		} catch {}
		const startX = e.clientX;
		let lastX = e.clientX;
		let lastT = performance.now();
		let v = 0;
		const move = (ev: PointerEvent) => {
			const now = performance.now();
			v = (ev.clientX - lastX) / scale / Math.max(1, now - lastT);
			lastX = ev.clientX;
			lastT = now;
			chatX.set(Math.max(0, (ev.clientX - startX) / scale));
		};
		const up = () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerup", up);
			target.removeEventListener("pointercancel", up);
			if (chatX.get() > SCREEN_W * 0.35 || v > 0.5) closeChat();
			else animate(chatX, 0, { type: "spring", stiffness: 500, damping: 45 });
		};
		target.addEventListener("pointermove", move);
		target.addEventListener("pointerup", up);
		target.addEventListener("pointercancel", up);
	};

	const openLink = (link: LinkPreview) => {
		engage();
		if (link.internal) {
			document
				.querySelector(link.href)
				?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
		} else {
			window.open(link.href, "_blank", "noopener,noreferrer");
		}
	};

	// Banners dismiss themselves, like iOS.
	useEffect(() => {
		if (!banner) return;
		const t = setTimeout(() => setBanner(null), 4800);
		return () => clearTimeout(t);
	}, [banner]);

	if (!chats)
		return <div ref={rootRef} className="absolute inset-0 bg-white" />;

	const active = chats.find((c) => c.id === activeId) ?? null;
	const unreadChats = chats.filter((c) => c.unread > 0).length;
	const starred = chats.reduce(
		(n, c) => n + c.messages.filter((m) => m.starred).length,
		0,
	);

	return (
		<div
			ref={rootRef}
			className="absolute inset-0 overflow-hidden bg-black"
			onPointerDown={engage}
		>
			{/* Root: tabs */}
			<motion.div className="absolute inset-0 bg-white" style={{ x: listX }}>
				{tab === "chats" && <ChatsTab chats={chats} onOpen={openChat} />}
				{tab === "updates" && <UpdatesTab chats={chats} />}
				{tab === "calls" && <CallsTab chats={chats} />}
				{tab === "communities" && <CommunitiesTab />}
				{tab === "settings" && <SettingsTab starred={starred} />}
				<TabBar tab={tab} onTab={setTab} unreadChats={unreadChats} />
				<motion.div
					className="pointer-events-none absolute inset-0 z-30 bg-black"
					style={{ opacity: listDim }}
				/>
			</motion.div>

			{/* Pushed: conversation */}
			{active && (
				<motion.div
					className="absolute inset-0 shadow-[-10px_0_30px_rgba(0,0,0,0.12)]"
					style={{ x: chatShiftX }}
				>
					<ChatView
						key={active.id}
						chat={active}
						fine={fine}
						unreadFrom={unreadFrom}
						backBadge={
							chats.filter((c) => c.id !== active.id && c.unread > 0).length
						}
						onBack={closeChat}
						onSend={(t, r) => send(active.id, t, r)}
						onReact={(m, e) => react(active.id, m, e)}
						onDelete={(m) =>
							patch(active.id, (c) => ({
								...c,
								messages: c.messages
									.map((x) =>
										x.id === m && x.from === "me"
											? { ...x, deleted: true, reactions: undefined }
											: x,
									)
									.filter((x) => x.id !== m || x.from === "me"),
							}))
						}
						onStar={(m) =>
							patch(active.id, (c) => ({
								...c,
								messages: c.messages.map((x) =>
									x.id === m ? { ...x, starred: !x.starred } : x,
								),
							}))
						}
						onOpenInfo={openInfo}
						onCall={() => setAlert(true)}
						onLink={openLink}
						onEdgeDown={edgeDown}
					/>
				</motion.div>
			)}

			{/* Pushed: contact info */}
			{active && infoOpen && (
				<motion.div
					className="absolute inset-0 z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.12)]"
					style={{ x: infoX }}
				>
					<InfoView
						chat={active}
						onBack={closeInfo}
						onCall={() => setAlert(true)}
						starred={starred}
					/>
				</motion.div>
			)}

			{/* Notification banner */}
			<AnimatePresence>
				{banner && (
					<motion.button
						key={banner.key}
						type="button"
						drag="y"
						dragConstraints={{ top: 0, bottom: 0 }}
						dragElastic={{ top: 0.8, bottom: 0.1 }}
						onDragEnd={(_, info) => {
							if (info.offset.y < -20) setBanner(null);
						}}
						onClick={() => openChat(banner.chatId)}
						initial={{ y: -140, opacity: 0.4, scale: 0.96 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: -140, opacity: 0 }}
						transition={{ type: "spring", stiffness: 420, damping: 34 }}
						className={`absolute inset-x-[9px] top-[54px] z-[60] flex items-center gap-[10px] rounded-[30px] p-[14px] text-left ${GLASS_STRONG}`}
					>
						<AppGlyph />
						<span className="min-w-0 flex-1">
							<span className="flex items-baseline justify-between">
								<span className="truncate text-[15px] font-semibold text-black">
									{banner.title}
								</span>
								<span className="ml-[8px] shrink-0 text-[13px] text-black/45">
									ahora
								</span>
							</span>
							<span className="line-clamp-2 text-[15px] leading-[19px] text-black">
								{banner.text}
							</span>
						</span>
					</motion.button>
				)}
			</AnimatePresence>

			{/* iOS alert for calls */}
			<AnimatePresence>
				{alert && (
					<motion.div
						className="absolute inset-0 z-[65] flex items-center justify-center bg-black/25"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18 }}
					>
						<motion.div
							initial={{ scale: 0.7, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={FLUID}
							className={`w-[300px] overflow-hidden rounded-[34px] p-[20px] text-center ${GLASS_STRONG}`}
						>
							<p className="text-[17px] font-semibold leading-[22px]">
								Plan 100% a distancia
							</p>
							<p className="mt-[6px] text-[15px] leading-[20px] text-black/70">
								No hay llamadas ni videollamadas: todo es por mensaje, a tu
								ritmo. ¿Quieres escribirle a Marialy?
							</p>
							<div className="mt-[18px] flex gap-[10px] text-[17px] font-semibold">
								<motion.button
									type="button"
									whileTap={{ scale: 0.96 }}
									transition={FLUID}
									onClick={() => setAlert(false)}
									className="h-[48px] flex-1 rounded-full bg-black/[0.07]"
								>
									Ahora no
								</motion.button>
								<motion.button
									type="button"
									whileTap={{ scale: 0.96 }}
									transition={FLUID}
									onClick={() => {
										setAlert(false);
										window.open(WA_LINK, "_blank", "noopener,noreferrer");
									}}
									className="h-[48px] flex-1 rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6)]"
								>
									Escribir
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
