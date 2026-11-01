export type Tick = "pending" | "sent" | "delivered" | "read";

export interface LinkPreview {
	href: string;
	title: string;
	description: string;
	domain: string;
	image?: string;
	/** In-page anchor: scrolls the real page instead of opening a tab. */
	internal?: boolean;
}

export interface ReplyRef {
	id: string;
	author: string;
	text: string;
	mine: boolean;
	color?: string;
}

export interface Message {
	id: string;
	from: "me" | "them";
	author?: string;
	authorColor?: string;
	text: string;
	time: string;
	/** Date separator label; omitted means "Hoy". */
	day?: string;
	status?: Tick;
	deleted?: boolean;
	audio?: string;
	replyTo?: ReplyRef;
	reactions?: { me?: string; them?: string };
	starred?: boolean;
	buttons?: string[];
	link?: LinkPreview;
}

export interface Chat {
	id: string;
	name: string;
	avatar?: string;
	group?: boolean;
	business?: boolean;
	pinned?: boolean;
	muted?: boolean;
	favorite?: boolean;
	/** Only Marialy reads and answers; everyone else leaves you on "delivered". */
	responsive?: boolean;
	unread: number;
	typing: boolean;
	online: boolean;
	lastSeen?: string;
	/** Static subtitle for contacts that never come online. */
	subtitle?: string;
	/** Sort key: most recent activity first. */
	ts: number;
	messages: Message[];
}

export const MARIALY_ID = "marialy";
export const WA_LINK = "https://wa.me/message/BLYZCVYW2MOAJ1";

let counter = 0;
export const uid = () =>
	`m${Date.now().toString(36)}${(counter++).toString(36)}`;

const pad = (n: number) => n.toString().padStart(2, "0");

export const clock = (d = new Date()) =>
	`${pad(d.getHours())}:${pad(d.getMinutes())}`;

const WEEKDAYS = [
	"domingo",
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",
	"sábado",
];

/** Label WhatsApp uses for a past date: "Ayer", a weekday, or dd/mm/yy. */
export function dayLabel(d: Date, now = new Date()) {
	const start = (x: Date) =>
		new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
	const diff = Math.round((start(now) - start(d)) / 86_400_000);
	if (diff <= 0) return undefined;
	if (diff === 1) return "Ayer";
	if (diff < 7) return WEEKDAYS[d.getDay()];
	return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
}

function ago(minutes: number) {
	const d = new Date(Date.now() - minutes * 60_000);
	return { time: clock(d), day: dayLabel(d), ts: d.getTime() };
}

function history(
	minutes: number,
	rows: Array<Omit<Message, "id" | "time" | "day">>,
): Message[] {
	const { time, day } = ago(minutes);
	return rows.map((r) => ({ id: uid(), time, day, ...r }));
}

export const AUTHOR_COLORS = ["#D3396D", "#1F7AEC", "#C4532D", "#06845C"];

export function createChats(): Chat[] {
	const t = (m: number) => ago(m).ts;
	return [
		{
			id: MARIALY_ID,
			name: "Marialy Alonso",
			avatar: "/images/marialy-2.webp",
			business: true,
			pinned: true,
			favorite: true,
			responsive: true,
			unread: 0,
			typing: false,
			online: false,
			ts: Date.now(),
			messages: [],
		},
		{
			id: "mama",
			name: "Mamá 💛",
			favorite: true,
			unread: 1,
			typing: false,
			online: false,
			subtitle: `últ. vez hoy a la(s) ${ago(38).time}`,
			ts: t(38),
			messages: [
				...history(95, [
					{ from: "me", text: "Ya salí del trabajo 🙌", status: "read" },
				]),
				...history(40, [
					{ from: "them", text: "Qué bueno mi amor" },
					{
						from: "them",
						text: "¿Vienes a comer el domingo? Hago caldo de pollo 🍲",
					},
				]),
			],
		},
		{
			id: "gym",
			name: "Gym 6 am 💪",
			group: true,
			muted: true,
			unread: 3,
			typing: false,
			online: false,
			subtitle: "Andrea, Pau, Diego, Tú",
			ts: t(64),
			messages: history(70, [
				{
					from: "them",
					author: "Diego",
					authorColor: AUTHOR_COLORS[1],
					text: "Hoy pierna 🦵 nadie se salva",
				},
				{
					from: "them",
					author: "Pau",
					authorColor: AUTHOR_COLORS[2],
					text: "Yo llego 6:15 😅",
				},
				{
					from: "them",
					author: "Andrea",
					authorColor: AUTHOR_COLORS[0],
					text: "¿Quién va mañana? 🏋️‍♀️",
				},
			]),
		},
		{
			id: "luisa",
			name: "Luisa",
			avatar: "/images/avatar/luisa.webp",
			unread: 0,
			typing: false,
			online: false,
			subtitle: `últ. vez hoy a la(s) ${ago(130).time}`,
			ts: t(140),
			messages: history(140, [
				{ from: "them", text: "¿Siempre sí vamos al mercado?" },
				{ from: "me", text: "jaja sí, el sábado sin falta", status: "read" },
			]),
		},
		{
			id: "gabriel",
			name: "Gabriel",
			avatar: "/images/avatar/gabriel.webp",
			unread: 0,
			typing: false,
			online: false,
			subtitle: "últ. vez ayer a la(s) 22:14",
			ts: t(60 * 22),
			messages: history(60 * 22, [
				{ from: "me", text: "¿Cómo haces tu avena?", status: "read" },
				{ from: "them", text: "Te paso la receta de la avena 👌" },
			]),
		},
		{
			id: "majo",
			name: "Majo",
			avatar: "/images/avatar/maria.webp",
			unread: 0,
			typing: false,
			online: false,
			subtitle: "últ. vez ayer a la(s) 19:40",
			ts: t(60 * 30),
			messages: history(60 * 30, [{ from: "them", text: "", audio: "0:14" }]),
		},
		{
			id: "sandra",
			name: "Sandra",
			avatar: "/images/avatar/sandra.webp",
			unread: 0,
			typing: false,
			online: false,
			subtitle: "últ. vez hace 3 días",
			ts: t(60 * 55),
			messages: history(60 * 55, [
				{ from: "them", text: "¿Ya viste el café nuevo de la esquina? ☕" },
				{ from: "me", text: "¡Sí! Vamos esta semana", status: "read" },
			]),
		},
	];
}

/** Strip WhatsApp *bold* / _italic_ / ~strike~ markers for one-line previews. */
export const plain = (s: string) => s.replace(/[*_~]/g, "");

export function previewOf(m: Message | undefined) {
	if (!m) return "";
	if (m.deleted)
		return m.from === "me"
			? "Eliminaste este mensaje."
			: "Se eliminó este mensaje.";
	if (m.audio) return `Audio (${m.audio})`;
	return plain(m.text).replace(/\n+/g, " ");
}
