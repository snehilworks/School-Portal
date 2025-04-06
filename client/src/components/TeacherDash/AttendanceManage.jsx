import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceManageContent = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filter, setFilter] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [classSection, setClassSection] = useState("Class 8-A");
  const [classes, setClasses] = useState([
    "Class 8-A",
    "Class 8-B",
    "Class 9-A",
    "Class 9-B",
  ]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  // Status options with colors
  const statusOptions = [
    { value: "Present", color: "text-green-600 bg-green-50 border-green-200" },
    { value: "Absent", color: "text-red-600 bg-red-50 border-red-200" },
    { value: "Late", color: "text-amber-600 bg-amber-50 border-amber-200" },
  ];

  useEffect(() => {
    loadStudents();
  }, [classSection, date]);

  const loadStudents = () => {
    // In a real app, you would fetch students based on classSection and date
    // Expanded dummy data with more details
    const dummyStudents = [
      {
        id: 1,
        name: "John Doe",
        attendance: "Present",
        lastAttendance: [
          { date: "2025-03-03", status: "Present" },
          { date: "2025-03-02", status: "Present" },
          { date: "2025-03-01", status: "Absent" },
        ],
        notes: "",
        email: "john.doe@example.com",
        parentContact: "555-1234",
      },
      {
        id: 2,
        name: "Jane Smith",
        attendance: "Absent",
        lastAttendance: [
          { date: "2025-03-03", status: "Absent" },
          { date: "2025-03-02", status: "Absent" },
          { date: "2025-03-01", status: "Present" },
        ],
        notes: "Has doctor's appointment",
        email: "jane.smith@example.com",
        parentContact: "555-2345",
      },
      {
        id: 3,
        name: "Alice Johnson",
        attendance: "Present",
        lastAttendance: [
          { date: "2025-03-03", status: "Present" },
          { date: "2025-03-02", status: "Present" },
          { date: "2025-03-01", status: "Present" },
        ],
        notes: "",
        email: "alice.j@example.com",
        parentContact: "555-3456",
      },
      {
        id: 4,
        name: "Bob Brown",
        attendance: "Late",
        lastAttendance: [
          { date: "2025-03-03", status: "Late" },
          { date: "2025-03-02", status: "Present" },
          { date: "2025-03-01", status: "Present" },
        ],
        notes: "Bus delay",
        email: "bob.b@example.com",
        parentContact: "555-4567",
      },
      {
        id: 5,
        name: "Emily Davis",
        attendance: "Late",
        lastAttendance: [{ date: "2025-03-01", status: "Present" }],
        notes: "Family emergency",
        email: "emily.d@example.com",
        parentContact: "555-5678",
      },
      {
        id: 6,
        name: "Michael Wilson",
        attendance: "Present",
        lastAttendance: [
          { date: "2025-03-03", status: "Present" },
          { date: "2025-03-02", status: "Present" },
          { date: "2025-03-01", status: "Present" },
        ],
        notes: "",
        email: "michael.w@example.com",
        parentContact: "555-6789",
      },
      {
        id: 7,
        name: "Sarah Taylor",
        attendance: "Present",
        lastAttendance: [
          { date: "2025-03-03", status: "Present" },
          { date: "2025-03-02", status: "Late" },
          { date: "2025-03-01", status: "Present" },
        ],
        notes: "",
        email: "sarah.t@example.com",
        parentContact: "555-7890",
      },
      {
        id: 8,
        name: "James Anderson",
        attendance: "Absent",
        lastAttendance: [
          { date: "2025-03-03", status: "Absent" },
          { date: "2025-03-02", status: "Absent" },
          { date: "2025-03-01", status: "Absent" },
        ],
        notes: "Extended illness",
        email: "james.a@example.com",
        parentContact: "555-8901",
      },
    ];

    setStudents(dummyStudents);

    const initialAttendanceData = dummyStudents.map((student) => ({
      studentId: student.id,
      attendance: student.attendance,
      notes: student.notes,
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleAttendanceChange = (studentId) => (event) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          attendance: event.target.value,
        };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const handleNoteChange = (studentId) => (event) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      if (item.studentId === studentId) {
        return {
          ...item,
          notes: event.target.value,
        };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const handleBulkAction = (action) => {
    const updatedAttendanceData = attendanceData.map((item) => ({
      ...item,
      attendance: action,
    }));
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);

    // Create payload with date and class information
    const payload = {
      date: date,
      classSection: classSection,
      attendanceRecords: attendanceData,
    };

    // In a real application, this would send to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      setNotification({
        show: true,
        message: "Attendance submitted successfully!",
        type: "success",
      });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
    }, 1000);

    console.log("Submitting attendance data:", payload);
  };

  const toggleStudentDetails = (studentId) => {
    if (expandedStudentId === studentId) {
      setExpandedStudentId(null);
    } else {
      setExpandedStudentId(studentId);
    }
  };

  const getStatusBadgeClass = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.color : "text-gray-600 bg-gray-50 border-gray-200";
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.attendance === filter);

  const getAttendanceStats = () => {
    const total = students.length;
    const present = students.filter((s) => s.attendance === "Present").length;
    const absent = students.filter((s) => s.attendance === "Absent").length;
    const late = students.filter((s) => s.attendance === "Late").length;

    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 md:p-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Attendance Management
            </h1>
            <p className="text-blue-100">
              Track and manage your class attendance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="px-3 py-2 rounded border text-gray-800 bg-white w-full sm:w-auto"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded border text-gray-800 bg-white w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-4 bg-gray-50">
        <div className="bg-white p-3 md:p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="text-xs md:text-sm text-gray-500">Total Students</div>
          <div className="text-lg md:text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="text-xs md:text-sm text-gray-500">Present</div>
          <div className="text-lg md:text-2xl font-bold text-green-600">
            {stats.present}
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="text-xs md:text-sm text-gray-500">Absent</div>
          <div className="text-lg md:text-2xl font-bold text-red-600">
            {stats.absent}
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow border-l-4 border-amber-500">
          <div className="text-xs md:text-sm text-gray-500">Late</div>
          <div className="text-lg md:text-2xl font-bold text-amber-600">
            {stats.late}
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 mb-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded text-gray-700 w-full sm:w-auto"
            >
              <option value="All">All Students</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            <button
              className="bg-white border border-gray-300 px-3 py-2 rounded hover:bg-gray-50 w-full sm:w-auto"
              onClick={() => loadStudents()}
            >
              Refresh
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="font-medium text-gray-700 mr-2">Mark All:</div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleBulkAction(status.value)}
                  className={`px-3 py-1 rounded border ${
                    status.color.split(" ")[0]
                  } ${status.color.split(" ")[1]} border`}
                >
                  {status.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification.show && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="w-full border-collapse">
            <thead className="hidden sm:table-header-group">
              <tr className="bg-gray-100 border-b">
                <th className="p-3 md:p-4 text-left font-medium text-gray-700 w-12">
                  #
                </th>
                <th className="p-3 md:p-4 text-left font-medium text-gray-700">
                  Student Name
                </th>
                <th className="p-3 md:p-4 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="p-3 md:p-4 text-left font-medium text-gray-700">
                  Notes
                </th>
                <th className="p-3 md:p-4 text-left font-medium text-gray-700">
                  History
                </th>
                <th className="p-3 md:p-4 text-center font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No students found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => {
                  const studentAttendance = attendanceData.find(
                    (item) => item.studentId === student.id
                  );
                  const isExpanded = expandedStudentId === student.id;

                  return (
                    <React.Fragment key={student.id}>
                      <tr
                        className={`border-b hover:bg-gray-50 ${
                          isExpanded ? "bg-blue-50" : ""
                        } flex flex-col sm:table-row`}
                      >
                        <td className="hidden sm:table-cell p-3 md:p-4 text-gray-500">
                          {index + 1}
                        </td>
                        <td className="p-3 md:p-4 font-medium flex justify-between items-center sm:table-cell">
                          <span>{student.name}</span>
                          <button
                            className="sm:hidden text-blue-600"
                            onClick={() => toggleStudentDetails(student.id)}
                          >
                            {isExpanded ? "Hide" : "View"}
                          </button>
                        </td>
                        <td className="p-3 md:p-4 sm:table-cell">
                          <div className="flex justify-between items-center sm:block">
                            <span className="text-sm font-medium sm:hidden">
                              Status:
                            </span>
                            <select
                              value={studentAttendance?.attendance || ""}
                              onChange={handleAttendanceChange(student.id)}
                              className={`px-2 sm:px-3 py-1 sm:py-2 rounded border text-sm sm:text-base ${getStatusBadgeClass(
                                studentAttendance?.attendance
                              )}`}
                            >
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="p-3 md:p-4 sm:table-cell">
                          <div className="flex justify-between items-center sm:block">
                            <span className="text-sm font-medium sm:hidden">
                              Notes:
                            </span>
                            <input
                              type="text"
                              placeholder="Add notes..."
                              value={studentAttendance?.notes || ""}
                              onChange={handleNoteChange(student.id)}
                              className="w-full sm:w-full px-2 sm:px-3 py-1 sm:py-2 border rounded text-sm sm:text-base text-gray-700"
                            />
                          </div>
                        </td>
                        <td className="p-3 md:p-4 sm:table-cell">
                          <div className="flex justify-between items-center sm:block">
                            <span className="text-sm font-medium sm:hidden">
                              History:
                            </span>
                            <div className="flex space-x-1 sm:space-x-2">
                              {student.lastAttendance
                                .slice(0, 3)
                                .map((record, i) => (
                                  <span
                                    key={i}
                                    className={`h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full text-xs ${getStatusBadgeClass(
                                      record.status
                                    )}`}
                                    title={`${record.date}: ${record.status}`}
                                  >
                                    {record.status.charAt(0)}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell p-3 md:p-4 text-center">
                          <button
                            onClick={() => toggleStudentDetails(student.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {isExpanded ? "Hide Details" : "View Details"}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-blue-50">
                          <td colSpan="6" className="p-3 md:p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">
                                  Contact Information
                                </h4>
                                <p className="text-sm md:text-base">
                                  <span className="text-gray-500">Email:</span>{" "}
                                  {student.email}
                                </p>
                                <p className="text-sm md:text-base">
                                  <span className="text-gray-500">
                                    Parent Contact:
                                  </span>{" "}
                                  {student.parentContact}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">
                                  Attendance History
                                </h4>
                                <div className="space-y-1">
                                  {student.lastAttendance.map((record, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between p-2 bg-white rounded text-sm md:text-base"
                                    >
                                      <span>{record.date}</span>
                                      <span
                                        className={`px-2 py-1 rounded text-xs ${getStatusBadgeClass(
                                          record.status
                                        )}`}
                                      >
                                        {record.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with Submit Button */}
      <div className="bg-gray-50 p-4 border-t rounded-b-lg flex justify-end">
        <button
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
          onClick={handleSubmitAttendance}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceManageContent;
