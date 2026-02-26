import { expect, Locator, Page } from "@playwright/test";

export class MarketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //   ===== LOCATORS =====
  get watchlistButton(): Locator{
    return this.page.getByTestId('nav-link-watchlist')
  }

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
    return this.page.getByRole("button", { name: "Price", exact: true });
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
    return this.page.getByTestId("price-dropdown-min-input").first();
  }

  get priceMax(): Locator {
    return this.page.getByTestId("price-dropdown-max-input").first();
  }

  get symbolHeader(): Locator {
    return this.page.getByTestId("market-list-head-symbol");
  }

  get AllSymbolCells(): Locator {
    return this.page.locator('[data-testid^="market-list-symbol-"]');
  }

  get companyNameHeader(): Locator {
    return this.page.getByTestId("market-list-head-company");
  }

  get AllCompanyNameCells(): Locator {
    return this.page.locator('[data-testid^="market-list-cell-company-"]');
  }

  get priceHeader(): Locator {
    return this.page.getByTestId("market-list-head-price");
  }

  get percentChangeHeader(): Locator {
    return this.page.getByTestId("market-list-head-change");
  }

  get volumeHeader(): Locator {
    return this.page.getByTestId("market-list-head-volume");
  }

  get AllPercentChangeCell(): Locator {
    return this.page.locator('[data-testid^="market-list-cell-change-"] span');
  }

  get AllVolumeCell(): Locator {
    return this.page.locator('[data-testid^="market-list-volume-"] span');
  }

  //   ===== ACTIONS =====
  async goToMarketsPage() {
    await this.page.goto("https://stockanalyzer.adenxus.com/markets");
  }

  async goToWatchlistPage() {
    await this.watchlistButton.click();
  }

  async fillSearch(keyword: string) {
     await this.searchBar.type(keyword, { delay: 50 });
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

  async symbolHeaderClick() {
    await this.symbolHeader.click();
  }

  async getAllSymbolTexts(): Promise<string[]> {
    const texts = await this.AllSymbolCells.allTextContents();
    return texts.map((t) => t.trim());
  }

  async companyNameHeaderClick() {
    await this.companyNameHeader.click();
  }

  async getAllCompanyNameTexts(): Promise<string[]> {
    const texts = await this.AllCompanyNameCells.allTextContents();
    return texts.map((t) => t.trim());
  }

  async priceHeaderClick() {
    await this.priceHeader.click();
  }

  async percentChangeHeaderClick() {
    await this.percentChangeHeader.click();
  }

  async getAllPercentChangeValues(): Promise<number[]> {
    const texts = await this.AllPercentChangeCell.allTextContents();

    return texts.map((text) => Number(text.replace("%", "").trim()));
  }

  async verifyPercentChangeSortingAndColor(order: "asc" | "desc") {
    const cells = this.page.locator(
      '[data-testid^="market-list-cell-change-"]',
    );

    const count = await cells.count();
    const values: number[] = [];

    for (let i = 0; i < count; i++) {
      const cell = cells.nth(i);
      const valueElement = cell.locator(":scope >> *").first();

      const text = await valueElement.textContent();
      let value = Number(text!.replace("%", "").trim());

      const className = await valueElement.getAttribute("class");

      // determine sign from class
      if (className?.includes("text-error-500")) {
        value = -value;
      }

      values.push(value);
    }

    // verify sorting
    const sorted = [...values].sort((a, b) =>
      order === "asc" ? a - b : b - a,
    );

    expect(values).toEqual(sorted);
  }

  async volumeHeaderClick() {
    await this.volumeHeader.click();
  }

  parseVolume(text: string): number {
    const value = parseFloat(text);

    if (text.includes("K")) return value * 1_000;
    if (text.includes("M")) return value * 1_000_000;
    if (text.includes("B")) return value * 1_000_000_000;

    return value;
  }

  async getAllVolumeValues(): Promise<number[]> {
    const cells = this.AllVolumeCell;
    const count = await cells.count();

    const volumes: number[] = [];

    for (let i = 0; i < count; i++) {
      const ariaText = await cells.nth(i).getAttribute("aria-text");

      if (!ariaText) continue;

      volumes.push(this.parseVolume(ariaText));
    }

    return volumes;
  }
}
