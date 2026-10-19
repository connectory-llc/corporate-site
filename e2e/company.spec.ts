import { expect, test } from '@playwright/test';

test.describe('会社概要とお問い合わせ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('確定している会社情報だけを載せる', async ({ page }) => {
    const company = page.locator('#company');
    await expect(company.getByRole('heading', { level: 2, name: '会社概要' })).toBeVisible();
    await expect(company.locator('dt')).toHaveText(['会社名', '英文社名', '事業内容']);
    await expect(company.locator('dd')).toHaveText([
      '合同会社CONNECTORY',
      'CONNECTORY LLC',
      'Web サービス・アプリケーションの企画、開発、運営',
    ]);
  });

  test('問い合わせ先が決まるまでは準備中と案内し、連絡先を作らない', async ({ page }) => {
    const contact = page.locator('#contact');
    await expect(contact.getByRole('heading', { level: 2, name: 'お問い合わせ' })).toBeVisible();
    await expect(contact.getByText('お問い合わせ窓口は現在準備中です。')).toBeVisible();
    await expect(contact.getByRole('link')).toHaveCount(0);
  });
});
