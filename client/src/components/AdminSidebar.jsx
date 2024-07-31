import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { FaRegMessage } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";

const AdminSidebar = ({ setSelectedContent }) => {
  const sidebarStyle = {
    backgroundColor: "#2c3e50",
    color: "#fff",
    // height: "100vh",
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

  const handleContactMessages = () => {
    setSelectedContent("Contact Messages");
  };

  const handleAdmissionForms = () => {
    setSelectedContent("Admission Form");
  };

  const handleHostelForms = () => {
    setSelectedContent("Hostel Form");
  };

  const handlePayments = () => {
    setSelectedContent("Payments");
  };

  const handleFees = () => {
    setSelectedContent("Set-Fees");
  };

  return (
    <div className="h-[92vh] sticky top-16" style={sidebarStyle}>
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
        <ListItem onClick={handleFees} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <CurrencyRupeeIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Set-Fees" />
        </ListItem>
        <ListItem onClick={handlePayments} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <AccountBalanceIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem onClick={handleContactMessages} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <FaRegMessage style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Contact Messages" />
        </ListItem>
        <ListItem onClick={handleAdmissionForms} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <FaWpforms style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Admission Forms" />
        </ListItem>
        <ListItem onClick={handleHostelForms} style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <FaHotel style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Hostel Forms" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;
