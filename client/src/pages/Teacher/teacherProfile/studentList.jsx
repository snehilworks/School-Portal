import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const StudentList = () => {
  // Dummy student data
  const students = [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
    { id: 4, name: "Student 4" },
    { id: 5, name: "Student 5" },
    { id: 6, name: "Student 6" },
    { id: 7, name: "Student 7" },
    { id: 8, name: "Student 8" },
  ];

  return (
    <div>
      <Typography variant="h6">
        Number of Students: {students.length}
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemText primary={student.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudentList;
