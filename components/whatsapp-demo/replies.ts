import { type LinkPreview, WA_LINK } from "./data";

export interface ReplyPart {
	text?: string;
	buttons?: string[];
	link?: LinkPreview;
	/** React to the visitor's last message instead of sending text. */
	react?: string;
}

export const START_BUTTONS = [
	"¿Cómo funciona?",
	"¿Cuánto cuesta?",
	"¿Qué incluye?",
];

export const WA_CARD: LinkPreview = {
	href: WA_LINK,
	title: "Marialy Alonso · Nutralech",
	description: "Escríbeme por WhatsApp",
	domain: "wa.me",
	image: "/images/marialy-2.webp",
};

const PRICING_CARD: LinkPreview = {
	href: "#precios",
	title: "Plan a distancia · Nutralech",
	description: "Plan inicial $1,200 · Plan de seguimiento $1,000",
	domain: "nutralech.com",
	image: "/images/frutas.webp",
	internal: true,
};

export const INTRO: ReplyPart[] = [
	{ text: "¡Hola! 👋 Soy Marialy, nutrióloga." },
	{
		text: "Si tienes dudas sobre el *plan a distancia*, pregúntame por aquí 😊",
		buttons: START_BUTTONS,
	},
];

const normalize = (s: string) =>
	s
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[¿?¡!.,;:]/g, " ");

interface Intent {
	test: RegExp;
	parts: ReplyPart[];
}

// Order matters: the first match wins, so specific topics sit above broad ones.
const INTENTS: Intent[] = [
	{
		test: /diabet|hipertens|presion|tiroid|\bsop\b|ovario|colesterol|triglic|autoinmun|embaraz|lactan|renal|rinon|higado|gastritis|colitis|insulina|enfermedad|medic|doctor/,
		parts: [
			{
				text: "Sí, tengo experiencia con condiciones como diabetes, hipertensión o enfermedades autoinmunes.",
			},
			{
				text: "Siempre en coordinación con tu médico cuando hace falta 🩺 Cuéntamelo en el documento para tomarlo en cuenta.",
			},
		],
	},
	{
		test: /cuest|precio|cost|cuanto|\bpago|pagar|tarjeta|oxxo|transfer|spei|mxn|\$|barato|caro/,
		parts: [
			{ text: "El *Plan inicial* es de *$1,200 MXN* 🌱" },
			{
				text: "Si ya eres paciente, el *Plan de seguimiento* es de *$1,000 MXN*. Pagas en línea con tarjeta, OXXO o transferencia.",
				link: PRICING_CARD,
			},
		],
	},
	{
		test: /tarda|cuando|dias|entrega|rapido|pronto|llega|tiempo/,
		parts: [
			{
				text: "En cuanto recibo tu documento completo, te entrego tu plan en *5 a 7 días hábiles* ⏳",
			},
		],
	},
	{
		test: /incluye|trae|contiene|equivalen|menu|recibo|que me das|viene/,
		parts: [
			{
				text: "Tu plan incluye:\n• Plan de alimentación personalizado\n• Sistema de equivalencias para variar tus alimentos\n• Un menú ejemplo\n• Estrategias para cuando comes fuera\n• Recomendaciones según tus hábitos y objetivos",
			},
			{ text: "Nada de menús rígidos 🙌" },
		],
	},
	{
		test: /funciona|proceso|pasos|como es|como le hago|empez|inicio|videollamada|llamada|consulta|presencial|distancia|document|formulario/,
		parts: [
			{ text: "Es muy sencillo y todo es a distancia:" },
			{
				text: "1️⃣ Compras tu plan y te llega un documento\n2️⃣ Lo llenas con tus datos, objetivos, hábitos y rutina\n3️⃣ Con eso armo tu plan 100% personalizado 📝",
			},
			{
				text: "Sin citas ni videollamadas: lo llenas a tu ritmo.",
				buttons: ["¿Cuánto tarda?", "¿Cuánto cuesta?"],
			},
		],
	},
	{
		test: /vegan|vegetarian|alergi|intoleran|gluten|lacto|no me gusta|no como|keto|ayuno|picky/,
		parts: [
			{ text: "Sí, lo adapto a tus preferencias, alergias e intolerancias 🥑" },
			{
				text: "En el documento me cuentas qué comes y qué no, y armo el plan a partir de eso.",
			},
		],
	},
	{
		test: /bajar|peso|grasa|adelgaz|kilo|musculo|masa|definir|energia|rendimiento|deport|gym|entren|correr|marat/,
		parts: [
			{ text: "¡Me encanta ese objetivo! 💪" },
			{
				text: "Armo tu plan según tus metas, tu rutina y lo que te gusta comer, para que sea algo que puedas sostener en el tiempo.",
			},
		],
	},
	{
		test: /duda|pregunt|escrib|whatsapp|seguimiento|contacto|correo|ajust|despues|actualiz/,
		parts: [
			{
				text: "¡Claro! Me puedes escribir por WhatsApp tus dudas sobre el plan 💬",
			},
			{
				text: "Y cuando quieras actualizarlo según tus avances, está el *Plan de seguimiento*.",
			},
		],
	},
	{
		test: /pais|mexico|extranjer|estados unidos|espana|donde|ciudad|internacional|vivo en/,
		parts: [
			{
				text: "Como todo es a distancia, puedes estar en cualquier ciudad o país 🌎",
			},
		],
	},
	{
		test: /quiero|comprar|contrat|me interesa|listo|lista|apart|empecemos|va\b/,
		parts: [
			{ text: "¡Qué gusto! 🎉" },
			{
				text: "Puedes contratar tu plan directo en la página:",
				link: PRICING_CARD,
			},
		],
	},
];

const GREETING =
	/^\s*(hola+|holi|buen[oa]s?( dias| tardes| noches)?|hey|que tal|que onda|hi|hello)\s*$/;
const THANKS =
	/gracias|thank|genial|perfecto|excelente|super|increible|va que va/;

export interface BotMemory {
	turns: number;
	ctaShown: boolean;
}

export function buildReply(input: string, memory: BotMemory): ReplyPart[] {
	const text = normalize(input);
	const words = text.trim().split(/\s+/).filter(Boolean);
	memory.turns += 1;

	let parts: ReplyPart[];
	let isFallback = false;

	const intent = INTENTS.find((i) => i.test.test(text));
	if (GREETING.test(text)) {
		parts = [
			{
				text: "¡Hola! 😊 ¿Qué te gustaría saber del plan?",
				buttons: START_BUTTONS,
			},
		];
	} else if (THANKS.test(text) && (words.length <= 5 || !intent)) {
		parts = [
			{ react: "❤️" },
			{ text: "¡Con mucho gusto! 🫶 Aquí estoy para lo que necesites." },
		];
	} else if (intent) {
		parts = intent.parts;
	} else {
		isFallback = true;
		parts = [
			{ text: "¡Buena pregunta! 😊" },
			{
				text: "Para responderte con calma, escríbeme directo a mi WhatsApp 👇",
				link: WA_CARD,
			},
		];
	}

	if (isFallback) {
		memory.ctaShown = true;
	} else if (!memory.ctaShown && memory.turns >= 2) {
		memory.ctaShown = true;
		parts = [
			...parts,
			{
				text: "Por cierto: esto es una demo 😉 Si quieres platicar de verdad, escríbeme aquí y te respondo en menos de 24 h.",
				link: WA_CARD,
			},
		];
	}

	return parts;
}

const DICTIONARY = [
	"hola",
	"adaptar",
	"adaptarlo",
	"puede",
	"pueden",
	"receta",
	"recetas",
	"proteína",
	"objetivo",
	"quisiera",
	"saber",
	"cuándo",
	"empezar",
	"embarazada",
	"vegana",
	"gluten",
	"sin",
	"con",
	"como",
	"que",
	"el",
	"la",
	"los",
	"las",
	"es",
	"está",
	"estoy",
	"soy",
	"mi",
	"muy",
	"más",
	"mucho",
	"hacer",
	"hay",
	"hoy",
	"gracias",
	"plan",
	"precio",
	"cuánto",
	"cuesta",
	"cómo",
	"funciona",
	"incluye",
	"quiero",
	"bajar",
	"peso",
	"vegetariana",
	"vegetariano",
	"diabetes",
	"seguimiento",
	"dudas",
	"tarda",
	"días",
	"menú",
	"equivalencias",
	"perfecto",
	"buenas",
	"buenos",
	"tardes",
	"noches",
	"músculo",
	"energía",
	"hipertensión",
	"alergia",
	"inicial",
	"nutrióloga",
	"comida",
	"desayuno",
	"cena",
	"ejercicio",
	"saludable",
	"también",
	"porque",
	"para",
	"pero",
	"puedo",
	"tengo",
	"necesito",
	"interesa",
	"información",
	"favor",
	"claro",
	"qué",
	"videollamada",
	"distancia",
	"documento",
	"pago",
];

/** QuickType-style suggestions for the word being typed. */
export function suggest(value: string): string[] {
	const match = value.match(/([\p{L}]+)$/u);
	if (!match) {
		return value.trim().length === 0
			? ["Hola", "Gracias", "¿Cuánto"]
			: ["¿Cómo", "plan", "gracias"];
	}
	const word = match[1];
	const key = normalize(word);
	const upper = word[0] === word[0].toUpperCase();
	const cap = (s: string) =>
		upper ? s.charAt(0).toUpperCase() + s.slice(1) : s;
	const hits = DICTIONARY.filter(
		(w) => normalize(w).startsWith(key) && normalize(w) !== key,
	)
		.sort((a, b) => a.length - b.length)
		.slice(0, 2)
		.map(cap);
	// iOS always fills all three slots.
	for (const f of ["de", "que", "y"]) if (hits.length < 2) hits.push(f);
	return [`“${word}”`, ...hits];
}
