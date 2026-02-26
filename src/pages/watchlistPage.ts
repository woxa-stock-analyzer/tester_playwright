import { Locator, Page } from "@playwright/test";

export class WatchlistPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //   ===== LOCATORS =====
  get watchlistAddButton(): Locator {
    return this.page.getByTestId("watchlist-add-button");
  }

  get searchField(): Locator {
    return this.page.getByTestId("searches-input-field");
  }

  getSearchResult(symbol: string): Locator {
    return this.page.locator(
      `[data-testid="watchlist-search-symbol-${symbol}"]`,
    );
  }

  getStockBookMarkIconWatchlist(symbol: string): Locator {
    return this.page.locator(
      `[data-testid="watchlist-search-add-button-${symbol}"]`,
    );
  }

  getWatchlistSymbol(symbol: string): Locator {
    return this.page.locator(`[data-testid="watchlist-symbol-${symbol}"]`);
  }

  getStockBookMarkIconListView(symbol: string): Locator {
    return this.page.locator(
      `[data-testid="market-list-bookmark-button-${symbol}"]`,
    );
  }

  getStockSymbolResult(symbol: string): Locator {
    return this.page.locator(`[data-testid="market-list-symbol-${symbol}"]`);
  }

  get watchListRow(): Locator {
    return this.page.locator('[data-testid^="watchlist-row-"]');
  }

  get removeButton(): Locator {
    return this.page.locator('[data-testid^="watchlist-remove-icon-"]');
  }
  //   ===== ACTIONS =====
  async watchlistAddButtonClick() {
    return this.watchlistAddButton.click();
  }

  async fillSearchField(keyword: string) {
    return this.searchField.type(keyword, { delay: 50 });
  }

  async clickStockBookMarkIconWathclist(symbol: string) {
    return this.getStockBookMarkIconWatchlist(symbol).click();
  }

  async clickToStockProfile(symbol: string) {
    return this.getStockSymbolResult(symbol).click();
  }

//remove watchlist

  getRemoveButton(symbol: string) {
  return this.page.locator(`[data-testid="watchlist-remove-button-${symbol}"]`);
  }

  async clickRemoveButton(symbol: string){
    return this.getRemoveButton(symbol).click()
  }


  //undo
  get undoButton(): Locator{
    return this.page.getByRole('button', { name: 'Undo' });
  }

  async clickUndoBotton(){
    return this.undoButton.click()
  }

}
