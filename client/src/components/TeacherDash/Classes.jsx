import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

const ClassesContent = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);

  // Dummy data for demonstration
  const dummyClasses = [
    { id: 1, className: "Class A", subject: "Mathematics" },
    { id: 2, className: "Class B", subject: "Science" },
    { id: 3, className: "Class C", subject: "History" },
    { id: 4, className: "Class D", subject: "English" },
  ];

  useEffect(() => {
    // Set dummy data to state variable
    setTeacherClasses(dummyClasses);
  }, []);

  return (
    <Card style={{ backgroundColor: "#3f51b5", color: "white" }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Classes Component
        </Typography>
        <List>
          {teacherClasses.map((classInfo) => (
            <React.Fragment key={classInfo.id}>
              <ListItem
                style={{
                  "&:hover": {
                    backgroundColor: "#9fa8da",
                    color: "#303",
                  },
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ style: { color: "inherit" } }}
                  primary={`Class: ${classInfo.className}`}
                />
              </ListItem>
              <ListItem
                style={{
                  "&:hover": {
                    backgroundColor: "#9fa8da",
                    color: "#303",
                  },
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ style: { color: "inherit" } }}
                  primary={`Subject: ${classInfo.subject}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ClassesContent;
