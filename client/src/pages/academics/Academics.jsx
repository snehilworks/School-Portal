import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import activitiesData from "./activitiesData";
import "./Academics.css";

const AcademicsPage = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="component-container flex flex-col gap-2 items-start">
        <p className="mb-2 laptop:mb-4 font-bold text-[30px] laptop:text-[40px]">Academics and Activities</p>

        <List className="academics-list">
          {activitiesData.map((activity, index) => (
            <ListItem key={index} className="academics-list-item">
              <ListItemText primary={activity.title} secondary={activity.date} className="academics-list-item-text" />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default AcademicsPage;
