import { test } from '@playwright/test';

const SCREENSHOT_DIR = 'test-results/screenshots';

// 見た目の確認用にページ全体を保存する。画面外の画像は遅延読み込みされ、フェードインも途中になるため、
// すべての画像を読み込み、全要素を表示済みにしてから撮る
test('トップページ全体のスクリーンショットを保存する', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    images.forEach((image) => (image.loading = 'eager'));
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
  });
  const path = `${SCREENSHOT_DIR}/top-${testInfo.project.name}.png`;
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(`top-${testInfo.project.name}`, { path, contentType: 'image/png' });
});
