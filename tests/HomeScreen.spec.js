import { test, expect } from '@playwright/test';

test.describe('HomeScreen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/'); 
  });

  test('renders SearchBar', async ({ page }) => {
    await expect(page.locator('.search-container')).toBeVisible();
  });

  test('AddPostButton opens form', async ({ page }) => {
    await page.click('button:has-text("Add Post")'); 
    await expect(page.locator('.addpost-overlay')).toBeVisible();
  });

  test('scroll area exists', async ({ page }) => {
    await expect(page.locator('div', { hasText: 'Scroll to test sticky navbar' })).toBeVisible();
  });
});
