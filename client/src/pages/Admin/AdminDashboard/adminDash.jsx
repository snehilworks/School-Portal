import React, { useState } from "react";
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
import PaymentIcon from "@mui/icons-material/Payment";

const AdminDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const sidebarStyle = {
    backgroundColor: "#2c3e50",
    color: "#fff",
    height: "100vh",
    width: "25%",
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

  const handleDashboard = () => {
    setSelectedContent("Dashboard");
  };

  const handleAddTeacher = () => {
    setSelectedContent("Add Teacher");
  };

  const handleUpdateTeacher = () => {
    setSelectedContent("Update Teacher");
  };

  const handleDeleteTeacher = () => {
    setSelectedContent("Delete Teacher");
  };

  const handleUpdateStudentStatus = () => {
    setSelectedContent("Update Student Admission Status");
  };

  const handlePayments = () => {
    setSelectedContent("Payments");
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "Dashboard":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Dashboard Content</Typography>
            </CardContent>
          </Card>
        );
      case "Add Teacher":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Add Teacher Content</Typography>
            </CardContent>
          </Card>
        );
      case "Update Teacher":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Update Teacher Content</Typography>
            </CardContent>
          </Card>
        );
      case "Delete Teacher":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Delete Teacher Content</Typography>
            </CardContent>
          </Card>
        );
      case "Update Student Admission Status":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">
                Update Student Admission Status Content
              </Typography>
            </CardContent>
          </Card>
        );
      case "Payments":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Payments Content</Typography>
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
      <div style={sidebarStyle}>
        <List>
          <ListItem button onClick={handleDashboard}>
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
          <ListItem button onClick={handlePayments}>
            <ListItemIcon>
              <PaymentIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Payments" />
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
          <Grid item xs={4}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
