import type { APIContext } from 'astro';
import { withBase } from '../lib/url';

const PATHS = ['/'];

export function GET(context: APIContext) {
  const urls = PATHS.map((path) => `  <url><loc>${new URL(withBase(path), context.site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
