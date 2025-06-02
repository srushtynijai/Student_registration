import { expect, Page } from "@playwright/test";

export class EssayPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
   * @returns Checkbox Field locator
   * @param EssayTopic: string
   */
    checkboxLocator(EssayTopic: string) {
        return this.page.locator(`//input[@type="checkbox" and @value="${EssayTopic}"]`);
    }

    /**
    * @returns Essay Input Field locator
    * @param EssayTopic: string
    */
    EssayInputField(EssayTopic: string) {
        return this.page.locator(`//label[contains(normalize-space(text()), "about ${EssayTopic}")]/following::textarea[1]`);
    }

}