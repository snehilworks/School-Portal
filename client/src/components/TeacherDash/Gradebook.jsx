import React, { useState, useEffect } from "react";

const GradebookContent = () => {
  const [students, setStudents] = useState([]);

  // Dummy data for demonstration
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
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full table-auto md:table-fixed border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Roll Number</th>
                <th className="py-3 px-6 text-left">
                  Grade (Till Last Semester)
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap truncate md:whitespace-normal md:max-w-xs">
                    {student.name}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
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
