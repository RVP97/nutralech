/** The plans sold on the home page (Stripe prices). */
export const PLANS = [
	{
		name: "Plan inicial",
		price: "1,200",
		priceId: "price_1UDoYxBoTKroQtb9eaEjMz8v",
		badge: "Primera vez",
		description:
			"Tu primer plan a distancia: un documento para conocer tus datos, objetivos, hábitos y rutina, y a partir de ahí un plan 100% personalizado.",
		popular: true,
	},
	{
		name: "Plan de seguimiento",
		price: "1,000",
		priceId: "price_1UDoZIBoTKroQtb96qUzoQz8",
		badge: "Ya soy paciente",
		description:
			"Actualiza tu plan a distancia con base en tus avances, cambios de hábitos y nuevos objetivos, sin consulta presencial.",
		popular: false,
	},
] as const;

/** Price ID of the follow-up plan, whose buyers get the follow-up form after paying. */
export const SEGUIMIENTO_PRICE_ID = "price_1UDoZIBoTKroQtb96qUzoQz8";
