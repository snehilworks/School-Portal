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
        "http://localhost:4000/api/admin/teachers"
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
      // Make API call to delete the selected teacher
      console.log("Deleting teacher with ID:", selectedTeacherId);
      // Close confirmation dialog
      setConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleDeleteCanceled = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            <strong>Delete Teacher</strong>
          </Typography>
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel id="teacher-select-label">Select Teacher</InputLabel>
            <Select
              labelId="teacher-select-label"
              id="teacher-select"
              value={selectedTeacherId}
              onChange={handleSelectChange}
              fullWidth
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Confirmation dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleDeleteCanceled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCanceled} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" autoFocus>
            {" "}
            {/* Set color to red */}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteTeacherComponent;
