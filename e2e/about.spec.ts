import { expect, test } from '@playwright/test';

const VALUES = ['創造', '挑戦', '接続', '思いやり', '品質'];

test.describe('理念と社名の由来', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('ものづくりへの姿勢と創業の原点を紹介する', async ({ page }) => {
    const about = page.locator('#about');
    await expect(about.getByRole('heading', { level: 2, name: 'ものづくりへの姿勢' })).toBeVisible();
    await expect(about.getByText('使ってくださる方の立場に立ち、丁寧に磨き上げていく。')).toBeVisible();
    await expect(about.getByText('何かを作ることがとても好きです。')).toBeVisible();
  });

  test('社名に込めた CONNECT と FACTORY の意味を説明する', async ({ page }) => {
    const name = page.locator('#name');
    await expect(name.getByRole('heading', { level: 2, name: '名前に込めた想い' })).toBeVisible();
    await expect(name.getByRole('heading', { level: 3, name: /CONNECT.*つなぐ/ })).toBeVisible();
    await expect(name.getByRole('heading', { level: 3, name: /FACTORY.*つくる/ })).toBeVisible();
  });

  test('ロゴの形に込めた意味を説明する', async ({ page }) => {
    const name = page.locator('#name');
    await expect(name.getByRole('heading', { level: 3, name: 'ロゴに込めた意味' })).toBeVisible();
    await expect(name.getByText('組み継ぎ', { exact: true })).toBeVisible();
  });

  test('大切にする 5 つの価値観を順に並べる', async ({ page }) => {
    const headings = page.locator('#values').getByRole('heading', { level: 3 });
    await expect(headings).toHaveCount(VALUES.length);
    for (const [index, value] of VALUES.entries()) {
      await expect(headings.nth(index)).toContainText(value);
    }
  });

  test('社内向けの「砂場」という表現は対外的なページに出さない', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText('砂場');
  });
});
