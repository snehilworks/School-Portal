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
import CompleteProfile from "./pages/Student/CompleteProfile/CompleteProfile";
import SEvents from "./pages/Student/SEvents/SEvents";
import SGrade from "./pages/Student/SGrade/SGrade";
import SHostel from "./pages/Student/SHostel/SHostel";
import SAttendance from "./pages/Student/SAttendance/SAttendance";
import Login from "./pages/Student/studentLogin/Login";
import StudentDash from "./pages/Student/studentDashboard/studentDashboard";
import StudentProfile from "./pages/Student/studentProfile/studentProfile";
//teacher Imports
import TLogin from "./pages/Teacher/teacherLogin/teacherLogin";
import TRegister from "./pages/Teacher/teacherRegister/teacherRegister";
import TProfile from "./pages/Teacher/teacherProfile/teacherProfile";
import TeacherDash from "./pages/Teacher/teacherDashboard/teacherDash";
import AdminDash from "./pages/Admin/AdminDashboard/adminDash";
import AdminLogin from "./pages/Admin/AdminLogin/adminLogin";

// import TAttendanceList from "./pages/Teacher/TAttendanceList/TAttendanceList";
// import TeacherDash from "./pages/Teacher/";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import NotFoundPage from "./components/NotFoundPage";
import FeeStructure from "./pages/Student/FeeStructure/FeeStructure";

const routes = [
  // Homepage Routes
  { path: "/", element: <Landing /> },
  { path: "/admissions", element: <Admissions /> },
  { path: "/academics", element: <Academics /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },

  //Admin Routes
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDash />
      </ProtectedRoute>
    ),
  },
  { path: "/admin/login", element: <AdminLogin /> },

  // Student Routes
  { path: "/student/login", element: <Login /> },
  { path: "/student/register", element: <Register /> },
  {
    path: "/student/dashboard",
    element: (
      <ProtectedRoute>
        <StudentDash />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/complete/profile",
    element: <CompleteProfile />,
  },
  {
    path: "/student/fee-structure",
    element: <FeeStructure />,
  },
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
  {
    path: "/student/payment",
    element: (
      <ProtectedRoute>
        <StPays />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/attendance",
    element: (
      <ProtectedRoute>
        <SAttendance />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/grades",
    element: (
      <ProtectedRoute>
        <SGrade />
      </ProtectedRoute>
    ),
  },

  {
    path: "/student/events",
    element: (
      <ProtectedRoute>
        <SEvents />
      </ProtectedRoute>
    ),
  },
  { path: "/student/hostel", element: <SHostel /> },

  // Teacher Routes
  { path: "/teacher/login", element: <TLogin /> },
  { path: "/teacher/register", element: <TRegister /> },
  {
    path: "/teacher/dashboard",
    element: (
      <ProtectedRoute>
        <TeacherDash />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/profile",
    element: (
      <ProtectedRoute>
        <TProfile />
      </ProtectedRoute>
    ),
  },
  // { path: "/teacher/attendancelist", element: <TAttendanceList /> },

  // 404 Not Found Route
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
