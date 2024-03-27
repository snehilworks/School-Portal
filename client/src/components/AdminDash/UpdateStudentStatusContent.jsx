import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

const UpdateStudentStatusContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/admin/students"
      );
      console.log("Fetched students:", response.data); // Debug log
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStudentId) return;

    try {
      // Make API call to update student status with selectedStudentId
      console.log(
        "Updating admission status for student with ID:",
        selectedStudentId
      );
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Student Status
        </Typography>
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel id="student-select-label">Select Student</InputLabel>
          <Select
            labelId="student-select-label"
            id="student-select"
            value={selectedStudentId}
            onChange={handleSelectChange}
            fullWidth
          >
            {students.map((student) => (
              <MenuItem
                key={student.id}
                value={student.id}
                style={{ fontSize: "16px", padding: "8px 16px" }} // Adjust font size and padding
              >
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
          >
            Update Status
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpdateStudentStatusContent;
