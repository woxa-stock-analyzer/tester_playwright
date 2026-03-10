import test, { expect, test as setup } from "@playwright/test";
import { MarketPage } from "../../pages/marketPage";
import { NavbarSection } from "../../pages/navbarSection";
import { SignInPage } from "../../pages/signinPage";
import User from "../../data/userSignin.json";

setup("authenticate", async ({ page }) => {
  const market = new MarketPage(page);
  const navbar = new NavbarSection(page);
  const signIn = new SignInPage(page);

  await market.goToMarketsPage();

  await navbar.clickGuestUserAvatar();
  await navbar.clickSignInButton();

  await signIn.signIn(User.userLoginValid.email, User.userLoginValid.password);

  await test.step("Wait for loading", async () => {
    await page.waitForLoadState("networkidle");
  });

  // Verify sign in successful
  await test.step("Verify sign in successful", async () => {
    await navbar.clickGuestUserAvatar();
    await expect(navbar.userAvatar).toBeVisible();
  });

  // Playwright creates this file
  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
