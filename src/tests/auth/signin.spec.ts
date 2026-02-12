import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pages/signinPage";
import User from "../../data/userSignin.json";
import { containsEmoji } from "../../helper/command";
import { NavbarSection } from "../../pages/navbarSection";
import { MarketPage } from "../../pages/marketPage";

let market: MarketPage;
let navbar: NavbarSection;
let signIn: SignInPage;

test.beforeEach(async ({ page }) => {
  market = new MarketPage(page);
  navbar = new NavbarSection(page);
  signIn = new SignInPage(page);
});

test.describe.parallel("User sign in with valid", () => {
  test("Sign-in-001 User sign in success", async ({ page }) => {
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
        User.userLoginValid.email,
        User.userLoginValid.password,
      );
    });

    // Verify sign in successful
    await test.step("Verify sign in successful", async () => {
      await expect(navbar.userAvatar).toBeVisible();
    });
  });
});

test.describe.parallel("User sign in with invalid", () => {
  test("Sign-in-003 User sign in with invalid email", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Open sign in modal
    await test.step("Open sign in modal", async () => {
      await navbar.clickGuestUserAvatar();
    });

    // Sign in with invalid email
    await test.step("Sign in with invalid email", async () => {
      await signIn.signIn(
        User.userLoginInvalid.email,
        User.userLoginValid.password,
      );
    });

    // Verify sign in failed
    await test.step("Verify sign in failed", async () => {
      await expect(signIn.errorSignInFailedMessage).toBeVisible();
    });
  });

  test("Sign-in-004 User sign in with invalid password", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Open sign in modal
    await test.step("Open sign in modal", async () => {
      await navbar.clickGuestUserAvatar();
    });

    // Sign in with invalid password
    await test.step("Sign in with invalid password", async () => {
      await signIn.signIn(
        User.userLoginValid.email,
        User.userLoginInvalid.password,
      );
    });

    // Verify sign in failed
    await test.step("Verify sign in failed", async () => {
      await expect(signIn.errorSignInFailedMessage).toBeVisible();
    });
  });

  test("Sign-in-005 User sign in with invalid input", async ({ page }) => {
    //   Enter markets page (Homepage of website)
    await test.step("Go to markets page", async () => {
      await market.goToMarketsPage();
    });

    // Open sign in modal
    await test.step("Open sign in modal", async () => {
      await navbar.clickGuestUserAvatar();
    });

    // Sign in with invalid password
    await test.step("Sign in with invalid password", async () => {
      await signIn.signIn(
        User.userLoginInvalidInput.email,
        User.userLoginInvalidInput.password,
      );
    });

    // Verify sign in failed
    await test.step("Verify sign in failed", async () => {
      await expect.soft(signIn.errorSignInFailedMessage).toBeVisible();
    });

    // Verify no emoji in input field
    await test.step("Verify field not contain emoji", async () => {
      // Assert that the email not contains an emoji
      expect.soft(containsEmoji(User.userLoginInvalidInput.email)).toBe(false);

      // Assert that the password not contains an emoji
      expect
        .soft(containsEmoji(User.userLoginInvalidInput.password))
        .toBe(false);
    });
  });
});
