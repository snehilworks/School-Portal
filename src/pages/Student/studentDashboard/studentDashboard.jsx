import React from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./studentDashboard.css"; // Import the CSS file

function StudentDash() {
  const pageStyles = {
    backgroundColor: "#00FFFF", // Set the background color here
    minHeight: "100vh", // Ensure the page covers the full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={pageStyles}>
      <Container maxWidth="lg" className="student-dashboard">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Your Student Dashboard
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Paper elevation={3} className="dashboard-section">
            <Typography variant="h6" gutterBottom className="section-heading">
              Grades
            </Typography>
            <Link to="/student/grades">
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
              >
                View Grades
              </Button>
            </Link>
          </Paper>

          <Paper elevation={3} className="dashboard-section">
            <Typography variant="h6" gutterBottom className="section-heading">
              Attendance
            </Typography>
            <Link to="/student/attendance">
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
              >
                View Attendance
              </Button>
            </Link>
          </Paper>

          <Paper elevation={3} className="dashboard-section">
            <Typography variant="h6" gutterBottom className="section-heading">
              Events
            </Typography>
            <Link to="/student/events">
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
              >
                View Events
              </Button>
            </Link>
          </Paper>

          <Paper elevation={3} className="dashboard-section">
            <Typography variant="h6" gutterBottom className="section-heading">
              Hostel Details
            </Typography>
            <Link to="/student/hostel">
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
              >
                View Hostel Details
              </Button>
            </Link>
          </Paper>

          <Paper elevation={3} className="dashboard-section">
            <Typography variant="h6" gutterBottom className="section-heading">
              Payment Gateway
            </Typography>
            <Link to="/student/payment">
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
              >
                Go to Payment Gateway
              </Button>
            </Link>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default StudentDash;
