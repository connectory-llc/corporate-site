import type { APIContext } from 'astro';
import { withBase } from '../lib/url';

export function GET(context: APIContext) {
  const sitemapUrl = new URL(withBase('sitemap.xml'), context.site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
