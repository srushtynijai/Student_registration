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
        return this.page.locator('//h1[@id="login-page__title"]');

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
        return this.page.locator('//button[@id="login-page__cta"]');
    }

     /**
    * @returns Sign In Button Locator
    */
    signInButton(){
        return this.page.locator('//button[@aria-label="Sign In"]');
    }

      /**
    * @returns Password Button Locator
    */
    passwordButton() {
        return this.page.locator('//input[@aria-label="Enter Your Password"]');
    }
}