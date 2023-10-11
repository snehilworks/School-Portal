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

const AdmissionsPage = () => {
  // Dummy data for seat availability
  const seatAvailability = [
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
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ margin: "2rem 0" }}>
        Admissions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Seats Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seatAvailability.map((row) => (
              <TableRow key={row.class}>
                <TableCell>{`Class ${row.class}`}</TableCell>
                <TableCell>{row.seatsAvailable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdmissionsPage;
