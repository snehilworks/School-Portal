import React, { useState } from "react";
import { Typography, Button, Avatar, Box } from "@mui/material";
import StudentList from "./studentList";
import "./teacherProfile.css"; // Import the CSS file

const TeacherProfile = () => {
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);

  const toggleStudentList = () => {
    setShowStudentList(!showStudentList);
  };

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-info">
          <Box
            className="avatar-container"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              className="teacher-avatar"
              alt="Teacher Image"
              src="/path/to/teacher-image.jpg"
              sx={{ width: 300, height: 300 }}
            />
          </Box>
          <Typography variant="h4">Teacher Profile</Typography>
          <Typography className="teacher-name" variant="h6">
            Name: John Doe
          </Typography>
          <Typography className="teacher-info" variant="h6">
            Email: john.doe@example.com
          </Typography>
          <Typography className="teacher-info" variant="h6">
            Mobile: 123-456-7890
          </Typography>
          <Typography className="subjects-taught" variant="h6">
            Subjects Taught: 3
          </Typography>

          {isClassTeacher && (
            <div>
              <Button
                className="show-hide-button"
                variant="contained"
                onClick={toggleStudentList}
              >
                {showStudentList ? "Hide Student List" : "Show Student List"}
              </Button>
              {showStudentList && <StudentList />}
            </div>
          )}

          <Typography className="class-teacher" variant="h6">
            Class Teacher: {isClassTeacher ? "Yes" : "No"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
