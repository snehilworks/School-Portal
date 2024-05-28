import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMarksContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    // Fetch student data from API
    axios
      .get("https://api.example.com/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch marks data for the selected subject
    if (selectedSubject) {
      axios
        .get(`https://api.example.com/marks?subject=${selectedSubject}`)
        .then((response) => {
          setMarksData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks data:", error);
        });
    }
  }, [selectedSubject]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleMarksUpdate = (studentId, marks) => {
    // Update marks for the student with the given ID
    const updatedMarksData = marksData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          marks: marks,
        };
      }
      return item;
    });
    setMarksData(updatedMarksData);
  };

  const handleSubmitMarks = () => {
    // Submit updated marks data to the backend
    axios
      .post("https://api.example.com/update-marks", marksData)
      .then((response) => {
        console.log("Marks updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Update Marks
        </h1>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-center">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-bold mb-2 md:mb-0 md:mr-4"
          >
            Select Subject:
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
          </select>
        </div>
        {selectedSubject && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {marksData.map((student) => (
                <div
                  key={student.studentId}
                  className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {student.name}
                  </h3>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={student.marks}
                      onChange={(event) =>
                        handleMarksUpdate(student.studentId, event.target.value)
                      }
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-lg font-semibold shadow-md hover:shadow-lg"
                onClick={handleSubmitMarks}
              >
                Submit Marks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateMarksContent;
