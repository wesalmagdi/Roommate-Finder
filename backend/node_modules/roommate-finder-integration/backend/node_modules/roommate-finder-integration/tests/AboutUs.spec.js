import { test, expect } from '@playwright/test';

test.describe('AboutUs Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/about');
  });

  test('renders hero section', async ({ page }) => {
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveText('Find Your Perfect Roommate');
  });

  test('renders mission section', async ({ page }) => {
    const missionSection = page.locator('.mission-section');
    await expect(missionSection).toBeVisible();
    await expect(missionSection.locator('.section-title')).toHaveText('Our Mission');
  });

  test('renders steps and icons', async ({ page }) => {
    await expect(page.locator('.step-card')).toHaveCount(4);
  });

  test('renders values section', async ({ page }) => {
    await expect(page.locator('.value-card')).toHaveCount(3);
  });

  test('CTA button navigates to register', async ({ page }) => {
    const button = page.locator('.cta-button');
    await expect(button).toBeVisible();
    await button.click();
    await expect(page).toHaveURL(/\/register/);
  });

});
