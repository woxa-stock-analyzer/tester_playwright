import { expect, Locator, Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //   ===== LOCATORS =====
  get emailInput(): Locator {
    return this.page.getByTestId("auth-input-email-input");
  }

  get passwordInput(): Locator {
    return this.page.getByTestId("auth-input-password-input");
  }

  get signInButton(): Locator {
    return this.page.getByTestId("signin-submit");
  }

  get errorSignInFailedMessage(): Locator {
    return this.page.getByTestId("signin-error");
  }

  //   ===== ACTIONS =====
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignInButton() {
    await expect(this.signInButton).toBeEnabled();
    await this.signInButton.click();
  }

  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }

  //   ===== FLOW ACTIONS =====
  async signIn(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }

  async retryIfSessionNotReady(maxRetries = 3) {
    const SESSION_NOT_READY =
      "Sign in was successful, but your session is not ready yet. Please try again.";

    for (let i = 0; i < maxRetries; i++) {
      const errorLocator = this.errorSignInFailedMessage;

      if (!(await errorLocator.isVisible().catch(() => false))) return;

      const text = await errorLocator.textContent();

      if (!text?.includes(SESSION_NOT_READY)) {
        throw new Error(`Unexpected sign-in error: ${text}`);
      }

      await this.clickSignInButton();

      await this.page.waitForTimeout(1000);
    }
  }
}
