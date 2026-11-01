/** A CSS declaration list from a style object, the way React writes the style attribute. */
const UNITLESS = new Set([
	'opacity',
	'zIndex',
	'fontWeight',
	'lineHeight',
	'flex',
	'flexGrow',
	'flexShrink',
	'order',
	'zoom',
	'scale',
]);

export type StyleObject = Record<string, string | number | undefined | null>;

export function styleString(style: StyleObject | string | undefined | null): string | undefined {
	if (style == null) return undefined;
	if (typeof style === 'string') return style || undefined;
	const parts: string[] = [];
	for (const [key, value] of Object.entries(style)) {
		if (value == null || value === '') continue;
		const prop = key.startsWith('--') ? key : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
		const v =
			typeof value === 'number' && value !== 0 && !UNITLESS.has(key) && !key.startsWith('--')
				? `${value}px`
				: value;
		parts.push(`${prop}:${v}`);
	}
	return parts.length ? parts.join(';') : undefined;
}
