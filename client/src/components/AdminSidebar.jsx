import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";

const AdminSidebar = ({ setSelectedContent }) => {
  const sidebarStyle = {
    backgroundColor: "#2c3e50",
    color: "#fff",
    height: "100vh",
    width: "25%",
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

  return (
    <div style={sidebarStyle}>
      <List>
        <ListItem onClick={handleDashboard} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <DashboardIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={handleAddTeacher} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <PersonAddIcon style={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText primary="Add Teacher" />
        </ListItem>
        <ListItem onClick={handleUpdateTeacher} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <EditIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Update Teacher" />
        </ListItem>
        <ListItem onClick={handleDeleteTeacher} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <DeleteIcon style={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText primary="Delete Teacher" />
        </ListItem>
        <ListItem
          onClick={handleUpdateStudentStatus}
          style={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <EventAvailableIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Update Student Admission Status" />
        </ListItem>
        <ListItem onClick={handlePayments} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <PaymentIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;
