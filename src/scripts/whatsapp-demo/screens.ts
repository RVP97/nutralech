/** The WhatsApp demo's root tabs (Chats, Novedades, Llamadas, Comunidades, Configuración) and contact info. */
import { type Chat, previewOf } from "./data";
import { avatar, esc, GLASS, GLASS_BUTTON, SAFE_TOP } from "./html";
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
	defaultAvatar,
	Ellipsis,
	Globe,
	Info,
	icon,
	Key,
	Lock,
	Mail,
	MessageCircle,
	Mic,
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
	tickIcon,
	Users,
	Video,
} from "./icons";

export const TAB_H = 64 + 22;
const BAR_H = SAFE_TOP + 44;

export type TabId = "updates" | "calls" | "communities" | "chats" | "settings";
type Filter = "all" | "unread" | "favorites" | "groups";
type IconNode = typeof Bell;

const circleBtn = `${GLASS} flex size-[40px] items-center justify-center rounded-full text-black`;
const plusBtn =
	"flex size-[40px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#3BE07A,#1FBF5A)] text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),0_6px_16px_rgba(37,211,102,0.35)]";
const moreBtn = `<span class="${circleBtn}">${icon(Ellipsis, "size-[20px]", { sw: 2.2 })}</span>`;
const cameraPlus = `<span class="${circleBtn}">${icon(Camera, "size-[21px]", { sw: 1.7 })}</span><span class="${plusBtn}">${icon(
	Plus,
	"size-[22px]",
	{ sw: 2.6 },
)}</span>`;

/** iOS large-title screen: the big title scrolls away and a compact one fades in (wired in ListView). */
function largeTitle(title: string, content: string, { left = "", right = "", bg = "bg-white" } = {}) {
	return `<div class="absolute inset-0 ${bg}">
<div aria-hidden="true" data-edge-blur class="pointer-events-none absolute inset-x-0 top-0 z-10 opacity-0 backdrop-blur-[10px] transition-opacity duration-300" style="height:${
		BAR_H + 18
	}px;background:linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.5) 70%,transparent);-webkit-mask-image:linear-gradient(180deg,#000 65%,transparent);mask-image:linear-gradient(180deg,#000 65%,transparent)"></div>
<div class="absolute inset-x-0 top-0 z-20 flex items-end px-[16px] pb-[2px]" style="height:${BAR_H + 4}px">
<span class="flex flex-1 items-center">${left}</span>
<span data-compact-title class="mb-[10px] translate-y-[6px] text-[17px] font-semibold opacity-0 transition-[opacity,transform] duration-300">${esc(title)}</span>
<span class="flex flex-1 items-center justify-end gap-[10px]">${right}</span>
</div>
<div data-title-scroll class="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style="padding-top:${
		BAR_H + 8
	}px;padding-bottom:${TAB_H + 12}px">
<h1 class="px-[16px] pb-[8px] text-[34px] font-bold leading-[41px] tracking-[0.3px] text-black">${esc(title)}</h1>
${content}
</div>
</div>`;
}

function searchField(placeholder = "Buscar", name = "") {
	return `<label class="mx-[16px] mb-[10px] flex h-[36px] items-center gap-[6px] rounded-full bg-[#767680]/[0.12] px-[12px] text-[#8E8E93]">${icon(
		Search,
		"size-[18px]",
	)}<input ${name ? `data-search="${name}"` : ""} placeholder="${placeholder}" aria-label="${placeholder}" class="h-full w-full bg-transparent text-[17px] text-black outline-none placeholder:text-[#8E8E93]"></label>`;
}

function chatRow(chat: Chat) {
	const m = chat.messages[chat.messages.length - 1];
	const unread = chat.unread > 0;
	const time = m ? (m.day ?? m.time) : "";
	const preview = chat.typing
		? `<span class="font-medium text-[#1DAA61]">escribiendo…</span>`
		: `${m?.from === "me" && m.status && !m.deleted ? tickIcon(m.status, "-mt-[2px] mr-[3px] inline text-[#8E8E93]") : ""}${
				chat.group && m?.from === "them" && m.author ? `<span class="text-black/80">${esc(m.author)}: </span>` : ""
			}${m?.audio ? icon(Mic, "-mt-[3px] mr-[2px] inline size-[15px] text-[#1DAA61]") : ""}${esc(previewOf(m))}`;
	return `<button type="button" data-act="open" data-id="${chat.id}" class="flex w-full items-center bg-white pl-[16px] text-left active:bg-[#E5E5EA]">
${avatar(chat, 52)}
<span class="ml-[12px] flex h-[80px] min-w-0 flex-1 flex-col justify-center border-b border-black/[0.09] pr-[16px]">
<span class="flex items-baseline justify-between gap-[8px]"><span class="truncate text-[17px] font-semibold text-black">${esc(chat.name)}</span><span class="shrink-0 text-[14px] ${
		unread ? "font-medium text-[#1DAA61]" : "text-[#8E8E93]"
	}">${esc(time)}</span></span>
<span class="mt-[2px] flex items-start justify-between gap-[8px]"><span class="line-clamp-2 min-h-[40px] text-[15px] leading-[20px] text-[#8E8E93]">${preview}</span><span class="mt-[2px] flex shrink-0 items-center gap-[6px] text-[#8E8E93]">${
		chat.muted ? icon(BellOff, "size-[15px]") : ""
	}${chat.pinned && !unread ? icon(Pin, "size-[15px] rotate-45 fill-current", { sw: 1.5 }) : ""}${
		unread
			? `<span data-badge="${chat.unread}" class="min-w-[20px] rounded-full px-[6px] text-center text-[13px] font-semibold leading-[20px] text-white ${
					chat.muted ? "bg-[#AEB4BA]" : "bg-[#25D366]"
				}">${chat.unread}</span>`
			: ""
	}</span></span>
</span>
</button>`;
}

const FILTERS: Array<{ id: Filter; label: string }> = [
	{ id: "all", label: "Todos" },
	{ id: "unread", label: "No leídos" },
	{ id: "favorites", label: "Favoritos" },
	{ id: "groups", label: "Grupos" },
];

function section(title: string, content: string) {
	return `<div class="mb-[22px]"><h2 class="px-[16px] pb-[8px] text-[20px] font-bold text-black">${title}</h2>${content}</div>`;
}

function updatesTab(chats: Chat[]) {
	const status = [
		{ chat: chats.find((c) => c.id === "luisa"), bg: "from-[#F7C59F] to-[#E96B6B]", emoji: "🥗" },
		{ chat: chats.find((c) => c.id === "gabriel"), bg: "from-[#9BE3C3] to-[#2E9C74]", emoji: "🏃‍♂️" },
		{ chat: chats.find((c) => c.id === "majo"), bg: "from-[#C8B6FF] to-[#7457D9]", emoji: "☕" },
	];
	const nutralech = chats.find((c) => c.business);
	const states = `<div class="flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none]">
<div class="relative flex h-[150px] w-[92px] shrink-0 flex-col justify-end rounded-[14px] bg-[#F0F2F5] p-[8px]"><span class="absolute left-[8px] top-[8px]">${defaultAvatar(
		36,
	)}<span class="absolute -bottom-[2px] -right-[2px] flex size-[16px] items-center justify-center rounded-full border-2 border-[#F0F2F5] bg-[#25D366] text-white">${icon(
		Plus,
		"size-[10px]",
		{ sw: 3.5 },
	)}</span></span><span class="text-[13px] font-medium leading-[16px] text-black">Añadir estado</span></div>
${status
	.map(({ chat, bg, emoji }) =>
		chat
			? `<div class="relative flex h-[150px] w-[92px] shrink-0 flex-col justify-end overflow-hidden rounded-[14px] bg-gradient-to-br ${bg} p-[8px]"><span class="absolute inset-0 flex items-center justify-center text-[40px]">${emoji}</span><span class="absolute left-[8px] top-[8px] rounded-full p-[2px] ring-[2.5px] ring-[#25D366]">${avatar(
					chat,
					32,
				)}</span><span class="relative text-[13px] font-semibold text-white drop-shadow">${esc(chat.name)}</span></div>`
			: "",
	)
	.join("")}
</div>`;
	const channels = `${
		nutralech
			? `<div class="flex items-center gap-[12px] px-[16px] py-[8px]">${avatar(
					nutralech,
					52,
				)}<div class="min-w-0 flex-1"><div class="flex items-baseline justify-between"><span class="text-[17px] font-semibold">Nutralech</span><span class="text-[14px] text-[#1DAA61]">Ayer</span></div><p class="line-clamp-2 text-[15px] leading-[20px] text-[#8E8E93]">Nuevo en el blog: desayunos altos en proteína en 10 minutos 🍳</p></div></div>`
			: ""
	}<div class="px-[16px] pt-[10px]"><span class="inline-flex h-[34px] items-center rounded-full bg-[#767680]/[0.12] px-[16px] text-[15px] font-medium">Explorar canales</span></div>`;
	return largeTitle("Novedades", `${searchField()}${section("Estados", states)}${section("Canales", channels)}`, {
		left: moreBtn,
		right: cameraPlus,
	});
}

function callsTab(chats: Chat[]) {
	const by = (id: string) => chats.find((c) => c.id === id);
	const calls = [
		{ chat: by("mama"), kind: "in", video: false, when: "Hoy" },
		{ chat: by("luisa"), kind: "missed", video: false, when: "Ayer" },
		{ chat: by("gabriel"), kind: "out", video: true, when: "martes" },
		{ chat: by("mama"), kind: "out", video: false, when: "domingo" },
	];
	const actions = (
		[
			[Phone, "Llamar"],
			[Clock, "Programar"],
			[Key, "Teclado"],
			[Star, "Favoritos"],
		] as [IconNode, string][]
	)
		.map(
			([i, label]) =>
				`<span class="flex flex-1 flex-col items-center gap-[6px] text-[13px] text-black"><span class="flex size-[52px] items-center justify-center rounded-full bg-[#767680]/[0.12]">${icon(
					i,
					"size-[22px]",
					{ sw: 1.7 },
				)}</span>${label}</span>`,
		)
		.join("");
	const rows = calls
		.map((c) =>
			c.chat
				? `<div class="flex items-center gap-[12px] pl-[16px]">${avatar(
						c.chat,
						44,
					)}<div class="flex h-[64px] flex-1 items-center justify-between border-b border-black/[0.09] pr-[16px]"><div><p class="text-[17px] font-semibold ${
						c.kind === "missed" ? "text-[#FF3B30]" : "text-black"
					}">${esc(c.chat.name)}</p><p class="flex items-center gap-[4px] text-[14px] text-[#8E8E93]">${icon(
						c.kind === "missed" ? PhoneMissed : c.kind === "in" ? PhoneIncoming : PhoneOutgoing,
						"size-[13px]",
					)}${c.video ? "Video" : "Voz"} · ${
						c.kind === "missed" ? "Perdida" : c.kind === "in" ? "Entrante" : "Saliente"
					}</p></div><span class="flex items-center gap-[10px] text-[15px] text-[#8E8E93]">${c.when}${icon(Info, "size-[22px] text-[#1DAA61]", {
						sw: 1.6,
					})}</span></div></div>`
				: "",
		)
		.join("");
	return largeTitle(
		"Llamadas",
		`${searchField()}<div class="flex gap-[12px] px-[16px] pb-[18px]">${actions}</div><h2 class="px-[16px] pb-[6px] text-[20px] font-bold">Recientes</h2>${rows}`,
		{
			left: `<span class="${GLASS} rounded-full px-[16px] py-[10px] text-[17px]">Editar</span>`,
			right: `<span class="${circleBtn}">${icon(Plus, "size-[22px]")}</span>`,
		},
	);
}

function communitiesTab() {
	return largeTitle(
		"Comunidades",
		`<div class="flex flex-col items-center px-[32px] pt-[40px] text-center">
<div class="relative mb-[24px] h-[120px] w-[160px]"><span class="absolute left-[10px] top-[30px] size-[64px] rotate-[-10deg] rounded-[18px] bg-[#D8FDD2]"></span><span class="absolute right-[10px] top-[18px] size-[64px] rotate-[8deg] rounded-[18px] bg-[#FFE7CC]"></span><span class="absolute left-1/2 top-[34px] flex size-[76px] -translate-x-1/2 items-center justify-center rounded-[22px] bg-[#25D366] text-white shadow-lg">${icon(
			Users,
			"size-[36px]",
			{ sw: 1.8 },
		)}</span></div>
<h2 class="text-[22px] font-bold leading-[28px]">Mantente en contacto con una comunidad</h2>
<p class="mt-[10px] text-[15px] leading-[20px] text-[#8E8E93]">Las comunidades reúnen a miembros en grupos por temas y facilitan recibir avisos de administradores.</p>
<span class="mt-[22px] rounded-full bg-[#25D366] px-[22px] py-[11px] text-[17px] font-semibold text-white">Nueva comunidad</span>
</div>`,
	);
}

function settingsRow(i: IconNode, color: string, label: string, value?: string) {
	return `<div class="flex items-center gap-[14px] pl-[16px]"><span class="flex size-[29px] items-center justify-center rounded-[7px] text-white" style="background:${color}">${icon(
		i,
		"size-[18px]",
	)}</span><span class="flex h-[46px] flex-1 items-center justify-between border-b border-black/[0.08] pr-[14px] text-[17px]">${label}<span class="flex items-center gap-[6px] text-[#8E8E93]">${
		value ?? ""
	}${icon(ChevronRight, "size-[18px]")}</span></span></div>`;
}

function settingsTab(starred: number) {
	const group = "mx-[16px] mb-[24px] overflow-hidden rounded-[26px] bg-white [&>div:last-child>span:last-child]:border-b-0";
	return largeTitle(
		"Configuración",
		`${searchField()}
<div class="${group} flex items-center gap-[12px] p-[14px]">${defaultAvatar(
			60,
		)}<div class="flex-1"><p class="text-[20px] font-semibold">Tú</p><p class="text-[15px] text-[#8E8E93]">Disponible</p></div><span class="flex size-[34px] items-center justify-center rounded-full bg-[#767680]/[0.12]">${icon(
			QrCode,
			"size-[18px]",
		)}</span></div>
<div class="${group}">${settingsRow(Star, "#FFCC00", "Mensajes destacados", starred ? String(starred) : undefined)}${settingsRow(
			Globe,
			"#1DAA61",
			"Dispositivos vinculados",
		)}</div>
<div class="${group}">${settingsRow(Key, "#007AFF", "Cuenta")}${settingsRow(Lock, "#34C759", "Privacidad")}${settingsRow(
			MessageCircle,
			"#25D366",
			"Chats",
		)}${settingsRow(Bell, "#FF3B30", "Notificaciones")}${settingsRow(CircleDashed, "#34C759", "Almacenamiento y datos")}</div>
<div class="${group}">${settingsRow(Info, "#007AFF", "Ayuda")}${settingsRow(Users, "#FF2D55", "Invitar a un amigo")}</div>`,
		{ bg: "bg-[#F2F2F7]" },
	);
}

const TABS: Array<{ id: TabId; label: string; icon: IconNode }> = [
	{ id: "updates", label: "Novedades", icon: CircleDashed },
	{ id: "calls", label: "Llamadas", icon: Phone },
	{ id: "communities", label: "Comunidades", icon: Users },
	{ id: "chats", label: "Chats", icon: MessageCircle },
	{ id: "settings", label: "Configuración", icon: Settings },
];

/**
 * The root screen: the current tab plus the floating tab bar. Only the chat rows and the tab
 * badge re-render when chats change, so the search box keeps its focus and the list its scroll.
 */
export class ListView {
	readonly el: HTMLElement;
	private content: HTMLElement;
	private tabBar: HTMLElement;
	tab: TabId = "chats";
	private filter: Filter = "all";
	private query = "";
	private renderedTab: TabId | null = null;
	private lastBadge = 0;
	private lastRowBadges = new Map<string, number>();
	private rowsHtml = "";

	constructor(
		private getChats: () => Chat[],
		private getStarred: () => number,
		onOpen: (id: string) => void,
	) {
		this.el = document.createElement("div");
		this.el.className = "absolute inset-0 bg-white will-change-transform";
		this.content = document.createElement("div");
		this.content.className = "absolute inset-0";
		this.tabBar = document.createElement("div");
		this.tabBar.className = `${GLASS} absolute inset-x-[16px] bottom-[22px] z-20 flex h-[64px] rounded-full p-[4px]`;
		const dim = document.createElement("div");
		dim.className = "pointer-events-none absolute inset-0 z-30 bg-black opacity-0";
		dim.dataset.dim = "";
		this.el.append(this.content, this.tabBar, dim);

		this.el.addEventListener("click", (e) => {
			const t = (e.target as HTMLElement).closest<HTMLElement>("[data-act]");
			if (!t) return;
			if (t.dataset.act === "open") onOpen(t.dataset.id ?? "");
			if (t.dataset.act === "filter") {
				this.filter = t.dataset.id as Filter;
				this.renderFilters();
				this.renderRows();
			}
			if (t.dataset.act === "tab") {
				this.tab = t.dataset.id as TabId;
				this.render();
			}
		});
		this.el.addEventListener("input", (e) => {
			const input = e.target as HTMLInputElement;
			if (input.dataset.search !== "chats") return;
			this.query = input.value;
			this.renderRows();
		});
		this.render();
	}

	get dim() {
		return this.el.querySelector<HTMLElement>("[data-dim]") as HTMLElement;
	}

	/** Re-renders what depends on the chats. */
	render() {
		const chats = this.getChats();
		// The other tabs only show static data, so they are built once per visit.
		if (this.renderedTab !== this.tab) {
			this.content.innerHTML =
				this.tab === "chats"
					? this.chatsShell()
					: this.tab === "updates"
						? updatesTab(chats)
						: this.tab === "calls"
							? callsTab(chats)
							: this.tab === "communities"
								? communitiesTab()
								: settingsTab(this.getStarred());
			const scroller = this.content.querySelector<HTMLElement>("[data-title-scroll]");
			scroller?.addEventListener("scroll", () => this.onTitleScroll(scroller), { passive: true });
			this.renderedTab = this.tab;
		}
		if (this.tab === "chats") this.renderRows();
		this.renderTabBar(chats.filter((c) => c.unread > 0).length);
	}

	private onTitleScroll(scroller: HTMLElement) {
		const scrolled = scroller.scrollTop > 36;
		this.content.querySelector("[data-edge-blur]")?.classList.toggle("opacity-0", !scrolled);
		const title = this.content.querySelector("[data-compact-title]");
		title?.classList.toggle("opacity-0", !scrolled);
		title?.classList.toggle("translate-y-[6px]", !scrolled);
	}

	private chatsShell() {
		return largeTitle(
			"Chats",
			`${searchField("Buscar", "chats")}<div data-filters class="flex gap-[8px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none]"></div><div data-archived class="flex h-[48px] items-center gap-[18px] pl-[30px] pr-[16px] text-[17px] text-black">${icon(
				Archive,
				"size-[20px] text-[#8E8E93]",
				{ sw: 1.8 },
			)}<span class="flex h-full flex-1 items-center justify-between border-b border-black/[0.09]">Archivados<span class="text-[15px] text-[#8E8E93]">2</span></span></div><div data-rows></div><p class="flex items-center justify-center gap-[5px] py-[18px] text-[13px] text-[#8E8E93]">${icon(
				Lock,
				"size-[11px]",
				{ sw: 2.4 },
			)}Tus mensajes personales están <span class="text-[#1DAA61]">cifrados de extremo a extremo</span></p>`,
			{ left: moreBtn, right: cameraPlus },
		);
	}

	private renderFilters() {
		const box = this.content.querySelector<HTMLElement>("[data-filters]");
		if (!box) return;
		box.innerHTML = FILTERS.map(
			(f) =>
				`<button type="button" data-act="filter" data-id="${f.id}" class="h-[32px] shrink-0 rounded-full px-[13px] text-[15px] font-medium transition-colors ${
					this.filter === f.id ? "bg-[#D8FDD2] text-[#15603E]" : "bg-[#767680]/[0.1] text-[#5E5E60]"
				}">${f.label}</button>`,
		).join("");
	}

	private renderRows() {
		const rows = this.content.querySelector<HTMLElement>("[data-rows]");
		if (!rows) return;
		if (!this.content.querySelector("[data-filters] button")) this.renderFilters();
		const q = this.query.trim().toLowerCase();
		const f = this.filter;
		const visible = this.getChats()
			.filter((c) => (f === "unread" ? c.unread > 0 : f === "favorites" ? c.favorite : f === "groups" ? c.group : true))
			.filter((c) => !q || c.name.toLowerCase().includes(q) || c.messages.some((m) => m.text.toLowerCase().includes(q)))
			.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.ts - a.ts);
		const archived = this.content.querySelector<HTMLElement>("[data-archived]");
		if (archived) archived.hidden = !(f === "all" && !q);
		const html =
			visible.map(chatRow).join("") +
			(visible.length === 0
				? `<p class="px-[32px] py-[40px] text-center text-[15px] text-[#8E8E93]">${
						q ? `Sin resultados para “${esc(this.query)}”` : "No hay chats en esta vista"
					}</p>`
				: "");
		if (this.rowsHtml === html && rows.childElementCount) return;
		this.rowsHtml = html;
		rows.innerHTML = html;
		// Pop the unread badges that changed.
		for (const badge of rows.querySelectorAll<HTMLElement>("[data-badge]")) {
			const id = badge.closest<HTMLElement>("[data-id]")?.dataset.id ?? "";
			const n = Number(badge.dataset.badge);
			if (this.lastRowBadges.get(id) !== n) pop(badge);
			this.lastRowBadges.set(id, n);
		}
	}

	private renderTabBar(unreadChats: number) {
		const index = TABS.findIndex((t) => t.id === this.tab);
		this.tabBar.innerHTML = `<span class="pointer-events-none absolute bottom-[4px] top-[4px] rounded-full bg-black/[0.07] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.8)] transition-[left] duration-300 ease-[cubic-bezier(0.22,1.2,0.36,1)]" style="left:calc(4px + ${index} * (100% - 8px) / 5);width:calc((100% - 8px) / 5)"></span>${TABS.map(
			(t) => {
				const on = t.id === this.tab;
				const badge = t.id === "chats" ? unreadChats : 0;
				return `<button type="button" data-act="tab" data-id="${t.id}" class="relative flex flex-1 flex-col items-center justify-center gap-[1px] text-[10px] transition-transform duration-200 active:scale-[0.92] ${
					on ? "font-semibold text-[#128C4A]" : "font-medium text-black"
				}">${icon(t.icon, "relative size-[25px]", { sw: on ? 2 : 1.6, fill: on && t.id === "chats" ? "currentColor" : "none" })}<span class="relative">${
					t.label
				}</span>${
					badge
						? `<span data-tab-badge class="absolute left-1/2 top-[4px] ml-[5px] min-w-[19px] rounded-full bg-[#25D366] px-[5px] text-center text-[12px] font-semibold leading-[19px] text-white">${badge}</span>`
						: ""
				}</button>`;
			},
		).join("")}`;
		const badge = this.tabBar.querySelector<HTMLElement>("[data-tab-badge]");
		if (badge && unreadChats !== this.lastBadge) pop(badge);
		this.lastBadge = unreadChats;
	}
}

/** The springy scale-in WhatsApp gives a badge whose count changes. */
function pop(el: HTMLElement) {
	el.animate([{ transform: "scale(0.35)" }, { transform: "scale(1.08)", offset: 0.6 }, { transform: "scale(1)" }], {
		duration: 320,
		easing: "ease-out",
	});
}

export function infoView(chat: Chat, starred: number) {
	const card = "mx-[16px] mb-[20px] overflow-hidden rounded-[26px] bg-white";
	const actions = (
		[
			[Phone, "Llamar", "call"],
			[Video, "Video", "call"],
			[Search, "Buscar", "info-back"],
		] as [IconNode, string, string][]
	)
		.map(
			([i, label, act]) =>
				`<button type="button" data-act="${act}" class="flex h-[64px] flex-1 flex-col items-center justify-center gap-[4px] rounded-[22px] bg-white text-[13px] text-black active:bg-[#E5E5EA]">${icon(
					i,
					"size-[22px] text-[#1DAA61]",
					{ sw: 1.8 },
				)}${label}</button>`,
		)
		.join("");
	return `<div class="absolute inset-0 overflow-y-auto bg-[#F2F2F7] [scrollbar-width:none]">
<div class="sticky top-0 z-10 flex items-end px-[16px] pb-[2px]" style="height:${BAR_H + 4}px;background:linear-gradient(180deg,rgba(242,242,247,0.95) 55%,rgba(242,242,247,0))">
<button type="button" aria-label="Volver" data-act="info-back" class="${GLASS_BUTTON} size-[44px] rounded-full">${icon(ChevronLeft, "-ml-[2px] size-[26px]", {
		sw: 2.2,
	})}</button>
<span class="absolute bottom-[14px] left-1/2 -translate-x-1/2 text-[17px] font-semibold">${chat.business ? "Info. de empresa" : "Info. del contacto"}</span>
</div>
<div class="flex flex-col items-center px-[16px] pb-[18px] pt-[8px]">${avatar(chat, 104)}<h2 class="mt-[12px] text-[24px] font-semibold">${esc(
		chat.name,
	)}</h2><p class="text-[15px] text-[#8E8E93]">${esc(chat.business ? "Cuenta de empresa · Nutrióloga" : (chat.subtitle ?? ""))}</p><div class="mt-[18px] flex w-full gap-[8px]">${actions}</div></div>
${
	chat.business
		? `<div class="${card} p-[14px] text-[15px] leading-[21px]"><p>Planes de alimentación a distancia, 100% personalizados. Sin citas ni videollamadas 🌱</p><div class="mt-[12px] space-y-[10px] border-t border-black/[0.08] pt-[12px] text-[15px]"><p class="flex items-center gap-[10px]">${icon(
				Clock,
				"size-[18px] text-[#8E8E93]",
			)} Respondo en menos de 24 h</p><p class="flex items-center gap-[10px]">${icon(
				Mail,
				"size-[18px] text-[#8E8E93]",
			)}<a href="mailto:marialyalonso@gmail.com" class="text-[#027EB5]">marialyalonso@gmail.com</a></p><p class="flex items-center gap-[10px]">${icon(
				AtSign,
				"size-[18px] text-[#8E8E93]",
			)}<a href="https://www.nutralech.com" class="text-[#027EB5]">nutralech.com</a></p></div></div>`
		: ""
}
<div class="${card}">${settingsRow(Star, "#FFCC00", "Mensajes destacados", starred ? String(starred) : "Ninguno")}${settingsRow(
		Bell,
		"#34C759",
		"Notificaciones",
	)}${settingsRow(Lock, "#007AFF", "Cifrado")}</div>
<div class="h-[40px]"></div>
</div>`;
}
