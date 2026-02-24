import { Locator, Page } from "@playwright/test";

export class NavbarSection {
  readonly page: Page;
  readonly searchbar: Locator;
  readonly searchDropdown: Locator; 
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchbar = page.locator('[data-testid="search-navbar-input"]');
    this.searchDropdown = page.locator('[data-testid="searches-input-dropdown"]');
    this.clearButton = page.locator('[data-testid="search-clear-button"]');
    

  }

  //   ===== LOCATORS =====
  get guestUserAvatar(): Locator {
    return this.page.getByTestId("nav-signin-desktop");
  }

  get userAvatar(): Locator {
    return this.page
      .getByTestId("nav-user-menu")
      .getByTestId("nav-user-avatar");
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

  async clickSignOutButton() {
    await this.signOutButton.click();
  }

  async clickConfirmSignOutButton() {
    await this.confirmSignOutButton.click();
  }

  async waitForUserAvatar() {
    await this.userAvatar.waitFor({ state: "visible" });
  }




  //SearchBar

  getRow(symbol: string) {
  return this.page.locator(`[data-testid="market-list-symbol-${symbol}"]`);
  }

  getSymbol(symbol: string) {
  return this.getRow(symbol).locator('span.font-semibold');
  }

  getCompanyName(symbol: string) {
  return this.getRow(symbol).locator('span.text-neutral-500');
  }



getAllSymbols() {
  return this.page.locator('[data-testid^="market-list-symbol-"]')
    .locator('span.font-semibold');
}


  getAllCompany_name() {
  return this.page
    .locator('[data-testid^="market-list-symbol-"]')
    .locator('span.text-neutral-500');
}



async displayListStockSortByA_Z(searchValue: string) {

  const symbols = (await this.getAllSymbols().allTextContents()).map(s => s.trim());
  const companies = (await this.getAllCompany_name().allTextContents()).map(c => c.trim());

  const rows = symbols.map((symbol, i) => ({
    symbol,
    company: companies[i]
  }));

  const matching = rows.filter(r =>
    r.symbol.startsWith(searchValue)
  );

  const nonMatching = rows.filter(r =>
    !r.symbol.startsWith(searchValue)
  );

  const sortBy = (arr: any[], key: 'symbol' | 'company') =>
    [...arr].sort((a, b) =>
      a[key].localeCompare(b[key], 'en', { sensitivity: 'base' })
    );

  const isMatchingSorted =
    JSON.stringify(matching.map(r => r.symbol)) ===
    JSON.stringify(sortBy(matching, 'symbol').map(r => r.symbol));

  const isNonMatchingSorted =
    JSON.stringify(nonMatching.map(r => r.company)) ===
    JSON.stringify(sortBy(nonMatching, 'company').map(r => r.company));

  const isGroupOrderCorrect =
    JSON.stringify(rows.map(r => r.symbol)) ===
    JSON.stringify([...matching, ...nonMatching].map(r => r.symbol));

  console.log('CheckSymbol:', matching);
  console.log('CheckCompany_name:', nonMatching);
  return isMatchingSorted && isNonMatchingSorted && isGroupOrderCorrect;
}






async SystemSeachSymbolAndCompany_Name(searchValue: string) {

  const symbols = (await this.getAllSymbols().allTextContents()).map(s => s.trim());
  const companies = (await this.getAllCompany_name().allTextContents()).map(c => c.trim());


  const rows = symbols.map((symbol, i) => ({
    symbol,
    company: companies[i]
  }));

  const matching = rows.filter(r =>
    r.symbol.startsWith(searchValue)
  );

  const nonMatching = rows.filter(r =>
    !r.symbol.startsWith(searchValue)
  );

const isMatchingValid = matching.every(r =>
    r.symbol.startsWith(searchValue)
  );

  const isNonMatchingValid = nonMatching.every(r =>
    r.company.startsWith(searchValue)
  );

  return isMatchingValid && isNonMatchingValid;
}






  async clickSearchBar() {
    await this.searchbar.click();
  }

  displaysearchDropdown() {
    return this.searchDropdown;
    }

  async clickClearButton() {
    await this.clearButton.click();
}




}
