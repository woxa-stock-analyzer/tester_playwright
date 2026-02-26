import test, { expect } from "@playwright/test";
import { MarketPage } from "../../pages/marketPage";
import { NavbarSection } from "../../pages/navbarSection";
import { SignInPage } from "../../pages/signinPage";
import { WatchlistPage } from "../../pages/watchlistPage";
import { StockProfilePage } from "../../pages/stockProfilePage";

import User from "../../data/userSignin.json";
import watchlistData from "../../data/watchlistAdd.json";

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

  await test.step("Go to Market page", async () => {
    await market.goToMarketsPage();
  });

  await test.step("Login with valid user", async () => {
    await navbar.clickGuestUserAvatar();
    await navbar.clickSignInButton();
    await signIn.signIn(
      User.userLoginValid.email,
      User.userLoginValid.password,
    );
    await signIn.retryIfSessionNotReady();
  });

  await test.step("Verify login successful", async () => {
    await navbar.clickGuestUserAvatar();
    await expect(navbar.userAvatar).toBeVisible();
  });
});

/* ======================================================
   CLEAR STATE
====================================================== */

test.describe("Clear watchlist before running tests", () => {
  test("Clear all stocks", async ({ page }) => {
    await market.goToWatchlistPage();
    await page.waitForLoadState("networkidle");

    while ((await watchlist.removeButton.count()) > 0) {
      await watchlist.watchListRow.first().hover();
      await watchlist.removeButton.first().click();
    }
  });
});

/* ======================================================
   ADD WATCHLIST
====================================================== */

test.describe("Add Watchlist", () => {
  test("Add from watchlist page", async ({ page }) => {
    await test.step("Open Watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    await test.step("Search and add stock", async () => {
      await watchlist.watchlistAddButtonClick();
      await watchlist.fillSearchField(watchlistData.search);
      await expect(
        watchlist.getSearchResult(watchlistData.search),
      ).toBeVisible();

      await watchlist.clickStockBookMarkIconWathclist(watchlistData.search);
      await page.locator(".fixed.inset-0").click();
    });

    await test.step("Verify stock appears in watchlist", async () => {
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.search),
      ).toBeVisible();
    });
  });

  test("Add from list view", async () => {
    await test.step("Search stock from market list view", async () => {
      await market.fillSearch(watchlistData.searchListView);
      await expect(market.rowLoading).not.toBeVisible();
    });

    await test.step("Click bookmark icon", async () => {
      await watchlist.clickStockBookMarkIconListView(
        watchlistData.searchListView,
      );
    });

    await test.step("Verify stock appears in watchlist page", async () => {
      await market.goToWatchlistPage();
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.searchListView),
      ).toBeVisible();
    });
  });

  test("Add from stock profile", async ({ page }) => {
    await test.step("Search and open stock profile", async () => {
      await market.fillSearch(watchlistData.searchForProfile);
      await watchlist.clickToStockProfile(watchlistData.searchForProfile);
      await expect(page).toHaveURL(/stock-profile/);
    });

    await test.step("Click bookmark button", async () => {
      await stockProfile.clickBookMarkButton();
    });

    await test.step("Verify stock appears in watchlist", async () => {
      await market.goToWatchlistPage();
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.searchForProfile),
      ).toBeVisible();
    });
  });
});

/* ======================================================
   REMOVE WATCHLIST
====================================================== */

test.describe("Remove Watchlist", () => {
  test("Remove from watchlist page", async () => {
    await test.step("Open Watchlist page", async () => {
      await market.goToWatchlistPage();
      await expect(market.rowLoading).not.toBeVisible();
    });

    await test.step("Remove stock", async () => {
      await watchlist.clickRemoveButton(watchlistData.search);
    });

    await test.step("Verify stock is removed", async () => {
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.search),
      ).toBeHidden();
    });
  });

  test("Remove from list view", async () => {
    await test.step("Search stock from market list", async () => {
      await market.fillSearch(watchlistData.searchListView);
      await expect(market.rowLoading).not.toBeVisible();
      // wait for API/network to finish
      await market.page.waitForLoadState("networkidle");
    });

    await test.step("Click bookmark again to remove", async () => {
      await watchlist.clickStockBookMarkIconListView(
        watchlistData.searchListView,
      );
    });

    await test.step("Verify stock removed from watchlist page", async () => {
      await market.goToWatchlistPage();
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.searchListView),
      ).toBeHidden();
    });
  });

  test("Remove from stock profile", async ({ page }) => {
    await test.step("Open stock profile", async () => {
      await market.fillSearch(watchlistData.searchForProfile);
      await watchlist.clickToStockProfile(watchlistData.searchForProfile);
      await expect(page).toHaveURL(/stock-profile/);
    });

    await test.step("Click bookmark to remove", async () => {
      await stockProfile.clickBookMarkButton();
    });

    await test.step("Verify stock removed from watchlist", async () => {
      await market.goToWatchlistPage();
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.searchForProfile),
      ).toBeHidden();
    });
  });
});

/* ======================================================
   UNDO FUNCTION
====================================================== */

test.describe("Undo Remove Watchlist", () => {
  test("Add → Remove → Undo", async ({ page }) => {
    await test.step("Open Watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    await test.step("Add stock first", async () => {
      await watchlist.watchlistAddButtonClick();
      await watchlist.fillSearchField(watchlistData.search);
      await expect(
        watchlist.getSearchResult(watchlistData.search),
      ).toBeVisible();

      await watchlist.clickStockBookMarkIconWathclist(watchlistData.search);
      await page.locator(".fixed.inset-0").click();

      await expect(
        watchlist.getWatchlistSymbol(watchlistData.search),
      ).toBeVisible();
    });

    await test.step("Remove stock", async () => {
      await watchlist.clickRemoveButton(watchlistData.search);
    });

    await test.step("Click Undo button", async () => {
      await watchlist.clickUndoBotton();
    });

    await test.step("Verify stock is restored", async () => {
      await expect(
        watchlist.getWatchlistSymbol(watchlistData.search),
      ).toBeVisible();
    });
  });
});
