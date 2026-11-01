/** The shadcn/ui button classes, for <a> and <button> elements styled as buttons. */
const BASE =
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const VARIANTS = {
	default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
	outline:
		"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	/** No colors, for callers that set their own background and text (classes are not merged). */
	plain: "",
} as const;

const SIZES = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md px-3 text-xs",
	lg: "h-10 rounded-md px-8",
	icon: "h-9 w-9",
} as const;

export function buttonClass({
	variant = "default",
	size = "default",
	class: extra = "",
}: {
	variant?: keyof typeof VARIANTS;
	size?: keyof typeof SIZES;
	class?: string;
} = {}): string {
	return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}
