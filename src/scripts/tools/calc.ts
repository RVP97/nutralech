/**
 * Helpers shared by the calculators in src/components/tools. Each calculator is a <form
 * data-calc="name">: fields are plain inputs and selects, results are filled into elements marked
 * data-out, and parts that depend on a select (e.g. metric or imperial units) carry
 * data-when="field:value" and are hidden otherwise.
 */
export type Form = HTMLFormElement;

/** Calls setup once per form with that name, now and after every client-side navigation. */
export function register(name: string, setup: (form: Form) => void) {
	const run = () => {
		for (const form of document.querySelectorAll<Form>(`form[data-calc="${name}"]`)) {
			if (form.dataset.ready) continue;
			form.dataset.ready = "true";
			syncWhen(form);
			form.addEventListener("change", () => syncWhen(form));
			setup(form);
		}
	};
	document.addEventListener("astro:page-load", run);
	run();
}

/** Shows the data-when="field:value[|value]" blocks whose field currently has one of the values. */
export function syncWhen(form: Form) {
	for (const el of form.querySelectorAll<HTMLElement>("[data-when]")) {
		const [field, values] = (el.dataset.when ?? "").split(":");
		el.hidden = !values.split("|").includes(str(form, field));
	}
	for (const el of form.querySelectorAll<HTMLElement>("[data-text-when]")) {
		// data-text-when='{"field":"unit","metric":"kg","imperial":"lb"}'
		const map = JSON.parse(el.dataset.textWhen ?? "{}") as Record<string, string>;
		const text = map[str(form, map.field)];
		if (text !== undefined) el.textContent = text;
	}
	for (const el of form.querySelectorAll<HTMLInputElement>("[data-placeholder-when]")) {
		const map = JSON.parse(el.dataset.placeholderWhen ?? "{}") as Record<string, string>;
		const text = map[str(form, map.field)];
		if (text !== undefined) el.placeholder = text;
	}
}

const field = (form: Form, name: string) =>
	form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | RadioNodeList | null;

/** A field's value as text ("" when missing). */
export function str(form: Form, name: string): string {
	return field(form, name)?.value ?? "";
}

/** A field's value as a number (NaN when blank). */
export function num(form: Form, name: string): number {
	const value = str(form, name);
	return value.trim() === "" ? Number.NaN : Number.parseFloat(value);
}

/** Sets the text of every [data-out=name] element in root. */
export function out(root: ParentNode, name: string, text: string | number) {
	for (const el of root.querySelectorAll<HTMLElement>(`[data-out="${name}"]`)) el.textContent = String(text);
}

/** The element marked [data-part=name] in root. */
export function part<T extends HTMLElement = HTMLElement>(root: ParentNode, name: string): T {
	return root.querySelector<T>(`[data-part="${name}"]`) as T;
}

/** Shows or hides an error message (the [data-part=error] element). */
export function error(form: Form, message: string) {
	const el = part(form, "error");
	if (!el) return;
	el.textContent = message;
	el.hidden = !message;
}

export const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
	);

/**
 * Reads the BodyFields.astro inputs (age, gender, units, height, weight), showing each field's
 * error message when it is blank. Returns null if any is missing.
 */
export function readBody(form: Form) {
	const metric = str(form, "unit") === "metric";
	const age = num(form, "age");
	const weight = num(form, "weight");
	const feet = num(form, "feet") || 0;
	const inches = num(form, "inches") || 0;
	const heightCm = metric ? num(form, "cm") : feet * 30.48 + inches * 2.54;
	const has = (name: string) => !!form.elements.namedItem(name);
	if (!required(form, { age: has("age") && !age, height: has("cm") && !heightCm, weight: has("weight") && !weight }))
		return null;
	return {
		age,
		gender: str(form, "gender"),
		metric,
		heightCm,
		feet,
		inches,
		weight,
		weightKg: metric ? weight : weight * 0.453592,
	};
}

/** Harris-Benedict (revised) basal metabolic rate, in kcal/day. */
export const harrisBenedict = (gender: string, weightKg: number, heightCm: number, age: number) =>
	gender === "male"
		? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
		: 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;

/** Replaces a <ul>'s items with these texts. */
export function list(ul: HTMLElement, items: string[], className = "pl-1 marker:text-foreground") {
	ul.replaceChildren(...items.map((text) => Object.assign(document.createElement("li"), { className, textContent: text })));
}

/**
 * Shows the [data-error=name] message of each field flagged as missing and hides the rest.
 * Returns true when nothing is missing.
 */
export function required(form: Form, missing: Record<string, boolean>): boolean {
	for (const [name, show] of Object.entries(missing)) {
		const el = form.querySelector<HTMLElement>(`[data-error="${name}"]`);
		if (el) el.hidden = !show;
	}
	return !Object.values(missing).some(Boolean);
}
