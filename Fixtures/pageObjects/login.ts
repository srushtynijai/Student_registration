import { expect, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
    * @returns Login to Apply Button
    */
    async loginToApplyButton() {
        return this.page.getByText("Log In to Apply");
    }

    /**
    * @returns Login Page title
    */
    loginPageTitle() {
        return this.page.getByText("Sign In To Kaleidoscope");

    }

    /**
    * @returns email Input box locator
    */
    async emailInputBox() {
        return this.page.getByPlaceholder("Email Address");
    }

    /**
    * @returns login Page Next Button Locator
    */
    loginPageNextButton() {
        return this.page.getByLabel('Next');
    }

    /**
    * @returns Sign In Button Locator
    */
    signInButton() {
        return this.page.getByRole('button', { name: 'Sign In' });
    }

    /**
    * @returns Password Button Locator
    */
    passwordButton() {
        return this.page.getByLabel('Enter Your Password');
    }

    /**
    * @description Navigate to the Kaleidoscope login Page
    */
    async navigateToLoginPage() {
        await (await this.loginToApplyButton()).click({force: true});
        await this.page.waitForLoadState("networkidle");
        await expect(this.loginPageTitle()).toBeVisible();
    }

    /**
    * @description Enter the student email
    * @param studentEmail Student Email
    */
    async enterStudentEmailandClickNext(studentEmail: string) {
        await (await this.emailInputBox()).click();
        await (await this.emailInputBox()).fill(studentEmail);
        await this.loginPageNextButton().click();
        await this.page.waitForLoadState("load");
    }

    /**
    * @description Sign In for existing user
    * @param Password Student Password
    */
    async signInForExistingUser(Password: string) {
        if (await this.signInButton().isVisible()) {
            await this.passwordButton().click();
            await this.passwordButton().fill(Password);
            await this.signInButton().click();
            await this.page.waitForLoadState("load");
        }
        else {
            console.log("User does not exist, proceeding with account creation");
        }
    }

}