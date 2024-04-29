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
  Container,
  Paper,
} from "@mui/material";

const GradebookContent = () => {
  const [students, setStudents] = useState([]);

  // Dummy data for demonstration
  const dummyStudents = [
    { id: 1, name: "John Doe", rollNumber: "001", grade: "A" },
    { id: 2, name: "Jane Smith", rollNumber: "002", grade: "B" },
    { id: 3, name: "Alice Johnson", rollNumber: "003", grade: "C" },
    { id: 4, name: "Bob Brown", rollNumber: "004", grade: "A" },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setStudents(dummyStudents);
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Gradebook Component
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f0f0f0" }}>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Roll Number</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Grade (Till Last Semester)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default GradebookContent;
