import { test, expect } from '@playwright/test';

test.describe('Login Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

//   test('successful login redirects to home', async ({ page }) => {
//   await page.goto('http://localhost:5173/login');

//   await page.fill('input[placeholder="Email"]', 'user@test.com');
//   await page.fill('input[placeholder="Password"]', 'pass123');
//   await page.click('button:has-text("Login")');

//   await page.waitForURL('http://localhost:5173/');

//   await expect(
//     page.locator('.search-container')
//   ).toBeAttached();
// });

  test('login with wrong credentials shows error', async ({ page }) => {
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Login failed. Check your credentials.');
    await dialog.dismiss();
  });

  await page.fill('input[placeholder="Email"]', 'user@test.com');
  await page.fill('input[placeholder="Password"]', 'wrongpass');
  await page.click('button:has-text("Login")');
  });
});
