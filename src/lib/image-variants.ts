/**
 * Responsive image widths. scripts/generate-image-variants.mjs writes every raster image under
 * public/ at each width to dist/_img/<width>/<path> (never upscaled), so any srcset built from
 * this list resolves to a real file on both the server render and the client.
 */
export const IMAGE_WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920] as const;

export const IMAGE_VARIANT_PREFIX = '/_img';

export function isOptimizable(src: string): boolean {
	return src.startsWith('/') && !src.startsWith('//') && /\.(webp|jpe?g|png|avif)$/i.test(src);
}

export function variantUrl(src: string, width: number): string {
	return `${IMAGE_VARIANT_PREFIX}/${width}${src}`;
}
