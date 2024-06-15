import React, { useState } from "react";
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

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const toggleSidebar = () => {
    console.log("toggle clicked");
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="overflow-x-hidden" style={{ display: "flex" }}>
      {/* Sidebar */}
      <TeacherSidebar
        setSelectedContent={setSelectedContent}
        isSidebarOpen={isSidebarOpen}
        className={"absolute"}
      />

      {!isSidebarOpen ? (
        <CiMenuBurger
          className="lg:hidden sm:block ml-1 mt-1 absolute z-150 text-white text-2xl bg-gray-700 rounded-full p-1 cursor-pointer"
          onClick={toggleSidebar}
        />
      ) : (
        <RxCross1
          className="z-100 p-0.4 left-22 lg:hidden sm:block absolute text-red-400 text-2xl"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className="bg-gradient-to-r min-h-screen from-blue-100 to-blue-300"
        style={{ flex: 1 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            style={{ marginBottom: "32px", marginTop: "32px" }}
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
