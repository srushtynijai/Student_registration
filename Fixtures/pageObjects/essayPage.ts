import { expect, Page } from "@playwright/test";
import { Actions } from "../../Fixtures/Actions/Actions";

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
        return this.page.getByRole('checkbox', { name: EssayTopic });
    }

    /**
    * @returns Essay Input Field locator
    * @param EssayTopic: string
    */
    EssayInputField(EssayTopic: string) {
        return this.page.getByRole('textbox', { name: `Essay about ${EssayTopic}` })
    }

    /**
    * @description Verify if essay input box is displayed when Checkbox is checked
    * @param EssayTopic Essay topic
    */
    async verifyEssayInputBoxonCheckboxClick(EssayTopic: string[]) {
        for (let i = 0; i < 4; i++) {
            let essayTopic: string;
            await expect(this.checkboxLocator(EssayTopic[i])).toBeVisible();
            await this.checkboxLocator(EssayTopic[i]).check();
            if (i == 3) {
                essayTopic = "any"
            }
            else {
                essayTopic = EssayTopic[i];
            }
            await expect(this.EssayInputField(essayTopic)).toBeVisible();
            await this.checkboxLocator(EssayTopic[i]).uncheck();
        }
    }

    /**
    * @description Select Essay checkbox and Fill Essay textarea
    * @param EssayTopic Essay topic
    * @param EssayAnswers Essay Answers
    */
    async selectEssaycheckboxAndFillEssay(EssayTopic: string[], essayAnswers: string) {
        const actions = new Actions(this.page);
        for (let i = 1; i < 3; i++) {
            await expect(this.checkboxLocator(EssayTopic[i])).toBeVisible();
            await this.checkboxLocator(EssayTopic[i]).check();
            await expect(this.EssayInputField(EssayTopic[i])).toBeVisible();
            await this.EssayInputField(EssayTopic[i]).click();
            await this.EssayInputField(EssayTopic[i]).fill(essayAnswers);
        }
        await actions.goToNextPage();
    }
}