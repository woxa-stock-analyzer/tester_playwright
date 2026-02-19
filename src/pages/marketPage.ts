import { Locator, Page } from "@playwright/test";

export class MarketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //   ===== LOCATORS =====
  get searchBar(): Locator {
    return this.page.getByTestId("searches-input-field");
  }

  get rowLoading(): Locator {
    return this.page.getByTestId("market-list-skeleton-symbol-0");
  }

  get symbolCell(): Locator {
    return this.page.locator('[data-testid^="market-list-symbol-"]');
  }

  get companyCell(): Locator {
    return this.page.locator('[data-testid^="market-list-cell-company-"]');
  }

  get sectorCell(): Locator {
    return this.page.locator('[data-testid^="market-list-sector-"]');
  }

  get errorMessageNotFound(): Locator {
    return this.page.getByTestId("market-list-empty-search-message");
  }

  get filterButton(): Locator {
    return this.page.getByTestId("filter-button");
  }

  get sectorButton(): Locator {
    return this.page.getByRole("button", { name: "Sector" });
  }

  get sectorCloseButton(): Locator {
    return this.page.getByTestId("sector-dropdown-trigger").first();
  }

  get sectorSelect(): Locator {
    return this.page.getByRole("button", { name: "Technology", exact: true });
  }

  get priceButton(): Locator {
    return this.page.getByRole("button", { name: "Price" });
  }

   get priceCloseButton(): Locator {
    return this.page.getByRole('button', { name: 'Price', exact: true });
  }

  get priceRangeButton(): Locator {
    return this.page.getByRole("button", { name: "- 50" });
  }

  get priceCells(): Locator {
    return this.page.locator('[data-testid^="market-list-price-"]');
  }

  get percentChangeButton(): Locator {
    return this.page.getByRole("button", { name: "% Change" });
  }

  get percentChangeSelectButton(): Locator {
    return this.page
      .getByRole("list")
      .getByTestId("change-dropdown-item-Above 5%");
  }

  get changeCells(): Locator {
    return this.page.locator('[data-testid^="market-list-cell-change-"]');
  }

  get priceMin(): Locator {
    return this.page.getByTestId('price-dropdown-min-input').first();
  }

  get priceMax(): Locator {
    return this.page.getByTestId('price-dropdown-max-input').first();
  }

  //   ===== ACTIONS =====
  async goToMarketsPage() {
    await this.page.goto("https://stockanalyzer.adenxus.com/markets");
  }

  async fillSearch(keyword: string) {
    await this.searchBar.fill(keyword);
  }

  getSymbolCellContains(keyword: string): Locator {
    return this.symbolCell.filter({ hasText: keyword });
  }

  getCompanyNameCellContains(keyword: string): Locator {
    return this.companyCell.filter({ hasText: keyword });
  }

  getSectorCellContains(keyword: string): Locator {
    return this.sectorCell.filter({ hasText: keyword });
  }

  async clickFilterButton() {
    await this.filterButton.click();
  }

  async clickSectorButton() {
    await this.sectorButton.click();
  }

  async clickSectorCloseButton() {
    await this.sectorCloseButton.click();
  }

  async clickSectorSelect() {
    await this.sectorSelect.click();
  }

  async clickPriceButton() {
    await this.priceButton.click();
  }

  async clickPriceCloseButton() {
    await this.priceCloseButton.click();
  }

  async clickPriceRangeButton() {
    await this.priceRangeButton.click();
  }

  async getAllPrices(): Promise<number[]> {
    const texts = await this.priceCells.allTextContents();

    return texts
      .map((t) => t.trim())
      .filter((t) => !isNaN(Number(t)))
      .map(Number);
  }

  async clickPercentChangeButton() {
    await this.percentChangeButton.click();
  }

  async clickPercentChangeSelectButton() {
    await this.percentChangeSelectButton.click();
  }

  async getChangePercentages(): Promise<number[]> {
    const texts = await this.changeCells.allTextContents();

    return texts
      .map((t) => t.replace("%", "").trim())
      .filter((t) => !isNaN(Number(t)))
      .map(Number);
  }

  async fillMinPrice(keyword: string) {
    await this.priceMin.fill(keyword);
  } 

  async fillMaxPrice(keyword: string) {
    await this.priceMax.fill(keyword);
  } 
}
