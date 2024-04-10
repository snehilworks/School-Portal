import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import "./SAttendance.css"; // Import your CSS file

function StudentAttendance() {
  // Sample attendance data
  const sampleAttendanceData = [
    { date: "2022-10-01", status: "Present" },
    { date: "2022-10-02", status: "Absent" },
    { date: "2022-10-03", status: "Present" },
    { date: "2022-10-04", status: "Present" },
    { date: "2022-10-05", status: "Present" },
    // Add more data as needed
  ];

  // State for attendance data and selected month
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Simulated API call to fetch attendance data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student attendance data
      // For now, we're using the sample attendance data
      setAttendanceData(sampleAttendanceData);
    };

    fetchData();
  }, []);

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch attendance data for the selected month
    // Replace this with actual logic to fetch data for the selected month
  };

  return (
    <div className="student-attendance">
      <h1 className="title">My Attendance for the Last 30 Days</h1>
      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="month-dropdown"
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Month
        </MenuItem>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month, index) => (
          <MenuItem key={index} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <Table className="attendance-table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StudentAttendance;
