import { expect, test } from '@playwright/test';

const SITE_URL = 'https://connectory-llc.github.io/corporate-site/';

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
});
