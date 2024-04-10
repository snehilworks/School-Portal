import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import "./SGrade.css"; // Import your CSS file

function GradesPage() {
  // Sample grades data
  const sampleGradesData = [
    { subject: "Maths", grade: "A" },
    { subject: "Science", grade: "B" },
    { subject: "Social Studies", grade: "A+" },
    { subject: "Sanskrit", grade: "B" },
    { subject: "Hindi", grade: "A" },
    { subject: "English", grade: "A+" },
    // Add more data as needed
  ];

  // State for grades data
  const [gradesData, setGradesData] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch grades data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student's grades data
      // For now, we're using the sample grades data
      setGradesData(sampleGradesData);
    };

    fetchData();
  }, []);

  return (
    <div className="grades-page">
      <Typography
        variant="h3"
        gutterBottom
        className="title"
        style={{ color: "black" }}
      >
        My Grades
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", backgroundColor: "#000" }}>
                Subject
              </TableCell>
              <TableCell style={{ color: "white", backgroundColor: "#000" }}>
                Grade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradesData.map((grade, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(31 41 55)" : "rgb(17 24 39)",
                }}
              >
                <TableCell style={{ color: "white" }}>
                  {grade.subject}
                </TableCell>
                <TableCell style={{ color: "white" }}>{grade.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GradesPage;
