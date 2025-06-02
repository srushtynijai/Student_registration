
const testdata = {
  URL: "https://apply.mykaleidoscope.com/program/sdet-test-scholarship",
  studentEmail: generateStudentEmail().email,
  studentFirstName: "Student",
  studentLastName: generateStudentEmail().lastName,
  studentCountry: "Algeria",
  studentPhoneNumber: generateUniquePhone().toString(),
  studentPassword: "Kaleidoscope@123",
  studentAddress: "B/101 Test Address",
  studentAdditionalAddress: "Additional Test Address",
  studentState: "Alaska",
  studentZipCode: "485631",
  studentCity: "Test City",
  extracurricularActivityName: "Test Activity",
  extracurricularActivityRoles: "Role1, Role2, Role3",
  extracurricularActivityDescription: "Test Decription",
  highSchoolName: "Test School",
  highSchoolAddress: "Test School Address",
  highSchoolAdditionalAddress: "Test School Additional Address",
  highSchoolCity: "Test School City",
  highSchoolState: "Alabama",
  highSchoolZipCode: "584126",
  highSchoolGPA: 9.2,
  yearOfHighSchoolGraduation: "01/01/2025",
  transcriptFilePath: "Fixtures/testFiles/transcript.pdf",
  transcriptFileName: "transcript.pdf",
  essayTopics: ["Cars", "Animals", "School", "Other"],
  essayAnswers: "Test Essay Answer",
  sectionNames: ["Lets get to know you!", "Extracurricular Activities", "High School Information", "Essay"],
};

function generateUniquePhone() {
  const prefix = '9';
  const randomPart = Math.floor(100000000 + Math.random() * 900000000);
  return prefix + randomPart.toString().substring(1);
}

function generateStudentEmail() {
  const timestamp = `${new Date().getTime()}`;
  return {
    email: `Student_User_${timestamp}_@gmail.com`,
    lastName: `User_${timestamp}`
  }
}

export default testdata;
