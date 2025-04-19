import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";

function GradesPage() {
  const sampleGradesData = [
    { subject: "Mathematics", grade: "A", percentage: 92, status: "Excellent" },
    { subject: "Science", grade: "B+", percentage: 87, status: "Good" },
    {
      subject: "Social Studies",
      grade: "A+",
      percentage: 96,
      status: "Excellent",
    },
    { subject: "Sanskrit", grade: "B", percentage: 82, status: "Good" },
    { subject: "Hindi", grade: "A", percentage: 91, status: "Excellent" },
    { subject: "English", grade: "A+", percentage: 98, status: "Excellent" },
    {
      subject: "Computer Science",
      grade: "A-",
      percentage: 89,
      status: "Very Good",
    },
    {
      subject: "Physical Education",
      grade: "A",
      percentage: 90,
      status: "Excellent",
    },
  ];

  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState("Fall 2024");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call with loading state
      setLoading(true);
      setTimeout(() => {
        setGradesData(sampleGradesData);
        setLoading(false);
      }, 800); // Simulate network delay
    };

    fetchData();
  }, []);

  // Calculate GPA
  const calculateGPA = () => {
    const gradePoints = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    };

    const total = gradesData.reduce(
      (sum, course) => sum + gradePoints[course.grade],
      0
    );
    return (total / gradesData.length).toFixed(2);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600";
    if (grade.startsWith("B")) return "text-blue-600";
    if (grade.startsWith("C")) return "text-yellow-600";
    if (grade.startsWith("D")) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-emerald-100 text-black font-medium py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-teal-700 transition duration-200"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back</span>
            </motion.button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-4">
              Academic Performance
            </h1>
          </div>

          <div className="flex space-x-3">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
              <option value="Fall 2023">Fall 2023</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-teal-600 border border-teal-600 font-medium py-2 px-4 rounded-lg flex items-center hover:bg-teal-50 transition duration-200"
            >
              <Download size={18} className="mr-1" />
              <span className="hidden sm:inline">Export</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 800);
              }}
              className="bg-white text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-lg flex items-center hover:bg-gray-50 transition duration-200"
            >
              <RefreshCw
                size={18}
                className={`mr-1 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-lg">
              <h3 className="text-gray-500 font-medium mb-1">Semester GPA</h3>
              <p className="text-3xl font-bold text-teal-600">
                {!loading && calculateGPA()}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-gray-500 font-medium mb-1">Total Courses</h3>
              <p className="text-3xl font-bold text-blue-600">
                {gradesData.length}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-gray-500 font-medium mb-1">Semester</h3>
              <p className="text-xl font-bold text-green-600">{semester}</p>
            </div>
          </div>
        </motion.div>

        {/* Grades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600">
            <h2 className="text-xl font-semibold text-white">Course Grades</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Percentage
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gradesData.map((grade, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {grade.subject}
                      </td>
                      <td
                        className={`py-4 px-6 text-sm font-bold ${getGradeColor(
                          grade.grade
                        )}`}
                      >
                        {grade.grade}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 hidden sm:table-cell">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              grade.percentage >= 90
                                ? "bg-green-600"
                                : grade.percentage >= 80
                                ? "bg-blue-600"
                                : grade.percentage >= 70
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${grade.percentage}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{grade.percentage}%</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 hidden md:table-cell">
                        {grade.status}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default GradesPage;
