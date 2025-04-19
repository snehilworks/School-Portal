import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronLeft } from "lucide-react";

function StudentAttendance() {
  const sampleAttendanceData = [
    { date: "2022-10-01", status: "Present" },
    { date: "2022-10-02", status: "Absent" },
    { date: "2022-10-03", status: "Present" },
    { date: "2022-10-04", status: "Present" },
    { date: "2022-10-05", status: "Present" },
    { date: "2022-10-06", status: "Present" },
    { date: "2022-10-07", status: "Present" },
    { date: "2022-10-08", status: "Absent" },
    { date: "2022-10-09", status: "Present" },
    { date: "2022-10-10", status: "Present" },
    // Add more data as needed
  ];

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState("2022");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Simulate data loading with a delay
      setTimeout(() => {
        setAttendanceData(sampleAttendanceData);
      }, 300);
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch attendance data for the selected month
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Fetch attendance data for the selected year
  };

  // Calculate attendance statistics
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(
    (day) => day.status === "Present"
  ).length;
  const absentDays = totalDays - presentDays;
  const attendancePercentage =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen pt-16 pb-8">
      {/* Page Header - Adjusted to start after appbar (pt-16) */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 pt-6 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-3 rounded-lg">
              <Calendar size={24} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              My Attendance
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Total Days
            </span>
            <span className="text-3xl font-bold text-gray-800">
              {totalDays}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Present
            </span>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-green-600">
                {presentDays}
              </span>
              <span className="text-sm text-gray-500 ml-2 mb-1">days</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Absent
            </span>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-red-500">
                {absentDays}
              </span>
              <span className="text-sm text-gray-500 ml-2 mb-1">days</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <span className="text-sm font-medium text-gray-500 mb-1">
              Attendance Rate
            </span>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-indigo-600">
                {attendancePercentage}%
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    attendancePercentage >= 90
                      ? "bg-green-500"
                      : attendancePercentage >= 75
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 md:mb-0">
              Attendance Records
            </h2>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
              {/* Month Selector */}
              <div className="flex-1">
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div className="flex-1">
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                >
                  {["2022", "2023", "2024", "2025"].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.length > 0 ? (
                  attendanceData.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Loading attendance records...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-100 border border-green-600 mr-2"></span>
                  <span className="text-gray-600">Present</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-100 border border-red-600 mr-2"></span>
                  <span className="text-gray-600">Absent</span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-2 md:mt-0">
                Showing {attendanceData.length} records for {selectedMonth}{" "}
                {selectedYear}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-xl shadow-md mt-6 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Attendance Policy
          </h3>
          <p className="text-gray-600 mb-4">
            Students are required to maintain at least 75% attendance in all
            courses. Falling below this threshold may result in academic
            penalties or ineligibility to sit for final exams.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your current attendance is {attendancePercentage}%.{" "}
                  {attendancePercentage < 75
                    ? "Please improve your attendance."
                    : "Keep up the good attendance!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;
