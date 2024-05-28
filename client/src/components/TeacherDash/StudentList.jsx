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
          <table className="w-full table-auto md:table-fixed">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 w-1/4 md:w-auto">Name</th>
                <th className="px-4 py-2 w-1/4 md:w-auto">Roll Number</th>
                <th className="px-4 py-2 w-1/4 md:w-auto">Pay Status</th>
                <th className="px-4 py-2 w-1/4 md:w-auto">Details</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-2 whitespace-nowrap truncate md:whitespace-normal md:max-w-xs">
                    {student.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full font-semibold ${
                        student.payStatus === "Paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {student.payStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 truncate md:whitespace-normal md:max-w-xs">
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
