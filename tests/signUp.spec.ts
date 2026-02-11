import { test, expect } from '@playwright/test';
import SignUpPage from '../pages/signUpPage';
import signUp from '../data/userSignUp.json';



test.describe('Verify sign up success', () =>{


        test ("Verify user sign up success with select profile pic", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_select_profile.email;
        const password = signUp.valid_user_select_profile.password;
        const confirm_password = signUp.valid_user_select_profile.confirm_password;
        const dispaly_name = signUp.valid_user_select_profile.dispaly_name;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await signupPage.selectAvatarButton().click();
        await signupPage.selectAvatarImage().click();
        await signupPage.AvatarNextButton().click();

        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();
        await expect(signupPage.VerifySignUpSuccessWithPic().ProfileWithPic).toBeVisible();
        await expect(signupPage.VerifySignUpSuccessWithPic().ProfileWithPic).toHaveAttribute('src', /.+/);
        
})
    test ("Verify user sign up success with no select profile pic", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_no_select_profile.email;
        const password = signUp.valid_user_no_select_profile.password;
        const confirm_password = signUp.valid_user_no_select_profile.confirm_password;
        const dispaly_name = signUp.valid_user_no_select_profile.dispaly_name;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
 
        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();

        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toBeVisible();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toHaveText(firstChar);
    });



    test ("Verify user sign up success with display name have number", async ({ page }) => {

        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_display_name_number.email;
        const password = signUp.valid_user_display_name_number.password;
        const confirm_password = signUp.valid_user_display_name_number.confirm_password;
        const dispaly_name = signUp.valid_user_display_name_number.dispaly_name ;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();

        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toBeVisible();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toHaveText(firstChar);

});

    test ("Verify user sign up success with display name have _", async ({ page }) => {

        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_display_name_underscore.email;
        const password = signUp.valid_user_display_name_underscore.password;
        const confirm_password = signUp.valid_user_display_name_underscore.confirm_password;
        const dispaly_name = signUp.valid_user_display_name_underscore.dispaly_name ;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();

        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toBeVisible();
        await expect(signupPage.VerifySignUpSuccessWithNoPic(dispaly_name).ProfileNoPic).toHaveText(firstChar);

});

});











test.describe('Verify sign up failed', () => {

        test("Verify user sign up failed with invalid email format.", async ({ page }) => {
        // const SignupPage = new SignUpPage();
        const email = signUp.invalid_email_format.email;
        const password = signUp.invalid_email_format.password;
        const confirm_password = signUp.invalid_email_format.confirm_password;

        const signupPage = new SignUpPage(page);

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);


        await expect(signupPage.VerifySignUpFailedwithInvalidEmailFormat()
        .emailErrorFormat).toContainText('The format of this email address is invalid.');
        await signupPage.nextButton();
        
    });

        test("Verify user sign up failed with duplicate email.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.duplicate_email.email;
        const password = signUp.duplicate_email.password;
        const confirm_password = signUp.duplicate_email.confirm_password;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);

        await signupPage.nextButton().click();
        await expect(signupPage.VerifySignUpFailedwithDuplicateEmail().emailErrorDup).toContainText('This email address has already been taken.');
       
    })

        test("Verify user sign up failed with invalid password least than 8 characters.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_least_than_8.email;
        const password = signUp.invalid_password_least_than_8.password;
        const confirm_password = signUp.invalid_password_least_than_8.confirm_password;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithInvalidPasswordLeastThan8().passwordError).toContainText('Invalid');
        await expect(signupPage.VerifySignUpFailedwithInvalidPasswordLeastThan8().lengthRequirement).toContainText('Must be at least 8 characters long');
        await expect(signupPage.VerifySignUpFailedwithInvalidPasswordLeastThan8().lengthRequirement).toHaveClass('text-[12px] font-normal text-error-500');
       
    })

  test('Verify user sign up failed with password don’t have letter.', async ({ page }) => {

    const signupPage = new SignUpPage(page);
    const email = signUp.invalid_password_no_have_letter.email;
    const password = signUp.invalid_password_no_have_letter.password;
    const confirmPassword = signUp.invalid_password_no_have_letter.confirm_password;

    await signupPage.goToSignUpPage();
    await signupPage.page.waitForTimeout(5000); // หน่วง 3 วินาที

    (await signupPage.ClickSignInButton()).click();
    await signupPage.ClickSignUpLink().click();

    await signupPage.emailInput().fill(email);
    await signupPage.passwordInput().fill(password);
    await signupPage.confirmPasswordInput().fill(confirmPassword);

    await signupPage.nextButton().click();

    await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveLetters().passwordError).toContainText('Invalid');
    await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveLetters().letterRequirement).toContainText('Must contain (A-Z or a-z)');
    await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveLetters().letterRequirement).toHaveClass('text-[12px] font-normal text-error-500');
  });

          test ("Verify user sign up failed with password don’t have numberic.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_no_have_number.email;
        const password = signUp.invalid_password_no_have_number.password;
        const confirm_password = signUp.invalid_password_no_have_number.confirm_password;
        await signupPage.goToSignUpPage(); // หน่วง 3 วินาที

        (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();

        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveNumbers().passwordError).toContainText('Invalid');
        await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveNumbers().numberRequirement).toContainText('Must contain at least 1 number (0-9)');
        await expect(signupPage.VerifySignUpFailedwithPasswordDontHaveNumbers().numberRequirement).toHaveClass('flex items-center gap-2');
    })

        test ("Verify user sign up failed with password have special character.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_have_special_character.email;
        const password = signUp.invalid_password_have_special_character.password;
        const confirm_password = signUp.invalid_password_have_special_character.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithPasswordHaveSpecialCharacter().passwordError).toContainText('Invalid');
        await expect(signupPage.VerifySignUpFailedwithPasswordHaveSpecialCharacter().specialCharError).toContainText('Must not contain special characters (!@#$%^&*)');
        await expect(signupPage.VerifySignUpFailedwithPasswordHaveSpecialCharacter().specialCharError).toHaveClass('text-[12px] font-normal text-error-500');
    })

        test ("Verify user sign up failed with password mismatch.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_confirm_password_not_match.email;
        const password = signUp.invalid_confirm_password_not_match.password;
        const confirm_password = signUp.invalid_confirm_password_not_match.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithPasswordMismatch().passwordMismatchError).toBeVisible();
        await expect(signupPage.VerifySignUpFailedwithPasswordMismatch().passwordMismatchError).toContainText('Passwords do not match.');
})
        test ("Verify user sign up failed with confirm password empty field.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_confirm_password_empty.email;
        const password = signUp.invalid_confirm_password_empty.password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().clear();
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithConfirmPasswordEmptyField().confirmPasswordRequirement).toContainText('Invalid');
        
});

        test ("Verify user sign up failed with empty email.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const password = signUp.invalid_email_empty.password;
        const confirm_password = signUp.invalid_email_empty.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().clear();
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();

        await expect(signupPage.VerifySignUpFailedwithEmptyEmail().emailErrorEmpty).toContainText('Email is required');
        
});

        test ("Verify user sign up failed with email emoji.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_email_emoji.email;
        const password = signUp.invalid_email_emoji.password;
        const confirm_password = signUp.invalid_email_emoji.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifySignUpFailedwithEmailEmoji().emailErrorEmoji).toContainText('Email is required');

})

        test ("Verify user sign up failed empty password.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_empty.email;
        const confirm_password = signUp.invalid_password_empty.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().clear();
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifySignUpFailedwithEmptyPassword().passwordErrorEmpty).toContainText('Password is required.');    
})

});

test.describe('Verif eye icon', () => {

    test ("Verify user can see password when click eye icon.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_eye_icon.email;
        const password = signUp.valid_user_eye_icon.password;
        const confirm_password = signUp.valid_user_eye_icon.confirm_password;
        await signupPage.goToSignUpPage();

        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await expect(signupPage.passwordInput()).toHaveAttribute('type', 'password');
        await expect(signupPage.confirmPasswordInput()).toHaveAttribute('type', 'password');
        await signupPage.EyeIcon().passwordEyeIcon.click();
        await signupPage.EyeIcon().confirmPasswordEyeIcon.click();
        await expect(signupPage.passwordInput()).toHaveAttribute('type', 'text');
        await expect(signupPage.confirmPasswordInput()).toHaveAttribute('type', 'text');

})

});

test.describe('Verify sign up failed in user setting', () => {

        test ("Verify user sign up success with display name no english language",async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_not_Eng.email;
        const password = signUp.invalid_name_not_Eng.password;
        const confirm_password = signUp.invalid_name_not_Eng.confirm_password;
        const dispaly_name = signUp.invalid_name_not_Eng.dispaly_name;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifyRedirectToUserSettingPage().userSettingHeader).toContainText('Finish creating your ');
        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();
        await expect(signupPage.VerifySignUpFailedwithInvalidNameNoEng().invalidNameNoEng).toContainText('English language only.');
        await expect(signupPage.VerifySignUpFailedwithInvalidNameNoEng().invalidNameNoEng).toHaveClass('text-[12px] font-normal text-red-500');

    })

            test ("Verify user sign up success with display name less than 5 characters", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_least_than_5.email;
        const password = signUp.invalid_name_least_than_5.password;
        const confirm_password = signUp.invalid_name_least_than_5.confirm_password;
        const dispaly_name = signUp.invalid_name_least_than_5.dispaly_name;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifyRedirectToUserSettingPage().userSettingHeader).toContainText('Finish creating your ');
        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();
        await expect(signupPage.VerifySignUpFailedwithInvalidNameLessThan5Chars().invalidNameLessThan5Chars).toContainText('Must be at least 5 characters long');
        await expect(signupPage.VerifySignUpFailedwithInvalidNameLessThan5Chars().invalidNameLessThan5Chars).toHaveClass('text-[12px] font-normal text-red-500');

    })

        test ("Verify user sign up success with display name have special characters", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_have_special_characters.email;
        const password = signUp.invalid_name_have_special_characters.password;
        const confirm_password = signUp.invalid_name_have_special_characters.confirm_password;
        const dispaly_name = signUp.invalid_name_have_special_characters.dispaly_name;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifyRedirectToUserSettingPage().userSettingHeader).toContainText('Finish creating your ');
        await signupPage.dispalyNameInput().fill(dispaly_name);
        await signupPage.createAccountButton().click();
        await expect(signupPage.VerifySignUpFailedwithInvalidNameHaveSpecialCharacters().invalidNameSpecialChars).toContainText('Must not contain special characters (!@#$%^&*)');
        await expect(signupPage.VerifySignUpFailedwithInvalidNameHaveSpecialCharacters().invalidNameSpecialChars).toHaveClass('text-[12px] font-normal text-red-500');

        await expect(signupPage.VerifySignUpFailedwithInvalidNameNoEng().invalidNameNoEng).toContainText('English language only.');
        await expect(signupPage.VerifySignUpFailedwithInvalidNameNoEng().invalidNameNoEng).toHaveClass('text-[12px] font-normal text-red-500');

    })

        test ("Verify user sign up success with display name empty", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_empty.email;
        const password = signUp.invalid_name_empty.password;
        const confirm_password = signUp.invalid_name_empty.confirm_password;

        await signupPage.goToSignUpPage();
        await (await signupPage.ClickSignInButton()).click();
        await signupPage.ClickSignUpLink().click();
        await signupPage.emailInput().fill(email);
        await signupPage.passwordInput().fill(password);
        await signupPage.confirmPasswordInput().fill(confirm_password);
        await signupPage.nextButton().click();
        await expect(signupPage.VerifyRedirectToUserSettingPage().userSettingHeader).toContainText('Finish creating your ');
        await signupPage.dispalyNameInput().clear();
        await signupPage.createAccountButton().click();
        await expect(signupPage.VerifySignUpFailedwithEmptyDisplayName().emptyDisplayNameErrorEmpty).toContainText('Invalid');
        

    })



});