import { test, expect } from '@playwright/test';

test.describe('Login Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('Login form elements are visible', async ({ page }) => {
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
    await expect(page.locator('text=Register here.')).toBeVisible();
  });

  test('Can type in login form', async ({ page }) => {
    await page.fill('input[placeholder="Email"]', 'test@example.com');
    await page.fill('input[placeholder="Password"]', 'password123');

    await expect(page.locator('input[placeholder="Email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue('password123');
  });

  test('Login button triggers function', async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.fill('input[placeholder="Email"]', 'test@example.com');
    await page.fill('input[placeholder="Password"]', 'password123');
    await page.click('button:has-text("Login")');
    // Check console log is triggered
  });
});
