/** shadcn/ui Input and Label classes, for the calculators' native form fields. */
export const inputClass =
	"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export const labelClass = "text-sm font-medium leading-none";

/** The calculators' submit button (white on the accessible shade of the brand pink). */
export const calcButtonClass =
	"inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#C54B5B] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#B03F4F] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

/** Activity levels, as the calorie, hydration and macro calculators list them. */
export const ACTIVITY_OPTIONS = [
	{ value: "sedentary", label: "Sedentario: poco o ningún ejercicio" },
	{ value: "lightlyActive", label: "Ligeramente Activo: ejercicio ligero 1-3 días/semana" },
	{ value: "moderatelyActive", label: "Moderadamente Activo: ejercicio moderado 3-5 días/semana" },
	{ value: "active", label: "Activo: ejercicio duro 6-7 días/semana" },
	{ value: "veryActive", label: "Muy Activo: ejercicio muy duro o trabajo físico diario" },
];

/** Weight goals, as the calorie and protein calculators list them. */
export const GOAL_OPTIONS = [
	{ value: "loseExtreme", label: "Pérdida Rápida: déficit de 500 calorías" },
	{ value: "loseMild", label: "Pérdida Gradual: déficit de 250 calorías" },
	{ value: "maintain", label: "Mantener Peso: sin cambios en calorías" },
	{ value: "gainMild", label: "Aumento Gradual: superávit de 250 calorías" },
	{ value: "gainExtreme", label: "Aumento Rápido: superávit de 500 calorías" },
];
