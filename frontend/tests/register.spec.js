import { test, expect } from '@playwright/test';

test.describe('Register Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register');
  });

  test('Register form elements are visible', async ({ page }) => {
  await page.goto('http://localhost:5173/register'); 

  await expect(page.locator('input[placeholder="Full Name"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Confirm Password"]')).toBeVisible();
  await expect(page.locator('input[placeholder="University (optional)"]')).toBeVisible();
  await expect(page.locator('input[value="male"]')).toBeVisible();
  await expect(page.locator('input[value="female"]')).toBeVisible();
});


  test('Can type and select gender', async ({ page }) => {
  await page.goto('http://localhost:5173/register');

  await page.fill('input[placeholder="Full Name"]', 'Test User');
  await page.fill('input[placeholder="Email"]', 'user@test.com');
  await page.fill('input[placeholder="Password"]', 'pass123');
  await page.fill('input[placeholder="Confirm Password"]', 'pass123');
  await page.check('input[value="male"]');

  await expect(page.locator('input[value="male"]')).toBeChecked();
});


  test('Validation shows errors for empty fields', async ({ page }) => {
    await page.click('button:has-text("Register")');
    const errorMsg = page.locator('.alert--warning');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Email is required');
    await expect(errorMsg).toContainText('Password is required');
    await expect(errorMsg).toContainText('Confirm password is required');
    await expect(errorMsg).toContainText('Please select a gender');
  });
});
