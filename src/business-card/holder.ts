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
}

const holderFiles = import.meta.glob<CardHolder>('./holder.local.json', { eager: true, import: 'default' });
const photoFiles = import.meta.glob<ImageMetadata>('./photo.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const CARD_HOLDER: CardHolder = Object.values(holderFiles)[0] ?? {};
export const CARD_PHOTO: ImageMetadata | undefined = Object.values(photoFiles)[0];
