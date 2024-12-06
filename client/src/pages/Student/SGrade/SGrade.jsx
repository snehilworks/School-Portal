import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call to fetch grades data (replace with actual API call)
      setGradesData(sampleGradesData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-100 via-green-200 to-teal-400 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg mb-6 hover:bg-teal-700 transition duration-200"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          My Grades
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-lg">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map((grade, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-teal-50" : "bg-teal-100"
                  } hover:bg-teal-200 transition duration-150`}
                >
                  <td className="py-3 px-6 text-gray-900">{grade.subject}</td>
                  <td className="py-3 px-6 text-gray-900">{grade.grade}</td>
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
