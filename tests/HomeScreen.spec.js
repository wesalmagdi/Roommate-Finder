import { test, expect } from '@playwright/test';

test.describe('HomeScreen', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/home'); // your HomeScreen route
  });

  test('renders SearchBar', async ({ page }) => {
    await expect(page.locator('.search-container')).toBeVisible();
  });

  test('AddPostButton opens form', async ({ page }) => {
    await page.locator('button:has-text("Add Post")').click();
    await expect(page.locator('.addpost-overlay')).toBeVisible();
  });

  test('scroll area exists', async ({ page }) => {
    await expect(page.locator('h2:has-text("Scroll to test sticky navbar")')).toBeVisible();
  });

});
