import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const DeleteTeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedTeacherId(event.target.value);
  };

  const handleDeleteButtonClick = () => {
    setConfirmationDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      console.log("Deleting teacher with ID:", selectedTeacherId);
      await axiosInstance.delete(`/api/admin/teacher/${selectedTeacherId}`);

      // Fetch updated list of teachers after deletion
      await fetchTeachers();

      // Close confirmation dialog
      setConfirmationDialogOpen(false);

      // Clear selected teacher ID
      setSelectedTeacherId("");

      // Show success message
      setSuccessMessage("Teacher Details Deleted Successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleDeleteCanceled = () => {
    setConfirmationDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        borderRadius: 8,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        padding: "24px",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Delete Teacher
        </Typography>
        <FormControl fullWidth style={{ marginBottom: "24px" }}>
          <InputLabel id="teacher-select-label">Select Teacher</InputLabel>
          <Select
            labelId="teacher-select-label"
            id="teacher-select"
            value={selectedTeacherId}
            onChange={handleSelectChange}
            fullWidth
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteButtonClick}
            sx={{
              borderRadius: 30,
              fontWeight: 600,
              px: 5,
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
              transform: "translateY(-4px)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.25)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>

      {/* Confirmation dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleDeleteCanceled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCanceled}
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirmed}
            color="error"
            autoFocus
            sx={{ fontWeight: 500 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DeleteTeacherComponent;
