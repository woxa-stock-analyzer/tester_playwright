import { Page } from "@playwright/test";

export class MarketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //   ===== LOCATORS =====

  //   ===== ACTIONS =====
  async goToMarketsPage() {
    await this.page.goto("https://stockanalyzer.adenxus.com/markets");
  }
}
