import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import about from "./pages/About/About";

import AdminDash from "./pages/Teacher/teacherDashboard/adminDash";
import StudentDash from "./pages/Student/studentDashboard/studentDashboard";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <Router>
        <Appbar />
        <Routes>
          {/* Homepage Routes */}
          <Route path={"/"} element={<Landing />} />
          <Route path={"/admissions"} element={<Admissions />} />
          <Route path={"/academics"} element={<Academics />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
          {/* student Routes */}
          <Route path={"/student/login"} element={<Login />} />
          <Route path={"/student/register"} element={<Register />} />
          <Route path={"/student/dashboard"} element={<StudentDash />} />
          {/* <Route path="/students" component={StudentList} /> */}
          {/* <Route path="/students/:id" component={StudentProfile} /> */}

          {/* admin Routes */}
          <Route path={"/teacher/login"} element={<TLogin />} />
          <Route path={"/teacher/register"} element={<TRegister />} />
          <Route path={"/teacher/dashboard"} element={<AdminDash />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//cookies and session

//Auth 0

// 25 -> abc@gmail.com
//teacher db  > abc@gmail.com , .................

//

// {
// user.data = {}
// user.data -> db => {role: 'admin'}
// }
