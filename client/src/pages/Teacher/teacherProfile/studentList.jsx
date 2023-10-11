import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const StudentList = () => {
  // Dummy student data
  const students = [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
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
