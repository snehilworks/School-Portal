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
} from "@mui/material";
import axios from "axios";

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
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/admin/teachers"
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedTeacherId(selectedId);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/teacher/${selectedId}`
      );
      setTeacherDetails(response.data);
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
    try {
      const response = await axios.put(
        `http://localhost:4000/api/admin/teacher/${selectedTeacherId}`,
        teacherDetails
      );
      console.log("Teacher details updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating teacher details:", error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
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
                <MenuItem key={teacher.id} value={teacher.id}>
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
                  required
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
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" marginTop={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateTeacherContent;
