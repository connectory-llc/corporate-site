import type { ImageMetadata } from 'astro';
import kiyakutoLogo from '../assets/products/kiyakuto.svg';
import yoyakutoLogo from '../assets/products/yoyakuto.svg';

// 概要や URL が決まっていない項目は空のままにする。推測した説明で埋めると、実際のサービスと食い違うおそれがある
export interface Product {
  name: string;
  logo?: ImageMetadata;
  tagline?: string;
  summary?: string;
  url?: string;
  screenshot?: ImageMetadata;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Yoyakuto',
    logo: yoyakutoLogo,
    tagline: 'チームの予約受付・日程調整サービス',
    summary: 'Google カレンダーと連携して、チームの空き時間から予約ページを公開できる日程調整サービスです。',
    url: 'https://yoyakuto.com',
  },
  {
    name: 'Kiyakuto',
    logo: kiyakutoLogo,
    summary: '利用規約の作成・バージョン管理・同意取得を一元管理するプラットフォームです。',
    url: 'https://kiyakuto.com',
  },
  {
    name: 'lumirio',
  },
];
