import { Page, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/login";
import { CreateAccountPage } from "../pageObjects/createAccountPage";
import { AddActivitiesPage } from "../pageObjects/addActivitiesPage";
import { HighSchoolInformationPage } from "../pageObjects/highSchoolInformation";
import { EssayPage } from "../pageObjects/essayPage";
import { ReviewPage } from "../pageObjects/reviewPage";

export class Actions {
    private loginPage: LoginPage;
    private createAccountPage: CreateAccountPage;
    private addActivitiesPage: AddActivitiesPage;
    private highSchoolInformationPage: HighSchoolInformationPage;
    private essayPage: EssayPage;
    private reviewPage: ReviewPage;
    page: any;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.createAccountPage = new CreateAccountPage(page);
        this.addActivitiesPage = new AddActivitiesPage(page);
        this.highSchoolInformationPage = new HighSchoolInformationPage(page);
        this.essayPage = new EssayPage(page);
        this.reviewPage = new ReviewPage(page)
    }

    /**
     * @description Launch the Kaleidoscope URL
     * @param url URL of Kaleidoscope page
     */
    async launchKaleidoscopeURL(url: string) {
        await this.page.goto(url);
    }

    /**
    * @description Navigate to the Kaleidoscope login Page
    */
    async navigateToLoginPage() {
        await (await this.loginPage.loginToApplyButton()).click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.loginPage.loginPageTitle()).toBeVisible();
    }

    /**
    * @description Enter the student email
    * @param studentEmail Student Email
    */
    async enterStudentEmailandClickNext(studentEmail: string) {
        await (await this.loginPage.emailInputBox()).click();
        await (await this.loginPage.emailInputBox()).fill(studentEmail);
        await this.loginPage.loginPageNextButton().click();
        await this.page.waitForLoadState("load");
    }

    /**
    * @description Sign In for existing user
    * @param Password Student Password
    */
    async signInForExistingUser(Password: string) {
        if (await this.loginPage.signInButton().isVisible()) {
            await this.loginPage.passwordButton().click();
            await this.loginPage.passwordButton().fill(Password);
            await this.loginPage.signInButton().click();
            await this.page.waitForLoadState("load");

        }
        else {
            console.log("User does not exist, proceeding with account creation");
        }
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
        await expect(this.createAccountPage.firstNameInputField()).toBeVisible();
        await expect(this.createAccountPage.firstNameInputField()).toBeEditable();
        await this.createAccountPage.firstNameInputField().fill(firstName);
        //Enter student's lastname
        await expect(this.createAccountPage.lastNameInputField()).toBeEditable();
        await this.createAccountPage.lastNameInputField().fill(lastName);
        //Enter student's phone Number
        await expect(this.createAccountPage.mobileNumberCountryButton()).toBeVisible();
        await this.createAccountPage.mobileNumberCountryButton().click();
        await this.createAccountPage.mobileNumberCountrySelectionDropdown(country).scrollIntoViewIfNeeded();
        await this.createAccountPage.mobileNumberCountrySelectionDropdown(country).click();
        await this.createAccountPage.mobileNumberInputField().click();
        await this.createAccountPage.mobileNumberInputField().fill(phoneNumber);
        //Enter student's password
        await expect(this.createAccountPage.passwordInputField()).toBeEditable();
        await this.createAccountPage.passwordInputField().fill(password);
        //Enter student's age
        await expect(this.createAccountPage.ageCheckbox()).toBeVisible();
        await this.createAccountPage.ageCheckbox().click();
        //Submit the create account form
        await this.createAccountPage.submitButton().click();
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
        await expect(this.createAccountPage.addressInputField()).toBeVisible();
        await expect(this.createAccountPage.addressInputField()).toBeEditable();
        await this.createAccountPage.addressInputField().fill(address);
        //Enter student's additional address
        await expect(this.createAccountPage.additionalAddressInputField()).toBeEditable();
        await this.createAccountPage.additionalAddressInputField().fill(additionalAddress);
        //Enter student's state
        await this.createAccountPage.stateInputField().click();
        await this.createAccountPage.stateDropdownValue(state).click();
        //Enter student's city
        await expect(this.createAccountPage.cityInputField()).toBeEditable();
        await this.createAccountPage.cityInputField().fill(city);
        //Enter student's zip code
        await expect(this.createAccountPage.zipCodeInputField()).toBeEditable();
        await this.createAccountPage.zipCodeInputField().fill(zipCode);
        //Enter student's country
        await this.createAccountPage.countryInputField().click();
        await this.createAccountPage.countryDropdownValue(country).click();
        //Click on Next page button
        await this.createAccountPage.nextPageButton().click();
        await this.page.waitForLoadState("load");
    }

    /**
   * @description Validate and add Extracurricular Activities
   * @param extracurricularActivityName Extra curricular activity Name
   * @param extracurricularActivityRoles Extra curricular activity list of Roles
   * @param extracurricularActivityDescription Extra curricular activity Role description
   */
    async validateandAddExtracurricularActivities(extracurricularActivityName: string, extracurricularActivityRoles: string, extracurricularActivityDescription: string) {
        for (let i = 0; i < 4; i++) {
            await expect(this.addActivitiesPage.addEntryButton()).toBeVisible();
            await this.addActivitiesPage.addEntryButton().click();
            await this.page.waitForLoadState("load");
            await this.addActivitiesPage.extracurricularActivityNameInputField().fill(`${extracurricularActivityName}_${i}`);
            await this.addActivitiesPage.totalNumberOfYearsInvolvedInputField().fill(i.toString());
            await this.addActivitiesPage.listOfRolesInputfiled().fill(extracurricularActivityRoles);
            await this.addActivitiesPage.descriptionOfInvolvementInputfield().fill(extracurricularActivityDescription);
            await this.addActivitiesPage.addButton().click();
            if (i == 0) {
                await this.createAccountPage.nextPageButton().click();
                await expect(this.addActivitiesPage.activityCountErrorMessage()).toBeVisible();
            }
        }
        await expect(this.createAccountPage.nextPageButton()).toBeVisible();
        await this.createAccountPage.nextPageButton().click();
        if ((await this.highSchoolInformationPage.highSchoolNameInputField().isVisible()) == false) {
            await this.createAccountPage.nextPageButton().click();
        }
        await this.page.waitForLoadState("load");
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
        await expect(this.highSchoolInformationPage.highSchoolNameInputField()).toBeVisible();
        await expect(this.highSchoolInformationPage.highSchoolNameInputField()).toBeEditable();
        await this.highSchoolInformationPage.highSchoolNameInputField().fill(highSchoolName);
        //Enter High School Address
        await expect(this.highSchoolInformationPage.highSchoolStreetAddressInputField()).toBeEditable();
        await this.highSchoolInformationPage.highSchoolStreetAddressInputField().fill(highSchoolAddress);
        //Enter High School Additional Address
        await this.highSchoolInformationPage.highSchoolAdditionalAddressInputField().click();
        await this.highSchoolInformationPage.highSchoolAdditionalAddressInputField().fill(highSchoolAdditionalAddress)
        //Enter High School City
        await this.highSchoolInformationPage.highSchoolCityInputField().click();
        await this.highSchoolInformationPage.highSchoolCityInputField().fill(highSchoolCity)
        //Enter High School State 
        await this.highSchoolInformationPage.highSchoolStateInputField().click();
        await this.highSchoolInformationPage.highSchoolstateDropdownValue(highSchoolState).click();
        //Enter High School Zip highSchoolState
        await this.highSchoolInformationPage.highSchoolZipCodeInputField().click();
        await this.highSchoolInformationPage.highSchoolZipCodeInputField().fill(highSchoolZipCode);
        //Enter High School GPA
        await this.highSchoolInformationPage.GPAInputField().click();
        await this.highSchoolInformationPage.GPAInputField().fill(highSchoolGPA.toString());
        //Enter Year of High School Graduation
        await expect(this.highSchoolInformationPage.yearOfHighSchoolGraduationInputField()).toBeEditable();
        await this.highSchoolInformationPage.yearOfHighSchoolGraduationInputField().fill(yearOfHighSchoolGraduation);
        await this.page.waitForLoadState("load");
    }

    /**
 * @description Upload transcript file
 * @param transciptFilePath File Path of Transcript file
 * @param transcriptFileName Transcript file name
 */
    async uploadTransciptFileandMoveToNextPage(transciptFilePath: string, transcriptFileName: string) {
        await expect(this.highSchoolInformationPage.transcriptUploadButton()).toBeVisible();
        const fileInput = this.highSchoolInformationPage.uploadFileInput();
        await fileInput.setInputFiles(transciptFilePath);
        await this.page.waitForTimeout(5000); //Wait for file to be uploaded
        await this.validateUploadedFile(transcriptFileName);
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

    /**
 * @description Verify if essay input box is displayed when Checkbox is checked
 * @param EssayTopic Essay topic
 */
    async verifyEssayInputBoxonCheckboxClick(EssayTopic: string[]) {
        for (let i = 0; i < 4; i++) {
            let essayTopic: string;
            await expect(this.essayPage.checkboxLocator(EssayTopic[i])).toBeVisible();
            await this.essayPage.checkboxLocator(EssayTopic[i]).check();
            if (i == 3) {
                essayTopic = "any"
            }
            else {
                essayTopic = EssayTopic[i];
            }
            await expect(this.essayPage.EssayInputField(essayTopic)).toBeVisible();
            await this.essayPage.checkboxLocator(EssayTopic[i]).uncheck();
        }
    }

    /**
 * @description Select Essay checkbox and Fill Essay textarea
 * @param EssayTopic Essay topic
 * @param EssayAnswers Essay Answers
 */
    async selectEssaycheckboxAndFillEssay(EssayTopic: string[], essayAnswers: string) {
        for (let i = 1; i < 3; i++) {
            await expect(this.essayPage.checkboxLocator(EssayTopic[i])).toBeVisible();
            await this.essayPage.checkboxLocator(EssayTopic[i]).check();
            await expect(this.essayPage.EssayInputField(EssayTopic[i])).toBeVisible();
            await this.essayPage.EssayInputField(EssayTopic[i]).click();
            await this.essayPage.EssayInputField(EssayTopic[i]).fill(essayAnswers);
        }
        await this.createAccountPage.nextPageButton().click();
        await this.page.waitForLoadState("load");
    }

    /**
* @description Validate answers on Review Page
* @param sectionName Section Name for Review
* @param QuestionsAndAnswersTobeValidated Questions and Answers to be validated
*/
    async validateAnswersOnReviewPage(sectionName: string, QuestionsAndAnswersTobeValidated: Record<string, string>) {
        await expect(this.reviewPage.sectionToggle(sectionName)).toBeVisible();
        await this.reviewPage.sectionToggle(sectionName).click();
        for (const [label, expectedValue] of Object.entries(QuestionsAndAnswersTobeValidated)) {
            const field = this.reviewPage.reviewAnswers(label);
            const actualValue = await field.textContent();
            expect(actualValue?.trim() || '').toBe(expectedValue);
        }
        await this.reviewPage.sectionToggle(sectionName).click();
    }

    /**
  * @description Validate Extracurricular activity details on Review Page
  * @param sectionName Section Name for Review
  * @param extracurricularActivityName Extra curricular activity name
  * @param extracurricularActivityDetails Details to be validated
  */
    async validateExtracurricularDetails(sectionName: string, extracurricularActivityName: string, extracurricularActivityDetails: Record<string, string>) {
        await expect(this.reviewPage.sectionToggle(sectionName)).toBeVisible();
        await this.reviewPage.sectionToggle(sectionName).click();
        for (let i = 0; i < 4; i++) {
            await expect(this.reviewPage.entry(`${extracurricularActivityName}_${i}`)).toBeVisible();
        }
        for (let i = 0; i < 4; i++) {
            await this.reviewPage.accordiontoggle(`${extracurricularActivityName}_${i}`).click();
            for (const [question, value] of Object.entries(extracurricularActivityDetails)) {
                await expect(this.reviewPage.reviewAnswersAsperRole(`${extracurricularActivityName}_${i}`, question, value)).toBeVisible();
            }
        }
        await this.reviewPage.sectionToggle(sectionName).click();
    }

    /**
   * @description Submit Application
   */
    async submitApplication() {
        await this.reviewPage.submitButton().click();
        await this.page.waitForLoadState('load');
        const url = await this.page.url();
        return url.toString();
    }


    /**
   * @description Submit Application, Navigate to new url and validate the absence of edit button
   * @param url URL of application
   */
    async navigateToApplicationUrlAndValidateAbsenceOfEditButton(url: string) {
        const context = this.page.context();
        const submittedPage = await context.newPage();
        await submittedPage.goto(url);
        const submittedReviewPage = new ReviewPage(submittedPage);
        await expect(submittedReviewPage.editButton()).toHaveCount(0);
    }
}
