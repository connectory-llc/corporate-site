import { expect, test } from '@playwright/test';

test.describe('トップページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('キャッチコピーを見出しとして表示する', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('つくる喜びを、誰かの喜びにつなぐ。');
  });
});
