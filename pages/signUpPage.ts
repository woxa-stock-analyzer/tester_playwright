


import { Page, Locator } from '@playwright/test';

export default class SignUpPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToSignUpPage() {
    await this.page.goto('https://stockanalyzer.adenxus.com/markets');
  }

  async ClickSignInButton(): Promise<Locator> {
    return this.page.locator('[data-testid="nav-signin-desktop"]');
  }

    ClickSignUpLink() {
    return this.page.locator('[data-testid="signin-show-signup"]');
  }
  emailInput() {
    return this.page.locator('[data-testid="sign-up-email-input-input"]');
  }
  passwordInput() {
    return this.page.locator('[data-testid="sign-up-password-input-input"]');
  }
  confirmPasswordInput() {
    return this.page.locator('[data-testid="sign-up-confirm-password-input-input"]');
  }
  nextButton() {
    return this.page.locator('[data-testid="sign-up-next"]');
  }

  selectAvatarButton() {
    return this.page.locator('[data-testid="sign-up-profile-select-button"]');
  }

  selectAvatarImage(){
    return this.page.locator('[data-testid="sign-up-avatar-option-/Avatar/Avartar.png"]');
  }
AvatarNextButton(){
    return this.page.locator('[data-testid="sign-up-avatar-next"]');
  }
  dispalyNameInput() {
    return this.page.locator('[data-testid="sign-up-display-name-input-input"]');
  }
  createAccountButton() {
    return this.page.locator('[data-testid="sign-up-submit"]');
  }



  EyeIcon(){
    return {
      passwordEyeIcon: this.page.locator('[data-testid="sign-up-password-input-toggle-hidden"]'),
      confirmPasswordEyeIcon: this.page.locator('[data-testid="sign-up-confirm-password-input-toggle-hidden"]')
    }

  }

  VerifySignUpFailedwithInvalidEmailFormat() {
      return {
      emailErrorFormat: this.page.locator('[data-testid="sign-up-email-input-error"]'),
    };
}

 VerifySignUpFailedwithDuplicateEmail(){
  return {
    emailErrorDup: this.page.locator('[data-testid="sign-up-email-input-error"]'),
  }
}

 VerifySignUpFailedwithInvalidPasswordLeastThan8(){
  return {
    passwordError: this.page.locator('[data-testid="sign-up-password-input-error"]'),
    lengthRequirement: this.page.locator('[data-testid="password-requirement-min-length-text"]'),
  }
}

  VerifySignUpFailedwithPasswordDontHaveLetters() {
    return {
      passwordError: this.page.locator('[data-testid="sign-up-password-input-error"]'),
      letterRequirement: this.page.locator('[data-testid="password-requirement-has-letter-text"]')
    };
}
VerifySignUpFailedwithPasswordDontHaveNumbers(){
    return {
      passwordError: this.page.locator('[data-testid="sign-up-password-input-error"]'),
      numberRequirement: this.page.locator('[data-testid="password-requirement-has-number"]')
    };
}

VerifySignUpFailedwithPasswordHaveSpecialCharacter(){
    return {
      passwordError: this.page.locator('[data-testid="sign-up-password-input-error"]'),
      specialCharError: this.page.locator('[data-testid="password-requirement-no-special-text"]')
    };
}

VerifySignUpFailedwithPasswordMismatch(){
    return {
      passwordMismatchError: this.page.locator('[data-testid="sign-up-confirm-password-input-error"]')
    };
}
VerifySignUpFailedwithConfirmPasswordEmptyField(){
    return {
      confirmPasswordRequirement: this.page.locator('[data-testid="sign-up-confirm-password-input-error"]')
    };
}
VerifySignUpFailedwithEmptyEmail(){
    return {
      emailErrorEmpty: this.page.locator('[data-testid="sign-up-email-input-error"]')
    };  
  }

  VerifySignUpFailedwithEmailEmoji(){
    return {
      emailErrorEmoji: this.page.locator('[data-testid="sign-up-email-input-error"]')
    };
  }

  VerifySignUpFailedwithEmptyPassword(){
    return {
      passwordErrorEmpty: this.page.locator('[data-testid="sign-up-password-input-error"]')
    };
  }

  VerifyRedirectToUserSettingPage(){
    return {
      userSettingHeader: this.page.locator('[data-testid="sign-up-profile-step"]')
    }
  }
  VerifySignUpFailedwithInvalidNameNoEng(){
    return {
      invalidNameNoEng: this.page.locator('[data-testid="displayname-requirement-english-only-text"]')
  }
}
VerifySignUpFailedwithInvalidNameLessThan5Chars(){
    return {
      invalidNameLessThan5Chars: this.page.locator('[data-testid="displayname-requirement-min-length-text"]')
}
}

VerifySignUpFailedwithInvalidNameHaveSpecialCharacters(){
    return {
      invalidNameSpecialChars: this.page.locator('[data-testid="displayname-requirement-no-special-text"]')
      
}
}

VerifySignUpFailedwithEmptyDisplayName(){
    return {
      emptyDisplayNameErrorEmpty: this.page.locator('[data-testid="sign-up-display-name-input-error"]')
}
}


VerifySignUpSuccessWithNoPic(dispaly_name: string){
    return {
      ProfileNoPic: this.page.locator('[data-testid="nav-user-initial"]:visible')
}
}

VerifySignUpSuccessWithPic(){
    return {
      ProfileWithPic: this.page.getByTestId('nav-user-menu').getByTestId('nav-user-avatar')
}
}
}
