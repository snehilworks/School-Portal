import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";

import "./teacherDash.css";

import MenuIcon from "@mui/icons-material/Menu";

import AttendanceManageContent from "../../../components/TeacherDash/AttendanceManage";
import UpdateMarksContent from "../../../components/TeacherDash/UpdateMarks";
import StudentListContent from "../../../components/TeacherDash/StudentList";
import ClassesContent from "../../../components/TeacherDash/Classes";
import GradebookContent from "../../../components/TeacherDash/Gradebook";

import TeacherSidebar from "../../../components/TeacherSidebar";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // if (location.pathname === "/teacher/dashboard") {
  //   window.location.reload();
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(location.pathname);
  //   // Check if we have a token and we are on /teacher/dashboard
  //   if (token && location.pathname === "/teacher/dashboard") {
  //     window.location.reload();
  //   }
  // }, []);

  const renderContent = () => {
    switch (selectedContent) {
      case "Manage Attendance":
        return <AttendanceManageContent />;
      case "Update Marks":
        return <UpdateMarksContent />;
      case "Student Lists":
        return <StudentListContent />;
      case "Classes":
        return <ClassesContent />;
      case "Gradebook":
        return <GradebookContent />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-hidden " style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        className={`${
          !isSidebarOpen ? "hidden" : "absolute inset-y-0  lg:top-0 top-14"
        } min-h-[91.5vh] lg:relative lg:flex`}
      >
        <TeacherSidebar
          setSelectedContent={setSelectedContent}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {!isSidebarOpen ? (
        <CiMenuBurger
          className="lg:hidden sm:block ml-1 mt-1 absolute z-150 text-white text-2xl bg-gray-700 rounded-full p-1 cursor-pointer"
          onClick={toggleSidebar}
        />
      ) : (
        <RxCross1
          className="z-100 p-0.4 left-48 lg:hidden sm:block absolute text-red-400 text-2xl"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className="bg-gradient-to-t min-h-[91.5vh] from-cyan-100 to-cyan-300"
        style={{ flex: 1 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            style={{
              marginBottom: "32px",
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="!font-serif !font-bold"
          >
            Teacher Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Main Content Goes Here */}
            <Grid item xs={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
