import { test, expect } from '@playwright/test';

test.describe('AboutUs Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/about');
  });

  test('renders hero section', async ({ page }) => {
    const hero = page.locator('.hero-section');
    await hero.waitFor({ state: 'attached', timeout: 15000 }); // wait until element is in DOM
    await hero.waitFor({ state: 'visible', timeout: 15000 });  // wait until visible
    await expect(hero).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveText('Find Your Perfect Roommate');
  });

  test('renders mission section', async ({ page }) => {
    const mission = page.locator('.mission-section');
    await mission.waitFor({ state: 'visible', timeout: 15000 });
    await expect(mission).toBeVisible();
    await expect(mission.locator('.section-title')).toHaveText('Our Mission');
  });

  test('renders steps and icons', async ({ page }) => {
    const steps = page.locator('.step-card');
    await steps.first().waitFor({ state: 'visible', timeout: 15000 });
    await expect(steps).toHaveCount(4);
  });

  test('renders values section', async ({ page }) => {
    const values = page.locator('.value-card');
    await values.first().waitFor({ state: 'visible', timeout: 15000 });
    await expect(values).toHaveCount(3);
  });

  test('CTA button navigates to register', async ({ page }) => {
    const button = page.locator('.cta-button');
    await button.waitFor({ state: 'visible', timeout: 15000 });
    await expect(button).toBeVisible();
    await button.click();
    await expect(page).toHaveURL(/\/register/);
  });

});
