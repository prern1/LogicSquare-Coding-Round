const students = [
  { name: "Dhishan Debnath", Roll: 1 },
  { name: "Animesh Gupta", Roll: 2 },
  { name: "Tapas Sen", Roll: 3 },
  { name: "Misti Dutta", Roll: 4 },
  { name: "Chini Misra", Roll: 5 },
];

const Details = [
  { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
  { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
  { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
  { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
  { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } },
];

/* Output:
const studentsMarkSheets = [
 { name: "Dhishan Debnath", Roll: 1, math: 55, english: 75, chemistry: 76, computer: 94, total: 
300, status: "pass" },
 { name: "Animesh Gupta", Roll: 2, math: 55, english: 56, computer: 48, chemistry: 12, total: 171, 
status: "fail" },
 { name: "Tapas Sen", Roll: 3, math: 33, chemistry: 12, computer: 50, english: 35, total: 130, status:
"fail" },
 { name: "Misti Dutta", Roll: 4, english: 12, chemistry: 85, computer: 68, math: 45, total: 207, 
status: "pass" },
 { name: "Chini Misra", Roll: 5, math: 35, english: 56, chemistry: 76, computer: 68, total: 235, 
status: "pass" }
]; */

const generateStudentMarkSheets = (students, details) => {
  const detailsOfStudent = [];
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    details.map((detail) => {
      if (detail.Roll === student.Roll) {
        let total = 0;
        for (let v of Object.entries(detail.subjects)) {
          total += v[1];
          //   console.log(v[1]);
        }
        // console.log(total);
        const status = total >= 200 ? "pass" : "fail";
        const perStudent = {
          ...student,
          ...detail.subjects,
          total,
          status,
        };
        // console.log(perStudent);
        detailsOfStudent.push(perStudent);
      }
    });
  }
  return detailsOfStudent;
};

const result = generateStudentMarkSheets(students, Details);
console.log(result);
