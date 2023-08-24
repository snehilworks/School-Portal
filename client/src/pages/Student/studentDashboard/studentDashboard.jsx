import React from "react";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

// import StudentPay from "../studentPay/StudentPay";

function studentDash() {
  return (
    <Container maxWidth="lg" className="student-dashboard">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Your Student Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Grades
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to="/student/grades">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 8 }}
                >
                  View Grades
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Attendance
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to="/student/attendance">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 8 }}
                >
                  View Attendance
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Events
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to="/student/events">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 8 }}
                >
                  View Events
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Hostel Details
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to="/student/hostel">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 8 }}
                >
                  View Hostel Details
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Payment Gateway
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to="/student/payment">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 8 }}
                >
                  Go to Payment Gateway
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default studentDash;

// website  _________________________  