import { Page, expect } from "@playwright/test";
import { CreateAccountPage } from "../pageObjects/createAccountPage";
import { HighSchoolInformationPage } from "../pageObjects/highSchoolInformation";

export class Actions {
    private createAccountPage: CreateAccountPage;
    private highSchoolInformationPage: HighSchoolInformationPage;
    private page: any;

    constructor(page: Page) {
        this.page = page;
        this.createAccountPage = new CreateAccountPage(page);
        this.highSchoolInformationPage = new HighSchoolInformationPage(page);
    }

    /**
    * @description Launch the Kaleidoscope URL
    * @param url URL of Kaleidoscope page
    */
    async launchKaleidoscopeURL(url: string) {
        await this.page.goto(url);
    }

    /**
    * @description Go to next page
    */
    async goToNextPage() {
        await this.createAccountPage.nextPageButton().click();
        await this.page.waitForLoadState("load");
    }


    /**
    * @description Validate the uploaded file
    * @param fileName Name of Transcript file
    */
    async validateUploadedFile(fileName: string) {
        await expect(this.highSchoolInformationPage.transcriptFileName(fileName)).toHaveCount(1);
    }

}
