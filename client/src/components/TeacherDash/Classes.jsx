import React, { useState, useEffect } from "react";

const ClassesContent = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);

  // Dummy data for demonstration
  const dummyClasses = [
    { id: 1, className: "Class 1st", subject: "Mathematics" },
    { id: 2, className: "Class 3rd-eng", subject: "Science" },
    { id: 3, className: "Class 4th-hindi", subject: "History" },
    { id: 4, className: "Class 3rd-hindi", subject: "English" },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setTeacherClasses(dummyClasses);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-8">Classes Component</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Classes</h2>
          <ul>
            {teacherClasses.map((classInfo) => (
              <li
                key={classInfo.id}
                className="py-2 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md px-4"
              >
                <p className="text-lg font-semibold">{classInfo.className}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Subjects</h2>
          <ul>
            {teacherClasses.map((classInfo) => (
              <li
                key={classInfo.id}
                className="py-2 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md px-4"
              >
                <p className="text-lg font-semibold">{classInfo.subject}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassesContent;
