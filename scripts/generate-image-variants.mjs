// Writes resized copies of every raster image in public/ to dist/_img/<width>/<path>, the files
// components/image.tsx's srcset points at (lib/image-variants.ts), plus an AVIF version of each at
// <path>.avif for the <picture> source. Never upscales: widths above the original get the
// original file (and an AVIF of it at full size). Results are cached between builds.
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import sharp from 'sharp';

const WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920]; // keep in sync with lib/image-variants.ts
const PUBLIC = 'public';
const OUT = 'dist/_img';
const CACHE = 'node_modules/.cache/image-variants';
const RASTER = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);
// AVIF at 55 looks like WebP at 80 for these photos and is about half the size.
const AVIF_QUALITY = 55;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (RASTER.has(extname(entry.name).toLowerCase())) yield path;
	}
}

let made = 0;
let cached = 0;

async function encode(input, width, format, meta) {
	const image = width ? sharp(input).resize({ width, withoutEnlargement: true }) : sharp(input);
	if (format === 'webp') return image.webp({ quality: 80, effort: 5 }).toBuffer();
	if (format === 'png')
		return image.png({ compressionLevel: 9, palette: meta.hasAlpha }).toBuffer();
	if (format === 'avif') return image.avif({ quality: AVIF_QUALITY, effort: 4 }).toBuffer();
	return image.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
}

/** Encode (or reuse the cached result) and write it to `out`. */
async function cachedEncode(input, hash, width, format, meta, ext, out, keepSmaller) {
	const cacheFile = join(CACHE, `${hash}-${width ?? 'full'}${ext}`);
	try {
		await stat(cacheFile);
		await copyFile(cacheFile, out);
		cached++;
	} catch {
		const buffer = await encode(input, width, format, meta);
		// Keep the original when re-encoding would not make it smaller.
		const best = keepSmaller && buffer.length >= input.length ? input : buffer;
		await mkdir(CACHE, { recursive: true });
		await writeFile(cacheFile, best);
		await writeFile(out, best);
		made++;
	}
}

const files = [];
for await (const file of walk(PUBLIC)) files.push(file);

await Promise.all(
	files.map(async (file) => {
		const input = await readFile(file);
		const meta = await sharp(input).metadata();
		const hash = createHash('sha1').update(input).digest('hex').slice(0, 16);
		const rel = relative(PUBLIC, file);
		const format = meta.format === 'jpeg' ? 'jpeg' : meta.format;
		for (const width of WIDTHS) {
			const out = join(OUT, String(width), rel);
			await mkdir(dirname(out), { recursive: true });
			const full = !meta.width || width >= meta.width;
			if (full) await copyFile(file, out);
			else await cachedEncode(input, hash, width, format, meta, extname(file), out, true);
			if (format !== 'avif') {
				await cachedEncode(
					input,
					hash,
					full ? undefined : width,
					'avif',
					meta,
					'.avif',
					`${out}.avif`,
					false
				);
			}
		}
	})
);
console.log(
	`image variants: ${files.length} images × ${WIDTHS.length} widths (${made} encoded, ${cached} cached)`
);
