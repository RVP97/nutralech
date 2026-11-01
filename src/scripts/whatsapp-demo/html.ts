/** Markup shared by the WhatsApp demo's screens: glass styles, avatars and message bubbles. */
import type { Chat, LinkPreview, Message } from "./data";
import { Ban, defaultAvatar, icon, Mic, Play, Reply, Star, tail, tickIcon } from "./icons";

export const SCREEN_W = 402;
export const SCREEN_H = 874;
export const SAFE_TOP = 56;
export const SAFE_BOTTOM = 34;

// Liquid Glass: translucent, saturated blur with a specular top rim and a soft
// contact shadow. Content keeps its color underneath instead of being hidden.
export const GLASS =
	"bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.5))] backdrop-blur-[16px] backdrop-saturate-[180%] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.35),0_0_0_0.5px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.10)]";

export const GLASS_STRONG =
	"bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(250,250,250,0.72))] backdrop-blur-[24px] backdrop-saturate-[190%] shadow-[inset_0_1px_0.5px_rgba(255,255,255,1),0_0_0_0.5px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.16)]";

/** Glass control that swells slightly under the finger, like iOS 26. */
export const GLASS_BUTTON = `${GLASS} flex items-center justify-center text-black transition-transform duration-200 active:scale-110`;

export const esc = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
	);

/** WhatsApp inline formatting: *bold*, _italic_, ~strike~ (escaped). */
export function formatText(text: string) {
	let out = "";
	let last = 0;
	for (const m of text.matchAll(/(\*[^*\n]+\*|_[^_\n]+_|~[^~\n]+~)/g)) {
		const i = m.index ?? 0;
		out += esc(text.slice(last, i));
		const inner = esc(m[0].slice(1, -1));
		out += m[0][0] === "*" ? `<strong class="font-semibold">${inner}</strong>` : m[0][0] === "_" ? `<em>${inner}</em>` : `<s>${inner}</s>`;
		last = i + m[0].length;
	}
	return out + esc(text.slice(last));
}

export function avatar(chat: Chat, size: number) {
	if (!chat.avatar) return defaultAvatar(size, chat.group);
	return `<img src="${chat.avatar}" alt="" draggable="false" width="${size}" height="${size}" class="shrink-0 rounded-full object-cover object-[50%_30%]" style="width:${size}px;height:${size}px">`;
}

export const OUT_BG = "#D9FDD3";
export const IN_BG = "#FFFFFF";

function meta(msg: Message) {
	return `<span class="absolute bottom-[6px] right-[8px] flex items-center gap-[3px] text-[11.5px] leading-none tabular-nums text-[#667781]">${
		msg.starred ? icon(Star, "size-[10px] fill-current", { sw: 0 }) : ""
	}${esc(msg.time)}${msg.from === "me" && msg.status && !msg.deleted ? tickIcon(msg.status, "text-[#8696A0]") : ""}</span>`;
}

export function linkCard(link: LinkPreview, mine: boolean, msgId: string) {
	return `<button type="button" data-act="link" data-msg="${msgId}" class="mb-[4px] flex w-full overflow-hidden rounded-[8px] text-left active:opacity-80 ${
		mine ? "bg-[#CFF3C9]" : "bg-[#F5F6F6]"
	}">${
		link.image
			? `<img src="${link.image}" alt="" draggable="false" class="size-[76px] shrink-0 object-cover object-[50%_30%]">`
			: ""
	}<span class="flex min-w-0 flex-col justify-center gap-[2px] px-[10px] py-[8px]"><span class="line-clamp-2 text-[14px] font-semibold leading-[18px] text-[#111B21]">${esc(
		link.title,
	)}</span><span class="line-clamp-2 text-[13px] leading-[16px] text-[#667781]">${esc(
		link.description,
	)}</span><span class="text-[12px] text-[#8696A0]">${esc(link.domain)}</span></span></button>`;
}

const AUDIO_BARS = Array.from(
	{ length: 30 },
	(_, i) => `<span class="w-[2.5px] rounded-full bg-[#B4BBBF]" style="height:${25 + Math.abs(Math.sin(i * 1.7) * 70)}%"></span>`,
).join("");

/** A message bubble. Interactive parts carry data-act for the chat view's delegated handlers. */
export function bubble(msg: Message, first: boolean, last: boolean, group?: boolean, highlight?: boolean) {
	const mine = msg.from === "me";
	const bg = mine ? OUT_BG : IN_BG;
	const hasButtons = !!msg.buttons?.length && !msg.deleted;
	const spacer = mine ? (msg.starred ? 80 : 66) : msg.starred ? 56 : 42;
	const br = hasButtons ? 8 : mine && last ? 4 : 18;
	const bl = hasButtons ? 8 : !mine && last ? 4 : 18;

	let body: string;
	if (msg.deleted) {
		body = `<span class="flex items-center gap-[5px] italic text-[#8696A0]">${icon(Ban, "size-[15px]", { sw: 1.8 })}${
			mine ? "Eliminaste este mensaje." : "Se eliminó este mensaje."
		}<span class="inline-block" style="width:${spacer - 20}px"></span></span>`;
	} else if (msg.audio) {
		body = `<span class="flex w-[230px] items-center gap-[10px] pb-[10px]">${icon(Play, "size-[22px] fill-[#8696A0] text-[#8696A0]")}<span class="flex h-[26px] flex-1 items-center gap-[2px]">${AUDIO_BARS}</span><span class="relative"><span class="block size-[36px] rounded-full bg-[#DFE5E7]"></span>${icon(
			Mic,
			"absolute -bottom-[2px] -left-[4px] size-[16px] text-[#1DAA61]",
		)}</span><span class="absolute bottom-[6px] left-[42px] text-[11.5px] text-[#667781]">${esc(msg.audio)}</span></span>`;
	} else {
		body = `<span class="whitespace-pre-wrap break-words">${formatText(msg.text)}<span class="inline-block" style="width:${spacer}px"></span></span>`;
	}

	const author =
		group && !mine && first && msg.author
			? `<div class="mb-[1px] text-[14px] font-semibold leading-[18px]" style="color:${msg.authorColor}">${esc(msg.author)}</div>`
			: "";
	const quote =
		msg.replyTo && !msg.deleted
			? `<button type="button" data-act="quote" data-id="${msg.replyTo.id}" class="mb-[5px] mt-[2px] flex w-full min-w-[160px] overflow-hidden rounded-[8px] text-left ${
					mine ? "bg-[#C6ECBF]/80" : "bg-[#F0F2F5]"
				}"><span class="w-[4px] shrink-0" style="background:${msg.replyTo.color ?? "#06CF9C"}"></span><span class="min-w-0 px-[8px] py-[5px]"><span class="block text-[14px] font-semibold leading-[18px]" style="color:${
					msg.replyTo.color ?? "#06CF9C"
				}">${esc(msg.replyTo.mine ? "Tú" : msg.replyTo.author)}</span><span class="line-clamp-2 text-[14px] leading-[18px] text-[#667781]">${esc(
					msg.replyTo.text,
				)}</span></span></button>`
			: "";
	const link = msg.link && !msg.deleted ? linkCard(msg.link, mine, msg.id) : "";
	const buttons = hasButtons
		? `<div class="mt-[2px] flex flex-col gap-[2px]">${(msg.buttons ?? [])
				.map((b, i, arr) => {
					const r = i === arr.length - 1 ? 18 : 8;
					return `<button type="button" data-act="button" data-label="${esc(b)}" class="flex h-[42px] items-center justify-center gap-[6px] bg-white text-[16px] font-medium text-[#027EB5] active:bg-[#F0F2F5]" style="border-radius:8px 8px ${r}px ${r}px">${icon(
						Reply,
						"size-[16px]",
					)}${esc(b)}</button>`;
				})
				.join("")}</div>`
		: "";
	const r = msg.reactions;
	const reactions =
		r?.me || r?.them
			? `<span class="absolute -bottom-[18px] z-10 flex h-[26px] items-center gap-[1px] rounded-full border-2 border-[#EFEAE2] bg-white px-[5px] text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${
					mine ? "right-[10px]" : "left-[10px]"
				}">${r.them ? `<span>${r.them}</span>` : ""}${r.me && r.me !== r.them ? `<span>${r.me}</span>` : ""}${
					r.me && r.them ? `<span class="ml-[2px] text-[12px] text-[#667781]">2</span>` : ""
				}</span>`
			: "";

	return `<div class="flex flex-col ${mine ? "items-end" : "items-start"}"><div class="relative max-w-[82%] drop-shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"${
		msg.link ? ` style="min-width:250px"` : ""
	}><div class="relative px-[9px] pb-[7px] pt-[6px] text-[17px] leading-[22px] tracking-[-0.2px] text-[#111B21] transition-[filter] duration-500" style="background:${bg};border-radius:18px 18px ${br}px ${bl}px${
		highlight ? ";filter:brightness(0.88)" : ""
	}">${author}${quote}${link}${body}${meta(msg)}</div>${last && !hasButtons ? tail(mine ? "out" : "in", bg) : ""}${buttons}${reactions}</div></div>`;
}

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

/**
 * Builds one element from markup. It is imported into the page's document (a template's content
 * lives in an inert one), so animations started before it is inserted still run.
 */
export function el<T extends HTMLElement = HTMLElement>(html: string): T {
	const t = document.createElement("template");
	t.innerHTML = html.trim();
	return document.importNode(t.content, true).firstElementChild as T;
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** iOS push/pop curve. */
export const IOS_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Close to the spring the React version used (stiffness 520, damping ~40). */
export const SPRING_EASE = "cubic-bezier(0.22, 1.2, 0.36, 1)";

/** Animates a number from → to over ms with a cubic-bezier, calling onFrame each frame. */
export function tween(
	from: number,
	to: number,
	ms: number,
	onFrame: (v: number) => void,
	ease: [number, number, number, number] = [0.32, 0.72, 0, 1],
): Promise<void> {
	if (ms <= 0) {
		onFrame(to);
		return Promise.resolve();
	}
	const curve = bezier(...ease);
	const start = performance.now();
	return new Promise((resolve) => {
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / ms);
			onFrame(from + (to - from) * curve(t));
			if (t < 1) requestAnimationFrame(step);
			else resolve();
		};
		requestAnimationFrame(step);
	});
}

/** CSS cubic-bezier timing function. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
	const cx = 3 * x1;
	const bx = 3 * (x2 - x1) - cx;
	const ax = 1 - cx - bx;
	const cy = 3 * y1;
	const by = 3 * (y2 - y1) - cy;
	const ay = 1 - cy - by;
	const x = (t: number) => ((ax * t + bx) * t + cx) * t;
	const y = (t: number) => ((ay * t + by) * t + cy) * t;
	const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
	return (p: number) => {
		let t = p;
		for (let i = 0; i < 6; i++) {
			const d = dx(t);
			if (Math.abs(d) < 1e-6) break;
			t -= (x(t) - p) / d;
		}
		return y(Math.min(1, Math.max(0, t)));
	};
}
