import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  IconButton,
} from "@mui/material";
import { CheckCircleOutlineOutlined as SuccessIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddTeacherContent = () => {
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    phone: "",
    classTeacher: false,
    classes: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: name === "classTeacher" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert subjects string to an array
    const subjectsArray = teacherDetails.subjects
      .split(",")
      .map((subject) => subject.trim());

    // Convert classes string to an array
    const classesArray = teacherDetails.classes
      .split(",")
      .map((classItem) => classItem.trim());

    const payload = {
      ...teacherDetails,
      subjects: subjectsArray,
      classes: classesArray,
      classTeacher: teacherDetails.classTeacher ? true : false,
    };

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/admin/teachers`,
        payload
      );
      console.log("Teacher details submitted successfully:", response.data);

      // Reset form fields after successful submission
      setTeacherDetails({
        name: "",
        email: "",
        password: "",
        subjects: "",
        phone: "",
        classTeacher: false,
        classes: "",
      });

      // Show success message
      setSuccessMessage("Successfully added Teacher!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting teacher details:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          <strong>Add Teacher</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={teacherDetails.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={teacherDetails.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={teacherDetails.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                type="tel"
                name="phone"
                value={teacherDetails.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subjects (comma separated)"
                variant="outlined"
                name="subjects"
                value={teacherDetails.subjects}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Classes (comma separated)"
                variant="outlined"
                name="classes"
                value={teacherDetails.classes}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={teacherDetails.classTeacher}
                    onChange={handleChange}
                    name="classTeacher"
                  />
                }
                label="Class Teacher"
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <SuccessIcon color="primary" style={{ marginRight: "8px" }} />
            {successMessage}
          </span>
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        style={{ backgroundColor: "#4caf50" }}
      />
    </Card>
  );
};

export default AddTeacherContent;
