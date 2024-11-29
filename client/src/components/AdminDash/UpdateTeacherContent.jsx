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
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";

const UpdateTeacherContent = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    phone: "",
    classTeacher: false,
    classes: "",
    classId: "",
  });
  const [classes, setClasses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/classes`);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedTeacherId(selectedId);
    try {
      const response = await axiosInstance.get(
        `/api/admin/teacher/${selectedId}`
      );
      const { data } = response;
      const updatedTeacherDetails = {
        name: data.data.name || "",
        email: data.data.email || "",
        password: data.data.password || "",
        subjects: data.data.subjects ? data.data.subjects.join(", ") : "",
        phone: data.data.phone || "",
        classTeacher: data.data.classTeacher || false,
        classes: data.data.classes ? data.data.classes.join(", ") : "",
        classId: data.data.class ? data.data.class : "",
      };
      setTeacherDetails(updatedTeacherDetails);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: name === "classTeacher" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...teacherDetails,
      classId: teacherDetails.classTeacher ? teacherDetails.classId : null,
    };

    try {
      await axiosInstance.put(
        `/api/admin/teacher/${selectedTeacherId}`,
        payload
      );
      setSuccessMessage("Teacher Details updated successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating teacher details:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 900,
          margin: "auto",
          borderRadius: 8,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "24px",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            className="!font-serif !flex justify-center"
            gutterBottom
          >
            Update Teacher
          </Typography>
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel id="teacher-select-label">Select Teacher</InputLabel>
            <Select
              labelId="teacher-select-label"
              id="teacher-select"
              value={selectedTeacherId}
              onChange={handleSelectChange}
              fullWidth
            >
              {teachers.map((teacher) => (
                <MenuItem
                  key={teacher._id}
                  value={teacher._id}
                  className="!font-serif"
                >
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                  name="email"
                  value={teacherDetails.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={teacherDetails.password}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Subjects"
                  variant="outlined"
                  name="subjects"
                  value={teacherDetails.subjects}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Classes"
                  variant="outlined"
                  name="classes"
                  value={teacherDetails.classes}
                  onChange={handleChange}
                  fullWidth
                  required
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
                  <FormControl fullWidth>
                    <InputLabel id="class-select-label">
                      Select Class
                    </InputLabel>
                    <Select
                      labelId="class-select-label"
                      id="class-select"
                      name="classId"
                      value={teacherDetails.classId}
                      onChange={handleChange}
                      fullWidth
                    >
                      {classes.map((classItem) => (
                        <MenuItem key={classItem._id} value={classItem._id}>
                          {classItem.className}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" marginTop={2}>
                  <PrimaryButton
                    variant="contained"
                    color="admin"
                    type="submit"
                  >
                    Update
                  </PrimaryButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateTeacherContent;
