import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

// 対応する最小の画面幅。iPhone SE（第 1 世代）などの 320px を想定する
const NARROWEST_VIEWPORT = { width: 320, height: 568 };
const NO_OVERFLOW = 0;

// スマホのエミュレーションでは innerWidth がはみ出した内容の幅まで広がり差が出ないため、表示領域の幅と比べる
function horizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

test.describe('表示品質', () => {
  test('幅 320px の画面でも横にはみ出さない', async ({ page }) => {
    await page.setViewportSize(NARROWEST_VIEWPORT);
    await page.goto('');
    expect(await horizontalOverflow(page)).toBe(NO_OVERFLOW);
  });

  test('WCAG 2.2 AA の自動チェックで違反がない', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
});
