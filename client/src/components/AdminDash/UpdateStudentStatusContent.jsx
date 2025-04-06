import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import _ from "lodash";
import {
  Search,
  UserCheck,
  Users,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Loader,
} from "lucide-react";

const UpdateStudentStatusContent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Debounced fetch function
  const fetchStudentsDebounced = useCallback(
    _.debounce(async (query, page) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/api/admin/students`, {
          params: {
            search: query,
            page: page,
          },
        });
        setStudents(response.data.students || []);
        setFilteredStudents(response.data.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        showSnackbar("Failed to load students data", "error");
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchStudentsDebounced(searchQuery, page);
  }, [searchQuery, page, fetchStudentsDebounced]);

  const handleSelectChange = (event) => {
    const studentId = event.target.value;
    setSelectedStudentId(studentId);

    // Find student name for display in confirmation dialog
    const student = students.find((s) => s._id === studentId);
    if (student) {
      setSelectedStudentName(student.name);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleOpenModal = () => {
    if (!selectedStudentId) {
      showSnackbar("Please select a student first", "warning");
      return;
    }
    setConfirmationDialogOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmationDialogOpen(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStudentId) return;

    try {
      setIsLoading(true);
      await axiosInstance.put(`/api/admin/students/${selectedStudentId}`, {
        admissionStatus: true,
      });

      fetchStudentsDebounced(searchQuery, page);
      setConfirmationDialogOpen(false);
      showSnackbar(
        `${selectedStudentName}'s admission status updated successfully`
      );
      setSelectedStudentId("");
      setSelectedStudentName("");
    } catch (error) {
      console.error("Error updating student status:", error);
      showSnackbar("Failed to update student status", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-8 border-b pb-6">
        <UserCheck size={28} className="text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Student Admission Management
        </h1>
      </div>

      <div className="mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
            placeholder="Search students by name or ID..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 flex items-center">
            <Users size={18} className="mr-2 text-indigo-600" />
            Select Student for Admission Approval
          </label>
          {selectedStudentId && (
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Student Details
              </h3>
              {(() => {
                const student = students.find(
                  (s) => s._id === selectedStudentId
                );
                if (!student) return null;
                return (
                  <ul className="text-gray-700 space-y-1">
                    <li>
                      <strong>Name:</strong> {student.name}
                    </li>
                    <li>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(student.dob).toLocaleDateString()}
                    </li>
                    <li>
                      <strong>Gender:</strong> {student.gender}
                    </li>
                    <li>
                      <strong>Class:</strong> {student.className}
                    </li>
                    <li>
                      <strong>Father's Name:</strong> {student.fatherName}
                    </li>
                    <li>
                      <strong>Mother's Name:</strong> {student.motherName}
                    </li>
                    <li>
                      <strong>Address:</strong> {student.address}
                    </li>
                    <li>
                      <strong>Aadhar Number:</strong> {student.aadharNumber}
                    </li>
                    <li>
                      <strong>Previous School TC:</strong>{" "}
                      {student.previousSchoolTC}
                    </li>
                    <li>
                      <strong>Phone:</strong> {student.phone}
                    </li>
                  </ul>
                );
              })()}
            </div>
          )}

          <div className="relative">
            <select
              className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg appearance-none bg-white text-gray-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
              value={selectedStudentId}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select a student
              </option>
              {filteredStudents.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
            selectedStudentId
              ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleOpenModal}
          disabled={!selectedStudentId || isLoading}
        >
          {isLoading ? (
            <Loader size={20} className="mr-2 animate-spin" />
          ) : (
            <CheckCircle size={20} className="mr-2" />
          )}
          Approve Admission
        </button>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmationDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="text-center mb-4">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Confirm Admission Approval
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                You are about to approve admission for:
              </p>
              <p className="text-lg font-medium bg-gray-50 p-3 rounded-lg text-center text-gray-800">
                {selectedStudentName}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                onClick={handleUpdateStatus}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader size={18} className="mr-2 animate-spin" />
                ) : (
                  <CheckCircle size={18} className="mr-2" />
                )}
                Confirm
              </button>
              <button
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      {snackbarOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
            snackbarSeverity === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {snackbarSeverity === "success" ? (
            <CheckCircle size={20} className="mr-2" />
          ) : (
            <AlertCircle size={20} className="mr-2" />
          )}
          <span>{snackbarMessage}</span>
          <button
            onClick={handleCloseSnackbar}
            className="ml-3 text-white opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading State - Shows when initially loading */}
      {isLoading && students.length === 0 && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
          <div className="flex flex-col items-center">
            <Loader size={40} className="text-indigo-600 animate-spin mb-2" />
            <p className="text-gray-600">Loading students data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateStudentStatusContent;
