import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import "./teacherDash.css";

import AttendanceManageContent from "../../../components/TeacherDash/AttendanceManage";
import UpdateMarksContent from "../../../components/TeacherDash/UpdateMarks";
import StudentListContent from "../../../components/TeacherDash/StudentList";
import ClassesContent from "../../../components/TeacherDash/Classes";
import GradebookContent from "../../../components/TeacherDash/Gradebook";

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleItemClick = (content) => {
    setSelectedContent(content);
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
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <List>
          <ListItem onClick={() => handleItemClick("Manage Attendance")}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Attendance" />
          </ListItem>
          <ListItem onClick={() => handleItemClick("Update Marks")}>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Update Marks" />
          </ListItem>
          <ListItem onClick={() => handleItemClick("Student Lists")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Student Lists" />
          </ListItem>
          <ListItem onClick={() => handleItemClick("Classes")}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem onClick={() => handleItemClick("Gradebook")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Gradebook" />
          </ListItem>
        </List>
      </div>

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