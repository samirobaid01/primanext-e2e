import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/login.page';
import { currentUsers } from '../../src/data/users';

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(currentUsers.admin.email, currentUsers.admin.password);
  await page.waitForURL(/dashboard|home|overview/i);
  await page.context().storageState({ path: '.auth/user.json' });
});
