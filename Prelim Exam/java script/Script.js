<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Record System</title>
<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; display: block; max-height: 400px; overflow-y: auto; }
    th, td { border: 1px solid #333; padding: 8px; text-align: center; }
    th { background-color: #ddd; position: sticky; top: 0; }
    input[type="number"] { width: 60px; }
    .btn { padding: 5px 10px; cursor: pointer; margin: 2px; }
    .btn-delete { background-color: red; color: white; border: none; }
    .btn-add { background-color: green; color: white; border: none; }
    .pass { background-color: #c8facc; } /* light green */
    .fail { background-color: #f8c8c8; } /* light red */
</style>
</head>
<body>

<h1>Student Record System</h1>

<form id="studentForm">
    <input type="text" id="studentId" placeholder="Student ID" required>
    <input type="text" id="firstName" placeholder="First Name" required>
    <input type="text" id="lastName" placeholder="Last Name" required>
    <button type="submit" class="btn btn-add">Add Student</button>
</form>

<table>
    <thead>
        <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Lab 1</th>
            <th>Lab 2</th>
            <th>Lab 3</th>
            <th>Prelim</th>
            <th>Attendance</th>
            <th>Final Grade</th>
            <th>Pass/Fail</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="tableBody"></tbody>
</table>

<script>
// Programmer Identifier: [YOUR FULL NAME] [YOUR STUDENT ID]

// Hardcoded CSV data
const csvData = `StudentID,first_name,last_name,LAB WORK 1,LAB WORK 2,LAB WORK 3,PRELIM EXAM,ATTENDANCE GRADE
073900438,Osbourne,Wakenshaw,69,5,52,12,78
114924014,Albie,Gierardi,58,92,16,57,97
111901632,Eleen,Pentony,43,81,34,36,16
084000084,Arie,Okenden,31,5,14,39,99
272471551,Alica,Muckley,49,66,97,3,95
104900721,Jo,Burleton,98,94,33,13,29
111924392,Cam,Akram,44,84,17,16,24
292970744,Celine,Brosoli,3,15,71,83,45
107004352,Alan,Belfit,31,51,36,70,48
071108313,Jeanette,Gilvear,4,78,15,69,69
042204932,Ethelin,MacCathay,48,36,23,1,11
111914218,Kakalina,Finnick,69,5,65,10,8
074906059,Mayer,Lorenzetti,36,30,100,41,92
091000080,Selia,Rosenstengel,15,42,85,68,28
055002480,Dalia,Tadd,84,86,13,91,22
063101111,Darryl,Doogood,36,3,78,13,100
071908827,Brier,Wace,69,92,23,75,40
322285668,Bucky,Udall,97,63,19,46,28
103006406,Haslett,Beaford,41,32,85,60,61
104913048,Shelley,Spring,84,73,63,59,3`;

// Parse CSV string into array of objects
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const students = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        students.push({
            studentId: values[0],
            firstName: values[1],
            lastName: values[2],
            lab1: Number(values[3]),
            lab2: Number(values[4]),
            lab3: Number(values[5]),
            prelim: Number(values[6]),
            attendance: Number(values[7])
        });
    }
    return students;
}

// Initial data
let students = parseCSV(csvData);

// DOM Elements
const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');
const studentIdInput = document.getElementById('studentId');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

// Calculate final grade (Labs 40%, Prelim 40%, Attendance 20%)
function calculateFinalGrade(student) {
    const labAvg = (student.lab1 + student.lab2 + student.lab3) / 3;
    return Math.round(labAvg * 0.4 + student.prelim * 0.4 + student.attendance * 0.2);
}

// RENDER table
function render() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const finalGrade = calculateFinalGrade(student);
        const passFail = finalGrade >= 75 ? 'PASS' : 'FAIL';
        const row = `
            <tr class="${passFail.toLowerCase()}">
                <td>${student.studentId}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td><input type="number" id="lab1-${index}" value="${student.lab1}" min="0" max="100"></td>
                <td><input type="number" id="lab2-${index}" value="${student.lab2}" min="0" max="100"></td>
                <td><input type="number" id="lab3-${index}" value="${student.lab3}" min="0" max="100"></td>
                <td><input type="number" id="prelim-${index}" value="${student.prelim}" min="0" max="100"></td>
                <td><input type="number" id="attendance-${index}" value="${student.attendance}" min="0" max="100"></td>
                <td>${finalGrade}</td>
                <td>${passFail}</td>
                <td>
                    <button class="btn btn-delete" onclick="deleteStudent(${index})">Delete</button>
                    <button class="btn btn-add" onclick="saveScores(${index})">Save Scores</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// ADD student
function addStudent(event) {
    event.preventDefault();
    const studentId = studentIdInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    if (!studentId || !firstName || !lastName) {
        alert('Please fill all fields!');
        return;
    }
    students.push({
        studentId,
        firstName,
        lastName,
        lab1: 0,
        lab2: 0,
        lab3: 0,
        prelim: 0,
        attendance: 0
    });
    render();
    studentForm.reset();
}

// DELETE student
function deleteStudent(index) {
    if (confirm(`Delete ${students[index].firstName} ${students[index].lastName}?`)) {
        students.splice(index, 1);
        render();
    }
}

// SAVE SCORES
function saveScores(index) {
    students[index].lab1 = Number(document.getElementById(`lab1-${index}`).value);
    students[index].lab2 = Number(document.getElementById(`lab2-${index}`).value);
    students[index].lab3 = Number(document.getElementById(`lab3-${index}`).value);
    students[index].prelim = Number(document.getElementById(`prelim-${index}`).value);
    students[index].attendance = Number(document.getElementById(`attendance-${index}`).value);
    render();
}

// Event Listeners
studentForm.addEventListener('submit', addStudent);
document.addEventListener('DOMContentLoaded', render);
</script>

</body>
</html>
