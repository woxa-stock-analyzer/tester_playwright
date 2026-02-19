import { Page, Locator } from '@playwright/test';

export default class NavbarSection {
  readonly page: Page;
  readonly searchbar: Locator;
  readonly searchDropdown: Locator; 
  readonly symbol: Locator;
  readonly companyName: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.searchbar = page.locator('[data-testid="search-navbar-input"]');
    this.searchDropdown = page.locator('[data-testid="searches-input-dropdown"]');
    this.symbol = page.locator('[data-testid="searches-input-dropdown-symbol"]font-semibold text-neutral-900');
    this.companyName = page.locator('[data-testid="market-list-symbol-"]span.font-semibold');
    
  } 

  async clickSearchBar() {
    await this.searchbar.click();
  }

  displaysearchDropdown() {
    return this.searchDropdown;
    }

    displaySymbol() {
      return this.symbol;
    }
    displayCompanyName() {
      return this.companyName;
    }

}