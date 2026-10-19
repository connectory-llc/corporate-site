import { test } from '@playwright/test';

const SCREENSHOT_DIR = 'test-results/screenshots';

// 見た目の確認用にページ全体を保存する。表示時のフェードインが終わった状態を撮るため、全要素を表示済みにしてから撮る
test('トップページ全体のスクリーンショットを保存する', async ({ page }, testInfo) => {
  await page.goto('');
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const path = `${SCREENSHOT_DIR}/top-${testInfo.project.name}.png`;
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(`top-${testInfo.project.name}`, { path, contentType: 'image/png' });
});
