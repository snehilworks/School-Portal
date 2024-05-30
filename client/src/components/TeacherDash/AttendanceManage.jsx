import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceManageContent = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Dummy student data
    const dummyStudents = [
      { id: 1, name: "John Doe", attendance: "Present" },
      { id: 2, name: "Jane Smith", attendance: "Absent" },
      { id: 3, name: "Alice Johnson", attendance: "Present" },
      { id: 4, name: "Bob Brown", attendance: "Absent" },
      { id: 5, name: "Emily Davis", attendance: "Present" },
    ];

    setStudents(dummyStudents);

    const initialAttendanceData = dummyStudents.map((student) => ({
      studentId: student.id,
      attendance: student.attendance,
    }));
    setAttendanceData(initialAttendanceData);
  }, []);

  const handleAttendanceChange = (studentId) => (event) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          attendance: event.target.value,
        };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmitAttendance = () => {
    axios
      .post("https://api.example.com/attendance", attendanceData)
      .then((response) => {
        console.log("Attendance submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Attendance</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto lg:table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 w-1/3">Name</th>
              <th className="px-4 py-2 w-1/4">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-2 truncate">{student.name}</td>
                <td className="px-4 py-2">
                  <select
                    value={
                      attendanceData.find(
                        (item) => item.studentId === student.id
                      )?.attendance || ""
                    }
                    onChange={handleAttendanceChange(student.id)}
                    className={`px-2 py-1 border rounded ${
                      attendanceData.find(
                        (item) => item.studentId === student.id
                      )?.attendance === "Absent"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmitAttendance}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceManageContent;
