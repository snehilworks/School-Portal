import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import header from "../../headers";

const ClassesContent = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("teacherToken");
        if (!token) {
          throw new Error("No token found");
        }

        const meResponse = await axiosInstance.get(`/api/teacher/me`);
        const teacherId = meResponse.data.teacherId;

        // Get the teacher's details using the retrieved teacher ID
        const teacherResponse = await axiosInstance.get(
          `/api/teacher/${teacherId}`
        );
        const teacherData = teacherResponse.data.data; // Assuming teacherData is structured as { data: { classes: [...] } }

        // Set the teacher classes to state
        setTeacherClasses(teacherData.classes);
        setTeacherSubjects(teacherData.subjects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-8">Classes Component</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Classes</h2>
          <ul>
            {teacherClasses.map((className, index) => (
              <li
                key={index}
                className="py-2 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md px-4"
              >
                <p className="text-lg font-semibold">{className}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Subjects</h2>
          <ul>
            {teacherSubjects.map((Subject, index) => (
              <li
                key={index}
                className="py-2 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md px-4"
              >
                <p className="text-lg font-semibold">{Subject}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassesContent;
