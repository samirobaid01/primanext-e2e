import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // implemented in Task 6
  await page.context().storageState({ path: '.auth/user.json' });
});
