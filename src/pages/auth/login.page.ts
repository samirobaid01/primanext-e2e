import { type Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
  private readonly emailInput    = () => this.page.getByPlaceholder('Email');
  private readonly passwordInput = () => this.page.locator('input[type="password"]').first();
  private readonly submitButton  = () => this.page.getByRole('button', { name: /sign in|login|log in/i });
  private readonly errorMessage  = () => this.page.locator('[class*="error"], [class*="alert"]:not([role="presentation"])').first();

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
  }

  async getErrorText(): Promise<string | null> {
    return this.errorMessage().textContent();
  }

  async expectLoaded(): Promise<void> {
    await this.expectVisible(this.submitButton());
  }
}
