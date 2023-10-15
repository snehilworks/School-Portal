import React from "react";
import { Routes, Route } from "react-router-dom";

import Appbar from "./components/Appbar";
import Register from "./pages/Student/studentRegister/Register";
import Login from "./pages/Student/studentLogin/Login";
import TLogin from "./pages/Teacher/teacherLogin/teacherLogin";
import TRegister from "./pages/Teacher/teacherRegister/teacherRegister";

import Admissions from "./pages/admissions/Admissions";
import Academics from "./pages/academics/Academics";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { Landing } from "./components/Landing.jsx";
import StudentProfile from "./pages/Student/studentProfile/studentProfile";
import TProfile from "./pages/Teacher/teacherProfile/teacherProfile";
import NotFoundPage from "./components/NotFoundPage";
import TeacherDash from "./pages/Teacher/teacherDashboard/teacherDash";
import StudentDash from "./pages/Student/studentDashboard/studentDashboard";

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

  // Teacher Routes
  { path: "/teacher/login", element: <TLogin /> },
  { path: "/teacher/register", element: <TRegister /> },
  { path: "/teacher/dashboard", element: <TeacherDash /> },
  { path: "/teacher/profile", element: <TProfile /> },

  // 404 Not Found Route
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
