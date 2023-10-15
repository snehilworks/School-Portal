import React, { useState, useEffect } from "react";
import "./SGrade.css"; // Import your CSS file

function GradesPage() {
  // Simulated grades data (replace with actual data)
  const [gradesData, setGradesData] = useState([
    {
      subject: "maths",
      grade: "a",
    },
    {
      subject: "science",
      grade: "a",
    },
    {
      subject: "ss",
      grade: "a",
    },
    {
      subject: "sanskrit",
      grade: "a",
    },
    {
      subject: "hindi",
      grade: "a",
    },
    {
      subject: "english",
      grade: "a",
    },
  ]);

  useEffect(() => {
    // Simulated API call to fetch grades data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch student's grades data
      const response = await fetch("/api/student-grades-data");
      const data = await response.json();
      setGradesData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grades-page">
      <h1>My Grades</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradesData.map((grade, index) => (
            <tr key={index}>
              <td>{grade.subject}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesPage;
