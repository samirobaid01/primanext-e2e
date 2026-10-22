import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { TIMEOUTS, VIEWPORT } from './src/config/constants';

dotenv.config({ path: `.env.${process.env.TEST_ENV ?? 'dev'}` });
dotenv.config({ path: '.env.local', override: true });

export default defineConfig({
  testDir: './tests',
  timeout: TIMEOUTS.navigation,
  expect:  { timeout: TIMEOUTS.action },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL:    process.env.BASE_URL,
    viewport:   VIEWPORT,
    trace:      'on-first-retry',
    screenshot: 'only-on-failure',
    video:      'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'dev',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
    {
      name: 'stage',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
    {
      name: 'prod',
      testMatch: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
