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
        return this.page.getByLabel('Email address');
    }

    /**
    * @returns First Name Input Field locator
    */
    firstNameInputField() {
        return this.page.getByLabel('First Name');
    }

    /**
    * @returns Last Name Input Field locator
    */
    lastNameInputField() {
        return this.page.getByLabel('Last Name');
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
        return this.page.getByLabel('Create a Password');
    }

    /**
    * @returns Age checkbox locator
    */
    ageCheckbox() {
        return this.page.getByLabel('I confirm that I am at least 13 years old');
    }

    /**
    * @returns Submit Button locator
    */
    submitButton() {
        return this.page.getByText('Submit');
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
       return this.page.getByRole('button', { name: 'Next Page' });
    }

    /**
    * @returns Next Page button
    */
    saveError() {
        return this.page.getByText('Failed to save');
    }

    /**
    * @description Enter the student details on Create Account Page
    * @param studentEmail Student email for validation
    * @param firstName Student's FirstName
    * @param lastName Student's Last Name
    * @param country Student's Country 
    * @param phoneNumber Student's Phone Number 
    * @param password Password 
    */
    async enterStudentDetailsOnCreateAccountPage(firstName: string, lastName: string, country: string, phoneNumber: string, password: string) {
        //Enter student's firstname
        await expect(this.firstNameInputField()).toBeVisible();
        await expect(this.firstNameInputField()).toBeEditable();
        await this.firstNameInputField().fill(firstName);
        //Enter student's lastname
        await expect(this.lastNameInputField()).toBeEditable();
        await this.lastNameInputField().fill(lastName);
        //Enter student's phone Number
        await expect(this.mobileNumberCountryButton()).toBeVisible();
        await this.mobileNumberCountryButton().click();
        await this.mobileNumberCountrySelectionDropdown(country).scrollIntoViewIfNeeded();
        await this.mobileNumberCountrySelectionDropdown(country).click();
        await this.mobileNumberInputField().click();
        await this.mobileNumberInputField().fill(phoneNumber);
        //Enter student's password
        await expect(this.passwordInputField()).toBeEditable();
        await this.passwordInputField().fill(password);
        //Enter student's age
        await expect(this.ageCheckbox()).toBeVisible();
        await this.ageCheckbox().click();
        //Submit the create account form
        await this.submitButton().click();
        await this.page.waitForLoadState("load");
    }

    /**
    * @description Enter the student's Additional details
    * @param address Student's Address
    * @param additionalAddress Student's Additional address
    * @param state Student's State
    * @param city Student's City
    * @param zipCode Student's ZipCode
    * @param country Student's Country
    */
    async enterStudentAdditionalDetails(address: string, additionalAddress: string, state: string, city: string, zipCode: string, country: string) {
        //Validate student's address
        await expect(this.addressInputField()).toBeVisible();
        await expect(this.addressInputField()).toBeEditable();
        await this.addressInputField().fill(address);
        //Enter student's additional address
        await expect(this.additionalAddressInputField()).toBeEditable();
        await this.additionalAddressInputField().fill(additionalAddress);
        //Enter student's state
        await this.stateInputField().click();
        await this.stateDropdownValue(state).click();
        //Enter student's city
        await expect(this.cityInputField()).toBeEditable();
        await this.cityInputField().fill(city);
        //Enter student's zip code
        await expect(this.zipCodeInputField()).toBeEditable();
        await this.zipCodeInputField().fill(zipCode);
        //Enter student's country
        await this.countryInputField().click();
        await this.countryDropdownValue(country).click();
        //Click on Next page button
        await this.nextPageButton().click();
        await this.page.waitForLoadState("load");
         if(await this.saveError().isVisible({ timeout: 5000 })) {
            await this.page.reload();
            await this.nextPageButton().click();
        }
    }
}