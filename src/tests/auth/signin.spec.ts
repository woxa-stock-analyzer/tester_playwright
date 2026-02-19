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

test.describe("User sign in with valid", () => {
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

    await test.step("Wait for loading", async () => {
      await page.waitForLoadState("networkidle");
    });

    // Verify user has been sign out
    await test.step("Verify user has been sign out", async () => {
      await expect(navbar.guestUserAvatar).toBeVisible();
    });
  });
});

test.describe("User sign in with invalid", () => {
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

    await test.step("Wait for loading", async () => {
      await page.waitForLoadState("networkidle");
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

    await test.step("Wait for loading", async () => {
      await page.waitForLoadState("networkidle");
    });

    // Verify sign in failed
    await test.step("Verify sign in failed", async () => {
      await expect(signIn.errorSignInFailedMessage).toBeVisible();
    });
  });

  // WAIT FOR FE FIX BUG!!!!

  // test("Sign-in-005 User sign in with invalid data type", async ({ page }) => {
  //   //   Enter markets page (Homepage of website)
  //   await test.step("Go to markets page", async () => {
  //     await market.goToMarketsPage();
  //   });

  //   // Open sign in modal
  //   await test.step("Open sign in modal", async () => {
  //     await navbar.clickGuestUserAvatar();
  //   });

  //   // Sign in with invalid password
  //   await test.step("Sign in with invalid password", async () => {
  //     await signIn.signIn(
  //       User.userLoginInvalidInput.email,
  //       User.userLoginInvalidInput.password,
  //     );
  //   });

  //   // Verify sign in failed
  //   await test.step("Verify sign in failed", async () => {
  //     await expect.soft(signIn.errorSignInFailedMessage).toBeVisible();
  //   });

  //   // Verify no emoji in input field
  //   await test.step("Verify field not contain emoji", async () => {
  //     const inputEmailValue = await signIn.getEmailValue();
  //     const inputPasswordValue = await signIn.getPasswordValue();

  //     // Assert that the email not contains an emoji
  //     expect.soft(containsEmoji(inputEmailValue)).toBe(false);

  //     // Assert that the password not contains an emoji
  //     expect.soft(containsEmoji(inputPasswordValue)).toBe(false);
  //   });
  // });
});
