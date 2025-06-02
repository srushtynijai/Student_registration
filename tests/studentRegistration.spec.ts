import test from "@playwright/test";
import { Actions } from "../Fixtures/Actions/Actions";
import testdata from "../testdata/student_registration_testdata";
import { studentDetails, highSchoolDetails, essayDetails, extracurricularActiviyDetails } from "../testdata/constants";


test.describe("Validate the Kaleidoscope student registration process", {
}, () => {
  test(`Validate the Kaleidoscope student registration process`,
    {}, async ({ page }) => {
      const actions = new Actions(page);
      let applicationURL: string;
      await test.step("Navigate to the Kaleidoscope login page", async ({ }) => {
        console.log("Should launch the Kaleidoscope site and navigate to Login Page");
        await actions.launchKaleidoscopeURL(testdata.URL);
        await actions.navigateToLoginPage();
      });

      await test.step("Enter the Email Address and proceed forward", async ({ }) => {
        console.log("Should enter the Email Address and proceed forward with the application");
        await actions.enterStudentEmailandClickNext(testdata.studentEmail);
        await actions.signInForExistingUser(testdata.studentPassword);
      });

      await test.step("Create student account", async ({ }) => {
        console.log("Should enter student details on create account page");
        await actions.enterStudentDetailsOnCreateAccountPage(testdata.studentFirstName, testdata.studentLastName, testdata.studentCountry, testdata.studentPhoneNumber, testdata.studentPassword);
      });

      await test.step("Enter student's additional details", async ({ }) => {
        console.log("Should enter student's additional details");
        await actions.enterStudentAdditionalDetails(testdata.studentAddress, testdata.studentAdditionalAddress, testdata.studentState, testdata.studentCity, testdata.studentZipCode, testdata.studentCountry);
      });

      await test.step("Validate and add extra curricular activities", async ({ }) => {
        console.log("Should Add extra curricular activities");
        await actions.validateandAddExtracurricularActivities(testdata.extracurricularActivityName, testdata.extracurricularActivityRoles, testdata.extracurricularActivityDescription);
      });

      await test.step("Enter high school information and upload transcript file", async ({ }) => {
        console.log("Should Add extra curricular activities");
        await actions.enterHighSchoolDetails(testdata.highSchoolName, testdata.highSchoolAddress, testdata.highSchoolAdditionalAddress, testdata.highSchoolCity, testdata.highSchoolState, testdata.highSchoolZipCode, testdata.highSchoolGPA, testdata.yearOfHighSchoolGraduation);
        console.log("Should upload the transcript file");
        await actions.uploadTransciptFileandMoveToNextPage(testdata.transcriptFilePath, testdata.transcriptFileName);
      });

      await test.step("Validate presence of text box for each essay checkbox", async ({ }) => {
        console.log("Should validate presence of text box for each essay checkbox");
        await actions.verifyEssayInputBoxonCheckboxClick(testdata.essayTopics);
      });

      await test.step("Select 'Animals' and 'School' checkboxes and enter the essay", async ({ }) => {
        console.log("Should select 'Animals' and 'School' checkboxes and enter the essay");
        await actions.selectEssaycheckboxAndFillEssay(testdata.essayTopics, testdata.essayAnswers);
      });

      await test.step("Validate answers on the review page", async ({ }) => {
        await test.step("Validate answers on the review page for the 'Lets get to know you!' section", async ({ }) => {
          console.log("Validate the 'Lets get to know you!' section answers");
          await actions.validateAnswersOnReviewPage(testdata.sectionNames[0], studentDetails);
        });

        await test.step("Validate answers on the review page for the 'Extracurricular Activities' section", async ({ }) => {
          console.log("Validate the 'Extracurricular Activities' section answers");
          await actions.validateExtracurricularDetails(testdata.sectionNames[1], testdata.extracurricularActivityName, extracurricularActiviyDetails);
        });

        await test.step("Validate answers on the review page for the 'High School Information' section", async ({ }) => {
          console.log("Validate the 'High School Information' section answers");
          await actions.validateAnswersOnReviewPage(testdata.sectionNames[2], highSchoolDetails);
          await actions.validateUploadedFile(testdata.transcriptFileName);
        });

        await test.step("Validate answers on the review page for the 'Essay' section", async ({ }) => {
          console.log("Validate the 'Essay' section answers");
          await actions.validateAnswersOnReviewPage(testdata.sectionNames[3], essayDetails);
        });

        await test.step("Submit the application and get the URL of application", async ({ }) => {
          console.log("Submit the application and get the URL of application");
          applicationURL = await actions.submitApplication();
        });

        await test.step("Navigate to application URL and verify absence of Edit button on the application page after submit", async ({ }) => {
          console.log("Navigate to application URL and verify absence of Edit button on the application page after submit");
          await actions.navigateToApplicationUrlAndValidateAbsenceOfEditButton(applicationURL);
        });
      });
    });
});

