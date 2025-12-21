import { test, expect } from '@playwright/test';

test.describe('HomeScreen', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('renders SearchBar', async ({ page }) => {
    await expect(page.locator('.search-header')).toBeVisible();
  });

  test('renders post cards', async ({ page }) => {
    const postCard = page.locator('.post-card');
    const noPostsText = page.getByText('No posts yet');

    const visibleElement = (await postCard.count()) > 0 ? postCard : noPostsText;
    await expect(visibleElement.first()).toBeVisible();
  });

  test('guest user sees Add Post button but gets error when clicking', async ({ page }) => {
    const addPostBtn = page.locator('.add-post-btn');
    await expect(addPostBtn).toBeVisible();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('You must be logged in to add a post.');
      await dialog.dismiss();
    });

    await addPostBtn.click();
  });

//  test('registered user can open Add Post form', async ({ page }) => {
//   // Go to login page
//   await page.goto('http://localhost:5173/login');

//   // Fill login form
//   await page.fill('input[placeholder="Email"]', 'user@test.com');
//   await page.fill('input[placeholder="Password"]', 'pass123');
//   await page.click('button:has-text("Login")');

//   // Wait for home page element visible only after login
//   await page.waitForSelector('.search-container', { timeout: 20000 });
//   await expect(page.locator('.search-container')).toBeVisible();

//   // Click Add Post button
//   const addPostBtn = page.locator('.add-post-btn');
//   await addPostBtn.click();

//   // Wait for Add Post overlay
//   await page.waitForSelector('.addpost-overlay', { timeout: 10000 });
//   await expect(page.locator('.addpost-overlay')).toBeVisible();
// });



test('search filters return posts', async ({ page }) => {
  // Wait for the search container
  await page.waitForSelector('.search-container');

  // Locate the two selects
  const citySelect = page.locator('select.search-select').first();
  const genderSelect = page.locator('select.search-select').nth(1);

  await citySelect.selectOption({ label: 'Cairo' });
  await genderSelect.selectOption({ label: 'Male' });

  await page.fill('input[placeholder="Max Budget"]', '2500');
  await page.click('button.search-btn');

  // Check results
  const postCard = page.locator('.post-card');
  const noResultsText = page.getByText('No results found');

  const visibleElement = (await postCard.count()) > 0 ? postCard : noResultsText;
  await expect(visibleElement.first()).toBeVisible();
});

});
