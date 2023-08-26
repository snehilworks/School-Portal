import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  return (
    <Container>
      <Typography variant="h4">Teacher Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleManageAttendanceClick}
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
          >
            Update Marks
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;
