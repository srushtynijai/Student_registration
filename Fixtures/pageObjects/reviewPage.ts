import { expect, Page } from "@playwright/test";

export class ReviewPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
    * @returns Review Answers Field
    * @param questionLabel Label of question
    */
    reviewAnswers(questionLabel: string) {
        return this.page.locator(`//p[normalize-space(text())="${questionLabel}"]/following-sibling::p`);
    }

    /**
    * @returns Role entry locator
    * @param activityName Activity Name
    */
    entry(activityName: string) {
        return this.page.locator(`//div[@data-testid="repeating-entry"]//button//span[contains(text(), '${activityName}')]`);
    }

    /**
    * @returns Section toggle
    * @param sectionName section name
    */
    sectionToggle(sectionName: string) {
        return this.page.locator(`//button[@data-testid="page-accordion" and contains(., '${sectionName}')]`);
    }

    /**
    * @returns Role accordiom
    * @param activityName Name of activity
    */
    accordiontoggle(activityName: string) {
        return this.page.locator(`//div[@data-testid="repeating-entry"][.//span[normalize-space(text())="${activityName}"]]//button`);
    }

    /**
    * @returns Reviews the answers as per role of extracurricular activities
    * @param activityName Name of activity
    * @param question Question of the activity
    * @param value Value of the activity
    */
    reviewAnswersAsperRole(activityName: string, question: string, value: string) {
        return this.page.locator(`//div[@data-testid="repeating-entry" and .//span[text()="${activityName}"]]//p[normalize-space(text())="${question}"]/following-sibling::p[.//span[contains(text(), "${value}")]]`);
    }

    /**
    * @returns submit button
    */
    submitButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    /**
    * @returns edit button
    */
    editButton() {
        return this.page.getByText('Edit');
    }

    /**
    * @description Validate answers on Review Page
    * @param sectionName Section Name for Review
    * @param QuestionsAndAnswersTobeValidated Questions and Answers to be validated
    */
    async validateAnswersOnReviewPage(sectionName: string, QuestionsAndAnswersTobeValidated: Record<string, string>) {
        await expect(this.sectionToggle(sectionName)).toBeVisible();
        await this.sectionToggle(sectionName).click();
        for (const [label, expectedValue] of Object.entries(QuestionsAndAnswersTobeValidated)) {
            const field = this.reviewAnswers(label);
            const actualValue = await field.textContent();
            expect(actualValue?.trim() || '').toBe(expectedValue);
        }
        await this.sectionToggle(sectionName).click();
    }

    /**
    * @description Validate Extracurricular activity details on Review Page
    * @param sectionName Section Name for Review
    * @param extracurricularActivityName Extra curricular activity name
    * @param extracurricularActivityDetails Details to be validated
    */
    async validateExtracurricularDetails(sectionName: string, extracurricularActivityName: string, extracurricularActivityDetails: Record<string, string>) {
        await expect(this.sectionToggle(sectionName)).toBeVisible();
        await this.sectionToggle(sectionName).click();
        for (let i = 0; i < 4; i++) {
            await expect(this.entry(`${extracurricularActivityName}_${i}`)).toBeVisible();
        }
        for (let i = 0; i < 4; i++) {
            await this.accordiontoggle(`${extracurricularActivityName}_${i}`).click();
            for (const [question, value] of Object.entries(extracurricularActivityDetails)) {
                await expect(this.reviewAnswersAsperRole(`${extracurricularActivityName}_${i}`, question, value)).toBeVisible();
            }
        }
        await this.sectionToggle(sectionName).click();
    }

    /**
    * @description Submit Application
    */
    async submitApplication() {
        await this.submitButton().click();
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
};
