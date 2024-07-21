import React, { useState, useEffect } from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CheckCircleOutlineOutlined as SuccessIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";

const AddTeacherContent = () => {
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    phone: "",
    classTeacher: false,
    classId: "", // Changed to classId for MongoDB _id reference
    classes: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    if (teacherDetails.classTeacher) {
      fetchClasses();
    }
  }, [teacherDetails.classTeacher]);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/classes`);
      setClassesList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: name === "classTeacher" ? checked : value,
    });
  };

  const handleClassChange = (event) => {
    setTeacherDetails({
      ...teacherDetails,
      classId: event.target.value,
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
      classId: teacherDetails.classTeacher ? teacherDetails.classId : null,
    };

    if (!teacherDetails.classTeacher) {
      delete payload.classId; // Clean up the payload if classTeacher is false
    }

    try {
      const response = await axiosInstance.post(`/api/admin/teacher`, payload);
      console.log("Teacher details submitted successfully:", response.data);

      // Reset form fields after successful submission
      setTeacherDetails({
        name: "",
        email: "",
        password: "",
        subjects: "",
        phone: "",
        classTeacher: false,
        classId: "",
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
            {teacherDetails.classTeacher && (
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="class-select-label">Class</InputLabel>
                  <Select
                    labelId="class-select-label"
                    id="class-select"
                    value={teacherDetails.classId}
                    onChange={handleClassChange}
                    label="Class"
                    required
                  >
                    {classesList.map((classItem) => (
                      <MenuItem key={classItem._id} value={classItem._id}>
                        {classItem.className}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
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
        ContentProps={{
          style: { backgroundColor: "#4caf50" },
        }}
      />
    </Card>
  );
};

export default AddTeacherContent;
