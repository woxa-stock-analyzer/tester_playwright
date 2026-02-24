
import { Page, Locator } from '@playwright/test';

export default class SignUpPage {
  readonly page: Page;
  readonly iconUser: Locator;
  readonly signUpLink: Locator;
  //  Sign up form locators
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly passwordEyeIcon: Locator;
  readonly confirmPasswordEyeIcon: Locator;
  readonly nextButton: Locator;
  // User setting form locators
  readonly userSettingPage: Locator;
  readonly selectAvatarButton: Locator;
  readonly selectAvatarImage: Locator;
  readonly avatarNextButton: Locator;
  readonly displayNameField: Locator;
  readonly createAccountButton: Locator;
  // Profile locators
  readonly profileNoPic: Locator;
  readonly profileAvatar: Locator;

  // Error message locators
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly passwordLengthRequirement: Locator;
  readonly passwordLetterRequirement: Locator;
  readonly passwordNumberRequirement: Locator;
  readonly passwordSpecialCharError: Locator;
  readonly confirmPasswordError: Locator;

  readonly displayNameEmptyError: Locator;
  readonly displayNameEngRequirement: Locator;
  readonly displayNameMinLengthRequirement: Locator;
  readonly displayNameSpecialCharError: Locator;
  
  

  

  constructor(page: Page) {
    this.page = page;
    this.iconUser = page.locator('[data-testid="nav-signin-desktop"]');
    this.signUpLink = page.locator('[data-testid="signin-show-signup"]');

    this.emailField = page.locator('[data-testid="sign-up-email-input-input"]');
    this.passwordField = page.locator('[data-testid="sign-up-password-input-input"]');
    this.confirmPasswordField = page.locator('[data-testid="sign-up-confirm-password-input-input"]');
    this.passwordEyeIcon = page.locator('[data-testid="sign-up-password-input-toggle-hidden"]');
    this.confirmPasswordEyeIcon = page.locator('[data-testid="sign-up-confirm-password-input-toggle-hidden"]');
    this.nextButton = page.locator('[data-testid="sign-up-next"]');

    this.userSettingPage = page.locator('[data-testid="sign-up-profile-step"]');
    this.selectAvatarButton = page.locator('[data-testid="sign-up-profile-select-button"]');
    this.selectAvatarImage = page.locator('[data-testid="sign-up-avatar-option-0"]');
    this.avatarNextButton = page.locator('[data-testid="sign-up-avatar-next"]');
    this.displayNameField = page.locator('[data-testid="sign-up-display-name-input-input"]');
    this.createAccountButton = page.locator('[data-testid="sign-up-submit"]');

    this.profileNoPic = page.locator('[data-testid="nav-user-menu"] [data-testid="nav-user-initial"]');
    this.profileAvatar = page.locator('[data-testid="nav-user-menu"] [data-testid="nav-user-avatar"]');

    // Error message locators
    this.emailError = page.locator('[data-testid="sign-up-email-input-error"]');
    this.passwordError = page.locator('[data-testid="sign-up-password-input-error"]');
    this.passwordLengthRequirement = page.locator('[data-testid="password-requirement-min-length-text"]');
    this.passwordLetterRequirement = page.locator('[data-testid="password-requirement-has-letter-text"]');
    this.passwordNumberRequirement = page.locator('[data-testid="password-requirement-has-number-text"]');
    this.passwordSpecialCharError = page.locator('[data-testid="password-requirement-no-special-text"]');
    this.confirmPasswordError = page.locator('[data-testid="sign-up-confirm-password-input-error"]');

    this.displayNameEmptyError = page.locator('[data-testid="sign-up-display-name-input-error"]');
    this.displayNameEngRequirement = page.locator('[data-testid="displayname-requirement-english-only-text"]');
    this.displayNameMinLengthRequirement = page.locator('[data-testid="displayname-requirement-min-length-text"]');
    this.displayNameSpecialCharError = page.locator('[data-testid="displayname-requirement-no-special-text"]');


    
  }

  async clickIconUser() {
    await this.iconUser.click();
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async clickPasswordEyeIcon() {
    await this.passwordEyeIcon.click();
  }

  async clickConfirmPasswordEyeIcon() {
    await this.confirmPasswordEyeIcon.click();
  }

  displayPasswordAndConfirmPassword() {
    return {
      passwordField: this.passwordField,
      confirmPasswordField: this.confirmPasswordField
    };
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async fillDisplayName(displayName: string) {
    await this.displayNameField.fill(displayName);
  }

  displayUserSettingPage(){
    return this.userSettingPage;
  }

  async clickSelectAvatarButton() {
    await this.selectAvatarButton.click();
  }

  async clickSelectAvatarImage() {
    await this.selectAvatarImage.click();
  }
  
  async clickAvatarNextButton() {
    await this.avatarNextButton.click();
  }


  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  displayProfileNoPic(display_name: string) {
  const firstChar = display_name.trim().charAt(0).toUpperCase();

  return this.profileNoPic.filter({ hasText: firstChar });
}
  displayProfileWithPic() {
    return this.profileAvatar;
  }

  displayEmailError() {
    return this.emailError;
  }


 
  displayPasswordError() {
    return this.passwordError;
  }

  displayPasswordLengthRequirement() {
    return this.passwordLengthRequirement;
  }

  displayPasswordLetterRequirement() {
    return this.passwordLetterRequirement;
  }

  displayPasswordNumberRequirement() {
    return this.passwordNumberRequirement;
  }

  displayPasswordSpecialCharError() {
    return this.passwordSpecialCharError;
  }

  displayConfirmPasswordError() {
    return this.confirmPasswordError;
  }


  displayNameFieldError() {
    return this.displayNameEmptyError;
  }

  displayDisplayNameEngRequirement() {
    return this.displayNameEngRequirement;
  }

  displayDisplayNameMinLengthRequirement() {
    return this.displayNameMinLengthRequirement;
  }

  displayDisplayNameSpecialCharError() {
    return this.displayNameSpecialCharError;
  }

}