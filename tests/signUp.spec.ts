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

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // click select avatar button
        await signupPage.clickSelectAvatarButton();

        // click select avatar image
        await signupPage.clickSelectAvatarImage();

        // click avatar next button
        await signupPage.clickAvatarNextButton();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        // expect sign up success and redirect to market page
        await expect(signupPage.displayProfileWithPic()).toBeVisible();
            
        
})
    test ("Verify user sign up success with no select profile pic", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_no_select_profile.email;
        const password = signUp.valid_user_no_select_profile.password;
        const confirm_password = signUp.valid_user_no_select_profile.confirm_password;
        const dispaly_name = signUp.valid_user_no_select_profile.dispaly_name;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        // expect sign up success and redirect to market page
        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toBeVisible();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toHaveText(firstChar);
    });



    test ("Verify user sign up success with display name have number", async ({ page }) => {

        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_display_name_number.email;
        const password = signUp.valid_user_display_name_number.password;
        const confirm_password = signUp.valid_user_display_name_number.confirm_password;
        const dispaly_name = signUp.valid_user_display_name_number.dispaly_name ;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        // expect sign up success and redirect to market page
        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toBeVisible();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toHaveText(firstChar);

});



    test ("Verify user sign up success with display name have _", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_display_name_underscore.email;
        const password = signUp.valid_user_display_name_underscore.password;
        const confirm_password = signUp.valid_user_display_name_underscore.confirm_password;
        const dispaly_name = signUp.valid_user_display_name_underscore.dispaly_name ;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        // expect sign up success and redirect to market page
        const firstChar = dispaly_name.trim().charAt(0).toUpperCase();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toBeVisible();
        await expect(signupPage.displayProfileNoPic(dispaly_name)).toHaveText(firstChar);
});

});


test.describe(' Verify eye icon', () =>{   
    test ("Verify user click eye icon at  password field to see password.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.valid_user_eye_icon.email;
        const password = signUp.valid_user_eye_icon.password;
        const confirm_password = signUp.valid_user_eye_icon.confirm_password;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // Click eye icon at password field
        await signupPage.clickPasswordEyeIcon();

        // expect password field display password in text
        await expect(signupPage.passwordField,).toHaveAttribute('type', 'text');

        // Click eye icon at confirm password field
        await signupPage.clickConfirmPasswordEyeIcon();

        // expect confirm password field display password in text
        await expect(signupPage.confirmPasswordField).toHaveAttribute('type', 'text');

    
});

});






test.describe('Verify sign up failed', () => {

        test("Verify user sign up failed with invalid email format.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_email_format.email;
        const password = signUp.invalid_email_format.password;
        const confirm_password = signUp.invalid_email_format.confirm_password;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // expect display error message The format of this email address is invalid.
        await expect(signupPage.displayEmailErrorFormat()).toContainText('The format of this email address is invalid.');
        
        
    });

        test("Verify user sign up failed with duplicate email.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.duplicate_email.email;
        const password = signUp.duplicate_email.password;
        const confirm_password = signUp.duplicate_email.confirm_password;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        // expect display error message The email address has already been taken.
        await expect(signupPage.displayEmailErrorDup()).toContainText('This email address has already been taken.');
        
    })

        test("Verify user sign up failed with invalid password least than 8 characters.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_least_than_8.email;
        const password = signUp.invalid_password_least_than_8.password;
        const confirm_password = signUp.invalid_password_least_than_8.confirm_password;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        // expect display error message Invalid password and Must be at least 8 characters long
        await expect(signupPage.displayPasswordError()).toContainText('Invalid');
        await expect(signupPage.displayPasswordLengthRequirement()).toContainText('Must be at least 8 characters long');
        await expect(signupPage.displayPasswordLengthRequirement()).toHaveClass('text-[12px] font-normal text-error-500');
       
    })

  test('Verify user sign up failed with password don’t have letter.', async ({ page }) => {

        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_no_have_letter.email;
        const password = signUp.invalid_password_no_have_letter.password;
        const confirm_password = signUp.invalid_password_no_have_letter.confirm_password;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();


        await expect(signupPage.displayPasswordError()).toContainText('Invalid');
        await expect(signupPage.displayPasswordLetterRequirement()).toContainText('Must contain (A-Z or a-z)');
        await expect(signupPage.displayPasswordLetterRequirement()).toHaveClass('text-[12px] font-normal text-error-500');
  });

          test ("Verify user sign up failed with password don’t have numberic.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_no_have_number.email;
        const password = signUp.invalid_password_no_have_number.password;
        const confirm_password = signUp.invalid_password_no_have_number.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        await expect(signupPage.displayPasswordError()).toContainText('Invalid');
        await expect(signupPage.displayPasswordNumberRequirement()).toContainText('Must contain at least 1 number (0-9)');
        await expect(signupPage.displayPasswordNumberRequirement()).toHaveClass('text-[12px] font-normal text-error-500');
    })

        test ("Verify user sign up failed with password have special character.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_have_special_character.email;
        const password = signUp.invalid_password_have_special_character.password;
        const confirm_password = signUp.invalid_password_have_special_character.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        await expect(signupPage.displayPasswordError()).toContainText('Invalid');
        await expect(signupPage.displayPasswordSpecialCharError()).toContainText('Must not contain special characters (!@#$%^&*)');
        await expect(signupPage.displayPasswordSpecialCharError()).toHaveClass('text-[12px] font-normal text-error-500');
    })

        test ("Verify user sign up failed with confirm password mismatch.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_confirm_password_not_match.email;
        const password = signUp.invalid_confirm_password_not_match.password;
        const confirm_password = signUp.invalid_confirm_password_not_match.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        await expect(signupPage.displayConfirmPasswordError()).toBeVisible();
        await expect(signupPage.displayConfirmPasswordError()).toContainText('Passwords do not match.');
})
        test ("Verify user sign up failed with confirm password empty field.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_confirm_password_empty.email;
        const password = signUp.invalid_confirm_password_empty.password;
        const confirm_password = signUp.invalid_confirm_password_empty.confirm_password;   
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();
        
        // expect display error message Confirm password is Invalid
        await expect(signupPage.displayConfirmPasswordError()).toBeVisible();
        await expect(signupPage.displayConfirmPasswordError()).toContainText('Invalid');
        
});

        test ("Verify user sign up failed with empty email.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_email_empty.email;
        const password = signUp.invalid_email_empty.password;
        const confirm_password = signUp.invalid_email_empty.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Don't fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        //expect display error message Email is required
        await expect(signupPage.displayEmailErrorEmpty()).toContainText('Email is required');


});

        test ("Verify user sign up failed with email emoji.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_email_emoji.email;
        const password = signUp.invalid_email_emoji.password;
        const confirm_password = signUp.invalid_email_emoji.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        //expect display error message Email is required   
        await expect(signupPage.displayEmailErrorEmoji()).toContainText('Email is required');

})

        test ("Verify user sign up failed empty password.", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_password_empty.email;
        const password = signUp.invalid_password_empty.password;
        const confirm_password = signUp.invalid_password_empty.confirm_password;
        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Don't fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        //Click next button
        await signupPage.clickNextButton();

        //expect display error message Password is required
        await expect(signupPage.displayPasswordErrorEmpty()).toContainText('Password is required.');
           
});

});


test.describe('Verify sign up failed in user setting', () => {

        test ("Verify user sign up success with display name no english language",async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_not_Eng.email;
        const password = signUp.invalid_name_not_Eng.password;
        const confirm_password = signUp.invalid_name_not_Eng.confirm_password;
        const dispaly_name = signUp.invalid_name_not_Eng.dispaly_name;


        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        //expect display error message English language only and Must be English language only
        await expect(signupPage.displayDisplayNameEngRequirement()).toContainText('English language only.');
        await expect(signupPage.displayDisplayNameEngRequirement()).toHaveClass('text-[12px] font-normal text-red-500');

    })

        test ("Verify user sign up success with display name less than 5 characters", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_least_than_5.email;
        const password = signUp.invalid_name_least_than_5.password;
        const confirm_password = signUp.invalid_name_least_than_5.confirm_password;
        const dispaly_name = signUp.invalid_name_least_than_5.dispaly_name;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        await expect(signupPage.displayDisplayNameMinLengthRequirement()).toContainText('Must be at least 5 characters long');
        await expect(signupPage.displayDisplayNameMinLengthRequirement()).toHaveClass('text-[12px] font-normal text-red-500');
        
    })

        test ("Verify user sign up success with display name have special characters", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_have_special_characters.email;
        const password = signUp.invalid_name_have_special_characters.password;
        const confirm_password = signUp.invalid_name_have_special_characters.confirm_password;
        const dispaly_name = signUp.invalid_name_have_special_characters.dispaly_name;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        await expect(signupPage.displayDisplayNameSpecialCharError()).toContainText('Must not contain special characters (!@#$%^&*)');
        await expect(signupPage.displayDisplayNameSpecialCharError()).toHaveClass('text-[12px] font-normal text-red-500');
        
    
    })

        test ("Verify user sign up success with display name empty", async ({ page }) => {
        const signupPage = new SignUpPage(page);
        const email = signUp.invalid_name_empty.email;
        const password = signUp.invalid_name_empty.password;
        const confirm_password = signUp.invalid_name_empty.confirm_password;
        const dispaly_name = signUp.invalid_name_empty.dispaly_name;

        // go to https://stockanalyzer.adenxus.com/markets
        await page.goto('https://stockanalyzer.adenxus.com/markets');

        // click button icon sign in
        await signupPage.clickIconUser();

        // click link sign up
        await signupPage.clickSignUpLink();

        // Fill email
        await signupPage.fillEmail(email);

        // Fill password
        await signupPage.fillPassword(password);

        // Fill confirm password
        await signupPage.fillConfirmPassword(confirm_password);

        // click next button 
        await signupPage.clickNextButton();

        // expect display message Finish creating your profile
        await expect(signupPage.displayUserSettingPage()).toBeVisible();

        // Fill displayname 
        await signupPage.fillDisplayName(dispaly_name);

        // click create account button
        await signupPage.clickCreateAccountButton();

        await expect(signupPage.displayNameFieldError()).toContainText('Invalid');

    })


});
