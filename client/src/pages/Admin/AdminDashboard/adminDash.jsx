import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";

import DashboardContent from "../../../components/AdminDash/DashboardContent";
import AddTeacherContent from "../../../components/AdminDash/AddTeacherContent";
import UpdateTeacherContent from "../../../components/AdminDash/UpdateTeacherContent";
import DeleteTeacherContent from "../../../components/AdminDash/DeleteTeacherContent";
import UpdateStudentStatusContent from "../../../components/AdminDash/UpdateStudentStatusContent";
import PaymentsContent from "../../../components/AdminDash/PaymentsContent";
import HandleFeesContent from "../../../components/AdminDash/HandleFeesContent";
import ContactMessageContent from "../../../components/AdminDash/ContactMessageContent";
import AdmissionFormContent from "../../../components/AdminDash/AdmissionFormContent";
import HostelFormContent from "../../../components/AdminDash/HostelFormContent";

import AdminSidebar from "../../../components/AdminSidebar";

const AdminDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);

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

  const renderContent = () => {
    switch (selectedContent) {
      case "Dashboard":
        return <DashboardContent />;
      case "Add Teacher":
        return <AddTeacherContent />;
      case "Update Teacher":
        return <UpdateTeacherContent />;
      case "Delete Teacher":
        return <DeleteTeacherContent />;
      case "Update Student Admission Status":
        return <UpdateStudentStatusContent />;
      case "Payments":
        return <PaymentsContent />;
      case "Set-Fees":
        return <HandleFeesContent />;
      case "Contact Messages":
        return <ContactMessageContent />;
      case "Admission Form":
        return <AdmissionFormContent />;
      case "Hostel Form":
        return <HostelFormContent />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <AdminSidebar setSelectedContent={setSelectedContent} />

      {/* Main Content */}
      <Container
        className="bg-gradient-to-b  from-gray-300 to-gray-500"
        style={{ flex: 1 }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "32px",
            marginTop: "32px",
            alignItems: "center",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Main Content Goes Here */}
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
