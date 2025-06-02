import { expect, Page } from "@playwright/test";

export class AddActivitiesPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * @returns Add Entry Button
     */
    addEntryButton() {
        return this.page.locator('//span[contains(@class, "mantine-Button-label") and text()="Add Entry"]');
    }

    /**
    * @returns Extra curricular activity name input field
    */
    extracurricularActivityNameInputField() {
        return this.page.getByPlaceholder('Short Input');
    }

    /**
     * @returns email Input box locator input field
     */
    totalNumberOfYearsInvolvedInputField() {
        return this.page.locator('//input[@placeholder="123" and @inputmode = "numeric"]');
    }

    /**
     * @returns list of Roles locator Input field
     */
    listOfRolesInputfiled() {
        return this.page.locator('//label[contains(normalize-space(), "List any leadership roles")]/following::textarea[1]');
    }

    /**
     * @returns description of Involvement locator input field
     */
    descriptionOfInvolvementInputfield() {
        return this.page.locator('//label[contains(normalize-space(), "Description of Involvement")]/following::textarea[1]');
    }

    /**
    * @returns add button
    */
    addButton() {
        return this.page.locator('//span[contains(@class, "mantine-Button-label") and text()="Add"]');
    }

    /**
    * @returns Activity count error message when less than 2 activities are added
    */
    activityCountErrorMessage() {
        return this.page.getByText('Please add at least 2 entries');
    }
}