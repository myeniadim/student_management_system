class Course {
    constructor(courseCode, courseID, courseName, pointScale){
        this.courseCode = courseCode;
        this.courseID = courseID;
        this.courseName = courseName;
        this.pointScale = pointScale;
    }

    getCourseName(){
        return this.courseName;
    }

    addGrade(grade){
        this.grades.push(grade);
    }

    toTableRow(){
        return `
            <tr>
                <td>${this.courseCode}</td>
                <td>${this.courseID}</td>
                <td>${this.courseName}</td>
                <td>${this.pointScale}</td>
                <td>
                    <div class="actions">
                        <button class="view-course-detail-button" id="view-${this.courseID}" >View Detail</button>
                        <button class="edit-course-button" id="edit-${this.courseID}">Edit</button>
                        <button class="delete-course-button" id="delete-${this.courseID}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }
}

class Student {
    constructor(studentID, studentName, studentSurname){
        this.studentID = studentID;
        this.studentName = studentName;
        this.studentSurname = studentSurname;
    }

    getfullName(){
        return this.studentName + " " + this.studentSurname
    }

    getStudentID(){
        return this.studentID;
    }

    toTableRow(){
        return `
            <tr>
                <td>${this.studentID}</td>
                <td>${this.studentName}</td>
                <td>${this.studentSurname}</td>
                <td>
                    <div class="actions">
                        <button class="view-student-detail-button" id="view-${this.studentID}">View Detail</button>
                        <button class="edit-student-button" id="edit-${this.studentID}">Edit</button>
                        <button class="delete-student-button" id="delete-${this.studentID}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }
}

class Grades {
    constructor(student, course, midterm, final){
        this.student = student;
        this.course = course;
        this.midterm = midterm;
        this.final = final;
        this.passed = this.isPassed();
    }


    calculateAverage(){
        return (this.midterm * 0.4) + (this.final * 0.6);
    }

    findLetterGrade(){
        let average = this.calculateAverage();
        if(average >= (100 - this.course.pointScale)){
            return "A";
        } else if(average >= (100 - this.course.pointScale * 2)){
            return "B";
        } else if(average >= (100 - this.course.pointScale * 3)){
            return "C";
        } else if(average >= (100 - this.course.pointScale * 4)){
            return "D";
        } else{
            return "F";
        }
    }

    isPassed(){
        return this.findLetterGrade() !== "F";
    }

    calculateGPA(){
        let average = this.calculateAverage();
        if(average >= (100 - this.course.pointScale)){
            return 4.0;
        } else if(average >= (100 - this.course.pointScale * 2)){
            return 3.0;
        } else if(average >= (100 - this.course.pointScale * 3)){
            return 2.0;
        } else if(average >= (100 - this.course.pointScale * 4)){
            return 1.0;
        } else{
            return 0.0;
        }
    }

    toTableRow(){
        return `
            <tr>
                <td>${this.course.getCourseName()}</td>
                <td>${this.student.getfullName()}</td>
                <td>${this.midterm}</td>
                <td>${this.final}</td>
                <td>${this.calculateAverage()}</td>
                <td>${this.findLetterGrade()}</td>
                <td>
                    <div class="actions">
                        <button class="edit-grade-button" id="edit-${this.course.courseID}-${this.student.studentID}">Edit</button>
                        <button class="delete-grade-button" id="delete-${this.course.courseID}-${this.student.studentID}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }

    toTableRowCourse(){
        return `
            <tr>
                <td>${this.course.courseName}</td>
                <td>${this.student.getfullName()}</td>
                <td>${this.midterm}</td>
                <td>${this.final}</td>
                <td>${this.calculateAverage()}</td>
                <td>${this.findLetterGrade()}</td>
            </tr>
        `;
    }

    toTableRowStudent(){
        return `
            <tr>
                <td>${this.course.courseName}</td>
                <td>${this.student.getfullName()}</td>
                <td>${this.midterm}</td>
                <td>${this.final}</td>
                <td>${this.calculateAverage()}</td>
                <td>${this.findLetterGrade()}</td>
            </tr>
        `;
    }

}

// Header buttons
const coursesLink = document.querySelector("#courses-link");
const studentsLink = document.querySelector("#students-link");
const gradesLink = document.querySelector("#grades-link");

// Dialogs
const addCourseDialog = document.querySelector("#add-course-dialog");
const viewCourseDetailDialog = document.querySelector("#view-course-detail");
const addStudentDialog = document.querySelector("#add-student-dialog");
const viewStudentDetailDialog = document.querySelector("#view-student-detail");
const addGradeDialog = document.querySelector("#add-grade-dialog");


// Forms
const addCourseForm = document.querySelector("#add-course-form");
const addStudentForm = document.querySelector("#add-student-form");
const addGradeForm = document.querySelector("#add-grade-form");

// Buttons
const addCourseButton = document.querySelector("#add-course-button");
const addCourseSubmitButton = document.querySelector("#add-course-submit");
const addCourseCancelButton = document.querySelector("#add-course-cancel");
const addStudentButton = document.querySelector("#add-student-button");
const addStudentSubmitButton = document.querySelector("#add-student-submit");
const addStudentCancelButton = document.querySelector("#add-student-cancel");
const addGradeButton = document.querySelector("#add-grade-button");
const addGradeSubmitButton = document.querySelector("#add-grade-submit");
const addGradeCancelButton = document.querySelector("#add-grade-cancel");
const closeCourseDetailButton = document.querySelector("#view-course-detail #close-button");
const closeStudentDetailButton = document.querySelector("#view-student-detail #close-button");

// Tables
const coursesTable = document.querySelector("#courses-table");
const studentsTable = document.querySelector("#students-table-2");
const gradesTable = document.querySelector("#grades-table");

// Data
const students = [
    new Student(210709073, "Mert", "Yeniadım"),
    new Student(210709054, "Mustafa", "Kaya"),
    new Student(210709044, "Deniz", "Korkmaz"),
    new Student(210709032, "Fatih", "Demir"),
    new Student(210709016, "Ayça", "Ölmez"),
    new Student(210709082, "Ece", "Kara"),
    new Student(210709011, "Aslı", "Sarı"),
    new Student(210709002, "Selim", "Yuhay"),
    new Student(210709092, "Kerim", "Yaşar"),
    new Student(210709012, "Enes", "Alan")
];

const courses = [
    new Course("CENG", 1007, "Introduction to Computer Science", 10),
    new Course("CENG", 2001, "Data Structures and Algorithms", 7),
    new Course("CENG", 2004, "Design and Analysis Algorithms", 7),
    new Course("CENG", 2002, "Operating Systems", 10),
    new Course("CENG", 3007, "Computer Networks", 7),
    new Course("CENG", 3010, "Software Engineering", 7),
    new Course("CENG", 3005, "Database Management Systems", 7),
    new Course("CENG", 3507, "Web Development and Programming", 10),
];

const grades = [
    new Grades(students[0], courses[0], 80, 89),
    new Grades(students[0], courses[2], 80, 90),
    new Grades(students[0], courses[4], 80, 89),
    new Grades(students[1], courses[0], 70, 80),
    new Grades(students[2], courses[0], 60, 70),
    new Grades(students[3], courses[0], 50, 60),
    new Grades(students[4], courses[0], 40, 50),
    new Grades(students[5], courses[0], 30, 40),
    new Grades(students[6], courses[0], 20, 30),
    new Grades(students[7], courses[0], 10, 20),
    new Grades(students[8], courses[0], 0, 10),
    new Grades(students[9], courses[0], 100, 100),
    new Grades(students[1], courses[1], 80, 89),
    new Grades(students[2], courses[1], 80, 90),
    new Grades(students[3], courses[3], 80, 89),
    new Grades(students[4], courses[3], 70, 80),
    new Grades(students[5], courses[3], 60, 70),
    new Grades(students[6], courses[5], 50, 60),
    new Grades(students[7], courses[6], 40, 50),
    new Grades(students[8], courses[6], 30, 40),
    new Grades(students[9], courses[7], 20, 30),
];

// Functions
function populateTable(objects, tableID, view) {
    const table = document.querySelector(`#${tableID}`);
    objects.forEach(object => {
        let row;
        if(view === "course"){
            row = object.toTableRowCourse();
        } else if(view === "student"){
            row = object.toTableRowStudent();
        } else{
            row = object.toTableRow();
        }
        table.innerHTML += row;
    });
    addCourseEventListeners();
    addStudentEventListeners();
    addGradeEventListeners();
    viewCourseDetailListeners();
    viewStudentDetailListeners();
    deleteCourseListeners();
    deleteStudentListeners();
    deleteGradeListeners();
}

function clearTable(tableID){
    const table = document.querySelector(`#${tableID}`);
    const header = table.querySelector('tr').outerHTML; 
    table.innerHTML = header;
}


function calculateStudentGPA(student){
    let totalGPA = 0;
    let totalCredits = 0;
    grades.forEach(grade => {
        if(grade.student === student){
            totalGPA += grade.calculateGPA();
            totalCredits++;
        }
    });

    return totalGPA / totalCredits;
}

function calculateCourseAverage(course){
    let totalAverage = 0;
    let totalCredits = 0;
    grades.forEach(grade => {
        if(grade.course === course){
            totalAverage += grade.calculateAverage();
            totalCredits++;
        }
    });

    return totalAverage / totalCredits;
}

function handleCoursesClick() {
    var courseSection = document.querySelector(".course-section");
    var studentSection = document.querySelector(".student-section");
    var gradeSection = document.querySelector(".grade-section");

    courseSection.style.display = "block";
    studentSection.style.display = "none";
    gradeSection.style.display = "none";

    var coursesTableId = "courses-table";
    clearTable(coursesTableId);
    populateTable(courses, coursesTableId, "");
}

coursesLink.addEventListener("click", handleCoursesClick);

function handleStudentsClick() {
    var courseSection = document.querySelector(".course-section");
    var studentSection = document.querySelector(".student-section");
    var gradeSection = document.querySelector(".grade-section");

    courseSection.style.display = "none";
    studentSection.style.display = "block";
    gradeSection.style.display = "none";

    var studentsTableId = "students-table-2";
    clearTable(studentsTableId);
    populateTable(students, studentsTableId, "");
}

studentsLink.addEventListener("click", handleStudentsClick);

function handleGradesClick() {
    var courseSection = document.querySelector(".course-section");
    var studentSection = document.querySelector(".student-section");
    var gradeSection = document.querySelector(".grade-section");

    courseSection.style.display = "none";
    studentSection.style.display = "none";
    gradeSection.style.display = "block";

    var gradesTableId = "grades-table";
    clearTable(gradesTableId);
    populateTable(grades, gradesTableId, "");
}

gradesLink.addEventListener("click", handleGradesClick);


function showAddCourseDialog() {
    addCourseDialog.showModal();
}

function closeAddCourseDialog(event) {
    event.preventDefault();
    addCourseDialog.close();
}

addCourseButton.addEventListener("click", showAddCourseDialog);
addCourseCancelButton.addEventListener("click", closeAddCourseDialog);

function handleAddCourseSubmit(event) {
    event.preventDefault();
    
    const courseCode = addCourseForm.querySelector("#course-code").value;
    const courseID = addCourseForm.querySelector("#course-id").value;
    const courseName = addCourseForm.querySelector("#course-name").value;
    const pointScale = addCourseForm.querySelector("#point-scale option:checked").text;

    console.log(pointScale);

    const idExists = courses.some(course => course.courseID == courseID);

    if (idExists) {
        alert("Course ID already exists.");
    } else {
        const newCourse = new Course(courseCode, courseID, courseName, parseInt(pointScale));
        courses.push(newCourse);
        coursesTable.innerHTML += newCourse.toTableRow();
        addCourseDialog.close();
    }
}

addCourseSubmitButton.addEventListener("click", handleAddCourseSubmit);


function showAddStudentDialog() {
    addStudentDialog.showModal();
}

function closeAddStudentDialog(event) {
    event.preventDefault();
    addStudentDialog.close();
}

addStudentButton.addEventListener("click", showAddStudentDialog);
addStudentCancelButton.addEventListener("click", closeAddStudentDialog);


function handleAddStudentSubmit(event) {
    event.preventDefault();
    
    const studentID = addStudentForm.querySelector("#student-id").value;
    const studentName = addStudentForm.querySelector("#first-name").value;
    const studentSurname = addStudentForm.querySelector("#last-name").value;

    const idExists = students.some(student => student.studentID == studentID);

    if (idExists) {
        alert("Student ID already exists.");
    } else {
        const newStudent = new Student(studentID, studentName, studentSurname);
        students.push(newStudent);
        studentsTable.innerHTML += newStudent.toTableRow();
        addStudentDialog.close();
    }
}

addStudentSubmitButton.addEventListener("click", handleAddStudentSubmit);


function handleAddGradeButtonClick(event) {
    event.preventDefault();

    const courseOption = addGradeForm.querySelector("form #course");
    courseOption.innerHTML = "";
    courses.forEach(course => {
        courseOption.innerHTML += `<option value="${course.courseID}">${course.courseName}</option>`;
    });

    const studentOption = addGradeForm.querySelector("form #student");
    studentOption.innerHTML = "";
    students.forEach(student => {
        studentOption.innerHTML += `<option value="${student.studentID}">${student.studentName} ${student.studentSurname}</option>`;
    });

    addGradeDialog.showModal();
}

addGradeButton.addEventListener("click", handleAddGradeButtonClick);


function handleAddGradeCancelClick(event) {
    event.preventDefault();
    addGradeDialog.close();
}

addGradeCancelButton.addEventListener("click", handleAddGradeCancelClick);

function handleAddGradeSubmit(event) {
    event.preventDefault();

    const selectCourse = addGradeForm.querySelector("#course");
    const selectStudent = addGradeForm.querySelector("#student");

    const courseName = selectCourse.options[selectCourse.selectedIndex].text;
    const studentName = selectStudent.options[selectStudent.selectedIndex].text;

    const midterm = addGradeForm.querySelector("#midterm").value;
    const final = addGradeForm.querySelector("#final").value;

    const course = courses.find(course => course.getCourseName() === courseName);
    const student = students.find(student => student.getfullName() === studentName);

    if (grades.some(grade => grade.student === student && grade.course === course)) {
        alert("Grade already exists.");
    } else {
        const newGrade = new Grades(student, course, midterm, final);
        grades.push(newGrade);
        gradesTable.innerHTML += newGrade.toTableRow();
        addGradeDialog.close();
    }
}

addGradeSubmitButton.addEventListener("click", handleAddGradeSubmit);


document.querySelector("#edit-course-cancel").addEventListener("click", cancelCourseEdit);
document.querySelector("#edit-student-cancel").addEventListener("click", cancelStudentEdit);
document.querySelector("#edit-grade-cancel").addEventListener("click", cancelGradeEdit);

function handleEditCourseSubmit(event) {
    event.preventDefault();

    const courseID = document.querySelector("#edit-course-id").value;
    const course = courses.find(c => c.courseID === parseInt(courseID));

    course.courseCode = document.querySelector("#edit-course-code").value;
    course.courseName = document.querySelector("#edit-course-name").value;
    course.pointScale = parseInt(document.querySelector("#edit-point-scale option:checked").text);

    clearTable("courses-table");
    populateTable(courses, "courses-table", "");

    addCourseEventListeners();

    document.querySelector("#edit-course-dialog").close();
}

document.querySelector("#edit-course-submit").addEventListener("click", handleEditCourseSubmit);


function handleEditStudentSubmit(event) {
    event.preventDefault();

    const studentID = document.querySelector("#edit-student-id").value;
    const student = students.find(s => s.studentID === parseInt(studentID));

    student.studentName = document.querySelector("#edit-first-name").value;
    student.studentSurname = document.querySelector("#edit-last-name").value;

    clearTable("students-table-2");
    populateTable(students, "students-table-2", "");

    addStudentEventListeners();

    document.querySelector("#edit-student-dialog").close();
}

document.querySelector("#edit-student-submit").addEventListener("click", handleEditStudentSubmit);


function handleEditGradeSubmit(event) {
    event.preventDefault();

    const courseName = document.querySelector("#edit-course option:checked").text;
    const studentName = document.querySelector("#edit-student option:checked").text;

    const grade = grades.find(grade => grade.course.courseName === courseName && grade.student.getfullName() === studentName);

    grade.midterm = document.querySelector("#edit-midterm").value;
    grade.final = document.querySelector("#edit-final").value;

    clearTable("grades-table");
    populateTable(grades, "grades-table", "");

    document.querySelector("#edit-course").innerHTML = "";
    document.querySelector("#edit-student").innerHTML = "";

    addGradeEventListeners();

    document.querySelector("#edit-grade-dialog").close();
}

document.querySelector("#edit-grade-submit").addEventListener("click", handleEditGradeSubmit);


function handleCloseCourseDetail(event) {
    event.preventDefault();
    clearTable("students-table");
    viewCourseDetailDialog.close();
}

closeCourseDetailButton.addEventListener("click", handleCloseCourseDetail);


function handleCloseStudentDetail(event) {
    event.preventDefault();
    clearTable("courses-table-2");
    viewStudentDetailDialog.close();
}

closeStudentDetailButton.addEventListener("click", handleCloseStudentDetail);


function handleSearchCourseInput(event) {
    event.preventDefault();
    if (event.target.value === "") {
        clearTable("courses-table");
        populateTable(courses, "courses-table", "");
    }
    searchCourse(event);
}

const searchCourseInput = document.querySelector("#search-course");
searchCourseInput.addEventListener("input", handleSearchCourseInput);


function handleSearchStudentInput(event) {
    event.preventDefault();
    if (event.target.value === "") {
        clearTable("students-table-2");
        populateTable(students, "students-table-2", "");
    }
    searchStudent(event);
}

const searchStudentInput = document.querySelector("#search-student");
searchStudentInput.addEventListener("input", handleSearchStudentInput);


function handleSearchGradeInput(event) {
    event.preventDefault();
    if (event.target.value === "") {
        clearTable("grades-table");
        populateTable(grades, "grades-table", "");
    }
    searchGrade(event);
}

const searchGradeInput = document.querySelector("#search-grade");
searchGradeInput.addEventListener("input", handleSearchGradeInput);

populateTable(courses, "courses-table", "");
populateTable(students, "students-table-2", "");
populateTable(grades, "grades-table", "");


function addCourseEventListeners() {
    document.querySelectorAll(".edit-course-button").forEach(button => {
        button.addEventListener("click", handleCourseEdit);
    });
}

function addStudentEventListeners() {
    document.querySelectorAll(".edit-student-button").forEach(button => {
        button.addEventListener("click", handleStudentEdit);
    });
}

function addGradeEventListeners() {
    document.querySelectorAll(".edit-grade-button").forEach(button => {
        button.addEventListener("click", handleGradeEdit);
    }); 

}

function handleCourseEdit(event) {
    const courseID = event.target.id.split("-")[1];
    const course = courses.find(c => c.courseID === parseInt(courseID));


    document.querySelector("#edit-course-code").value = course.courseCode;
    document.querySelector("#edit-course-id").value = course.courseID;
    document.querySelector("#edit-course-name").value = course.courseName;

    document.querySelector("#edit-course-dialog").showModal();
}

function cancelCourseEdit(event) {
    event.preventDefault();
    document.querySelector("#edit-course-dialog").close();
}

function handleStudentEdit(event) {
    const studentID = event.target.id.split("-")[1]; 
    const student = students.find(s => s.studentID === parseInt(studentID));

    document.querySelector("#edit-student-id").value = student.studentID;
    document.querySelector("#edit-first-name").value = student.studentName;
    document.querySelector("#edit-last-name").value = student.studentSurname;

    document.querySelector("#edit-student-dialog").showModal();
}

function cancelStudentEdit(event) {
    event.preventDefault();
    document.querySelector("#edit-student-dialog").close();
}

function handleGradeEdit(event) {
    const courseID = event.target.id.split("-")[1];
    const studentID = event.target.id.split("-")[2];

    const grade = grades.find(grade => grade.course.courseID == parseInt(courseID) && grade.student.studentID == parseInt(studentID));

    console.log(grade);

    document.querySelector("#edit-course").innerHTML += `<option value="${grade.course.courseID}">${grade.course.getCourseName()}</option>`;
    document.querySelector("#edit-student").innerHTML += `<option value="${grade.student.studentID}">${grade.student.getfullName()}</option>`;
    document.querySelector("#edit-midterm").value = grade.midterm;
    document.querySelector("#edit-final").value = grade.final;

    document.querySelector("#edit-grade-dialog").showModal();
}

function cancelGradeEdit(event) {
    document.querySelector("#edit-course").innerHTML = "";
    document.querySelector("#edit-student").innerHTML = "";
    event.preventDefault();
    document.querySelector("#edit-grade-dialog").close();
}

function viewCourseDetailListeners(){
    document.querySelectorAll(".view-course-detail-button").forEach(button => {
        button.addEventListener("click", handleCourseDetail);
    });
}


function handleCourseDetail(event, option){

    const courseID = event.target.id.split("-")[1];
    const course = courses.find(course => course.courseID == courseID);

    if(!course) return alert("Course not found!");

    const studentsInCourse = grades.filter(grade => grade.course == course);
    clearTable("students-table");
    populateTable(studentsInCourse, "students-table", "course");

    const editText = document.querySelector(".course-detail-text-area");
    editText.innerHTML = `Total Student: ${studentsInCourse.length} Passed: ${studentsInCourse.filter(grade => grade.passed).length} Failed: ${studentsInCourse.filter(grade => !grade.passed).length} Average Grade of Course: ${calculateCourseAverage(course)}`;

    const filter = document.querySelector("#course-detail-filter");
    filter.addEventListener("change", () => filterCourseDetail(studentsInCourse, course));
    viewCourseDetailDialog.showModal();

}

function filterCourseDetail(studentsInCourse, course) {
    const filterValue = document.querySelector("#course-detail-filter").value;
    let filteredStudents;

    if (filterValue == "2") {
        filteredStudents = studentsInCourse.filter(grade => grade.passed);
    } else if (filterValue == "3") {
        filteredStudents = studentsInCourse.filter(grade => !grade.passed);
    } else {
        filteredStudents = studentsInCourse;
    }

    clearTable("students-table");
    populateTable(filteredStudents, "students-table", "course");
}

function viewStudentDetailListeners(){
    document.querySelectorAll(".view-student-detail-button").forEach(button => {
        button.addEventListener("click", handleStudentDetail);
    });
}

function handleStudentDetail(event){
    const studentID = event.target.id.split("-")[1];
    const student = students.find(student => student.studentID == studentID);

    if(!student) return alert("Student not found!");

    const coursesOfStudent = grades.filter(grade => grade.student == student);
    clearTable("courses-table-2");
    populateTable(coursesOfStudent, "courses-table-2", "student");

    const editText = document.querySelector(".student-detail-text-area");
    editText.innerHTML = `Total Courses: ${coursesOfStudent.length} Passed: ${coursesOfStudent.filter(grade => grade.passed).length} Failed: ${coursesOfStudent.filter(grade => !grade.passed).length} Total GPA: ${calculateStudentGPA(student)}`;

    const filter = document.querySelector("#student-detail-filter");
    filter.addEventListener("change", () => filterStudentDetail(coursesOfStudent, student));
    viewStudentDetailDialog.showModal();
}

function filterStudentDetail(coursesOfStudent, student) {
    const filterValue = document.querySelector("#student-detail-filter").value;
    let filteredCourses;
    if (filterValue == "2") {
        filteredCourses = coursesOfStudent.filter(grade => grade.passed);
    } else if (filterValue == "3") {
        filteredCourses = coursesOfStudent.filter(grade => !grade.passed);
    } else {
        filteredCourses = coursesOfStudent;
    }

    clearTable("courses-table-2");
    populateTable(filteredCourses, "courses-table-2", "student");
}

function deleteCourseListeners(){
    document.querySelectorAll(".delete-course-button").forEach(button => {
        button.addEventListener("click", handleCourseDelete);
    });
}

function handleCourseDelete(event) {
    const courseID = event.target.id.split("-")[1];
    const course = courses.find(course => course.courseID === parseInt(courseID));

    let toRemove = [];
    grades.forEach((grade, index) => {
        if (grade.course.courseID === parseInt(course.courseID)) {
            toRemove.push(index);
        }
    });

    for (let i = toRemove.length - 1; i >= 0; i--) {
        grades.splice(toRemove[i], 1);
    }

    const courseIndex = courses.indexOf(course);
    if (courseIndex > -1) {
        courses.splice(courseIndex, 1);
    }

    clearTable("courses-table");
    clearTable("grades-table");
    populateTable(courses, "courses-table", "");
    populateTable(grades, "grades-table", "");
}

function deleteStudentListeners(){
    document.querySelectorAll(".delete-student-button").forEach(button => {
        button.addEventListener("click", handleStudentDelete);
    });
}

function handleStudentDelete(event){
    const studentID = event.currentTarget.id.split("-")[1];
    const student = students.find(student => student.studentID == parseInt(studentID));

    let toRemove = [];
    grades.forEach((grade, index) => {
        if (grade.student.studentID === parseInt(student.studentID)) {
            toRemove.push(index);
        }
    });
    
    for (let i = toRemove.length - 1; i >= 0; i--) {
        grades.splice(toRemove[i], 1);
    }
    
    students.splice(students.indexOf(student), 1);
    clearTable("students-table-2");
    clearTable("grades-table");
    populateTable(students, "students-table-2", "");
    populateTable(grades, "grades-table", "");
}

function deleteGradeListeners(){
    document.querySelectorAll(".delete-grade-button").forEach(button => {
        button.addEventListener("click", handleGradeDelete);
    });
}

function handleGradeDelete(event){
    const courseID = event.target.id.split("-")[1];
    const studentID = event.target.id.split("-")[2];

    const grade = grades.find(grade => grade.course.courseID == parseInt(courseID) && grade.student.studentID == parseInt(studentID));


    grades.splice(grades.indexOf(grade), 1);
    clearTable("grades-table");
    populateTable(grades, "grades-table", "");

}

function searchCourse(event){
    const searchValue = event.target.value;
    const filteredCourses = courses.filter(course => course.courseName.toLowerCase().includes(searchValue.toLowerCase()));
    clearTable("courses-table");
    populateTable(filteredCourses, "courses-table", "");
}

function searchStudent(event){
    const searchValue = event.target.value;
    const filteredStudents = students.filter(student => student.getfullName().toLowerCase().includes(searchValue.toLowerCase()));
    clearTable("students-table-2");
    populateTable(filteredStudents, "students-table-2", "");
}

function searchGrade(event){
    const searchValue = event.target.value;
    const filteredGrades = grades.filter(grade => grade.student.getfullName().toLowerCase().includes(searchValue.toLowerCase()));
    const filteredGrades2 = grades.filter(grade => grade.course.getCourseName().toLowerCase().includes(searchValue.toLowerCase()));
    clearTable("grades-table");
    if (filteredGrades.length > 0) {
        populateTable(filteredGrades, "grades-table", "");
    } else if (filteredGrades2.length > 0) {
        populateTable(filteredGrades2, "grades-table", "");
    } else {
        clearTable("grades-table");
        populateTable(grades, "grades-table", "");
    }
}
