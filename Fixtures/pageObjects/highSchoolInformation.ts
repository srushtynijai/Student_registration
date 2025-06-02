import { expect, Page } from "@playwright/test";

export class HighSchoolInformationPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
   * @returns High School Name Input Field locator
   */
    highSchoolNameInputField() {
        return this.page.getByPlaceholder('Please enter the name of your current High School');
    }

    /**
    * @returns High School Street Address Input Field locator
    */
    highSchoolStreetAddressInputField() {
        return this.page.getByPlaceholder('Enter high school street address');
    }

    /**
    * @returns High School Additional Address Input Field locator
    */
    highSchoolAdditionalAddressInputField() {
        return this.page.getByPlaceholder('Enter additional high school address (e.g. PO Box)');
    }

    /**
     * @returns High School City Input Field Locator
     */
    highSchoolCityInputField() {
        return this.page.getByPlaceholder('Enter high school city');
    }

    /**
    * @returns High School State Input Field Locator
    */
    highSchoolStateInputField() {
        return this.page.getByPlaceholder(`Enter high school state`);
    }

     /**
     * @returns State dropdown value
     * @param state High School state
     */
    highSchoolstateDropdownValue(state: string) {
        return this.page.getByRole('option', { name: `${state}` })
    }

    /**
     * @returns High School Zip code Input Field Locator
     */
    highSchoolZipCodeInputField() {
        return this.page.getByPlaceholder('e.g. 55413');
    }

    /**
     * @returns GPA Input field locator
     */
    GPAInputField() {
        return this.page.getByPlaceholder('Enter your current GPA');
    }

    /**
     * @returns Year of High School Input Field Locator
     */
    yearOfHighSchoolGraduationInputField() {
        return this.page.getByPlaceholder('Enter a date');
    }

    /**
     * @returns Transcript Upload Button locator
     */
    transcriptUploadButton() {
        return this.page.locator('//span[contains(@class, "mantine-Button-label") and text()="Upload File"]');
    }

    /**
   * @returns Transcript File Upload Input locator
   */
    uploadFileInput() {
        return this.page.locator('//input[@type="file"]');
    }

    /**
     * @returns Transcript File Delete Button locator
     * @param fileName Name of the file
     */
    transcriptFileName(fileName: string) {
        return this.page.locator(`(//span[contains(@class, "mantine-Button-label") and text()="${fileName}"])[1]`);
    }
}




