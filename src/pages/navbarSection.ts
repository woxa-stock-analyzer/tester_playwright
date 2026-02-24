import { Locator, Page } from "@playwright/test";

export class NavbarSection {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //   ===== LOCATORS =====
  get guestUserAvatar(): Locator {
    return this.page.getByTestId("nav-user-desktop");
  }

  get signInButton(): Locator {
    return this.page.getByTestId("signin-dropdown-submit");
  }

  get userAvatar(): Locator {
    return this.page.getByTestId('nav-user-header-avatar');
  }

  get signOutButton(): Locator {
    return this.page.getByTestId("logout-button");
  }

  get confirmSignOutButton(): Locator {
    return this.page.getByTestId("logout-dialog-confirm");
  }

  //   ===== ACTIONS =====
  async clickGuestUserAvatar() {
    await this.guestUserAvatar.click();
  }

  async clickUserAvatar() {
    await this.userAvatar.click();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async clickSignOutButton() {
    await this.signOutButton.click();
  }

  async clickConfirmSignOutButton() {
    await this.confirmSignOutButton.click();
  }

  async waitForUserAvatar() {
    await this.userAvatar.waitFor({ state: "visible" });
  }
}
