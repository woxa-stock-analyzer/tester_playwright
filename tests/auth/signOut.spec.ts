import { expect, test } from "@playwright/test";
import { NavbarPage } from "../../pages/navbarSection";
import { SignInPage } from "../../pages/signinPage";
import User from "../../data/userSignin.json";
import { MarketPage } from "../../pages/marketPage";

let market: MarketPage;
let navbar: NavbarPage;
let signIn: SignInPage;

test.beforeEach(async ({ page }) => {
  market = new MarketPage(page);
  navbar = new NavbarPage(page);
  signIn = new SignInPage(page);

  //   Enter markets page (Homepage of website)
  await test.step("Go to markets page", async () => {
    await market.goToMarketsPage();
  });

  // Open sign in modal
  await test.step("Open sign in modal", async () => {
    await navbar.guestUserAvater.click();
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
    await expect(
      page.getByTestId("nav-user-menu").getByTestId("nav-user-avatar"),
    ).toBeVisible();
  });
});

test.describe.parallel("User sign out success", () => {
  test("Sign-out-001 User sign out from system success", async ({ page }) => {
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
        await expect(navbar.guestUserAvater).toBeVisible();
    })
  });
});
