import type { ImageMetadata } from 'astro';

// リポジトリは公開しているため、個人の連絡先や顔写真は src/data に置かず、コミットしない手元のファイルから読み込む
export interface CardHolder {
  title?: string;
  name?: string;
  nameRoman?: string;
  postalCode?: string;
  address?: string;
  email?: string;
  phone?: string;
  photo?: ImageMetadata;
}

const holderFiles = import.meta.glob<CardHolder>('./holders/*.json', { eager: true, import: 'default' });
const photoFiles = import.meta.glob<ImageMetadata>('./holders/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const toHolderId = (path: string) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '');

const holders = new Map<string, CardHolder>();
for (const [path, holder] of Object.entries(holderFiles)) {
  holders.set(toHolderId(path), { ...holder });
}
for (const [path, photo] of Object.entries(photoFiles)) {
  const id = toHolderId(path);
  holders.set(id, { ...holders.get(id), photo });
}

export const CARD_HOLDERS: CardHolder[] = [...holders.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, holder]) => holder);
