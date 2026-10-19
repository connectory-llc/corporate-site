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

  test('ヘッダーから移動した先のセクションの上端がヘッダーに隠れない', async ({ page }) => {
    // スムーズスクロールの途中で判定しないよう、即座にスクロールさせる
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const nav = page.getByRole('navigation', { name: 'ページ内のセクション' });
    for (const label of SECTION_LINKS) {
      await nav.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${label.toLowerCase()}$`));
      const headerBottom = await page.locator('.site-header').evaluate((element) => element.getBoundingClientRect().bottom);
      const sectionTop = await page.locator(`#${label.toLowerCase()}`).evaluate((element) => element.getBoundingClientRect().top);
      // セクションの位置は小数の px になるため、目に見えない 1px 未満の差は丸めて比べる
      expect(Math.round(sectionTop)).toBeGreaterThanOrEqual(Math.round(headerBottom));
    }
  });
});
