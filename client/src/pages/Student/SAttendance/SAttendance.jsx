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
import { useNavigate } from "react-router-dom";

function StudentAttendance() {
  const sampleAttendanceData = [
    { date: "2022-10-01", status: "Present" },
    { date: "2022-10-02", status: "Absent" },
    { date: "2022-10-03", status: "Present" },
    { date: "2022-10-04", status: "Present" },
    { date: "2022-10-05", status: "Present" },
    // Add more data as needed
  ];

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated API call to fetch attendance data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student attendance data
      // For now, we're using the sample attendance data
      setAttendanceData(sampleAttendanceData);
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch attendance data for the selected month
    // Replace this with actual logic to fetch data for the selected month
  };

  return (
    <div className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-8 hover:bg-blue-700 transition duration-200"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Attendance for the Last 30 Days
        </h1>
        <div className="mb-4">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white"
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
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full bg-white rounded-lg shadow-md">
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="px-4 py-2">Date</TableCell>
                <TableCell className="px-4 py-2">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-2">{entry.date}</TableCell>
                  <TableCell className="px-4 py-2">{entry.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;
