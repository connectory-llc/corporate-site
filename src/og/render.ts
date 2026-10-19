/// <reference types="node" />
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_NAME } from '../data/site';

const FONT_NAME = 'Outfit';
const FONT_WEIGHT_MEDIUM = 500;
const FONT_WEIGHT_SEMIBOLD = 600;
const COLOR_BACKGROUND = '#F5F8FB';
const COLOR_TEXT = '#0F1B2D';
const COLOR_SUB = '#4A5669';
const COLOR_GLOW_BLUE = 'rgba(11, 95, 214, 0.12)';
const COLOR_GLOW_TURQUOISE = 'rgba(24, 195, 203, 0.14)';
const SYMBOL_HEIGHT = 190;
const WORDMARK_FONT_SIZE = 84;
const WORDMARK_LETTER_SPACING = 12;
const TAGLINE_FONT_SIZE = 28;
const TAGLINE_LETTER_SPACING = 10;
const GAP = 40;
const TEXT_GAP = 16;

// ビルド後の import.meta.url は元の位置を保たないため、カレントディレクトリを基準に読む
const fromRoot = (path: string) => readFile(resolve(path));

function box(style: Record<string, unknown>, children?: unknown) {
  return { type: 'div', props: { style: { display: 'flex', ...style }, children } };
}

function layout(symbolDataUrl: string, symbolWidth: number) {
  return box(
    {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: GAP,
      fontFamily: FONT_NAME,
      backgroundColor: COLOR_BACKGROUND,
      backgroundImage: `radial-gradient(circle at 85% 10%, ${COLOR_GLOW_BLUE}, transparent 45%), radial-gradient(circle at 10% 95%, ${COLOR_GLOW_TURQUOISE}, transparent 45%)`,
    },
    [
      { type: 'img', props: { src: symbolDataUrl, width: symbolWidth, height: SYMBOL_HEIGHT } },
      box(
        {
          flexDirection: 'column',
          alignItems: 'center',
          gap: TEXT_GAP,
        },
        [
          box(
            { fontSize: WORDMARK_FONT_SIZE, fontWeight: FONT_WEIGHT_SEMIBOLD, letterSpacing: WORDMARK_LETTER_SPACING, color: COLOR_TEXT },
            SITE_NAME,
          ),
          box(
            { fontSize: TAGLINE_FONT_SIZE, fontWeight: FONT_WEIGHT_MEDIUM, letterSpacing: TAGLINE_LETTER_SPACING, color: COLOR_SUB },
            'CONNECT × FACTORY',
          ),
        ],
      ),
    ],
  );
}

export async function renderOgImage(): Promise<Uint8Array<ArrayBuffer>> {
  const [symbol, medium, semibold] = await Promise.all([
    fromRoot('src/assets/brand/connectory-symbol.png'),
    fromRoot('node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff'),
    fromRoot('node_modules/@fontsource/outfit/files/outfit-latin-600-normal.woff'),
  ]);
  const { width = 0, height = 0 } = await sharp(symbol).metadata();
  const symbolWidth = Math.round((SYMBOL_HEIGHT * width) / height);
  const symbolDataUrl = `data:image/png;base64,${symbol.toString('base64')}`;

  const svg = await satori(layout(symbolDataUrl, symbolWidth) as Parameters<typeof satori>[0], {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      { name: FONT_NAME, data: medium, weight: FONT_WEIGHT_MEDIUM, style: 'normal' },
      { name: FONT_NAME, data: semibold, weight: FONT_WEIGHT_SEMIBOLD, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png);
}
