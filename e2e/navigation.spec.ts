import { expect, test } from '@playwright/test';

const SECTION_LINKS = ['About', 'Products', 'Company', 'Contact'];

test.describe('サイト内の導線', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('ヘッダーから各セクションへ移動できる', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'ページ内のセクション' });
    for (const label of SECTION_LINKS) {
      const href = await nav.getByRole('link', { name: label, exact: true }).getAttribute('href');
      expect(href).toBe(`/corporate-site/#${label.toLowerCase()}`);
    }
  });

  test('キーボード操作の最初に本文へのスキップリンクを出す', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: '本文へスキップ' })).toBeFocused();
  });
});
