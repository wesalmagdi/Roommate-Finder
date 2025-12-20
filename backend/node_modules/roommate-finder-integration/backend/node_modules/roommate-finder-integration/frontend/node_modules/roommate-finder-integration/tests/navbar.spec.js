import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Navbar renders correctly', async ({ page }) => {
    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();
    await expect(navbar.locator('text=Roommate Finder')).toBeVisible();
    await expect(navbar.locator('text=Register')).toHaveAttribute('href', '/register');
    await expect(navbar.locator('text=Login')).toHaveAttribute('href', '/login');
  });

  test('Navbar links navigate correctly', async ({ page }) => {
    await page.click('text=Register');
    await expect(page).toHaveURL(/.*register/);

    await page.click('text=Login');
    await expect(page).toHaveURL(/.*login/);
  });
});
