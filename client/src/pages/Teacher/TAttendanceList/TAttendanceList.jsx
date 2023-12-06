import React, { useState, useEffect } from "react";
import "./TeacherAttendance.css"; // Import your CSS file

function TeacherAttendance() {
  // Simulated student attendance data (replace with actual data)
  const [students, setStudents] = useState([
    {
      name: "akshay",
    },
    {
      name: "smriti",
    },
    {
      name: "kirat",
    },
  ]);

  useEffect(() => {
    // Simulated API call to fetch student attendance data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student attendance data
      const response = await fetch("/api/students-attendance-data");
      const data = await response.json();
      setStudents(data);
    };

    fetchData();
  }, []);

  const updateAttendance = (studentId, status) => {
    // Simulated API call to update student attendance (replace with actual API call)
    // Send the studentId and attendance status to the backend
    // Handle the update on the server
    // After the update is successful, you can reflect it in the UI
  };

  return (
    <div className="teacher-attendance">
      <h1>Student Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>
                <button onClick={() => updateAttendance(student.id, "present")}>
                  Present
                </button>
                <button onClick={() => updateAttendance(student.id, "absent")}>
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherAttendance;
