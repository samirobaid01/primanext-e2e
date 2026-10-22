import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage }     from '../pages/auth/login.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { AuthAPI }       from '../api/auth.api';

type Fixtures = {
  loginPage:     LoginPage;
  dashboardPage: DashboardPage;
  authAPI:       AuthAPI;
  authedPage:    Page;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  authAPI: async ({ request }, use) => {
    await use(new AuthAPI(request));
  },

  authedPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/user.json' });
    const page    = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect };
