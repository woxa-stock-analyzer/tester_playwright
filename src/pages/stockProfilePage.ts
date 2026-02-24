import { Locator, Page } from "@playwright/test";

export class StockProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //   ===== LOCATORS =====
  get bookMarkButton(): Locator {
    return this.page.getByTestId("stock-profile-watchlist-button");
  }

  //   ===== ACTIONS =====
  async clickBookMarkButton() {
    return this.bookMarkButton.click();
  }
}
