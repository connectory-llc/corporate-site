import type { ImageMetadata } from 'astro';
import nozomiHosakaAvatar from '../assets/members/nozomi-hosaka.png';
import taiseiMiyajiAvatar from '../assets/members/taisei-miyaji.png';

export interface MemberLink {
  label: string;
  account: string;
  url: string;
}

export interface Member {
  slug: string;
  name: string;
  nameRoman: string;
  avatar: ImageMetadata;
  links: MemberLink[];
}

export const MEMBERS: Member[] = [
  {
    slug: 'taisei-miyaji',
    name: '宮地 大成',
    nameRoman: 'Taisei Miyaji',
    avatar: taiseiMiyajiAvatar,
    links: [
      { label: 'X', account: '@lyricrime', url: 'https://x.com/lyricrime' },
      { label: 'LinkedIn', account: 'taisei-miyaji', url: 'https://www.linkedin.com/in/taisei-miyaji/' },
    ],
  },
  {
    slug: 'nozomi-hosaka',
    name: '保坂 望',
    nameRoman: 'Nozomi Hosaka',
    avatar: nozomiHosakaAvatar,
    links: [
      { label: 'X', account: '@nonz250', url: 'https://x.com/nonz250' },
      { label: 'LinkedIn', account: 'nozomi-hosaka', url: 'https://www.linkedin.com/in/nozomi-hosaka/' },
    ],
  },
];
