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
        return this.page.locator('//span[contains(@class, "mantine-Button-label")]//p[normalize-space(text())="Submit"]');
    }

    /**
      * @returns edit button
      */
    editButton() {
        return this.page.locator('//a[normalize-space(span//span[text()="Edit"])]');
    }
};
