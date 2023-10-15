// src/components/StudentProfile.js
import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import "./StudentProfile.css";

function StudentProfile(props) {
  const { name, rollNo, classTeacher, classNo, section } = props;

  return (
    <div className="student-profile">
      <Container maxWidth="sm">
        <Card className="student-profile-card">
          <CardContent>
            <Typography variant="h5" component="div">
              Student Profile
            </Typography>
            <div className="student-info">
              <Typography variant="body2">
                <strong>Name:</strong> {name}
              </Typography>
              <Typography variant="body2">
                <strong>Roll Number:</strong> {rollNo}
              </Typography>
              <Typography variant="body2">
                <strong>Class Teacher:</strong> {classTeacher}
              </Typography>
              <Typography variant="body2">
                <strong>Class:</strong> {classNo}
              </Typography>
              <Typography variant="body2">
                <strong>Section:</strong> {section}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default StudentProfile;
