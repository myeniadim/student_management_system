# 🎓 Student Management System

A lightweight, responsive, and standalone web application built for an undergraduate **Web Development and Programming** course. It provides an intuitive single-page interface (SPA) to manage courses, students, and grade records using **Vanilla JavaScript (ES6+)**, **HTML5**, and **CSS3**.

The project operates entirely on the client side without relying on external frontend libraries or frameworks (such as React, Vue, or jQuery).

🔗 **Live Demo:** [https://myeniadim.github.io/student_management_system/](https://myeniadim.github.io/student_management_system/)

---

## 📌 Table of Contents
- [Live Demo](#-live-demo)
- [Features](#-features)
  - [Course Management](#1-course-management)
  - [Student Management](#2-student-management)
  - [Grade Management](#3-grade-management)
- [Grading System & GPA Calculation](#-grading-system--gpa-calculation)
- [Technologies Used](#-technologies-used)
- [File Structure](#-file-structure)
- [Getting Started](#-getting-started)
- [Architecture & Design](#-architecture--design)
- [Author](#-author)

---

## 🌐 Live Demo

You can try out the live deployment of the application directly on GitHub Pages:

👉 **[Launch Live Demo](https://myeniadim.github.io/student_management_system/)**

---

## 🚀 Features

### 1. Course Management
- **CRUD Operations:** Add, view, edit, and delete courses with unique Course ID and Code validation.
- **Grading Scale Customization:** Assign either a **7-point** or **10-point** grading scale to each course.
- **Cascade Deletion:** Automatically purges all associated grade records when a course is deleted to maintain data integrity.
- **Detailed Course Statistics:**
  - View enrolled students with midterm, final, weighted average, and calculated letter grade.
  - Summary metrics: total students enrolled, number of passed/failed students, and the course average.
  - Filter enrollments by status (**All / Passed / Failed**).
- **Instant Search:** Filter courses in real time by course name.

### 2. Student Management
- **CRUD Operations:** Register, view, edit, and delete student records (Student ID, First Name, Last Name) with duplicate ID prevention.
- **Student Academic Transcript:**
  - View all courses taken by a specific student along with their examination grades and status.
  - Overall performance metrics: total courses, passed/failed count, and cumulative **GPA (out of 4.00)**.
  - Filter taken courses by status (**All / Passed / Failed**).
- **Instant Search:** Filter students in real time by name.

### 3. Grade Management
- **Grade Assignment:** Assign Midterm (40%) and Final (60%) exam scores (0–100) to students for registered courses.
- **Duplicate Prevention:** Prevents assigning multiple grade entries to the same student for the same course.
- **Automatic Letter Grade & Passing Status:** Instantly calculates the weighted score, determines the letter grade based on the course scale, and evaluates pass/fail status.
- **Edit & Delete:** Update exam marks or remove grade records directly from the grades table.
- **Dual-Field Search:** Filter the grade list by student name or course name.

---

## 📊 Grading System & GPA Calculation

### Score Calculation
The final average is computed using standard weighted averages:
$$\text{Average} = (\text{Midterm} \times 0.40) + (\text{Final} \times 0.60)$$

### Point Scales & GPA Scale
Depending on whether the course is configured with a **7-point** or **10-point** scale, the letter grade and GPA points are determined as follows:

| Letter Grade | GPA Points | 10-Point Scale Minimum | 7-Point Scale Minimum | Status |
| :---: | :---: | :---: | :---: | :---: |
| **A** | 4.0 | $\ge 90$ | $\ge 93$ | Passed |
| **B** | 3.0 | $\ge 80$ | $\ge 86$ | Passed |
| **C** | 2.0 | $\ge 70$ | $\ge 79$ | Passed |
| **D** | 1.0 | $\ge 60$ | $\ge 72$ | Passed |
| **F** | 0.0 | $< 60$ | $< 72$ | Failed |

---

## 🛠 Technologies Used

- **HTML5:** Semantic elements, native `<dialog>` tags for modals, and accessible form inputs.
- **CSS3:** Custom styles, Flexbox layout, modal overlays, and clean data tables.
- **JavaScript (Vanilla / ES6+):**
  - Object-Oriented Programming (OOP) using classes: `Course`, `Student`, and `Grades`.
  - DOM manipulation and event delegation.
  - Array operations (`filter`, `find`, `some`, `forEach`, `splice`).
- **Icons & Typography:**
  - [Font Awesome 6](https://cdnjs.com/libraries/font-awesome) for UI action icons.
  - [Google Fonts](https://fonts.google.com/) (*Montserrat*, *Space Grotesk*, *Libre Baskerville*, *Satisfy*).

---

## 📂 File Structure

```text
student_management_system/
├── assets/
│   └── logo.png          # Favicon and branding asset
├── index.html            # Main HTML document and modal dialog templates
├── script.js             # Data models, business logic, calculations, and event handlers
├── styles.css            # Styling and UI layout rules
└── README.md             # Project documentation
```

---

## 💻 Getting Started

This project is completely client-side. No package manager (`npm`/`yarn`) or backend setup is required.

### Quick Start:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/myeniadim/student_management_system.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd student_management_system
   ```
3. **Open `index.html`:**
   - Double-click [index.html](file:///C:/Workspace/student_management_system/index.html) to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
   - Alternatively, serve it via the **Live Server** extension in Visual Studio Code.

---

## 🏛 Architecture & Design

- **Object-Oriented Design:** Clear separation of domain entities (`Course`, `Student`, `Grades`) with encapsulated presentation methods (`toTableRow()`) and calculation methods (`calculateAverage()`, `findLetterGrade()`, `calculateGPA()`).
- **SPA Tab Navigation:** Seamless switching between Courses, Students, and Grades sections without page reloads.
- **Native Modals:** Built using standard HTML5 `<dialog>` elements with `.showModal()` and `.close()` APIs for clean modal dialogs without third-party libraries.

---

## 👤 Author

- **Mert Yeniadım** - *Web Development Course Project*
