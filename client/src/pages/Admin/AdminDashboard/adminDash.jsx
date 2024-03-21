import React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const AdminDashboard = () => {
  const sidebarStyle = {
    backgroundColor: "#2c3e50",
    color: "#fff",
    height: "100vh",
  };

  const buttonStyle = {
    borderRadius: 8,
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition:
      "transform 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
      background: "#388e3c",
    },
  };

  const handleAddTeacher = () => {
    console.log("Add Teacher Details");
  };

  const handleUpdateTeacher = () => {
    console.log("Update Teacher Details");
  };

  const handleDeleteTeacher = () => {
    console.log("Delete Teacher Details");
  };

  const handleUpdateStudentStatus = () => {
    console.log("Update Student Admission Status");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleAddTeacher}>
            <ListItemIcon>
              <PersonAddIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Teacher" />
          </ListItem>
          <ListItem button onClick={handleUpdateTeacher}>
            <ListItemIcon>
              <EditIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Update Teacher" />
          </ListItem>
          <ListItem button onClick={handleDeleteTeacher}>
            <ListItemIcon>
              <DeleteIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Delete Teacher" />
          </ListItem>
          <ListItem button onClick={handleUpdateStudentStatus}>
            <ListItemIcon>
              <EventAvailableIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Update Student Admission Status" />
          </ListItem>
        </List>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          style={{ marginBottom: "32px", marginTop: "32px" }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Main Content Goes Here */}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
