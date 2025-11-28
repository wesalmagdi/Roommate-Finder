import { test, expect } from '@playwright/test';

test.describe('AboutUs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/aboutus'); 
  });

  test('renders hero section', async ({ page }) => {
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveText('Find Your Perfect Roommate');
  });

  test('renders mission section', async ({ page }) => {
    await expect(page.locator('.mission-section')).toBeVisible();
    await expect(page.locator('.section-title')).toHaveText('Our Mission');
  });

  test('renders steps and icons', async ({ page }) => {
    await expect(page.locator('.how-it-works-section .step-card')).toHaveCount(4);
    await expect(page.locator('.how-it-works-section .step-icon svg')).toHaveCount(4);
  });

  test('renders values section', async ({ page }) => {
    await expect(page.locator('.values-section .value-card')).toHaveCount(3);
  });

  test('CTA button navigates to register', async ({ page }) => {
    await page.click('.cta-button');
    await expect(page).toHaveURL(/register/);
  });
});
