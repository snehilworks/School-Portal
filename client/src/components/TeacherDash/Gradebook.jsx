import React, { useState, useEffect } from "react";

const GradebookContent = () => {
  const [students, setStudents] = useState([]);

  const dummyStudents = [
    { id: 1, name: "John Doe", rollNumber: "001", grade: "A" },
    { id: 2, name: "Jane Smith", rollNumber: "002", grade: "B" },
    { id: 3, name: "Alice Johnson", rollNumber: "003", grade: "C" },
    { id: 4, name: "Bob Brown", rollNumber: "004", grade: "A" },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setStudents(dummyStudents);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Gradebook
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-xs sm:text-sm lg:text-base font-medium">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm lg:text-base font-medium">
                  Roll Number
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm lg:text-base font-medium sm:hidden lg:table-cell">
                  Grade (Till Last Semester)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-3 px-4 text-xs sm:text-sm lg:text-base truncate">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm lg:text-base">
                    {student.rollNumber}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm lg:text-base sm:hidden lg:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        student.grade === "A"
                          ? "bg-green-200 text-green-800"
                          : student.grade === "B"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {student.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradebookContent;
