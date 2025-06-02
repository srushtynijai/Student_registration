import { expect, Page } from "@playwright/test";

export class CreateAccountPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
   * @returns Email Address Input Field locator
   */
    emailAddressInputField() {
        return this.page.locator('//input[@aria-label="Email Address"]');
    }

    /**
    * @returns First Name Input Field locator
    */
    firstNameInputField() {
        return this.page.locator('//input[@aria-label="First Name"]');
    }

    /**
    * @returns Last Name Input Field locator
    */
    lastNameInputField() {
        return this.page.locator('//input[@aria-label="Last Name"]');
    }

    /**
     * @returns Mobile number country button locator
     */
    mobileNumberCountryButton() {
        return this.page.locator('//div[@class="selected-flag"]');
    }

    /**
    * @returns Mobile number country selection dropdown element locator
    */
    mobileNumberCountrySelectionDropdown(CountryName: string) {
        return this.page.locator(`//ul/li[span[@class="country-name" and text()="${CountryName}"]]`);
    }

    /**
     * @returns Mobile number input field locator
     */
    mobileNumberInputField() {
        return this.page.getByPlaceholder('1 (702) 123-4567');
    }

    /**
     * @returns Password Input field locator
     */
    passwordInputField() {
        return this.page.locator('//input[@aria-label="Create a Password"]');
    }

    /**
     * @returns Age checkbox locator
     */
    ageCheckbox() {
        return this.page.locator('//input[@aria-label="I confirm that I am at least 13 years old"]');
    }

    /**
     * @returns Submit Button locator
     */
    submitButton() {
        return this.page.locator('//button[@aria-label="Submit"]');
    }

    /**
     * @returns Address input field locator
     */
    addressInputField() {
        return this.page.getByPlaceholder('Enter your street address');
    }

    /**
     * @returns Additional address input field locator
     */
    additionalAddressInputField() {
        return this.page.getByPlaceholder('Enter additional street address (e.g. Apt Number)');
    }

    /**
     * @returns State input field locator
     */
    stateInputField() {
        return this.page.getByPlaceholder('Enter your state');
    }

     /**
     * @returns State dropdown value
     * @param state State
     */
    stateDropdownValue(state: string) {
        return this.page.getByRole('option', { name: `${state}` })
    }

     /**
     * @returns City input field locator
     */
    cityInputField() {
        return this.page.getByPlaceholder('Enter your city');
    }

     /**
     * @returns Zip code input field locator
     */
    zipCodeInputField() {
        return this.page.getByPlaceholder('Enter your zip code');
    }

     /**
     * @returns Country input field locator
     */
    countryInputField() {
        return this.page.getByPlaceholder('Enter your country');
    }

     /**
     * @returns country dropdown value
     * @param country Country Name
     */
    countryDropdownValue(country: string) {
        return this.page.getByRole('option', { name: `${country}` })
    }

     /**
     * @returns Next Page button
     */
    nextPageButton() {
        return this.page.locator('//button[@type="submit"]');
    }
}