import { defineConfig } from 'astro/config';

// 独自ドメインが決まるまでは GitHub Pages の既定の URL で公開する。
// 決まったら site を差し替えて base を消し、public/CNAME にドメインを書く
export default defineConfig({
  site: 'https://connectory-llc.github.io',
  base: '/corporate-site',
});
