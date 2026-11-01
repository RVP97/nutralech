/** Macro splits for the macronutrient calculator (share of calories). */
export const MACRO_PREFERENCES: Record<string, { label: string; protein: number; carbs: number; fat: number; description: string }> = {
	balanced: { label: "Equilibrado", protein: 0.3, carbs: 0.4, fat: 0.3, description: "Distribución equilibrada ideal para mantenimiento y salud general." },
	"high-protein": { label: "Alto en Proteína", protein: 0.4, carbs: 0.3, fat: 0.3, description: "Mayor contenido proteico, ideal para deportistas y ganancia muscular." },
	"high-carb": { label: "Alto en Carbohidratos", protein: 0.25, carbs: 0.55, fat: 0.2, description: "Alto en carbohidratos, óptimo para deportes de resistencia." },
	"low-carb": { label: "Bajo en Carbohidratos", protein: 0.35, carbs: 0.25, fat: 0.4, description: "Reducido en carbohidratos, bueno para control de peso." },
	keto: { label: "Cetogénico", protein: 0.3, carbs: 0.05, fat: 0.65, description: "Muy bajo en carbohidratos y alto en grasas para cetosis." },
	mediterranean: { label: "Mediterráneo", protein: 0.25, carbs: 0.45, fat: 0.3, description: "Basado en la dieta mediterránea, rico en grasas saludables." },
};
