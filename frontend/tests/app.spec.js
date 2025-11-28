import { test, expect } from '@playwright/test'

test.describe('App routing', () => {
  test('App renders Navbar and routes', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Navbar should always be visible
    await expect(page.locator('nav.navbar')).toBeVisible();

    // Default route should not crash
    await expect(page.locator('#root')).toBeVisible();
  });

  test('Navigate to /login and /register routes', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('h2:has-text("Login")')).toBeVisible();

    await page.goto('http://localhost:5173/register');
    await expect(page.locator('h2:has-text("Register")')).toBeVisible();
  });
});
