import { Locator, Page } from "@playwright/test";

export class WatchlistPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //   ===== LOCATORS =====
  get watchlistAddButton(): Locator{
    return this.page.getByTestId("watchlist-add-button");
  }

  get searchField(): Locator{
    return this.page.getByTestId('searches-input-field');
  }

  get searchResult(): Locator{
    return this.page.getByTestId('watchlist-search-symbol-NVDA');
  }

  get stockBookMarkIconWatchlist(): Locator{
    return this.page.getByTestId('watchlist-search-add-button-NVDA');
  }

  get watchlistSymbolNvda(): Locator{
    return this.page.getByTestId('watchlist-symbol-NVDA');
  }

  get stockBookMarkIconListView(): Locator{
    return this.page.getByTestId('market-list-bookmark-button-AAPL');
  }

  get watchlistSymbolAapl(): Locator{
    return this.page.getByTestId('watchlist-symbol-AAPL');
  }

  get watchlistSymbolIntc(): Locator{
    return this.page.getByTestId('watchlist-symbol-INTC');
  }

  get stockSymbolResult(): Locator{
    return this.page.getByTestId('market-list-symbol-INTC');
  }
  //   ===== ACTIONS =====
  async watchlistAddButtonClick() {
    return this.watchlistAddButton.click();
  }

  async fillSearchField(keyword: string) {
    return this.searchField.type(keyword, { delay: 50 });;
  }

  async clickStockBookMarkIconWathclist() {
    return this.stockBookMarkIconWatchlist.click();
  }

  async clickStockBookMarkIconListView() {
    return this.stockBookMarkIconListView.click();
  }

  async clickToStockProfile() {
    return this.stockSymbolResult.click();
  }
}
