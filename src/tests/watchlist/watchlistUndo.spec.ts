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

  // wait for API/network to finish
  await market.page.waitForLoadState("networkidle");

  // Open sign in modal
  await test.step("Open sign in modal", async () => {
    await navbar.clickGuestUserAvatar();
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
    await expect(navbar.userAvatar).toBeVisible();
  });
});






test.describe(" User remove then use undo function", () => {
  test("User remove watchlist then  use undo function", async ({page,}) => {

    //   Enter watchlist page
    await test.step("Go to watchlist page", async () => {
      await market.goToWatchlistPage();
    });

    // wait for API/network to finish
    await page.waitForTimeout(2000);

    await test.step("Click remove NVDA form watchlist", async () => {
        await watchlist.clickRemoveButton(watchlistData.search);
    });

    await test.step("Click undo button", async () => {
      await watchlist.clickUndoBotton();
    });

    await page.waitForTimeout(1000);
    // Verify watchlist stock update
    await test.step("Verify watchlist stock update", async () => {
      await expect(watchlist.watchlistSymbolNvda).toBeVisible();
    });
  });

})