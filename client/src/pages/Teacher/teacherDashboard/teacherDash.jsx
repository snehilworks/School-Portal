import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

  const handleGradebookClick = () => {
    // Navigate to the gradebook page
    navigate("/teacher/gradebook");
  };

  return (
    <Container className="container">
      <Typography variant="h4" className="title">
        Teacher Dashboard
      </Typography>

      <Grid container spacing={2} className="button-grid">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleManageAttendanceClick}
            className="button primary"
          >
            Manage Attendance
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleUpdateMarksClick}
            className="button primary"
          >
            Update Marks
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleStudentRosterClick}
            className="button primary"
          >
            Student Roster
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleGradebookClick}
            className="button primary"
          >
            Gradebook
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;
