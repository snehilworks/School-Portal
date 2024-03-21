import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import "./teacherDash.css"; // Import the CSS file

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleManageAttendanceClick = () => {
    // Navigate to /teacher/attendanceList
    navigate("/teacher/attendanceList");
  };

  const handleUpdateMarksClick = () => {
    // Navigate to /teacher/marks
    navigate("/teacher/studentMarks");
  };

  const handleStudentRosterClick = () => {
    // Navigate to the student roster page
    navigate("/teacher/studentRoster");
  };

  const handleClassesClick = () => {
    // Navigate to the classes page
    navigate("/teacher/classes");
  };

  const handleGradebookClick = () => {
    // Navigate to the gradebook page
    navigate("/teacher/gradebook");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <List>
          <ListItem button onClick={handleManageAttendanceClick}>
            <ListItemIcon>
              <PlaylistAddCheckIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Attendance" />
          </ListItem>
          <ListItem button onClick={handleUpdateMarksClick}>
            <ListItemIcon>
              <EventAvailableIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Update Marks" />
          </ListItem>
          <ListItem button onClick={handleStudentRosterClick}>
            <ListItemIcon>
              <GroupIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Student Lists" />
          </ListItem>
          <ListItem button onClick={handleClassesClick}>
            <ListItemIcon>
              <MenuBookIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem button onClick={handleGradebookClick}>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Gradebook" />
          </ListItem>
        </List>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          style={{ marginBottom: "32px", marginTop: "32px" }}
        >
          Teacher Dashboard
        </Typography>

        <Grid container spacing={2}>
          {/* Main Content Goes Here */}
        </Grid>
      </Container>
    </div>
  );
};

export default TeacherDashboard;
