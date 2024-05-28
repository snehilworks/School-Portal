import React, { useState, useEffect } from "react";

function GradesPage() {
  const sampleGradesData = [
    { subject: "Maths", grade: "A" },
    { subject: "Science", grade: "B" },
    { subject: "Social Studies", grade: "A+" },
    { subject: "Sanskrit", grade: "B" },
    { subject: "Hindi", grade: "A" },
    { subject: "English", grade: "A+" },
    // Add more data as needed
  ];

  const [gradesData, setGradesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call to fetch grades data (replace with actual API call)
      // For now, we're using the sample grades data
      setGradesData(sampleGradesData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-200 via-blue-300 to-gray-400 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Grades
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map((grade, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-blue-900" : "bg-blue-800"}
                >
                  <td className="py-3 px-6 text-white">{grade.subject}</td>
                  <td className="py-3 px-6 text-white">{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GradesPage;
