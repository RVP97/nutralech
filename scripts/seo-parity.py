#!/usr/bin/env python3
"""
SEO parity check between two crawls of the site (e.g. the old Next.js build and the Astro build).

Usage: python3 scripts/seo-parity.py <baseline_dir> <candidate_dir> <urls.txt> [--report out.json]

Each dir holds one HTML file per URL, named like the crawl script writes them
(`/en/rooms` -> `en__rooms.html`, `/` -> `__root.html`). For every URL it compares what search
engines read: <title>, meta tags, canonical, hreflang, JSON-LD, headings, links, image alt text
and the visible text, and prints the differences.
"""
import json
import re
import sys
from collections import Counter
from difflib import SequenceMatcher
from urllib.parse import parse_qs, unquote, urlparse

from bs4 import BeautifulSoup

IGNORED_META = {'next-size-adjust', 'viewport', 'charset'}


def fname(url: str) -> str:
    return '__root' if url == '/' else url.lstrip('/').replace('/', '__')


def norm_img(src: str) -> str:
    if not src:
        return ''
    if src.startswith('/_next/image'):
        q = parse_qs(urlparse(src).query)
        return unquote(q.get('url', [''])[0])
    m = re.match(r'^/_img/\d+(/.*)$', src)
    return m.group(1) if m else src


def norm_text(s: str) -> str:
    return re.sub(r'\s+', ' ', s or '').strip()


def extract(html: str) -> dict:
    soup = BeautifulSoup(html, 'lxml')
    head = soup.head or soup
    out: dict = {}
    out['lang'] = (soup.html or {}).get('lang') if soup.html else None
    out['dir'] = soup.html.get('dir') if soup.html else None
    out['title'] = norm_text(head.title.string if head.title else '')
    metas = []
    for m in soup.find_all('meta'):
        key = m.get('name') or m.get('property') or m.get('http-equiv')
        if not key or key in IGNORED_META:
            continue
        metas.append((key, norm_text(m.get('content', ''))))
    out['meta'] = sorted(metas)
    links = []
    for link in soup.find_all('link'):
        rel = ' '.join(link.get('rel', []))
        if rel in ('canonical', 'alternate', 'manifest', 'icon', 'apple-touch-icon', 'mask-icon', 'author', 'prev', 'next'):
            links.append((rel, link.get('hreflang') or link.get('type') or link.get('sizes') or '', link.get('href')))
    out['links'] = sorted(links)
    ld = []
    for s in soup.find_all('script', type='application/ld+json'):
        try:
            ld.append(json.dumps(json.loads(s.string or s.get_text()), sort_keys=True, ensure_ascii=False))
        except Exception as e:  # noqa: BLE001
            ld.append(f'INVALID: {e}')
    out['jsonld'] = sorted(ld)
    body = soup.body or soup
    for tag in body.find_all(['script', 'style', 'noscript', 'template']):
        tag.decompose()
    for tag in body.find_all(attrs={'hidden': True}):
        pass
    out['headings'] = [(h.name, norm_text(h.get_text(' '))) for h in body.find_all(['h1', 'h2', 'h3', 'h4'])]
    out['anchors'] = sorted(Counter(a.get('href') for a in body.find_all('a') if a.get('href')).items())
    out['images'] = sorted(Counter((norm_img(i.get('src', '')), norm_text(i.get('alt', ''))) for i in body.find_all('img')).items())
    out['text'] = norm_text(body.get_text(' '))
    return out


def diff_lists(a, b):
    sa, sb = Counter(map(json.dumps, a)), Counter(map(json.dumps, b))
    return [json.loads(x) for x in (sa - sb).elements()], [json.loads(x) for x in (sb - sa).elements()]


def main():
    base_dir, cand_dir, urls_file = sys.argv[1:4]
    report_path = sys.argv[sys.argv.index('--report') + 1] if '--report' in sys.argv else None
    urls = [u.strip() for u in open(urls_file) if u.strip() and not u.strip().endswith('.txt')]
    report = {}
    summary = Counter()
    for url in urls:
        try:
            a = extract(open(f'{base_dir}/{fname(url)}.html', encoding='utf-8').read())
        except FileNotFoundError:
            summary['missing_baseline'] += 1
            continue
        try:
            b = extract(open(f'{cand_dir}/{fname(url)}.html', encoding='utf-8').read())
        except FileNotFoundError:
            report[url] = {'missing': True}
            summary['missing_candidate'] += 1
            continue
        d = {}
        for key in ('lang', 'dir', 'title'):
            if a[key] != b[key]:
                d[key] = [a[key], b[key]]
        for key in ('meta', 'links', 'jsonld', 'headings', 'anchors', 'images'):
            removed, added = diff_lists(a[key], b[key])
            if removed or added:
                d[key] = {'only_baseline': removed, 'only_candidate': added}
        ratio = SequenceMatcher(None, a['text'], b['text'], autojunk=False).quick_ratio()
        if ratio < 0.999:
            ratio = SequenceMatcher(None, a['text'], b['text'], autojunk=False).ratio()
        if ratio < 0.995:
            d['text_similarity'] = round(ratio, 4)
        for key in d:
            summary[key] += 1
        if d:
            report[url] = d
    print(f'URLs compared: {len(urls)}; pages with differences: {len(report)}')
    for key, count in summary.most_common():
        print(f'  {key}: {count}')
    if report_path:
        json.dump(report, open(report_path, 'w'), ensure_ascii=False, indent=1)
        print(f'Report: {report_path}')


if __name__ == '__main__':
    main()
