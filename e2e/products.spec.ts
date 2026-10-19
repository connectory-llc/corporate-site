import { expect, test } from '@playwright/test';

const PRODUCT_NAMES = ['Yoyakuto', 'Kiyakuto', 'lumirio'];

test.describe('プロダクト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('公開予定の 3 つのサービスをカードで並べる', async ({ page }) => {
    const names = page.locator('#products').getByRole('heading', { level: 3 });
    await expect(names).toHaveText(PRODUCT_NAMES);
  });

  test('公開中のサービスはサービスサイトへ別タブでリンクする', async ({ page }) => {
    const products = page.locator('#products');
    for (const [name, url] of [
      ['Yoyakuto', 'https://yoyakuto.com'],
      ['Kiyakuto', 'https://kiyakuto.com'],
    ]) {
      const link = products.getByRole('link', { name: `${name} のサイトを見る` });
      await expect(link).toHaveAttribute('href', url);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('情報が揃っていないサービスは推測で埋めず準備中と示す', async ({ page }) => {
    const card = page.locator('#products article').filter({ hasText: 'lumirio' });
    await expect(card.getByText('準備中', { exact: true })).toBeVisible();
    await expect(card.getByRole('link')).toHaveCount(0);
  });
});
