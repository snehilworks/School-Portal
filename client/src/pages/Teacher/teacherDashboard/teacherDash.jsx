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

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is initially open

  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "Manage Attendance":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Manage Attendance Content</Typography>
            </CardContent>
          </Card>
        );
      case "Update Marks":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Update Marks Content</Typography>
            </CardContent>
          </Card>
        );
      case "Student Lists":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Student Lists Content</Typography>
            </CardContent>
          </Card>
        );
      case "Classes":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Classes Content</Typography>
            </CardContent>
          </Card>
        );
      case "Gradebook":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Gradebook Content</Typography>
            </CardContent>
          </Card>
        );
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
          <ListItem
            button
            selected={selectedContent === "Manage Attendance"}
            onClick={() => handleItemClick("Manage Attendance")}
          >
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Attendance" />
          </ListItem>
          <ListItem
            button
            selected={selectedContent === "Update Marks"}
            onClick={() => handleItemClick("Update Marks")}
          >
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Update Marks" />
          </ListItem>
          <ListItem
            button
            selected={selectedContent === "Student Lists"}
            onClick={() => handleItemClick("Student Lists")}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Student Lists" />
          </ListItem>
          <ListItem
            button
            selected={selectedContent === "Classes"}
            onClick={() => handleItemClick("Classes")}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem
            button
            selected={selectedContent === "Gradebook"}
            onClick={() => handleItemClick("Gradebook")}
          >
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
