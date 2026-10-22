import { test, expect } from '../../src/fixtures';
import { SUITES, FILES } from '../../test-suite.config';
import { currentUsers } from '../../src/data/users';

if (SUITES['auth'] === false || FILES['auth/login.spec'] === false) {
  test.skip(true, 'Disabled in test-suite.config.ts');
}

test.describe('Authentication — Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid credentials redirect to dashboard @smoke @critical', async ({ loginPage, page }) => {
    await loginPage.login(currentUsers.admin.email, currentUsers.admin.password);
    await expect(page).toHaveURL(/dashboard|home|overview/i, { timeout: 15_000 });
  });

  test('invalid credentials show error message @normal', async ({ loginPage }) => {
    await loginPage.login('invalid@test.com', 'wrongpassword');
    const error = await loginPage.getErrorText();
    expect(error).toBeTruthy();
  });
});
