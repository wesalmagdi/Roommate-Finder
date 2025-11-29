import { test, expect } from '@playwright/experimental-ct-react';
import HomeScreen from '../src/screens/HomeScreen';
import SearchBar from '../src/components/SearchBar';
import AddPostButton from '../src/components/AddPostbutton';

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('HomeScreen', () => {

  test('renders SearchBar', async ({ mount }) => {
    const component = await mount(<HomeScreen />);
    await expect(component.locator('input, select')).toBeVisible();
  });

  test('AddPostButton opens form', async ({ mount }) => {
    const component = await mount(<HomeScreen />);
    await component.locator('button:has-text("Add Post")').click();
    await expect(component.locator('.addpost-overlay')).toBeVisible();
  });

  test('scroll area exists', async ({ mount }) => {
    const component = await mount(<HomeScreen />);
    await expect(component.locator('h2')).toHaveText('Scroll to test sticky navbar');
  });

});
