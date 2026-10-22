import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { epic, feature, severity } from 'allure-js-commons';
import { LoginPage }     from '../pages/auth/login.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { AuthAPI }       from '../api/auth.api';

const SEVERITY_TAGS = ['blocker', 'critical', 'normal', 'minor', 'trivial'] as const;

type Fixtures = {
  loginPage:      LoginPage;
  dashboardPage:  DashboardPage;
  authAPI:        AuthAPI;
  authedPage:     Page;
  _allureLabels:  void;
};

export const test = base.extend<Fixtures>({
  // Derives epic/feature from describe hierarchy; maps @critical etc. to Allure severity.
  _allureLabels: [async ({}, use: (v: void) => Promise<void>, testInfo: TestInfo) => {
    const describePath = testInfo.titlePath.slice(1, -1); // strip file + test title
    if (describePath[0]) await epic(describePath[0]);
    if (describePath[1]) await feature(describePath[1]);

    const severityTag = testInfo.tags.find((t: string) =>
      SEVERITY_TAGS.includes(t.replace('@', '') as typeof SEVERITY_TAGS[number])
    );
    if (severityTag) await severity(severityTag.replace('@', '') as string);

    await use();
  }, { auto: true }],
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
