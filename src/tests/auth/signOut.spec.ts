import { expect, test } from "@playwright/test";
import { NavbarSection } from "../../pages/navbarSection";
import { SignInPage } from "../../pages/signinPage";
import User from "../../data/userSignin.json";
import { MarketPage } from "../../pages/marketPage";

let market: MarketPage;
let navbar: NavbarSection;
let signIn: SignInPage;

test.beforeEach(async ({ page }) => {
  market = new MarketPage(page);
  navbar = new NavbarSection(page);
  signIn = new SignInPage(page);
});

test.describe("User sign out success", () => {
  test("Sign-out-001 User sign out from system success", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Open sign in modal
    await test.step("Open sign in modal", async () => {
      await navbar.clickGuestUserAvatar();
    });

    // Sign in with valid user
    await test.step("Sign in with valid user", async () => {
      await signIn.signIn(
        User.userLoginValidForLogout.email,
        User.userLoginValidForLogout.password,
      );
      await signIn.retryIfSessionNotReady();
    });

    await test.step("Wait for loading", async () => {
      await page.waitForLoadState("networkidle");
    });

    // Verify sign in successful
    await test.step("Verify sign in successful", async () => {
      await expect(navbar.userAvatar).toBeVisible();
    });

    // Click user avatar
    await test.step("Click user avatar", async () => {
      await navbar.clickUserAvatar();
    });

    // Click sign out
    await test.step("Click SignOut", async () => {
      await navbar.clickSignOutButton();
    });

    // Click confirm sign out
    await test.step("Click confirm sign out", async () => {
      await navbar.clickConfirmSignOutButton();
    });

    // Verify user has been sign out
    await test.step("Verify user has been sign out", async () => {
      await expect(navbar.guestUserAvatar).toBeVisible();
    });
  });
});
