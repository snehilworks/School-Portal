import React, { useState, useEffect } from "react";
import "./SAttendance.css"; // Import your CSS file

function StudentAttendance() {
  // Simulated attendance data (replace with actual data)
  const [attendanceData, setAttendanceData] = useState([
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "absent",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
    {
      date: "13-04-2013",
      status: "present",
    },
  ]);

  useEffect(() => {
    // Simulated API call to fetch attendance data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student attendance data
      const response = await fetch("/api/student-attendance-data");
      const data = await response.json();
      setAttendanceData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="student-attendance">
      <h1>My Attendance for the Last 30 Days</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;
