import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const DeleteTeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/admin/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setError("Failed to load teachers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const teacherId = event.target.value;
    setSelectedTeacherId(teacherId);

    // Find the teacher name for better UX in confirmation
    const selectedTeacher = teachers.find(
      (teacher) => teacher._id === teacherId
    );
    setSelectedTeacherName(selectedTeacher ? selectedTeacher.name : "");
  };

  const handleDeleteButtonClick = () => {
    if (selectedTeacherId) {
      setConfirmationDialogOpen(true);
    }
  };

  const handleDeleteConfirmed = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/admin/teacher/${selectedTeacherId}`);

      // Fetch updated list of teachers after deletion
      await fetchTeachers();

      // Close confirmation dialog
      setConfirmationDialogOpen(false);

      // Clear selected teacher ID
      setSelectedTeacherId("");
      setSelectedTeacherName("");

      // Show success message
      setSuccessMessage(
        `Teacher "${selectedTeacherName}" deleted successfully`
      );
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting teacher:", error);
      setError("Failed to delete teacher. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCanceled = () => {
    setConfirmationDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className=" bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-100 py-6 px-8">
        <h2 className="text-2xl font-bold text-white">Delete Teacher</h2>
        <p className="text-blue-100 mt-1">Remove a teacher from the system</p>
      </div>

      {/* Card Content */}
      <div className="p-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Teacher Select Dropdown */}
        <div className="mb-8">
          <label
            htmlFor="teacher-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Teacher
          </label>
          <div className="relative">
            <select
              id="teacher-select"
              value={selectedTeacherId}
              onChange={handleSelectChange}
              className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm transition-colors duration-200 bg-white border"
              disabled={isLoading || teachers.length === 0}
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {teachers.length === 0 && !isLoading && !error && (
            <p className="mt-2 text-sm text-gray-500">
              No teachers available in the system.
            </p>
          )}
        </div>

        {/* Delete Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleDeleteButtonClick}
            disabled={!selectedTeacherId || isLoading}
            className={`px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 ${
              !selectedTeacherId || isLoading
                ? "bg-gray-400 cursor-not-allowed opacity-70"
                : "bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
                Delete Teacher
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmationDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-8 w-8 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800">
                    Confirm Deletion
                  </h3>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-700">
                Are you sure you want to delete{" "}
                <strong>{selectedTeacherName}</strong>? This action cannot be
                undone.
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={handleDeleteCanceled}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Toast */}
      {openSnackbar && (
        <div className="fixed bottom-4 right-4 max-w-xs z-50">
          <div
            className={`rounded-lg shadow-lg p-4 mb-4 flex items-center ${
              error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            <svg
              className={`h-5 w-5 mr-3 ${
                error ? "text-red-500" : "text-green-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {error ? (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">{error || successMessage}</p>
            </div>
            <button
              onClick={handleCloseSnackbar}
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteTeacherComponent;
