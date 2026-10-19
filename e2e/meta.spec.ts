import { expect, test } from '@playwright/test';

const SITE_URL = 'https://connectory-llc.github.io/corporate-site/';
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

test.describe('検索エンジンと SNS 向けの情報', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('タイトルに社名とキャッチコピーを入れる', async ({ page }) => {
    await expect(page).toHaveTitle('CONNECTORY | つくる喜びを、誰かの喜びにつなぐ。');
  });

  test('事業内容を説明文として head に出す', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Web サービスやアプリケーションの企画・開発・運営/);
  });

  test('正規 URL を公開先の URL で出す', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE_URL);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', SITE_URL);
  });

  test('favicon とホーム画面用のアイコンを配信する', async ({ page, request }) => {
    for (const selector of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]']) {
      const href = await page.locator(selector).getAttribute('href');
      expect(href).not.toBeNull();
      const response = await request.get(new URL(href!, page.url()).href);
      expect(response.ok()).toBe(true);
    }
  });

  test('OGP 画像の URL とサイズを head に出し、PNG として配信する', async ({ page, request }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${SITE_URL}og.png`);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', OG_IMAGE_WIDTH);
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', OG_IMAGE_HEIGHT);
    const response = await request.get('og.png');
    expect(response.status()).toBe(HTTP_OK);
    expect(response.headers()['content-type']).toContain('image/png');
  });
});

test.describe('クローラー向けのファイル', () => {
  test('sitemap にトップページの URL を載せる', async ({ request }) => {
    const response = await request.get('sitemap.xml');
    expect(response.status()).toBe(HTTP_OK);
    expect(await response.text()).toContain(`<loc>${SITE_URL}</loc>`);
  });

  test('robots.txt で sitemap の場所を伝える', async ({ request }) => {
    const response = await request.get('robots.txt');
    expect(response.status()).toBe(HTTP_OK);
    expect(await response.text()).toContain(`Sitemap: ${SITE_URL}sitemap.xml`);
  });
});

test.describe('存在しないページ', () => {
  test('404 を返し、検索結果に載せないようにしてトップへ案内する', async ({ page }) => {
    const response = await page.goto('not-found-page');
    expect(response?.status()).toBe(HTTP_NOT_FOUND);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'トップページへ戻る' })).toHaveAttribute('href', '/corporate-site/');
  });
});
