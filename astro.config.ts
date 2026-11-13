import type { AstroIntegration } from 'astro';
import { defineConfig } from 'astro/config';

// 名刺のページは個人の連絡先を載せるため、src/pages に置かず、手元の開発サーバーでだけ開けるようにする
const businessCardPage: AstroIntegration = {
  name: 'business-card-page',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/business-card', entrypoint: './src/business-card/BusinessCardPage.astro' });
    },
  },
};

// 独自ドメインが決まるまでは GitHub Pages の既定の URL で公開する。
// 決まったら site を差し替えて base を消し、public/CNAME にドメインを書く
export default defineConfig({
  site: 'https://connectory-llc.github.io',
  base: '/corporate-site',
  integrations: [businessCardPage],
});
