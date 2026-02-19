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
    });

    // Verify result price range
    await test.step("Verify price range", async () => {
      const prices = await market.getAllPrices();

      expect(prices.every((p) => p >= 0 && p <= 50)).toBeTruthy();
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
    });

    // Verify error message is displayed
    await test.step("Verify error message when no data found", async () => {
      await expect(market.errorMessageNotFound).toBeVisible();
    });
  });
});

test.describe("User use sort function", () => {
  test("Sort-001 User sort Symbol, Company name, Sector when it not active", async ({
    page,
  }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
    });

    //   Click symbol header
    await test.step("Click symbol to sort", async () => {
      await market.symbolHeaderClick();
    });

    // Verify symbol sort by ascending
    await test.step("Verify symbol sort ascending", async () => {
      const symbols = await market.getAllSymbolTexts();

      const sorted = [...symbols].sort((a, b) => a.localeCompare(b));

      expect(symbols).toEqual(sorted);
    });

    //   Click company name header
    await test.step("Click company name to sort", async () => {
      await market.companyNameHeaderClick();
    });

    // Verify company name sort by ascending
    await test.step("Verify company name sort ascending", async () => {
      const companyName = await market.getAllCompanyNameTexts();

      const sorted = [...companyName].sort((a, b) => a.localeCompare(b));

      expect(companyName).toEqual(sorted);
    });
  });

  test("Sort-002 User sort Symbol, Company name, Sector when it already active", async ({
    page,
  }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
    });

    //   Click symbol header
    await test.step("Click symbol to sort", async () => {
      await market.symbolHeaderClick();
    });

    //   Click symbol header
    await test.step("Click symbol to sort", async () => {
      await market.symbolHeaderClick();
    });

    // Verify symbol sort by ascending
    await test.step("Verify symbol sort descending", async () => {
      const symbols = await market.getAllSymbolTexts();

      const sorted = [...symbols].sort((a, b) => b.localeCompare(a));

      expect(symbols).toEqual(sorted);
    });

    //   Click company name header
    await test.step("Click company name to sort", async () => {
      await market.companyNameHeaderClick();
    });

    //   Click company name header
    await test.step("Click company name to sort", async () => {
      await market.companyNameHeaderClick();
    });

    // Verify company name sort by ascending
    await test.step("Verify company name sort descending", async () => {
      const companyName = await market.getAllCompanyNameTexts();

      const expected = [...companyName].sort((a, b) =>
        b.localeCompare(a, "en", { sensitivity: "base" }),
      );

      expect(companyName).toEqual(expected);
    });
  });

  test("Sort-003 User sort Price, %Change, Volume when it not active", async ({
    page,
  }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
    });

    //   Click price header
    await test.step("Click price to sort", async () => {
      await market.priceHeaderClick();
    });

    // Verify price sort by ascending
    await test.step("Verify price range", async () => {
      const prices = await market.getAllPrices();

      const sorted = [...prices].sort((a, b) => a - b);

      expect(prices).toEqual(sorted);
    });

    //   Click %Change header
    await test.step("Click %Change to sort", async () => {
      await market.percentChangeHeaderClick();
    });

    // Verify percent change sort ascending
    await test.step("Verify percent change ascending and color", async () => {
      await market.verifyPercentChangeSortingAndColor("asc");
    });

    //   Click volume header
    await test.step("Click volume to sort", async () => {
      await market.volumeHeaderClick();
    });

    // Verify volume sort by ascending
    await test.step("Verify volume sorted ascending", async () => {
      const volumes = await market.getAllVolumeValues();

      const sorted = [...volumes].sort((a, b) => a - b);

      expect(volumes).toEqual(sorted);
    });
  });

  test("Sort-004 User sort Price, %Change, Volume when it already active (descending)", async ({
    page,
  }) => {
    // Enter markets page
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // wait for API/network to finish
    await market.page.waitForLoadState("networkidle");

    // Wait for loading spinner
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
    });

    // ======================
    // PRICE DESCENDING
    // ======================

    await test.step("Click price header twice to sort descending", async () => {
      await market.priceHeaderClick(); // asc
      await market.priceHeaderClick(); // desc
    });

    await test.step("Verify price sorted descending", async () => {
      const prices = await market.getAllPrices();

      const sorted = [...prices].sort((a, b) => b - a);

      expect(prices).toEqual(sorted);
    });

    // ======================
    // % CHANGE DESCENDING
    // ======================

    await test.step("Click %Change header twice to sort descending", async () => {
      await market.percentChangeHeaderClick(); // asc
      await market.percentChangeHeaderClick(); // desc
    });

    await test.step("Verify percent change sorted descending and color", async () => {
      await market.verifyPercentChangeSortingAndColor("desc");
    });

    // ======================
    // VOLUME DESCENDING
    // ======================

    await test.step("Click volume header twice to sort descending", async () => {
      await market.volumeHeaderClick(); // asc
      await market.volumeHeaderClick(); // desc
    });

    await test.step("Verify volume sorted descending", async () => {
      const volumes = await market.getAllVolumeValues();

      const sorted = [...volumes].sort((a, b) => b - a);

      expect(volumes).toEqual(sorted);
    });
  });
});
