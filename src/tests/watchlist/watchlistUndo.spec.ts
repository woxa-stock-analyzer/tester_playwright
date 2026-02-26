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






test.describe(" User remove then use undo function", () => {
  test("User remove watchlist then  use undo function", async ({page,}) => {

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

    // Click again for remove stock from watchlist
    await test.step("Click again for remove stock from watchlist", async () => {
    await watchlist.clickStockBookMarkIconWathclist(watchlistData.search);
    });

    // Close modal
    await test.step("Close modal by clicking backdrop", async () => {
    await page.locator(".fixed.inset-0").click();
    });

    await test.step("Click remove NVDA form watchlist", async () => {
        await watchlist.clickRemoveButton(watchlistData.search);
    });

    await test.step("Click undo button", async () => {
      await watchlist.clickUndoBotton();
    });

    await page.waitForTimeout(1000);
    // Verify watchlist stock update
    await test.step("Verify watchlist stock update", async () => {
      await expect(watchlist.getWatchlistSymbol(watchlistData.search)).toBeVisible();
    });
  });

})