import React from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Grade, Event, Home, Payment, Today } from "@mui/icons-material";
import "./studentDashboard.css"; // Import the CSS file
// import PrimaryButton from "@/../../src/components/ui/PrimaryButton";
import PrimaryButton from "./../../../components/ui/PrimaryButton";

function StudentDash() {
  const pageStyles = {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div style={pageStyles}>
      <Container maxWidth="lg" className="student-dashboard">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="dashboard-heading"
        >
          Student Dashboard
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <div className="dashboard-container">
            <Paper elevation={3} className="dashboard-section gradient1">
              <Grade fontSize="large" />
              <Typography variant="h6" className="section-heading">
                Grades
              </Typography>
              <Link to="/student/grades">
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                >
                  View Grades
                </PrimaryButton>
              </Link>
            </Paper>

            <Paper elevation={3} className="dashboard-section gradient2">
              <Today fontSize="large" />
              <Typography variant="h6" className="section-heading">
                Attendance
              </Typography>
              <Link to="/student/attendance">
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                >
                  View Attendance
                </PrimaryButton>
              </Link>
            </Paper>

            <Paper elevation={3} className="dashboard-section gradient1">
              <Event fontSize="large" />
              <Typography variant="h6" className="section-heading">
                Events
              </Typography>
              <Link to="/student/events">
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                >
                  View Events
                </PrimaryButton>
              </Link>
            </Paper>
          </div>

          <div className="dashboard-container">
            <Paper elevation={3} className="dashboard-section gradient2">
              <Home fontSize="large" />
              <Typography variant="h6" className="section-heading">
                Hostel Details
              </Typography>
              <Link to="/student/hostel">
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                >
                  View Hostel Details
                </PrimaryButton>
              </Link>
            </Paper>

            <Paper elevation={3} className="dashboard-section gradient1">
              <Payment fontSize="large" />
              <Typography variant="h6" className="section-heading">
                Payment Gateway
              </Typography>
              <Link to="/student/payment">
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  className="dashboard-button"
                >
                  Go to Payment Gateway
                </PrimaryButton>
              </Link>
            </Paper>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default StudentDash;
