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

const AcademicsPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ margin: "2rem 0" }}>
        Academics and Activities
      </Typography>
      <List>
        {activitiesData.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={activity.title}
                secondary={activity.date}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default AcademicsPage;
