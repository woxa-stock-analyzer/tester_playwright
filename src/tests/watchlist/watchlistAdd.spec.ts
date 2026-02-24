import test, { expect } from "@playwright/test";
import { MarketPage } from "../../pages/marketPage";
import { NavbarSection } from "../../pages/navbarSection";
import { SignInPage } from "../../pages/signinPage";
import User from "../../data/userSignin.json";
import watchlistData from "../../data/watchlistAdd.json";
import { WatchlistPage } from "../../pages/watchlistPage";
import { StockProfilePage } from "../../pages/stockProfilePage";

let market: MarketPage;
let navbar: NavbarSection;
let signIn: SignInPage;
let watchlist: WatchlistPage;
let stockProfile: StockProfilePage;

test.beforeEach(async ({ page }) => {
  market = new MarketPage(page);
  navbar = new NavbarSection(page);
  signIn = new SignInPage(page);
  watchlist = new WatchlistPage(page);
  stockProfile = new StockProfilePage(page);

  //   Enter markets page (Homepage of website)
  await test.step("Go to markets page", async () => {
    await market.goToMarketsPage();
  });

  // Open sign in modal
  await test.step("Open sign in modal", async () => {
    await navbar.guestUserAvatar.isVisible();
    await navbar.clickGuestUserAvatar();
    await navbar.clickSignInButton();
  });

  // Sign in with valid user
  await test.step("Sign in with valid user", async () => {
    await signIn.signIn(
      User.userLoginValid.email,
      User.userLoginValid.password,
    );
    await signIn.retryIfSessionNotReady();
  });

  // Verify sign in successful
  await test.step("Verify sign in successful", async () => {
    await navbar.clickGuestUserAvatar();
    await expect(navbar.userAvatar).toBeVisible();
  });
});

test.describe("Clear state before test add watchlsit", () => {
  test("Clear watchlist", async ({ page }) => {
    //   Enter watchlist page
    await test.step("Go to watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    // Check for stock in watchlist
    await test.step("Check for exist stock in watchlist", async () => {
      await page.waitForLoadState("networkidle");

      const count = await watchlist.removeButton.count();

      if (count > 0) {
        await expect(watchlist.watchListRow.first()).toBeVisible();
        while ((await watchlist.removeButton.count()) > 0) {
          await watchlist.watchListRow.first().hover();
          await watchlist.removeButton.first().click();
        }
      }
    });
  });
});

test.describe("User add stock to watchlist", () => {
  test("Add-watchlist-001 User add watchlist from watchlist page", async ({
    page,
  }) => {
    //   Enter watchlist page
    await test.step("Go to watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    // Click add watchlist button
    await test.step("Click add watchlist button", async () => {
      await watchlist.watchlistAddButtonClick();
    });

    // Fill search NVDA
    await test.step("Fill search NVDA", async () => {
      await watchlist.fillSearchField(watchlistData.search);
    });

    // Wait for searh result
    await test.step("Wait for search Result", async () => {
      await expect(watchlist.searchResult).toBeVisible();
    });

    // Click add stock to watchlist
    await test.step("Click add stock to watchlist", async () => {
      await watchlist.clickStockBookMarkIconWathclist();
    });

    // Close modal
    await test.step("Close modal by clicking backdrop", async () => {
      await page.locator(".fixed.inset-0").click();
    });

    // Verify watchlist stock update
    await test.step("Verify watchlist stock update", async () => {
      await expect(watchlist.watchlistSymbolNvda).toBeVisible();
    });
  });

  test("Add-watchlist-002 User add watchlist from list  view", async ({
    page,
  }) => {
    // Fill keyword for search
    await test.step("Fill keyword for search", async () => {
      await market.fillSearch(watchlistData.searchListView);
    });

    // Wait for search loading
    await test.step("Wait for loading", async () => {
      await expect(market.rowLoading).not.toBeVisible();
    });

    // Verify result symbol contain keyword
    await test.step("Verify search result symbol", async () => {
      await expect(
        market.getSymbolCellContains(watchlistData.searchListView).first(),
      ).toBeVisible();
      expect(
        await market
          .getSymbolCellContains(watchlistData.searchListView)
          .count(),
      ).toBeGreaterThan(0);
    });

    // Click add stock to watchlist
    await test.step("Click add stock to watchlist", async () => {
      await watchlist.clickStockBookMarkIconListView();
    });

    //   Enter watchlist page
    await test.step("Go to watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    // Verify watchlist stock update
    await test.step("Verify watchlist stock update", async () => {
      await expect(watchlist.watchlistSymbolAapl).toBeVisible();
    });
  });

  test("Add-watchlsit-003 User add watchlist from stock profile", async ({
    page,
  }) => {
    // Fill keyword for search
    await test.step("Fill keyword for search", async () => {
      await market.fillSearch(watchlistData.searchForProfile);
    });

    // Click to stock profile
    await test.step("Click to stock profile", async () => {
      await watchlist.clickToStockProfile();
    });

    // Verify page has been redirect
    await test.step("Verify page has been redirect", async () => {
      await expect(page).toHaveURL(
        "https://stockanalyzer.adenxus.com/stock-profile/INTC/Overview",
      );
    });

    // Click to add to watchlist
    await test.step("Click to stock profile", async () => {
      await stockProfile.clickBookMarkButton();
    });

    //   Enter watchlist page
    await test.step("Go to watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    // Verify watchlist stock update
    await test.step("Verify watchlist stock update", async () => {
      await expect(watchlist.watchlistSymbolIntc).toBeVisible();
    });
  });
});
