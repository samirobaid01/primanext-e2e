import { type Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class DashboardPage extends BasePage {
  private readonly pageHeading = () => this.page.getByRole('heading').first();
  private readonly mainContent = () => this.page.locator('main, [class*="dashboard"], [class*="content"]').first();

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
    await this.waitForPageLoad();
  }

  async expectLoaded(): Promise<void> {
    await this.expectVisible(this.mainContent());
  }

  async getPageTitle(): Promise<string | null> {
    return this.pageHeading().textContent();
  }
}
