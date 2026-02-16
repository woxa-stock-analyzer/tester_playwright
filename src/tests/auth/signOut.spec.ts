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

test.describe.parallel("User sign out success", () => {
  test("Sign-out-001 User sign out from system success", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Open sign in modal
    await test.step("Open sign in modal", async () => {
      await navbar.guestUserAvatar.click();
    });

    // Sign in with valid user
    await test.step("Sign in with valid user", async () => {
      await signIn.signIn(
        User.userLoginValid.email,
        User.userLoginValid.password,
      );
    });

    // Verify sign in successful
    await test.step("Verify sign in successful", async () => {
      // Wait for avatar
      await navbar.waitForUserAvatar();

      await expect(
        page.getByTestId("nav-user-menu").getByTestId("nav-user-avatar"),
      ).toBeVisible();
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

    // Wait until page load finish
    await page.waitForLoadState("networkidle");

    // Verify user has been sign out
    await test.step("Verify user has been sign out", async () => {
      await expect(navbar.guestUserAvatar).toBeVisible();
    });
  });
});
