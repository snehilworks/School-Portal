import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";

const UpdateMarksContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    // Fetch student data from API
    axios
      .get("https://api.example.com/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch marks data for the selected subject
    if (selectedSubject) {
      axios
        .get(`https://api.example.com/marks?subject=${selectedSubject}`)
        .then((response) => {
          setMarksData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks data:", error);
        });
    }
  }, [selectedSubject]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleMarksUpdate = (studentId, marks) => {
    // Update marks for the student with the given ID
    const updatedMarksData = marksData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          marks: marks,
        };
      }
      return item;
    });
    setMarksData(updatedMarksData);
  };

  const handleSubmitMarks = () => {
    // Submit updated marks data to the backend
    axios
      .post("https://api.example.com/update-marks", marksData)
      .then((response) => {
        console.log("Marks updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
      });
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Update Marks Component
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Subject</InputLabel>
              <Select value={selectedSubject} onChange={handleSubjectChange}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="History">History</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {selectedSubject && (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Marks Update for {selectedSubject}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {marksData.map((student) => (
              <Box key={student.studentId} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {student.name}
                </Typography>
                <TextField
                  label="Marks"
                  type="number"
                  value={student.marks}
                  onChange={(event) =>
                    handleMarksUpdate(student.studentId, event.target.value)
                  }
                  fullWidth
                />
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitMarks}
              sx={{ mt: 3 }}
            >
              Submit Marks
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateMarksContent;
