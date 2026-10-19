import { expect, test } from '@playwright/test';

test.describe('ファーストビュー', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('キャッチコピーを見出しとして表示する', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('つくる喜びを、誰かの喜びにつなぐ。');
  });

  test('社名の由来と会社を紹介する短い文章を添える', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero.getByText('CONNECT × FACTORY')).toBeVisible();
    await expect(hero.getByText('私たちは、ものづくりが好きです。')).toBeVisible();
  });

  test('ロゴを代替テキスト付きで表示する', async ({ page }) => {
    await expect(page.locator('.hero').getByRole('img', { name: 'CONNECTORY のロゴ' })).toBeVisible();
  });

  test('理念と制作物のセクションへ案内する', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero.getByRole('link', { name: '私たちについて' })).toHaveAttribute('href', '#about');
    await expect(hero.getByRole('link', { name: 'プロダクトを見る' })).toHaveAttribute('href', '#products');
  });
});
