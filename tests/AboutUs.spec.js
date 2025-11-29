import { test, expect } from '@playwright/experimental-ct-react';
import AboutUs from '../src/screens/AboutUs';

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('AboutUs Page', () => {
  
  test('renders hero section', async ({ mount }) => {
    const component = await mount(<AboutUs />);
    await expect(component.locator('.hero-section')).toBeVisible();
    await expect(component.locator('.hero-title')).toHaveText('Find Your Perfect Roommate');
  });

  test('renders mission section', async ({ mount }) => {
    const component = await mount(<AboutUs />);
    await expect(component.locator('.mission-section')).toBeVisible();
    await expect(component.locator('.section-title')).toHaveText('Our Mission');
  });

  test('renders steps and icons', async ({ mount }) => {
    const component = await mount(<AboutUs />);
    const steps = component.locator('.step-card');
    await expect(steps).toHaveCount(4);
    await expect(component.locator('.step-title')).toHaveText(/Create Your Profile|Browse & Match|Connect & Move In|Safe & Secure/);
  });

  test('renders values section', async ({ mount }) => {
    const component = await mount(<AboutUs />);
    const values = component.locator('.value-card');
    await expect(values).toHaveCount(3);
    await expect(component.locator('.value-title')).toHaveText(/Trust|Compatibility|Community/);
  });

  test('CTA button exists', async ({ mount }) => {
    const component = await mount(<AboutUs />);
    const button = component.locator('.cta-button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Get Started Today');
  });

});
