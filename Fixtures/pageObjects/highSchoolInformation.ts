import { expect, Page } from "@playwright/test";
import { Actions } from "../../Fixtures/Actions/Actions";

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
        return this.page.getByText(`${fileName}`).first()
    }

    /**
    * @description Enter High School Details
    * @param highSchoolName High School Name
    * @param highSchoolAddress High School Address
    * @param highSchoolAdditionalAddress High School Additional Address
    * @param highSchoolCity High School City
    * @param highSchoolState High School State 
    * @param highSchoolZipCode High School Zip Code
    * @param highSchoolGPA High School GPA
    * @param yearOfHighSchoolGraduation Year of High School Graduation
    */
    async enterHighSchoolDetails(highSchoolName: string, highSchoolAddress: string, highSchoolAdditionalAddress: string, highSchoolCity: string, highSchoolState: string, highSchoolZipCode: string, highSchoolGPA: number, yearOfHighSchoolGraduation: string) {
        //Enter High School Name
        await expect(this.highSchoolNameInputField()).toBeVisible();
        await expect(this.highSchoolNameInputField()).toBeEditable();
        await this.highSchoolNameInputField().fill(highSchoolName);
        //Enter High School Address
        await expect(this.highSchoolStreetAddressInputField()).toBeEditable();
        await this.highSchoolStreetAddressInputField().fill(highSchoolAddress);
        //Enter High School Additional Address
        await this.highSchoolAdditionalAddressInputField().click();
        await this.highSchoolAdditionalAddressInputField().fill(highSchoolAdditionalAddress)
        //Enter High School City
        await this.highSchoolCityInputField().click();
        await this.highSchoolCityInputField().fill(highSchoolCity)
        //Enter High School State 
        await this.highSchoolStateInputField().click();
        await this.highSchoolstateDropdownValue(highSchoolState).click();
        //Enter High School Zip highSchoolState
        await this.highSchoolZipCodeInputField().click();
        await this.highSchoolZipCodeInputField().fill(highSchoolZipCode);
        //Enter High School GPA
        await this.GPAInputField().click();
        await this.GPAInputField().fill(highSchoolGPA.toString());
        //Enter Year of High School Graduation
        await expect(this.yearOfHighSchoolGraduationInputField()).toBeEditable();
        await this.yearOfHighSchoolGraduationInputField().fill(yearOfHighSchoolGraduation);
        await this.page.waitForLoadState("load");
    }

    /**
    * @description Upload transcript file
    * @param transciptFilePath File Path of Transcript file
    * @param transcriptFileName Transcript file name
    */
    async uploadTransciptFileandMoveToNextPage(transciptFilePath: string, transcriptFileName: string) {
        const actions = new Actions(this.page);
        await expect(this.transcriptUploadButton()).toBeVisible();
        const fileInput = this.uploadFileInput();
        await fileInput.setInputFiles(transciptFilePath);
        await this.page.waitForTimeout(5000); //Wait for file to be uploaded
        await actions.validateUploadedFile(transcriptFileName);
        await actions.goToNextPage();
    }
}




