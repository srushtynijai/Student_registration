import testdata from "../testdata/student_registration_testdata"

export const studentDetails = {
    "First Name": testdata.studentFirstName,
    "Last Name": testdata.studentLastName,
    "Email Address": testdata.studentEmail.toLowerCase(),
    "Street Address": testdata.studentAddress,
    "Additional Street Address": testdata.studentAdditionalAddress,
    "State (Full)": testdata.studentState,
    "City": testdata.studentCity,
    "Zip Code": testdata.studentZipCode,
    "Country": testdata.studentCountry,
};

export const highSchoolDetails = {
    "High School Name": testdata.highSchoolName,
    "High School Street Address": testdata.highSchoolAddress,
    "Additional High School Street Address": testdata.highSchoolAdditionalAddress,
    "High School City": testdata.highSchoolCity,
    "High School State (Full)": testdata.highSchoolState,
    "High School Zip Code": testdata.highSchoolZipCode,
    "GPA": Math.round(testdata.highSchoolGPA).toString(),
    "Year of High School Graduation": testdata.yearOfHighSchoolGraduation,
};

export const extracurricularActiviyDetails = {
    "Extracurricular Activity Name": testdata.extracurricularActivityName,
    "List any leadership roles, offices, honors and recognitions related to this activity": testdata.extracurricularActivityRoles,
    "Description of Involvement" : testdata.extracurricularActivityDescription
};

export const essayDetails = {
    "Please select the essay types you want to write about:": `${testdata.essayTopics[1]}, ${testdata.essayTopics[2]}`,
    "Essay about Animals": testdata.essayAnswers,
    "Essay about School": testdata.essayAnswers,
};
