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
} from "@mui/material";
import axios from "axios";

const DeleteTeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/admin/teachers`
      );
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
      await axios.delete(
        `${process.env.API_URL}/api/admin/teachers/${selectedTeacherId}`
      );
      // Update the teachers state to remove the deleted teacher
      setTeachers(
        teachers.filter((teacher) => teacher.id !== selectedTeacherId)
      );
      // Close confirmation dialog
      setConfirmationDialogOpen(false);
      // Clear selected teacher ID
      setSelectedTeacherId("");
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleDeleteCanceled = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        borderRadius: 4,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
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
        <FormControl fullWidth>
          <InputLabel id="teacher-select-label" sx={{ fontWeight: 500 }}>
            Select Teacher
          </InputLabel>
          <Select
            labelId="teacher-select-label"
            id="teacher-select"
            value={selectedTeacherId}
            onChange={handleSelectChange}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "text.primary",
              },
            }}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
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
    </Card>
  );
};

export default DeleteTeacherComponent;