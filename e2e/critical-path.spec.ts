import { test, expect } from '@playwright/test';

test('critical path: create item and see it in list', async ({ page }) => {
  await page.goto('/');

  // Prefer stable selectors:
  await page.getByTestId('nav-inventory').click();
  await page.getByTestId('btn-new-item').click();

  await page.getByTestId('field-name').fill('Demo item');
  await page.getByTestId('btn-save').click();

  await expect(page.getByTestId('toast-success')).toContainText('Saved');
  await expect(page.getByTestId('inventory-list')).toContainText('Demo item');
});
