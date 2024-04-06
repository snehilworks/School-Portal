import React from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import "./Admissions.css"; // Import the CSS file

const AdmissionsPage = () => {
  // Dummy data for seat availability
  const seatAvailability = [
    { class: "Nursery", seatsAvailable: 1 },
    { class: "LKG", seatsAvailable: 12 },
    { class: "UKG", seatsAvailable: 2 },
    { class: "1", seatsAvailable: 20 },
    { class: "2", seatsAvailable: 15 },
    { class: "3", seatsAvailable: 18 },
    { class: "4", seatsAvailable: 12 },
    { class: "5", seatsAvailable: 25 },
    { class: "6", seatsAvailable: 22 },
    { class: "7", seatsAvailable: 19 },
    { class: "8", seatsAvailable: 16 },
    { class: "9", seatsAvailable: 14 },
    { class: "10", seatsAvailable: 10 },
    { class: "11-Science", seatsAvailable: 12 },
    { class: "11-Arts", seatsAvailable: 10 },
    { class: "12-Science", seatsAvailable: 12 },
    { class: "12-Arts", seatsAvailable: 10 },
  ];

  return (
    <Container maxWidth="md" className="admission-container">
      <Typography variant="h4" align="center" className="admissions-heading">
        Admissions
      </Typography>
      <TableContainer component={Paper} className="admissions-table-container">
        <Table className="admissions-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Class</TableCell>
              <TableCell className="table-header">Seats Available</TableCell>
              <TableCell className="table-header">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seatAvailability.map((row) => (
              <TableRow key={row.class}>
                <TableCell>{`Class ${row.class}`}</TableCell>
                <TableCell>{row.seatsAvailable}</TableCell>
                <TableCell>
                  <button
                    className={
                      row.seatsAvailable > 0
                        ? "admissions-button"
                        : "admissions-button-disabled"
                    }
                    disabled={row.seatsAvailable === 0}
                  >
                    {row.seatsAvailable > 0 ? "Take Admission" : "Full"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdmissionsPage;
