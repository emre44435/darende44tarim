import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}
walk(rootDir);

const errors = [];
const canonicalValues = new Map();
const titleValues = new Map();
const domain = 'https://darendetarim.com';
const expectedSameAs = [
  'https://www.facebook.com/gucuktaksi/',
  'https://www.instagram.com/bayram_gucukk/'
];

function addUnique(map, value, file, label) {
  if (!value) return;
  if (map.has(value)) errors.push(`${label} duplicate: ${value} (${map.get(value)}, ${file})`);
  else map.set(value, file);
}

function resolveLocal(file, rawUrl) {
  if (!rawUrl || /^(#|tel:|mailto:|javascript:|data:)/i.test(rawUrl)) return null;
  let target = rawUrl.replace(/&amp;/g, '&');
  if (/^https?:\/\//i.test(target)) {
    if (!target.startsWith(domain)) return null;
    target = new URL(target).pathname;
  }
  target = target.split('#')[0].split('?')[0];
  if (!target) return null;
  let resolved;
  if (target.startsWith('/')) resolved = path.join(rootDir, target);
  else resolved = path.resolve(path.dirname(file), target);
  if (target.endsWith('/')) resolved = path.join(resolved, 'index.html');
  return resolved;
}

for (const file of htmlFiles) {
  const relative = path.relative(rootDir, file);
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+content="([^"]*)"\s+name="description"/i)?.[1]?.trim();
  const canonical = html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i)?.[1]?.trim();
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map(match => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  if (!title) errors.push(`${relative}: title missing`);
  if (!description) errors.push(`${relative}: meta description missing`);
  if (!canonical) errors.push(`${relative}: canonical missing`);
  if (h1Count !== 1) errors.push(`${relative}: expected one H1, found ${h1Count}`);
  if (duplicateIds.length) errors.push(`${relative}: duplicate IDs ${duplicateIds.join(', ')}`);
  addUnique(titleValues, title, relative, 'Title');
  addUnique(canonicalValues, canonical, relative, 'Canonical');

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const jsonLd = JSON.parse(match[1]);
      const nodes = Array.isArray(jsonLd['@graph']) ? jsonLd['@graph'] : [jsonLd];
      for (const node of nodes.filter(item => ['Store', 'Organization'].includes(item?.['@type']))) {
        if (!Array.isArray(node.sameAs) || expectedSameAs.some(url => !node.sameAs.includes(url))) {
          errors.push(`${relative}: ${node['@type']} schema sameAs is missing a required social profile`);
        }
      }
    }
    catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const local = resolveLocal(file, match[1]);
    if (local && !fs.existsSync(local)) errors.push(`${relative}: missing local target ${match[1]}`);
  }

  for (const match of html.matchAll(/<a\b([^>]*href="https:\/\/(?:www\.)?(?:facebook\.com|instagram\.com)[^"]*"[^>]*)>/gi)) {
    const attrs = match[1];
    if (!/target="_blank"/i.test(attrs)) errors.push(`${relative}: social link missing target=_blank`);
    if (!/rel="[^"]*noopener[^"]*noreferrer[^"]*"/i.test(attrs)) errors.push(`${relative}: social link missing rel=noopener noreferrer`);
  }
}

const sitemap = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname;
  const target = pathname.endsWith('/') ? path.join(rootDir, pathname, 'index.html') : path.join(rootDir, pathname);
  if (!fs.existsSync(target)) errors.push(`sitemap target missing: ${url}`);
}

if (sitemapUrls.length !== 37) errors.push(`expected 37 sitemap URLs, found ${sitemapUrls.length}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and ${sitemapUrls.length} sitemap URLs with no structural errors.`);
