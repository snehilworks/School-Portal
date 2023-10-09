import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import activitiesData from "./activitiesData";
import "./Academics.css"; // Import the CSS file

const AcademicsPage = () => {
  return (
    <Container maxWidth="md" className="academics-container">
      <Typography variant="h4" align="center" className="academics-heading">
        Academics and Activities
      </Typography>
      <List className="academics-list">
        {activitiesData.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem className="academics-list-item">
              <ListItemText
                primary={activity.title}
                secondary={activity.date}
                className="academics-list-item-text"
              />
            </ListItem>
            {index !== activitiesData.length - 1 && (
              <Divider className="academics-divider" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default AcademicsPage;
