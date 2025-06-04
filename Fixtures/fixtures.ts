import { test as base } from '@playwright/test';
import { LoginPage } from '../Fixtures/pageObjects/login';
import { CreateAccountPage } from '../Fixtures/pageObjects/createAccountPage';
import { AddActivitiesPage } from '../Fixtures/pageObjects/addActivitiesPage';
import { HighSchoolInformationPage } from '../Fixtures/pageObjects/highSchoolInformation';
import { EssayPage } from '../Fixtures/pageObjects/essayPage';
import { ReviewPage } from '../Fixtures/pageObjects/reviewPage';

type MyFixtures = {
    loginPage: LoginPage;
    createAccountPage: CreateAccountPage;
    addActivitiesPage: AddActivitiesPage;
    essayPage: EssayPage;
    highSchoolInformationPage: HighSchoolInformationPage;
    reviewPage: ReviewPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    createAccountPage: async ({ page }, use) => {
        await use(new CreateAccountPage(page));
    },

    addActivitiesPage: async ({ page }, use) => {
        await use(new AddActivitiesPage(page));
    },

    essayPage: async ({ page }, use) => {
        await use(new EssayPage(page));
    },

    highSchoolInformationPage: async ({ page }, use) => {
        await use(new HighSchoolInformationPage(page));
    },

    reviewPage: async ({ page }, use) => {
        await use(new ReviewPage(page));
    },
});

export { expect } from '@playwright/test';