import test, { expect } from "@playwright/test";
import { MarketPage } from "../../pages/marketPage";
import Search from "../../data/marketSearch.json";

let market: MarketPage;

test.beforeEach(async ({ page }) => {
  market = new MarketPage(page);
});

test.describe("User Search found", () => {
  test("Search-003 User Search found company name and symbol", async ({
    page,
  }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Fill keyword for search
    await test.step("Fill keyword for search", async () => {
      await market.fillSearch(Search.keyword);
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify result symbol contain keyword
    await test.step("Verify search result symbol", async () => {
      await expect(
        market.getSymbolCellContains(Search.keyword).first(),
      ).toBeVisible();
      expect(
        await market.getSymbolCellContains(Search.keyword).count(),
      ).toBeGreaterThan(0);
    });

    // Verify result company name contain keyword
    await test.step("Verify search result company name", async () => {
      await expect(
        market.getCompanyNameCellContains(Search.keyword).first(),
      ).toBeVisible();

      expect(
        await market.getCompanyNameCellContains(Search.keyword).count(),
      ).toBeGreaterThan(0);
    });
  });
});

test.describe("User Search not found", () => {
  test("Search-010 User search returned no data", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Fill keyword for search
    await test.step("Fill keyword for search", async () => {
      await market.fillSearch(Search.keywordNotFound);
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify error message is displayed
    await test.step("Verify error message when no data found", async () => {
      await expect(market.errorMessageNotFound).toBeVisible();
    });
  });
});

test.describe("User user filter", () => {
  test("Filter-search-001 User use filter sector", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Click filter button
    await test.step("Click filter button", async () => {
      await market.clickFilterButton();
    });

    // Click filter sector button
    await test.step("Click filter sector button", async () => {
      await market.clickSectorButton();
    });

    // Click filter sector technology button
    await test.step("Click filter sector technology button", async () => {
      await market.clickSectorSelect();
    });

    // Click filter sector close button
    await test.step("Click filter sector close button", async () => {
      await market.clickSectorCloseButton();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify result sector contain keyword
    await test.step("Verify search result sector", async () => {
      await expect(
        market.getSectorCellContains(Search.sector).first(),
      ).toBeVisible();
      expect(
        await market.getSectorCellContains(Search.sector).count(),
      ).toBeGreaterThan(0);
    });
  });

  test("Filter-search-002 User use filter select range price", async ({
    page,
  }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Click filter button
    await test.step("Click filter button", async () => {
      await market.clickFilterButton();
    });

    // Click filter price button
    await test.step("Click filter price button", async () => {
      await market.clickPriceButton();
    });

    // Click filter price range button
    await test.step("Click filter price range button", async () => {
      await market.clickPriceRangeButton();
    });

    // Click filter price close button
    await test.step("Click filter price close button", async () => {
      await market.clickPriceButton();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify result price range
    await test.step("Verify price range", async () => {
      const prices = await market.getAllPrices();

      for (const price of prices) {
        expect(price).toBeGreaterThanOrEqual(0);
        expect(price).toBeLessThanOrEqual(50);
      }
    });
  });

  test("Filter-search-003 User use filter % Change", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Click filter button
    await test.step("Click filter button", async () => {
      await market.clickFilterButton();
    });

    // Click filter %Change button
    await test.step("Click filter %Change button", async () => {
      await market.clickPercentChangeButton();
    });

    // Click filter %Change above 5% button
    await test.step("Click filter %Change above 5% button", async () => {
      await market.clickPercentChangeSelectButton();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify result %Change contain keyword
    await test.step("Verify search result %Change above 5%", async () => {
      const values = await market.getChangePercentages();

      for (const value of values) {
        expect(value).toBeGreaterThan(5);
      }
    });
  });

  test("Filter-search-009 User filter returned no data", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Click filter button
    await test.step("Click filter button", async () => {
      await market.clickFilterButton();
    });

    // Click filter price button
    await test.step("Click filter price button", async () => {
      await market.clickPriceButton();
    });

    // Fill min price
    await test.step("Fill min price", async () => {
      await market.fillMinPrice(`${Search.min}`);
    });

    // Fill max price
    await test.step("Fill max price", async () => {
      await market.fillMaxPrice(`${Search.max}`);
    });

    // Click filter price close button
    await test.step("Click filter price close button", async () => {
      await market.clickPriceCloseButton();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
      await page.waitForLoadState()
    });

    // Verify error message is displayed
    await test.step("Verify error message when no data found", async () => {
      await expect(market.errorMessageNotFound).toBeVisible();
    });
  });
});
