import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const AttendanceManageContent = () => {
  const [students, setStudents] = useState([]); // State to store students
  const [attendanceData, setAttendanceData] = useState([]); // State to store attendance data

  useEffect(() => {
    // Dummy student data
    const dummyStudents = [
      { id: 1, name: "John Doe", attendance: "Present" },
      { id: 2, name: "Jane Smith", attendance: "Absent" },
      { id: 3, name: "Alice Johnson", attendance: "Present" },
      { id: 4, name: "Bob Brown", attendance: "Absent" },
      { id: 5, name: "Emily Davis", attendance: "Present" },
    ];

    setStudents(dummyStudents);

    // Initialize attendance data
    const initialAttendanceData = dummyStudents.map((student) => ({
      studentId: student.id,
      attendance: student.attendance,
    }));
    setAttendanceData(initialAttendanceData);
  }, []);

  // Function to handle attendance change
  const handleAttendanceChange = (studentId) => (event) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          attendance: event.target.value,
        };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  // Function to submit attendance
  const handleSubmitAttendance = () => {
    axios
      .post("https://api.example.com/attendance", attendanceData)
      .then((response) => {
        console.log("Attendance submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Manage Attendance
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={
                        attendanceData.find(
                          (item) => item.studentId === student.id
                        )?.attendance || ""
                      }
                      onChange={handleAttendanceChange(student.id)}
                      sx={{
                        color:
                          attendanceData.find(
                            (item) => item.studentId === student.id
                          )?.attendance === "Absent"
                            ? "error.main"
                            : "success.main",
                      }}
                      inputProps={{
                        variant: "standard",
                      }}
                      IconComponent={null}
                    >
                      <MenuItem value="Present">
                        <Box display="flex" alignItems="center">
                          Present
                          {attendanceData.find(
                            (item) => item.studentId === student.id
                          )?.attendance === "Present" && (
                            <CheckIcon sx={{ ml: 1 }} />
                          )}
                        </Box>
                      </MenuItem>
                      <MenuItem value="Absent">
                        <Box display="flex" alignItems="center">
                          Absent
                          {attendanceData.find(
                            (item) => item.studentId === student.id
                          )?.attendance === "Absent" && (
                            <ClearIcon sx={{ ml: 1 }} />
                          )}
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAttendance}
          sx={{ mt: 2 }}
        >
          Submit Attendance
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttendanceManageContent;
