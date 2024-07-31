import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";

const UpdateStudentStatusContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/students`);
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
      await axiosInstance.put(`/api/admin/students/${selectedStudentId}`, {
        admissionStatus: true,
      });

      fetchStudents();
      setConfirmationDialogOpen(false);
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
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Update Student Status</h1>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="student-select"
        >
          Select Student
        </label>
        <select
          id="student-select"
          className="w-full p-3 border border-gray-300 rounded-lg"
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
        <PrimaryButton
          extra_styles={{
            backgroundColor: "#1E40AF",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
          }}
          onClick={handleOpenModal}
          disabled={!selectedStudentId}
        >
          Update Status
        </PrimaryButton>
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
        </DialogContent>
        <DialogActions className="flex justify-center pb-4">
          <PrimaryButton
            extra_styles={{
              backgroundColor: "#10B981",
              marginRight: "15px",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
            }}
            onClick={handleUpdateStatus}
          >
            Confirm
          </PrimaryButton>
          <PrimaryButton
            extra_styles={{
              backgroundColor: "#F87171",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </PrimaryButton>
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
