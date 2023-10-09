// src/components/StudentProfile.js
import React from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import "./studentProfile.css";

function StudentProfile(props) {
  const { name, rollNo, classTeacher, classNo, section } = props;

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <CssBaseline />
        <Card
          className="cardStart"
          style={{
            boxSizing: "border-box",
            border: "1px solid black",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Student Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Name:</strong> {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Roll Number:</strong> {rollNo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Class Teacher:</strong> {classTeacher}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Class:</strong> {classNo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Section:</strong> {section}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default StudentProfile;
