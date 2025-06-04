import { expect, Page } from "@playwright/test";
import { Actions } from "../../Fixtures/Actions/Actions";

export class AddActivitiesPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
    * @returns Add Entry Button
    */
    private addEntryButton() {
        return this.page.getByRole('button', { name: 'Add Entry', exact: true });
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
        return this.page.getByPlaceholder('123');
    }

    /**
    * @returns list of Roles locator Input field
    */
    listOfRolesInputfiled() {
        return this.page.getByPlaceholder('Long Input').first();
    }

    /**
    * @returns description of Involvement locator input field
    */
    descriptionOfInvolvementInputfield() {
        return this.page.getByPlaceholder('Long Input').last();
    }

    /**
    * @returns add button
    */
    addButton() {
        return this.page.getByRole('button', { name: 'Add', exact: true });
    }

    /**
    * @returns Activity count error message when less than 2 activities are added
    */
    activityCountErrorMessage() {
        return this.page.getByText('Please add at least 2 entries');
    }

    
    /**
    * @returns School Name Input Field locator
    */
    schoolNameInputField() {
        return this.page.getByPlaceholder('Please enter the name of your current High School');
    }


    /**
    * @description Validate and add Extracurricular Activities
    * @param extracurricularActivityName Extra curricular activity Name
    * @param extracurricularActivityRoles Extra curricular activity list of Roles
    * @param extracurricularActivityDescription Extra curricular activity Role description
    */
    async validateandAddExtracurricularActivities(extracurricularActivityName: string, extracurricularActivityRoles: string, extracurricularActivityDescription: string) {
        const actions = new Actions(this.page);
        for (let i = 0; i < 4; i++) {
            await expect(this.addEntryButton()).toBeVisible();
            await this.addEntryButton().click();
            await this.page.waitForLoadState("load");
            await this.extracurricularActivityNameInputField().fill(`${extracurricularActivityName}_${i}`);
            await this.totalNumberOfYearsInvolvedInputField().fill(i.toString());
            await this.listOfRolesInputfiled().fill(extracurricularActivityRoles);
            await this.descriptionOfInvolvementInputfield().fill(extracurricularActivityDescription);
            await this.addButton().click();
            if (i == 0) {
                await actions.goToNextPage();
                await expect(this.activityCountErrorMessage()).toBeVisible();
            }
        }
        await actions.goToNextPage();
        if ((await this.schoolNameInputField().isVisible()) == false) {
            await actions.goToNextPage();
        }
    }

}