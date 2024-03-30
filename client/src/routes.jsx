import React from "react";

import Admissions from "./pages/admissions/Admissions";
// import Hostel from "./pages/Hostel/Hostel";
import Academics from "./pages/academics/Academics";
import About from "./pages/About/About.jsx";
import Contact from "./pages/contact/Contact";
import { Landing } from "./components/Landing.jsx";
//student imports
import Register from "./pages/Student/studentRegister/Register";
import StPays from "./pages/Student/StPays/StPays";
import SEvents from "./pages/Student/SEvents/SEvents";
import SGrade from "./pages/Student/SGrade/SGrade";
import SAttendance from "./pages/Student/SAttendance/SAttendance";
import Login from "./pages/Student/studentLogin/Login";
import StudentDash from "./pages/Student/studentDashboard/studentDashboard";
import StudentProfile from "./pages/Student/studentProfile/studentProfile";
//teacher Imports
import TLogin from "./pages/Teacher/teacherLogin/teacherLogin";
import TRegister from "./pages/Teacher/teacherRegister/teacherRegister";
import TProfile from "./pages/Teacher/teacherProfile/teacherProfile";
import TeacherDash from "./pages/Teacher/teacherDashboard/teacherDash";

// import TAttendanceList from "./pages/Teacher/TAttendanceList/TAttendanceList";
// import TeacherDash from "./pages/Teacher/";

import NotFoundPage from "./components/NotFoundPage";

const routes = [
  // Homepage Routes
  { path: "/", element: <Landing /> },
  { path: "/admissions", element: <Admissions /> },
  { path: "/academics", element: <Academics /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },

  // Student Routes
  { path: "/student/login", element: <Login /> },
  { path: "/student/register", element: <Register /> },
  { path: "/student/dashboard", element: <StudentDash /> },
  {
    path: "/student/:id",
    element: (
      <StudentProfile
        name="One"
        rollNo="1"
        classTeacher="john"
        classNo="X"
        section="A"
      />
    ),
  },
  { path: "/student/payment", element: <StPays /> },
  { path: "/student/attendance", element: <SAttendance /> },
  { path: "/student/grades", element: <SGrade /> },

  { path: "/student/events", element: <SEvents /> },
  // { path: "/student/hostel", element: <Hostel /> },

  // Teacher Routes
  { path: "/teacher/login", element: <TLogin /> },
  { path: "/teacher/register", element: <TRegister /> },
  { path: "/teacher/dashboard", element: <TeacherDash /> },
  { path: "/teacher/profile", element: <TProfile /> },
  // { path: "/teacher/attendancelist", element: <TAttendanceList /> },

  // 404 Not Found Route
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
