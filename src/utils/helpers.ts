import { type Page } from '@playwright/test';

export async function retryAction(
  fn: () => Promise<void>,
  retries = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (e) { if (i === retries - 1) throw e; }
  }
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}
