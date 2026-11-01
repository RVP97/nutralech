/** The interactive WhatsApp demo on the home page: chat list, conversations and Marialy's bot. */
import { ChatView } from "./chat";
import { type Chat, clock, createChats, type LinkPreview, MARIALY_ID, type Message, plain, type ReplyRef, uid, WA_LINK } from "./data";
import { el, esc, GLASS_STRONG, SCREEN_W, SPRING_EASE, tween, wait } from "./html";
import { appGlyph } from "./icons";
import { type BotMemory, buildReply, INTRO, type ReplyPart } from "./replies";
import { infoView, ListView } from "./screens";
import { haptic, sounds } from "./sound";

const PUSH_MS = 420;

export function mountWhatsAppDemo(wrap: HTMLElement) {
	const root = wrap.querySelector<HTMLElement>("[data-wa-root]");
	if (!root || root.dataset.mounted) return;
	root.dataset.mounted = "";

	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	const scale = () => Number(wrap.dataset.scale) || 1;
	const push = (from: number, to: number, onFrame: (v: number) => void) => tween(from, to, reduce ? 0 : PUSH_MS, onFrame);

	let chats: Chat[] = createChats();
	let activeId: string | null = null;
	let infoOpen = false;
	let unreadFrom: { id: string; count: number } | null = null;
	let engaged = false;
	let alive = true;
	let chatX = SCREEN_W;
	let infoX = SCREEN_W;
	const bot = { queue: [] as string[], busy: false, offlineTimer: undefined as ReturnType<typeof setTimeout> | undefined };
	const memory: BotMemory = { turns: 0, ctaShown: false };
	const timers = new Set<ReturnType<typeof setTimeout>>();
	const later = (fn: () => void, ms: number) => {
		const t = setTimeout(() => {
			timers.delete(t);
			fn();
		}, ms);
		timers.add(t);
		return t;
	};

	const starred = () => chats.reduce((n, c) => n + c.messages.filter((m) => m.starred).length, 0);
	const active = () => chats.find((c) => c.id === activeId) ?? null;

	// ─── Layers ───────────────────────────────────────────────────────────
	root.className = "absolute inset-0 overflow-hidden bg-black";
	root.innerHTML = "";
	const list = new ListView(() => chats, starred, (id) => openChat(id));
	const chatLayer = el(`<div class="absolute inset-0 shadow-[-10px_0_30px_rgba(0,0,0,0.12)] will-change-transform" hidden></div>`);
	const infoLayer = el(`<div class="absolute inset-0 z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.12)] will-change-transform" hidden></div>`);
	root.append(list.el, chatLayer, infoLayer);
	let chatView: ChatView | null = null;

	const layout = () => {
		list.el.style.transform = `translateX(${-0.3 * (SCREEN_W - chatX)}px)`;
		list.dim.style.opacity = String(0.1 * (1 - chatX / SCREEN_W));
		chatLayer.style.transform = `translateX(${chatX + (infoX - SCREEN_W) * 0.3}px)`;
		infoLayer.style.transform = `translateX(${infoX}px)`;
	};
	const setChatX = (v: number) => {
		chatX = v;
		layout();
	};
	const setInfoX = (v: number) => {
		infoX = v;
		layout();
	};

	// Several patches in one tick render once.
	let queued = false;
	const render = () => {
		if (queued) return;
		queued = true;
		queueMicrotask(() => {
			queued = false;
			if (!alive) return;
			list.render();
			const chat = active();
			if (chat && chatView) chatView.update(chat, chats.filter((c) => c.id !== chat.id && c.unread > 0).length);
			if (chat && infoOpen) renderInfo(chat);
		});
	};
	const patch = (id: string, fn: (c: Chat) => Chat) => {
		chats = chats.map((c) => (c.id === id ? fn(c) : c));
		render();
	};

	const engage = () => {
		if (engaged) return;
		engaged = true;
		const hint = document.querySelector<HTMLElement>("[data-wa-hint]");
		if (hint) {
			hint.style.opacity = "0";
			hint.style.transform = "translateY(-4px)";
		}
	};
	root.addEventListener("pointerdown", engage);

	// ─── Marialy's side of the conversation ───────────────────────────────
	const setPresence = (online: boolean, typing = false) =>
		patch(MARIALY_ID, (c) => ({ ...c, online, typing, lastSeen: online ? c.lastSeen : clock() }));

	const deliver = (part: ReplyPart) => {
		const inChat = activeId === MARIALY_ID;
		const msg: Message = { id: uid(), from: "them", text: part.text ?? "", time: clock(), buttons: part.buttons, link: part.link };
		patch(MARIALY_ID, (c) => ({
			...c,
			typing: false,
			ts: Date.now(),
			unread: inChat ? 0 : c.unread + 1,
			messages: [...c.messages, msg],
		}));
		if (inChat) {
			if (engaged) sounds.receive();
		} else {
			if (engaged) sounds.notify();
			showBanner(MARIALY_ID, "Marialy Alonso", plain(msg.text));
		}
	};

	const markRead = (id: string) =>
		patch(id, (c) => ({
			...c,
			messages: c.messages.map((m) => (m.from === "me" && m.status !== "read" ? { ...m, status: "read" } : m)),
		}));

	const speak = async (parts: ReplyPart[]) => {
		for (const part of parts) {
			if (!alive) return;
			if (part.react) {
				const emoji = part.react;
				patch(MARIALY_ID, (c) => {
					let idx = c.messages.length - 1;
					while (idx >= 0 && c.messages[idx].from !== "me") idx--;
					if (idx < 0) return c;
					const messages = [...c.messages];
					messages[idx] = { ...messages[idx], reactions: { ...messages[idx].reactions, them: emoji } };
					return { ...c, messages };
				});
				await wait(500);
				continue;
			}
			setPresence(true, true);
			await wait(Math.min(2600, Math.max(900, (part.text ?? "").length * 26)));
			if (!alive) return;
			deliver(part);
			await wait(420);
		}
	};

	const pump = async () => {
		if (bot.busy) return;
		bot.busy = true;
		clearTimeout(bot.offlineTimer);
		while (bot.queue.length && alive) {
			const wasOnline = chats.find((c) => c.id === MARIALY_ID)?.online;
			await wait(wasOnline ? 450 : 1100);
			setPresence(true);
			markRead(MARIALY_ID);
			await wait(650);
			await speak(buildReply(bot.queue.splice(0).join(" "), memory));
		}
		bot.busy = false;
		if (!alive) return;
		setPresence(true, false);
		bot.offlineTimer = later(() => {
			if (!bot.busy) setPresence(false);
		}, 7000);
	};

	// Intro: once the phone is on screen, Marialy says hi.
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			io.disconnect();
			void (async () => {
				bot.busy = true;
				await wait(1100);
				await speak(INTRO);
				bot.busy = false;
				if (!alive) return;
				setPresence(true, false);
				if (bot.queue.length) void pump();
				else bot.offlineTimer = later(() => setPresence(false), 5000);
			})();
		},
		{ threshold: 0.55 },
	);
	io.observe(root);

	// ─── Your side ────────────────────────────────────────────────────────
	const send = (chatId: string, text: string, replyTo?: ReplyRef) => {
		engage();
		const id = uid();
		patch(chatId, (c) => ({
			...c,
			ts: Date.now(),
			messages: [...c.messages, { id, from: "me", text, time: clock(), status: "pending", replyTo }],
		}));
		sounds.send();
		const setStatus = (status: Message["status"]) =>
			patch(chatId, (c) => ({
				...c,
				messages: c.messages.map((m) => (m.id === id && m.status !== "read" ? { ...m, status } : m)),
			}));
		later(() => setStatus("sent"), 350);
		later(() => setStatus("delivered"), 800);
		if (chatId === MARIALY_ID) {
			bot.queue.push(text);
			void pump();
		}
	};

	const react = (chatId: string, msgId: string, emoji: string) => {
		engage();
		haptic();
		patch(chatId, (c) => ({
			...c,
			messages: c.messages.map((m) =>
				m.id === msgId ? { ...m, reactions: { ...m.reactions, me: m.reactions?.me === emoji ? undefined : emoji } } : m,
			),
		}));
	};

	const openLink = (link: LinkPreview) => {
		engage();
		if (link.internal) document.querySelector(link.href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
		else window.open(link.href, "_blank", "noopener,noreferrer");
	};

	// ─── Navigation (iOS push / pop, with interactive edge swipe) ─────────
	function openChat(id: string) {
		engage();
		const chat = chats.find((c) => c.id === id);
		if (!chat) return;
		hideBanner();
		unreadFrom =
			chat.unread > 0 ? { id: chat.messages[chat.messages.length - chat.unread]?.id ?? "", count: chat.unread } : null;
		activeId = id;
		chats = chats.map((c) => (c.id === id ? { ...c, unread: 0 } : c));
		chatView?.destroy();
		chatView = new ChatView(
			chats.find((c) => c.id === id) as Chat,
			chats.filter((c) => c.id !== id && c.unread > 0).length,
			{ fine, reduce, unreadFrom, scale },
			{
				onBack: closeChat,
				onSend: (t, r) => send(id, t, r),
				onReact: (m, e) => react(id, m, e),
				onDelete: (m) =>
					patch(id, (c) => ({
						...c,
						messages: c.messages
							.map((x) => (x.id === m && x.from === "me" ? { ...x, deleted: true, reactions: undefined } : x))
							.filter((x) => x.id !== m || x.from === "me"),
					})),
				onStar: (m) => patch(id, (c) => ({ ...c, messages: c.messages.map((x) => (x.id === m ? { ...x, starred: !x.starred } : x)) })),
				onOpenInfo: openInfo,
				onCall: showAlert,
				onLink: openLink,
				onEdgeDown: edgeDown,
			},
		);
		chatLayer.replaceChildren(chatView.el);
		chatLayer.hidden = false;
		render();
		setChatX(SCREEN_W);
		void push(SCREEN_W, 0, setChatX);
	}

	function closeChat() {
		activeId = null;
		void push(chatX, SCREEN_W, setChatX).then(() => {
			if (activeId !== null) return;
			chatView?.destroy();
			chatView = null;
			chatLayer.replaceChildren();
			chatLayer.hidden = true;
			infoOpen = false;
			infoLayer.hidden = true;
			setInfoX(SCREEN_W);
			unreadFrom = null;
		});
	}

	function renderInfo(chat: Chat) {
		infoLayer.innerHTML = infoView(chat, starred());
	}
	function openInfo() {
		const chat = active();
		if (!chat) return;
		infoOpen = true;
		renderInfo(chat);
		infoLayer.hidden = false;
		setInfoX(SCREEN_W);
		void push(SCREEN_W, 0, setInfoX);
	}
	function closeInfo() {
		void push(infoX, SCREEN_W, setInfoX).then(() => {
			infoOpen = false;
			infoLayer.hidden = true;
		});
	}
	infoLayer.addEventListener("click", (e) => {
		const act = (e.target as HTMLElement).closest<HTMLElement>("[data-act]")?.dataset.act;
		if (act === "info-back") closeInfo();
		if (act === "call") showAlert();
	});

	function edgeDown(e: PointerEvent) {
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
			v = (ev.clientX - lastX) / scale() / Math.max(1, now - lastT);
			lastX = ev.clientX;
			lastT = now;
			setChatX(Math.max(0, (ev.clientX - startX) / scale()));
		};
		const up = () => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerup", up);
			target.removeEventListener("pointercancel", up);
			if (chatX > SCREEN_W * 0.35 || v > 0.5) closeChat();
			else void tween(chatX, 0, 300, setChatX, [0.2, 1, 0.3, 1]);
		};
		target.addEventListener("pointermove", move);
		target.addEventListener("pointerup", up);
		target.addEventListener("pointercancel", up);
	}

	// ─── Notification banner (dismisses itself, or drag it up) ────────────
	let banner: HTMLElement | null = null;
	let bannerTimer: ReturnType<typeof setTimeout> | undefined;
	function hideBanner() {
		clearTimeout(bannerTimer);
		const b = banner;
		if (!b) return;
		banner = null;
		if (reduce) return b.remove();
		b.animate([{ transform: b.style.transform || "none" }, { transform: "translateY(-140px)", opacity: 0 }], {
			duration: 260,
			easing: "ease-in",
		}).finished.then(() => b.remove());
	}
	function showBanner(chatId: string, title: string, text: string) {
		if (banner) {
			clearTimeout(bannerTimer);
			banner.remove();
		}
		const b = el(`<button type="button" class="absolute inset-x-[9px] top-[54px] z-[60] flex items-center gap-[10px] rounded-[30px] p-[14px] text-left ${GLASS_STRONG}" style="touch-action:none">
${appGlyph}<span class="min-w-0 flex-1"><span class="flex items-baseline justify-between"><span class="truncate text-[15px] font-semibold text-black">${esc(
			title,
		)}</span><span class="ml-[8px] shrink-0 text-[13px] text-black/45">ahora</span></span><span class="line-clamp-2 text-[15px] leading-[19px] text-black">${esc(
			text,
		)}</span></span></button>`);
		banner = b;
		root?.append(b);
		if (!reduce)
			b.animate(
				[
					{ transform: "translateY(-140px) scale(0.96)", opacity: 0.4 },
					{ transform: "none", opacity: 1 },
				],
				{ duration: 480, easing: SPRING_EASE },
			);
		let dragged = false;
		b.addEventListener("pointerdown", (e) => {
			const sy = e.clientY;
			let dy = 0;
			try {
				b.setPointerCapture(e.pointerId);
			} catch {}
			const move = (ev: PointerEvent) => {
				dy = (ev.clientY - sy) / scale();
				if (Math.abs(dy) > 4) dragged = true;
				b.style.transform = `translateY(${dy < 0 ? dy * 0.8 : dy * 0.1}px)`;
			};
			const up = () => {
				b.removeEventListener("pointermove", move);
				b.removeEventListener("pointerup", up);
				b.removeEventListener("pointercancel", up);
				if (dy < -20) hideBanner();
				else if (dy) void tween(dy < 0 ? dy * 0.8 : dy * 0.1, 0, 250, (v) => (b.style.transform = `translateY(${v}px)`), [0.2, 1, 0.3, 1]);
			};
			b.addEventListener("pointermove", move);
			b.addEventListener("pointerup", up);
			b.addEventListener("pointercancel", up);
		});
		b.addEventListener("click", () => {
			if (dragged) {
				dragged = false;
				return;
			}
			openChat(chatId);
		});
		bannerTimer = later(hideBanner, 4800);
	}

	// ─── iOS alert for calls ──────────────────────────────────────────────
	function showAlert() {
		const overlay = el(`<div class="absolute inset-0 z-[65] flex items-center justify-center bg-black/25">
<div data-box class="w-[300px] overflow-hidden rounded-[34px] p-[20px] text-center ${GLASS_STRONG}">
<p class="text-[17px] font-semibold leading-[22px]">Plan 100% a distancia</p>
<p class="mt-[6px] text-[15px] leading-[20px] text-black/70">No hay llamadas ni videollamadas: todo es por mensaje, a tu ritmo. ¿Quieres escribirle a Marialy?</p>
<div class="mt-[18px] flex gap-[10px] text-[17px] font-semibold">
<button type="button" data-act="dismiss" class="h-[48px] flex-1 rounded-full bg-black/[0.07] transition-transform active:scale-[0.96]">Ahora no</button>
<button type="button" data-act="write" class="h-[48px] flex-1 rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6)] transition-transform active:scale-[0.96]">Escribir</button>
</div>
</div>
</div>`);
		root?.append(overlay);
		if (!reduce) {
			overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180 });
			overlay
				.querySelector("[data-box]")
				?.animate([{ transform: "scale(0.7)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 380, easing: SPRING_EASE });
		}
		const close = () => {
			if (reduce) return overlay.remove();
			overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180 }).finished.then(() => overlay.remove());
		};
		overlay.addEventListener("click", (e) => {
			const act = (e.target as HTMLElement).closest<HTMLElement>("[data-act]")?.dataset.act;
			if (act === "dismiss") close();
			if (act === "write") {
				close();
				window.open(WA_LINK, "_blank", "noopener,noreferrer");
			}
		});
	}

	layout();

	// Leaving the page stops the bot and every timer.
	document.addEventListener(
		"astro:before-swap",
		() => {
			alive = false;
			io.disconnect();
			clearTimeout(bot.offlineTimer);
			for (const t of timers) clearTimeout(t);
			chatView?.destroy();
		},
		{ once: true },
	);
}
