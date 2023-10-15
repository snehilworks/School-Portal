import React, { useState } from "react";
import { Typography, Button, Avatar, Box } from "@mui/material";
import StudentList from "./StudentList";
import "./TeacherProfile.css"; // Import the CSS file

const TeacherProfile = () => {
  const [isClassTeacher, setIsClassTeacher] = useState(true);
  const [showStudentList, setShowStudentList] = useState(false);

  const toggleStudentList = () => {
    setShowStudentList(!showStudentList);
  };

  return (
    <div className="container">
      <div className="profile-header">
        <Box className="avatar-container">
          <Avatar
            className="teacher-avatar"
            alt="Teacher Image"
            src="/path/to/teacher-image.jpg"
            sx={{ width: 200, height: 200 }}
          />
        </Box>
        <Typography variant="h4" className="teacher-name">
          John Doe
        </Typography>
        <Typography variant="h6" className="teacher-info">
          Email: john.doe@example.com
        </Typography>
        <Typography variant="h6" className="teacher-info">
          Mobile: 123-456-7890
        </Typography>
        <Typography variant="h6" className="subjects-taught">
          Subjects: 3
        </Typography>

        {/* {isClassTeacher && (
          <div>
            <Button
              className="show-hide-button"
              variant="contained"
              onClick={toggleStudentList}
            >
              {showStudentList ? "Hide Student List" : "Show Student List"}
            </Button>
          </div>
        )} */}

        <Typography
          variant="h6"
          className={`class-teacher ${
            isClassTeacher ? "class-teacher-yes" : "class-teacher-no"
          }`}
        >
          Class Teacher: {isClassTeacher ? "Yes" : "No"}
        </Typography>
      </div>

      {/* {showStudentList && (
        <div className="student-list-container">
          <StudentList />
        </div>
      )} */}
    </div>
  );
};

export default TeacherProfile;
