import React, { useState, useEffect } from "react";

const ClassesContent = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);

  // Dummy data for demonstration
  const dummyClasses = [
    { id: 1, className: "Class A", subject: "Mathematics" },
    { id: 2, className: "Class B", subject: "Science" },
    { id: 3, className: "Class C", subject: "History" },
    { id: 4, className: "Class D", subject: "English" },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setTeacherClasses(dummyClasses);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-8">Classes Component</h1>
      <ul>
        {teacherClasses.map((classInfo) => (
          <li
            key={classInfo.id}
            className="flex justify-between items-center py-4 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md px-4"
          >
            <div>
              <p className="text-lg font-semibold">{classInfo.className}</p>
              <p className="text-sm">{classInfo.subject}</p>
            </div>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white hover:text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            > */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
            {/* </svg> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesContent;
