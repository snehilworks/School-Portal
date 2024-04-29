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
} from "@mui/material";

const StudentListContent = () => {
  const [students, setStudents] = useState([]);

  // Dummy data for demonstration
  const dummyStudents = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "001",
      payStatus: "Paid",
      details: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "002",
      payStatus: "Unpaid",
      details: "Consectetur adipiscing elit",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rollNumber: "003",
      payStatus: "Paid",
      details: "Sed do eiusmod tempor incididunt",
    },
    {
      id: 4,
      name: "Bob Brown",
      rollNumber: "004",
      payStatus: "Unpaid",
      details: "Ut labore et dolore magna aliqua",
    },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setStudents(dummyStudents);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Student List Component</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Pay Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.payStatus}</TableCell>
                <TableCell>{student.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentListContent;
