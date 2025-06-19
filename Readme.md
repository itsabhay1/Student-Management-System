# Student Management System Backend

This is the **Node.js + Express.js** backend for a Student Management System. It supports user authentication, role-based access control (admin, teacher, student), and modules for managing students, courses, assignments, submissions, grades, attendance, fees, and timetables.

---

## 📌 Features Implemented

### 🔐 User Authentication
- JWT-based login/logout
- Access Token + Refresh Token system
- Google OAuth login
- Auto-role assignment with admin control over student/teacher creation

### 🔑 Token Usage
- **Access Token**: Sent in cookies (`accessToken`) or as `Authorization: Bearer <token>`
  - Used for protected routes
  - Short-lived
- **Refresh Token**: Sent in cookies (`refreshToken`) or request body
  - Used to obtain new access token after expiry

### 👤 User Roles
- **Admin**: Can manage students, teachers, courses, timetable, fees, attendance, and assignments
- **Teacher**: Can mark attendance, evaluate assignments, assign grades
- **Student**: Can view own records, submit assignments, view grades/fees/attendance

### 🎓 Modules Overview

| Module         | Role Access       | Description                                      |
|----------------|-------------------|--------------------------------------------------|
| **Users**      | All               | Registration, login, logout, refresh token       |
| **Students**   | Admin             | Admin can create student with auto password      |
| **Courses**    | Admin             | Create/update/delete courses                     |
| **Assignments**| Admin/Teacher     | Create assignments for a course                  |
| **Submissions**| Student/Teacher   | Submit + evaluate assignments                    |
| **Grades**     | Teacher/Admin     | Assign and view grades                           |
| **Attendance** | Teacher/Admin     | Mark and view attendance                         |
| **Fees**       | Admin/Student     | Fee tracking, status, and pending balance        |
| **Timetable**  | Admin/Student     | Timetable per day/course                         |

---

## 📬 API Documentation

You can explore and test all APIs via this Postman documentation:

👉 [Postman Collection Link](https://documenter.getpostman.com/view/39478794/2sB2xBBpDL)


---


## 🚀 Deployed Link

The backend is live and accessible here: 

👉 [https://student-management-system-alphame.vercel.app](https://student-management-system-alphame.vercel.app)

---

## 🧪 Local Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/itsabhay1/Student-Management-System.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

   A sample `.env` file is provided in the codebase as `.env.example`.  
   Rename it to `.env` and configure the keys.


4. **Run in development mode**
```bash
npm run dev
```

---

## 🛠 Tech Stack Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Access + Refresh Tokens), Google OAuth with Passport.js
- **File Upload**: Multer (for receiving) + Cloudinary (for hosting)
- **Session Management**: Cookie-parser, express-session
- **Deployment**: Vercel (API) + MongoDB Atlas (Cloud DB)
- **Testing**: Postman (with documented collection)

---

## 👨‍💻 Author

**Abhay Agrawal**  
Github - itsabhay1  

---

## 📎 Notes
- Admin can only create teachers/students.
- Student must log in with credentials shared by admin.
- Access/refresh tokens are set as secure HTTP-only cookies.
- Timetable checks avoid scheduling conflicts between courses, teachers, and rooms.

---
