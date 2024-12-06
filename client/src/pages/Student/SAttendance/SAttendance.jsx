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
    const fetchData = async () => {
      setAttendanceData(sampleAttendanceData);
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch attendance data for the selected month
  };

  return (
    <div className="bg-gradient-to-br from-teal-300 via-teal-500 to-white min-h-screen flex justify-center items-center py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white font-medium py-3 px-6 rounded-lg mb-8 hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          My Attendance for the Last 30 Days
        </h1>

        {/* Month Dropdown */}
        <div className="mb-6">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
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

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-teal-200">
          <Table className="w-full rounded-t-lg">
            <TableHead>
              <TableRow className="bg-teal-100">
                <TableCell className="px-6 py-4 text-lg font-semibold text-teal-600">
                  Date
                </TableCell>
                <TableCell className="px-6 py-4 text-lg font-semibold text-teal-600">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((entry, index) => (
                <TableRow
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-teal-50" : "bg-teal-100"
                  } hover:bg-teal-200 transition duration-300`}
                >
                  <TableCell className="px-6 py-4 text-gray-800">
                    {entry.date}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-800">
                    {entry.status}
                  </TableCell>
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
