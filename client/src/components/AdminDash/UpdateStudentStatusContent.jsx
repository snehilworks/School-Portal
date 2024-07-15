import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import PrimaryButton from "../ui/PrimaryButton";

const UpdateStudentStatusContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [admissionStatus, setAdmissionStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/admin/students`
      );
      console.log("Fetched students:", response.data.students);
      setStudents(response.data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleOpenModal = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmationDialogOpen(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStudentId) return;

    try {
      // Make API call to update student status with selectedStudentId and admissionStatus
      const response = await axios.put(
        `${process.env.API_URL}/api/admin/students/${selectedStudentId}`,
        { admissionStatus }
      );
      console.log("Update status response:", response.data);

      // Optionally, fetch students again after updating
      fetchStudents();

      // Close modal after updating
      setConfirmationDialogOpen(false);

      // Show success snackbar
      setSnackbarMessage("Student admission status updated successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Student Status</h1>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="student-select"
        >
          Select Student
        </label>
        <select
          id="student-select"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={selectedStudentId}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Choose a student
          </option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleOpenModal}
          disabled={!selectedStudentId}
        >
          Update Status
        </button>
      </div>

      {/* Confirmation dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Update</DialogTitle>
        <DialogContent>
          <p className="text-gray-700 mb-4">
            Are you sure you want to update the admission status for this
            student?
          </p>
          <div className="flex justify-center">
            <PrimaryButton
              extra_styles={{ backgroundColor: "green", margin: "15px" }}
              onClick={() => {
                setAdmissionStatus(true);
                handleUpdateStatus();
              }}
            >
              Yes
            </PrimaryButton>
            <PrimaryButton
              extra_styles={{ backgroundColor: "red", margin: "15px" }}
              onClick={() => {
                setAdmissionStatus(false);
                handleUpdateStatus();
              }}
            >
              No
            </PrimaryButton>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="text-blue-500 font-bold"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default UpdateStudentStatusContent;
