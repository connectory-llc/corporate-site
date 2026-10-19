import { renderOgImage } from '../og/render';

export async function GET() {
  return new Response(await renderOgImage(), { headers: { 'Content-Type': 'image/png' } });
}
