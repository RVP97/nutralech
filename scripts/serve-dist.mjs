// Local static server that resolves URLs like Cloudflare static assets
// (`/en/rooms` → `en/rooms.html`), for testing the build: node scripts/serve-dist.mjs [port]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { constants, createBrotliCompress } from 'node:zlib';

const root = join(process.cwd(), 'dist');
const port = Number(process.argv[2] ?? 4321);
const types = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.ico': 'image/x-icon',
	'.woff2': 'font/woff2',
	'.txt': 'text/plain; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8',
	'.xml': 'application/xml',
	'.webmanifest': 'application/manifest+json',
};

function resolve(pathname) {
	const p = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
	const candidates = p === '/' ? ['index.html'] : [p, `${p}.html`, `${p}/index.html`];
	for (const c of candidates) {
		const file = join(root, c);
		if (existsSync(file) && statSync(file).isFile()) return file;
	}
	return null;
}

createServer((req, res) => {
	const url = new URL(req.url, 'http://localhost');
	const file = resolve(url.pathname);
	if (!file) {
		res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
		const notFound = join(root, '404.html');
		return existsSync(notFound) ? createReadStream(notFound).pipe(res) : res.end('Not found');
	}
	const headers = { 'content-type': types[extname(file)] ?? 'application/octet-stream' };
	if (file.includes('/_astro/') || file.includes('/_img/'))
		headers['cache-control'] = 'public, max-age=31536000, immutable';
	// Cloudflare compresses text responses with Brotli; do the same so measurements match.
	const compressible = /^(text\/|application\/(json|xml|manifest)|image\/svg)/.test(
		headers['content-type']
	);
	if (compressible && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')) {
		headers['content-encoding'] = 'br';
		headers.vary = 'Accept-Encoding';
		res.writeHead(200, headers);
		createReadStream(file)
			.pipe(createBrotliCompress({ params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }))
			.pipe(res);
		return;
	}
	res.writeHead(200, headers);
	createReadStream(file).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}`));
