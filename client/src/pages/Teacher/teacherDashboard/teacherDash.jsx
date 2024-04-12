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

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const toggleSidebar = () => {
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
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <TeacherSidebar
        setSelectedContent={setSelectedContent}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
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
