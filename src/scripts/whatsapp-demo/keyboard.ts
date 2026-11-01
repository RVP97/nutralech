/** On-screen iOS keyboard for the WhatsApp demo (pointer devices only; phones bring their own). */
import { esc } from "./html";
import { ArrowBigUp, Delete, icon, Mic, Smile } from "./icons";

const ABC = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
	["z", "x", "c", "v", "b", "n", "m"],
];
const NUM = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
	["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'],
	[".", ",", "¿", "?", "!", "'", "¡"],
];

export const KEYBOARD_H = 336;

export interface KeyboardHandlers {
	onInsert: (text: string) => void;
	onBackspace: () => void;
	onEnter: () => void;
	onSuggestion: (word: string) => void;
}

const SPECIAL =
	"flex h-[42px] items-center justify-center rounded-[8px] text-black shadow-[0_1px_0_rgba(0,0,0,0.3)] transition-colors duration-75";

export class IOSKeyboard {
	readonly el: HTMLElement;
	private layer: "abc" | "123" = "abc";
	private shift: "off" | "once" | "lock" = "off";
	private down: string | null = null;
	/** Key held on the physical keyboard, lower-cased. */
	pressed: string | null = null;
	autoShift = true;
	suggestions: string[] = [];

	constructor(private handlers: KeyboardHandlers) {
		this.el = document.createElement("div");
		this.el.className =
			"relative rounded-t-[30px] bg-[linear-gradient(180deg,rgba(214,217,223,0.82),rgba(208,211,218,0.92))] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.9),0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-[24px] backdrop-saturate-[180%]";
		this.el.style.height = `${KEYBOARD_H}px`;
		this.el.addEventListener("pointerdown", (e) => this.pointerDown(e));
		const release = () => {
			if (this.down === null) return;
			this.down = null;
			this.render();
		};
		this.el.addEventListener("pointerup", release);
		this.el.addEventListener("pointerleave", release);
		this.render();
	}

	private get upper() {
		return this.layer === "abc" && (this.shift !== "off" || this.autoShift);
	}

	private pointerDown(e: PointerEvent) {
		const target = (e.target as HTMLElement).closest<HTMLElement>("[data-key]");
		if (!target) return;
		// Keeps focus in the composer so the keyboard doesn't dismiss itself.
		e.preventDefault();
		const key = target.dataset.key ?? "";
		const h = this.handlers;
		switch (key) {
			case "suggestion":
				h.onSuggestion((target.dataset.word ?? "").replace(/[“”]/g, ""));
				return;
			case "shift":
				if (this.layer === "123") return;
				this.shift = this.shift === "off" ? (this.autoShift ? "off" : "once") : this.shift === "once" ? "lock" : "off";
				this.render();
				return;
			case "layer":
				this.layer = this.layer === "abc" ? "123" : "abc";
				this.render();
				return;
			case "emoji":
				h.onInsert("😊");
				return;
		}
		this.down = key;
		if (key === "backspace") h.onBackspace();
		else if (key === "enter") h.onEnter();
		else if (key === " ") h.onInsert(" ");
		else {
			h.onInsert(this.upper ? key.toUpperCase() : key);
			if (this.shift === "once") this.shift = "off";
		}
		this.render();
	}

	private letter(k: string, i: number, row: string[]) {
		const active = (this.down ?? this.pressed) === k;
		const label = esc(this.upper ? k.toUpperCase() : k);
		const edge = i === 0 ? "left" : i === row.length - 1 ? "right" : "mid";
		const popup = active
			? `<span class="pointer-events-none absolute bottom-0 z-10 flex h-[102px] flex-col items-center drop-shadow-[0_0_1px_rgba(0,0,0,0.35)]" style="left:${
					edge === "left" ? -2 : edge === "right" ? -22 : -12
				}px;width:58px"><span class="flex h-[58px] w-full items-center justify-center rounded-[9px] bg-white text-[38px] font-light">${label}</span><span class="-mt-[6px] h-[50px] w-[34.2px] rounded-b-[5px] bg-white" style="margin-left:${
					edge === "left" ? -22 : edge === "right" ? 22 : 0
				}px"></span></span>`
			: "";
		return `<button type="button" tabindex="-1" aria-label="${esc(k)}" data-key="${esc(
			k,
		)}" class="relative h-[42px] w-[34.2px] shrink-0 rounded-[8px] bg-white text-[23px] leading-none text-black shadow-[0_1px_0_rgba(0,0,0,0.3)]">${label}${popup}</button>`;
	}

	render() {
		const active = this.down ?? this.pressed;
		const rows = this.layer === "abc" ? ABC : NUM;
		const tone = (id: string) => (active === id ? "bg-white" : "bg-[#ABB0BA]");
		const suggestions = this.suggestions
			.slice(0, 3)
			.map(
				(s, i) =>
					`<button type="button" tabindex="-1" data-key="suggestion" data-word="${esc(
						s,
					)}" class="relative flex h-full flex-1 items-center justify-center truncate px-2 active:rounded-[6px] active:bg-white/60">${esc(s)}${
						i < 2 ? `<span class="absolute right-0 top-1/2 h-[22px] w-px -translate-y-1/2 bg-[#B3B6BE]"></span>` : ""
					}</button>`,
			)
			.join("");
		const row = (r: string[]) => r.map((k, i) => this.letter(k, i, r)).join("");
		this.el.innerHTML = `<div class="flex h-[44px] items-center px-[10px] pt-[4px] text-[17px] text-black">${suggestions}</div>
<div class="flex flex-col gap-[12px] px-[3px] pt-[6px]">
<div class="flex justify-between">${row(rows[0])}</div>
<div class="flex justify-between">${row(rows[1])}</div>
<div class="flex items-center justify-between">
<button type="button" tabindex="-1" aria-label="Mayúsculas" data-key="shift" class="${SPECIAL} w-[44px] ${
			this.upper || active === "shift" ? "bg-white" : "bg-[#ABB0BA]"
		}">${
			this.layer === "abc"
				? icon(ArrowBigUp, "size-[22px]", { sw: 1.6, fill: this.upper ? "currentColor" : "none" })
				: `<span class="text-[15px]">#+=</span>`
		}</button>
<div class="flex gap-[6px]">${row(rows[2])}</div>
<button type="button" tabindex="-1" aria-label="Borrar" data-key="backspace" class="${SPECIAL} w-[44px] ${tone("backspace")}">${icon(
			Delete,
			"size-[22px]",
			{ sw: 1.6 },
		)}</button>
</div>
<div class="flex gap-[6px]">
<button type="button" tabindex="-1" data-key="layer" class="${SPECIAL} w-[92px] bg-[#ABB0BA] text-[16px]">${this.layer === "abc" ? "123" : "ABC"}</button>
<button type="button" tabindex="-1" data-key=" " class="${SPECIAL} flex-1 text-[16px] ${active === " " ? "bg-[#ABB0BA]" : "bg-white"}">espacio</button>
<button type="button" tabindex="-1" data-key="enter" class="${SPECIAL} w-[92px] text-[16px] ${tone("enter")}">intro</button>
</div>
</div>
<div class="flex items-start justify-between px-[22px] pt-[14px] text-[#50555C]">
<button type="button" tabindex="-1" aria-label="Emoji" data-key="emoji">${icon(Smile, "size-[27px]", { sw: 1.5 })}</button>
${icon(Mic, "size-[25px]", { sw: 1.5 })}
</div>`;
	}
}
