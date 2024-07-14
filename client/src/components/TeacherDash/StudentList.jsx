import React, { useState, useEffect } from "react";

const StudentListContent = () => {
  const [students, setStudents] = useState([]);

  // Dummy data for demonstration
  const dummyStudents = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "001",
      payStatus: "Paid",
      details: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "002",
      payStatus: "Unpaid",
      details: "Consectetur adipiscing elit",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rollNumber: "003",
      payStatus: "Paid",
      details: "Sed do eiusmod tempor incididunt",
    },
    {
      id: 4,
      name: "Bob Brown",
      rollNumber: "004",
      payStatus: "Unpaid",
      details: "Ut labore et dolore magna aliqua",
    },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setStudents(dummyStudents);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Student List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full lg:table-fixed divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs lg:text-sm font-medium">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs lg:text-sm font-medium">
                  Roll Number
                </th>
                <th className="px-4 py-2 text-left text-xs lg:text-sm font-medium">
                  Pay Status
                </th>
                <th className="px-4 py-2 text-left text-xs lg:text-sm font-medium hidden lg:table-cell">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-xs lg:text-sm">
                    {student.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-xs lg:text-sm">
                    {student.rollNumber}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-xs lg:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-xs lg:text-sm ${
                        student.payStatus === "Paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {student.payStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs lg:text-sm truncate hidden lg:table-cell">
                    {student.details}
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

export default StudentListContent;
