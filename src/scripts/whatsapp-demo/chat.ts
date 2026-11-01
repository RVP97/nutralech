/** One open conversation in the WhatsApp demo: header, messages, composer, keyboard and long-press menu. */
import type { Chat, LinkPreview, Message, ReplyRef } from "./data";
import { avatar, bubble, el, esc, GLASS, GLASS_BUTTON, GLASS_STRONG, SAFE_BOTTOM, SCREEN_H, tween, WALLPAPER } from "./html";
import {
	Camera,
	ChevronDown,
	ChevronLeft,
	Copy,
	icon,
	Lock,
	Mic,
	Phone,
	Plus,
	Reply,
	Star,
	sendIcon,
	stickerIcon,
	Trash2,
	tail,
	Video,
	X,
} from "./icons";
import { IOSKeyboard, KEYBOARD_H } from "./keyboard";
import { suggest } from "./replies";
import { haptic } from "./sound";

const HEADER_H = 104;
const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
const SPRING = "cubic-bezier(0.22, 1.2, 0.36, 1)";

export interface ChatViewHandlers {
	onBack: () => void;
	onSend: (text: string, replyTo?: ReplyRef) => void;
	onReact: (msgId: string, emoji: string) => void;
	onDelete: (msgId: string) => void;
	onStar: (msgId: string) => void;
	onOpenInfo: () => void;
	onCall: () => void;
	onLink: (link: LinkPreview) => void;
	onEdgeDown: (e: PointerEvent) => void;
}

interface Options {
	fine: boolean;
	reduce: boolean;
	unreadFrom: { id: string; count: number } | null;
	scale: () => number;
}

const same = (a?: Message, b?: Message) => !!a && !!b && a.from === b.from && a.author === b.author && a.day === b.day;

export class ChatView {
	readonly el: HTMLElement;
	private chat: Chat;
	private scroller: HTMLElement;
	private list: HTMLElement;
	private ta: HTMLTextAreaElement;
	private keyboard: IOSKeyboard | null = null;
	private rows = new Map<string, { node: HTMLElement; html: string }>();
	private typingEl: HTMLElement | null = null;
	private statusText = "";
	private atBottom = true;
	private missed = 0;
	private focused = false;
	private reply: ReplyRef | null = null;
	private flash: string | null = null;
	private hint = true;
	private menu: HTMLElement | null = null;
	private timers: ReturnType<typeof setTimeout>[] = [];
	private resize: ResizeObserver;

	constructor(
		chat: Chat,
		backBadge: number,
		private opts: Options,
		private h: ChatViewHandlers,
	) {
		this.chat = chat;
		this.el = el(this.shell());
		this.scroller = this.q("[data-scroll]");
		this.list = this.q("[data-messages]");
		this.ta = this.q<HTMLTextAreaElement>("textarea");

		if (opts.fine) {
			this.keyboard = new IOSKeyboard({
				onInsert: (s) => this.insert(s),
				onBackspace: () => this.backspace(),
				onEnter: () => this.send(),
				onSuggestion: (w) => this.setText(this.ta.value.replace(/[\p{L}]*$/u, `${w} `)),
			});
			this.q("[data-kb]").append(this.keyboard.el);
			this.refreshKeyboard();
		}

		this.wire();
		this.update(chat, backBadge, true);
		this.later(() => {
			this.hint = false;
			this.renderStatus();
		}, 3200);

		// Keep the conversation pinned to the bottom while the keyboard slides in.
		this.resize = new ResizeObserver(() => {
			if (this.atBottom) this.scroller.scrollTop = this.scroller.scrollHeight;
		});
		this.resize.observe(this.scroller);

		// Land on the "unread messages" divider (or the bottom) when the chat opens.
		requestAnimationFrame(() => {
			const marker = opts.unreadFrom && this.scroller.querySelector<HTMLElement>("[data-unread]");
			this.scroller.scrollTop = marker ? marker.offsetTop - HEADER_H - 40 : this.scroller.scrollHeight;
		});
	}

	destroy() {
		for (const t of this.timers) clearTimeout(t);
		this.resize.disconnect();
	}

	private q<T extends HTMLElement = HTMLElement>(selector: string) {
		return this.el.querySelector<T>(selector) as T;
	}

	private later(fn: () => void, ms: number) {
		this.timers.push(setTimeout(fn, ms));
	}

	private shell() {
		const chat = this.chat;
		return `<div class="absolute inset-0 flex flex-col overflow-hidden bg-[#EFEAE2]" style='background-image:${WALLPAPER};background-size:260px 260px'>
<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 z-30 backdrop-blur-[8px]" style="height:${
			HEADER_H + 14
		}px;background:linear-gradient(180deg,rgba(239,234,226,0.9),rgba(239,234,226,0.55) 70%,rgba(239,234,226,0));-webkit-mask-image:linear-gradient(180deg,#000 62%,transparent);mask-image:linear-gradient(180deg,#000 62%,transparent)"></div>
<div class="absolute inset-x-0 z-30 flex h-[48px] items-center gap-[8px] px-[12px]" style="top:${HEADER_H - 50}px">
<button type="button" data-act="back" aria-label="Volver" class="${GLASS_BUTTON} h-[48px] w-[48px] shrink-0 rounded-full">${icon(ChevronLeft, "size-[28px]", {
			sw: 2.2,
		})}<span data-back-badge class="-ml-[2px] text-[17px] font-semibold tabular-nums" hidden></span></button>
<button type="button" data-act="info" class="${GLASS_BUTTON} h-[48px] min-w-0 flex-1 justify-start gap-[9px] rounded-full pl-[6px] pr-[14px] text-left">${avatar(
			chat,
			36,
		)}<span class="min-w-0 flex-1"><span class="block truncate text-[16px] font-semibold leading-[20px] text-black">${esc(
			chat.name,
		)}</span><span data-status class="block truncate text-[12.5px] leading-[16px] text-[#6D6D72]"></span></span></button>
<div class="${GLASS} flex h-[48px] shrink-0 items-center rounded-full px-[4px]">
<button type="button" data-act="call" aria-label="Videollamada" class="flex size-[40px] items-center justify-center transition-transform active:scale-[1.15]">${icon(
			Video,
			"size-[23px]",
			{ sw: 1.7 },
		)}</button>
<button type="button" data-act="call" aria-label="Llamar" class="flex size-[40px] items-center justify-center transition-transform active:scale-[1.15]">${icon(
			Phone,
			"size-[20px]",
			{ sw: 1.7 },
		)}</button>
</div>
</div>
<div data-edge class="absolute bottom-0 left-0 top-[110px] z-20 w-[18px]" style="touch-action:none"></div>
<div data-scroll class="relative flex-1 overflow-y-auto overscroll-contain px-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style="padding-top:${
			HEADER_H + 6
		}px;padding-bottom:10px">
<div class="mx-auto mb-[6px] mt-[6px] max-w-[330px] rounded-[8px] bg-[#FFF5C4] px-[12px] py-[7px] text-center text-[12.5px] leading-[16px] text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.1)]">${icon(
			Lock,
			"-mt-[2px] mr-[3px] inline size-[11px]",
			{ sw: 2.4 },
		)}Los mensajes y las llamadas están cifrados de extremo a extremo. Solo las personas en este chat pueden leerlos, escucharlos o compartirlos.</div>
${
	chat.business
		? `<div class="mx-auto mb-[4px] max-w-[330px] rounded-[8px] bg-white/90 px-[12px] py-[7px] text-center text-[12.5px] leading-[16px] text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.1)]">Este chat es con una cuenta de empresa. Toca para más información.</div>`
		: ""
}
<div data-messages></div>
</div>
<button type="button" data-act="jump" aria-label="Ir al final" hidden class="${GLASS} absolute right-[12px] z-20 flex size-[42px] items-center justify-center rounded-full text-[#3B4A54]" style="bottom:${
			SAFE_BOTTOM + 66
		}px">${icon(ChevronDown, "size-[24px]", {
			sw: 1.8,
		})}<span data-missed hidden class="absolute -top-[6px] left-1/2 min-w-[20px] -translate-x-1/2 rounded-full bg-[#25D366] px-[5px] text-center text-[12px] font-semibold leading-[20px] text-white"></span></button>
<div data-composer class="relative z-20 shrink-0 transition-[padding] duration-300" style="padding-bottom:${SAFE_BOTTOM - 8}px">
<div data-reply class="h-0 overflow-hidden opacity-0 transition-[height,opacity] duration-300" style="transition-timing-function:${SPRING}"></div>
<div class="flex items-end gap-[8px] px-[12px] pt-[6px]">
<button type="button" aria-label="Adjuntar" data-keep class="${GLASS_BUTTON} size-[46px] shrink-0 rounded-full">${icon(Plus, "size-[24px]", { sw: 1.8 })}</button>
<div class="${GLASS_STRONG} flex min-h-[46px] flex-1 items-end rounded-[23px] pl-[16px] pr-[10px]">
<textarea rows="1" aria-label="Mensaje" enterkeyhint="send" class="block max-h-[118px] w-full flex-1 resize-none bg-transparent py-[12px] text-[17px] leading-[22px] tracking-[-0.2px] text-[#111B21] caret-[#25D366] outline-none [scrollbar-width:none]"></textarea>
<span class="mb-[12px] ml-[4px] text-[#54656F]">${stickerIcon}</span>
</div>
<div class="relative flex h-[46px] items-center">
<button type="button" data-act="send" data-keep aria-label="Enviar" hidden class="flex size-[46px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] pl-[2px] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),0_6px_16px_rgba(37,211,102,0.4)]">${sendIcon}</button>
<span data-tools class="${GLASS} flex h-[46px] items-center gap-[14px] rounded-full px-[12px] text-black">${icon(Camera, "size-[22px]", {
			sw: 1.7,
		})}<button type="button" data-act="mic" data-keep aria-label="Nota de voz">${icon(Mic, "size-[22px]", { sw: 1.7 })}</button></span>
<span data-mic-tip hidden class="absolute bottom-[46px] right-0 w-[220px] rounded-[10px] bg-[#3B4A54] px-[12px] py-[8px] text-center text-[14px] leading-[18px] text-white shadow-lg">Mantén presionado para grabar y suelta para enviar.</span>
</div>
</div>
</div>
${this.opts.fine ? `<div data-kb class="relative z-20 h-0 shrink-0 overflow-hidden transition-[height] duration-[400ms]" style="transition-timing-function:${SPRING}"></div>` : ""}
</div>`;
	}

	/** Re-renders after the chat changed. */
	update(chat: Chat, backBadge: number, initial = false) {
		const before = this.chat.messages.length;
		this.chat = chat;
		const badge = this.q("[data-back-badge]");
		badge.hidden = backBadge === 0;
		badge.textContent = String(backBadge);
		const back = this.q('[data-act="back"]');
		back.classList.toggle("w-[48px]", backBadge === 0);
		back.classList.toggle("pl-[6px]", backBadge > 0);
		back.classList.toggle("pr-[12px]", backBadge > 0);
		this.renderStatus();
		this.renderMessages(initial);
		this.renderTyping();
		if (this.menu) {
			// A menu stays open over a message that still exists.
			const id = this.menu.dataset.msg;
			if (!chat.messages.some((m) => m.id === id)) this.closeMenu();
		}

		// New messages: follow if you're at the bottom or you sent it; otherwise count them.
		const count = chat.messages.length;
		if (!initial && count > before) {
			if (chat.messages[count - 1]?.from === "me" || this.atBottom) requestAnimationFrame(() => this.toBottom());
			else this.setMissed(this.missed + 1);
		}
	}

	private renderStatus() {
		const chat = this.chat;
		const text = chat.typing
			? "escribiendo…"
			: chat.online
				? "en línea"
				: this.hint
					? "toca aquí para ver la info del contacto"
					: chat.lastSeen
						? `últ. vez hoy a la(s) ${chat.lastSeen}`
						: (chat.subtitle ?? (chat.business ? "Cuenta de empresa" : ""));
		if (text === this.statusText) return;
		const first = this.statusText === "";
		this.statusText = text;
		const status = this.q("[data-status]");
		status.textContent = text;
		status.classList.toggle("text-[#1DAA61]", chat.typing);
		status.classList.toggle("text-[#6D6D72]", !chat.typing);
		if (!first && !this.opts.reduce)
			status.animate(
				[
					{ opacity: 0, transform: "translateY(3px)", filter: "blur(2px)" },
					{ opacity: 1, transform: "none", filter: "blur(0)" },
				],
				{ duration: 180, easing: "ease-out" },
			);
	}

	private renderMessages(initial: boolean) {
		const msgs = this.chat.messages;
		const unreadFrom = this.opts.unreadFrom;
		const seen = new Set<string>();
		let prev: Element | null = null;
		msgs.forEach((m, i) => {
			const first = !same(msgs[i - 1], m);
			const last = !same(m, msgs[i + 1]) || !!m.buttons?.length;
			const newDay = !msgs[i - 1] || msgs[i - 1].day !== m.day;
			const mine = m.from === "me";
			const html = `<div data-key="${m.id}" class="${first ? "mt-[8px]" : "mt-[2px]"}">${
				newDay
					? `<div class="my-[10px] flex justify-center"><span class="rounded-[8px] bg-white/95 px-[10px] py-[5px] text-[13px] font-medium text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">${esc(
							m.day ?? "Hoy",
						)}</span></div>`
					: ""
			}${
				unreadFrom?.id === m.id
					? `<div data-unread class="-mx-[14px] my-[8px] bg-white/70 py-[5px] text-center text-[13px] font-medium text-[#54656F]">${
							unreadFrom.count === 1 ? "1 mensaje no leído" : `${unreadFrom.count} mensajes no leídos`
						}</div>`
					: ""
			}<div id="msg-${m.id}" class="relative"${m.reactions?.me || m.reactions?.them ? ` style="margin-bottom:20px"` : ""}><span aria-hidden="true" data-swipe-icon class="absolute left-[4px] top-1/2 -mt-[15px] flex size-[30px] scale-50 items-center justify-center rounded-full bg-black/10 text-[#54656F] opacity-0">${icon(
				Reply,
				"size-[17px]",
				{ sw: 2.2 },
			)}</span><div data-row="${m.id}" data-first="${first}" data-last="${last}" class="select-none" style="touch-action:pan-y;-webkit-touch-callout:none"><div style="transform-origin:${
				mine ? "100% 100%" : "0% 100%"
			}">${bubble(m, first, last, this.chat.group, this.flash === m.id)}</div></div></div></div>`;
			let entry = this.rows.get(m.id);
			if (!entry || entry.html !== html) {
				const node = el(html);
				if (entry) entry.node.replaceWith(node);
				else if (!initial && !this.opts.reduce) {
					const row = node.querySelector<HTMLElement>("[data-row]");
					row?.animate(
						[
							{ opacity: 0, transform: mine ? "translateY(26px) scale(0.94)" : "translateY(6px) scale(0.86)" },
							{ opacity: 1, transform: "none" },
						],
						{ duration: 380, easing: SPRING },
					);
				}
				entry = { node, html };
				this.rows.set(m.id, entry);
			}
			const expected: Element | null = prev ? prev.nextElementSibling : this.list.firstElementChild;
			if (entry.node !== expected) this.list.insertBefore(entry.node, expected);
			prev = entry.node;
			seen.add(m.id);
		});
		for (const [id, entry] of this.rows) {
			if (seen.has(id)) continue;
			entry.node.remove();
			this.rows.delete(id);
		}
	}

	private renderTyping() {
		if (this.chat.typing && !this.typingEl) {
			const dots = [0, 1, 2]
				.map(
					(i) =>
						`<span class="size-[7px] rounded-full bg-[#8696A0] ${this.opts.reduce ? "" : "animate-[wa-typing_1s_ease-in-out_infinite]"}" style="animation-delay:${i * 0.16}s"></span>`,
				)
				.join("");
			this.typingEl = el(
				`<div class="relative mt-[8px] w-fit drop-shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]" style="transform-origin:0% 100%"><div class="flex h-[36px] items-center gap-[4px] rounded-[18px] rounded-bl-[4px] bg-white px-[13px]">${dots}</div>${tail(
					"in",
					"#FFFFFF",
				)}</div>`,
			);
			this.scroller.append(this.typingEl);
			this.typingEl.animate([{ opacity: 0, transform: "scale(0.8)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: SPRING });
			if (this.atBottom) requestAnimationFrame(() => this.toBottom());
		} else if (!this.chat.typing && this.typingEl) {
			const typing = this.typingEl;
			this.typingEl = null;
			typing.remove();
		}
	}

	private toBottom() {
		this.scroller.scrollTo({ top: this.scroller.scrollHeight, behavior: this.opts.reduce ? "auto" : "smooth" });
	}

	private setMissed(n: number) {
		this.missed = n;
		const badge = this.q("[data-missed]");
		badge.hidden = n === 0;
		badge.textContent = String(n);
	}

	private onScroll() {
		const s = this.scroller;
		const bottom = s.scrollHeight - s.scrollTop - s.clientHeight < 48;
		this.atBottom = bottom;
		const jump = this.q("[data-act='jump']");
		if (jump.hidden === bottom) return;
		jump.hidden = bottom;
		if (!bottom) jump.animate([{ opacity: 0, transform: "scale(0.6)" }, { opacity: 1, transform: "none" }], { duration: 200, easing: SPRING });
		if (bottom) this.setMissed(0);
	}

	// ─── Composer ─────────────────────────────────────────────────────────
	private get kbOpen() {
		return this.opts.fine && this.focused;
	}

	private setText(text: string) {
		this.ta.value = text;
		this.onTextChange();
	}

	private onTextChange() {
		const ta = this.ta;
		// Grow the composer like WhatsApp: up to ~5 lines, then scroll.
		ta.style.height = "0px";
		ta.style.height = `${Math.min(ta.scrollHeight, 118)}px`;
		const hasText = !!ta.value.trim();
		const send = this.q("[data-act='send']");
		const tools = this.q("[data-tools]");
		if (send.hidden === hasText) {
			send.hidden = !hasText;
			tools.hidden = hasText;
			const shown = hasText ? send : tools;
			if (!this.opts.reduce)
				shown.animate(
					hasText
						? [
								{ opacity: 0, transform: "scale(0.4) rotate(-30deg)" },
								{ opacity: 1, transform: "none" },
							]
						: [
								{ opacity: 0, transform: "scale(0.6)" },
								{ opacity: 1, transform: "none" },
							],
					{ duration: 300, easing: SPRING },
				);
		}
		this.refreshKeyboard();
	}

	private refreshKeyboard() {
		if (!this.keyboard) return;
		const text = this.ta.value;
		this.keyboard.autoShift = text.length === 0 || /[.!?¿¡]\s*$/.test(text);
		this.keyboard.suggestions = suggest(text);
		this.keyboard.render();
	}

	private setFocused(focused: boolean) {
		this.focused = focused;
		const kb = this.el.querySelector<HTMLElement>("[data-kb]");
		if (kb) kb.style.height = `${this.kbOpen ? KEYBOARD_H : 0}px`;
		this.q("[data-composer]").style.paddingBottom = `${this.kbOpen ? 8 : SAFE_BOTTOM - 8}px`;
		this.q("[data-act='jump']").style.bottom = `${(this.kbOpen ? KEYBOARD_H : SAFE_BOTTOM) + 66}px`;
	}

	private insert(s: string) {
		const ta = this.ta;
		const text = ta.value;
		const start = ta.selectionStart ?? text.length;
		const end = ta.selectionEnd ?? start;
		this.setText(text.slice(0, start) + s + text.slice(end));
		ta.selectionStart = ta.selectionEnd = start + s.length;
	}

	private backspace() {
		const ta = this.ta;
		const text = ta.value;
		const start = ta.selectionStart ?? text.length;
		const end = ta.selectionEnd ?? start;
		if (start !== end) {
			this.setText(text.slice(0, start) + text.slice(end));
			ta.selectionStart = ta.selectionEnd = start;
			return;
		}
		const before = Array.from(text.slice(0, start));
		before.pop();
		const head = before.join("");
		this.setText(head + text.slice(start));
		ta.selectionStart = ta.selectionEnd = head.length;
	}

	private send() {
		const body = this.ta.value.trim();
		if (!body) return;
		this.h.onSend(body, this.reply ?? undefined);
		this.setText("");
		this.setReply(null);
	}

	private setReply(reply: ReplyRef | null) {
		this.reply = reply;
		const box = this.q("[data-reply]");
		if (reply) {
			box.innerHTML = `<div class="flex items-center gap-[8px] px-[12px] pt-[6px]"><div class="${GLASS_STRONG} flex h-[52px] min-w-0 flex-1 overflow-hidden rounded-[16px]"><span class="w-[4px] shrink-0" style="background:${
				reply.color
			}"></span><span class="min-w-0 px-[8px] py-[6px]"><span class="block text-[14px] font-semibold leading-[18px]" style="color:${reply.color}">${esc(
				reply.mine ? "Tú" : reply.author,
			)}</span><span class="block truncate text-[14px] leading-[18px] text-[#667781]">${esc(
				reply.text,
			)}</span></span></div><button type="button" data-act="reply-cancel" data-keep aria-label="Cancelar respuesta" class="flex size-[24px] items-center justify-center rounded-full bg-[#8E8E93]/25 text-[#54656F]">${icon(
				X,
				"size-[14px]",
				{ sw: 2.4 },
			)}</button></div>`;
		}
		box.style.height = reply ? "64px" : "0px";
		box.style.opacity = reply ? "1" : "0";
	}

	private startReply(m: Message) {
		this.setReply({
			id: m.id,
			author: m.from === "me" ? "Tú" : (m.author ?? this.chat.name),
			mine: m.from === "me",
			text: m.audio ? `Audio (${m.audio})` : m.text.replace(/[*_~]/g, ""),
			color: m.from === "me" ? "#06CF9C" : (m.authorColor ?? "#1F7AEC"),
		});
		this.ta.focus();
	}

	private jumpTo(id: string) {
		const target = this.el.querySelector<HTMLElement>(`#msg-${CSS.escape(id)}`);
		if (!target) return;
		this.scroller.scrollTo({ top: target.offsetTop - SCREEN_H / 3, behavior: this.opts.reduce ? "auto" : "smooth" });
		this.flash = id;
		this.renderMessages(false);
		this.later(() => {
			this.flash = null;
			this.renderMessages(false);
		}, 900);
	}

	private toast(text: string) {
		const t = el(
			`<div class="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-black/75 px-[18px] py-[12px] text-[15px] font-medium text-white backdrop-blur">${esc(
				text,
			)}</div>`,
		);
		this.el.append(t);
		t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
		this.later(() => t.remove(), 1300);
	}

	// ─── Events ───────────────────────────────────────────────────────────
	private wire() {
		const ta = this.ta;
		ta.addEventListener("input", () => this.onTextChange());
		ta.addEventListener("focus", () => {
			this.atBottom = true;
			this.setFocused(true);
		});
		ta.addEventListener("blur", () => {
			this.setFocused(false);
			if (this.keyboard) {
				this.keyboard.pressed = null;
				this.keyboard.render();
			}
		});
		ta.addEventListener("keydown", (e) => {
			const k = e.key === "Enter" ? "enter" : e.key === "Backspace" ? "backspace" : e.key === "Shift" ? "shift" : e.key.toLowerCase();
			if (this.keyboard) {
				this.keyboard.pressed = k;
				this.keyboard.render();
			}
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				this.send();
			}
		});
		ta.addEventListener("keyup", () => {
			if (!this.keyboard) return;
			this.keyboard.pressed = null;
			this.keyboard.render();
		});

		this.scroller.addEventListener("scroll", () => this.onScroll(), { passive: true });
		this.scroller.addEventListener("pointerdown", (e) => {
			ta.blur();
			this.rowDown(e);
		});
		this.q("[data-edge]").addEventListener("pointerdown", (e) => this.h.onEdgeDown(e));
		// Buttons near the composer keep the focus (and the keyboard) where it is.
		this.el.addEventListener("pointerdown", (e) => {
			if ((e.target as HTMLElement).closest("[data-keep]")) e.preventDefault();
		});
		this.el.addEventListener("contextmenu", (e) => {
			const row = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
			if (!row) return;
			e.preventDefault();
			this.openMenuFor(row);
		});
		this.el.addEventListener("click", (e) => this.click(e));
	}

	private click(e: MouseEvent) {
		const t = (e.target as HTMLElement).closest<HTMLElement>("[data-act]");
		if (!t) return;
		const msg = (id?: string) => this.chat.messages.find((m) => m.id === id);
		switch (t.dataset.act) {
			case "back":
				return this.h.onBack();
			case "info":
				return this.h.onOpenInfo();
			case "call":
				return this.h.onCall();
			case "jump":
				return this.toBottom();
			case "send":
				return this.send();
			case "reply-cancel":
				return this.setReply(null);
			case "mic": {
				const tip = this.q("[data-mic-tip]");
				tip.hidden = false;
				tip.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 200 });
				this.later(() => {
					tip.hidden = true;
				}, 2200);
				return;
			}
			case "button":
				e.stopPropagation();
				return this.h.onSend(t.dataset.label ?? "");
			case "link": {
				e.stopPropagation();
				const link = msg(t.dataset.msg)?.link;
				if (link) this.h.onLink(link);
				return;
			}
			case "quote":
				e.stopPropagation();
				return this.jumpTo(t.dataset.id ?? "");
			case "menu-close":
				return this.closeMenu();
			case "react": {
				const id = this.menu?.dataset.msg ?? "";
				this.closeMenu();
				return this.h.onReact(id, t.dataset.emoji ?? "");
			}
			case "menu-reply": {
				const m = msg(this.menu?.dataset.msg);
				this.closeMenu();
				if (m) this.startReply(m);
				return;
			}
			case "menu-copy": {
				const m = msg(this.menu?.dataset.msg);
				this.closeMenu();
				navigator.clipboard?.writeText(m?.text ?? "").catch(() => {});
				return this.toast("Copiado");
			}
			case "menu-star": {
				const id = this.menu?.dataset.msg ?? "";
				this.closeMenu();
				return this.h.onStar(id);
			}
			case "menu-delete": {
				const id = this.menu?.dataset.msg ?? "";
				this.closeMenu();
				return this.h.onDelete(id);
			}
		}
	}

	/** Swipe right to reply, hold to open the menu, otherwise let the list scroll. */
	private rowDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const row = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
		if (!row) return;
		const m = this.chat.messages.find((x) => x.id === row.dataset.row);
		if (!m) return;
		const icon = row.parentElement?.querySelector<HTMLElement>("[data-swipe-icon]");
		const canSwipe = !m.deleted;
		const scale = this.opts.scale();
		const sx = e.clientX;
		const sy = e.clientY;
		let mode: "idle" | "swipe" | "scroll" | "menu" = "idle";
		let armed = false;
		let x = 0;
		const timer = setTimeout(() => {
			mode = "menu";
			haptic(12);
			this.openMenuFor(row);
		}, 480);
		const setX = (v: number) => {
			x = v;
			row.style.transform = v ? `translateX(${v}px)` : "";
			if (icon) {
				const p = Math.min(1, Math.max(0, (v - 12) / 46));
				icon.style.opacity = String(p);
				icon.style.transform = `scale(${0.5 + p * 0.5})`;
			}
		};
		const move = (ev: PointerEvent) => {
			if (mode === "menu" || mode === "scroll") return;
			const dx = (ev.clientX - sx) / scale;
			const dy = (ev.clientY - sy) / scale;
			if (mode === "idle") {
				if (Math.abs(dy) > 8) {
					mode = "scroll";
					clearTimeout(timer);
					return;
				}
				if (canSwipe && dx > 8 && dx > Math.abs(dy)) {
					mode = "swipe";
					clearTimeout(timer);
					try {
						row.setPointerCapture(ev.pointerId);
					} catch {}
				}
			}
			if (mode === "swipe") {
				const v = Math.max(0, dx);
				setX(v < 60 ? v : 60 + (v - 60) * 0.25);
				if (x >= 58 && !armed) {
					armed = true;
					haptic();
				}
			}
		};
		const up = () => {
			clearTimeout(timer);
			row.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			window.removeEventListener("pointercancel", up);
			if (mode === "swipe") {
				if (x >= 58) this.startReply(m);
				void tween(x, 0, 260, setX, [0.2, 1, 0.3, 1]);
			}
		};
		row.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		window.addEventListener("pointercancel", up);
	}

	private openMenuFor(row: HTMLElement) {
		const m = this.chat.messages.find((x) => x.id === row.dataset.row);
		if (!m || this.menu) return;
		const scale = this.opts.scale();
		const root = this.el.getBoundingClientRect();
		const r = row.getBoundingClientRect();
		this.ta.blur();
		this.openMenu(m, row.dataset.first === "true", row.dataset.last === "true", {
			top: (r.top - root.top) / scale,
			height: r.height / scale,
		});
	}

	private openMenu(msg: Message, first: boolean, last: boolean, rect: { top: number; height: number }) {
		const mine = msg.from === "me";
		const items = [
			{ label: "Responder", icon: Reply, act: "menu-reply", show: !msg.deleted },
			{ label: "Copiar", icon: Copy, act: "menu-copy", show: !msg.deleted && !!msg.text },
			{ label: msg.starred ? "No destacar" : "Destacar", icon: Star, act: "menu-star", show: !msg.deleted },
			{ label: "Eliminar", icon: Trash2, act: "menu-delete", show: true, danger: true },
		].filter((i) => i.show);
		const menuH = items.length * 44;
		const bubbleH = Math.min(rect.height, 360);
		const top = Math.max(120, Math.min(rect.top, SCREEN_H - 40 - menuH - 12 - bubbleH));
		const side = mine ? "right:14px" : "left:14px";
		const current = msg.reactions?.me;
		const reactions = msg.deleted
			? ""
			: `<div data-pop class="${GLASS_STRONG} absolute flex items-center gap-[2px] rounded-full px-[6px] py-[4px]" style="${side};top:${top - 58}px">${REACTIONS.map(
					(e) =>
						`<button type="button" data-act="react" data-emoji="${e}" class="flex size-[42px] items-center justify-center rounded-full text-[29px] transition-transform hover:-translate-y-[3px] hover:scale-[1.22] active:scale-90 ${
							current === e ? "bg-[#E9EDEF]" : ""
						}">${e}</button>`,
				).join("")}<span class="ml-[2px] flex size-[34px] items-center justify-center rounded-full bg-[#F0F2F5] text-[#54656F]">${icon(Plus, "size-[20px]")}</span></div>`;
		this.menu = el(`<div class="absolute inset-0 z-40" data-msg="${msg.id}">
<button type="button" aria-label="Cerrar menú" data-act="menu-close" class="absolute inset-0 bg-black/10 backdrop-blur-[18px]"></button>
${reactions}
<div data-clone class="pointer-events-none absolute inset-x-[14px] overflow-hidden" style="max-height:${bubbleH + 22}px;top:${rect.top}px">${bubble(
			msg,
			first,
			last,
			this.chat.group,
		)}</div>
<div data-pop class="${GLASS_STRONG} absolute w-[240px] overflow-hidden rounded-[26px] py-[6px]" style="${side};top:${top + bubbleH + 12}px;transform-origin:${
			mine ? "100% 0" : "0 0"
		}">${items
			.map(
				(it) =>
					`<button type="button" data-act="${it.act}" class="flex h-[44px] w-full items-center justify-between px-[18px] text-[17px] active:bg-black/5 ${
						it.danger ? "text-[#FF3B30]" : "text-black"
					}">${it.label}${icon(it.icon, "size-[19px]", { sw: 1.7 })}</button>`,
			)
			.join("")}</div>
</div>`);
		this.el.append(this.menu);
		if (this.opts.reduce) {
			(this.menu.querySelector("[data-clone]") as HTMLElement).style.top = `${top}px`;
			return;
		}
		this.menu.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180 });
		const clone = this.menu.querySelector<HTMLElement>("[data-clone]");
		clone?.animate([{ top: `${rect.top}px` }, { top: `${top}px`, transform: "scale(1.02)" }], { duration: 380, easing: SPRING, fill: "forwards" });
		for (const pop of this.menu.querySelectorAll<HTMLElement>("[data-pop]"))
			pop.animate([{ opacity: 0, transform: "scale(0.5)" }, { opacity: 1, transform: "none" }], { duration: 340, easing: SPRING });
	}

	private closeMenu() {
		const menu = this.menu;
		if (!menu) return;
		this.menu = null;
		if (this.opts.reduce) return menu.remove();
		menu.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160 }).finished.then(() => menu.remove());
	}
}
