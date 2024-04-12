import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";

const TeacherSidebar = ({ setSelectedContent, isSidebarOpen }) => {
  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <List>
        <ListItem onClick={() => handleItemClick("Manage Attendance")}>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Attendance" />
        </ListItem>
        <ListItem onClick={() => handleItemClick("Update Marks")}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Update Marks" />
        </ListItem>
        <ListItem onClick={() => handleItemClick("Student Lists")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Student Lists" />
        </ListItem>
        <ListItem onClick={() => handleItemClick("Classes")}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItem>
        <ListItem onClick={() => handleItemClick("Gradebook")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Gradebook" />
        </ListItem>
      </List>
    </div>
  );
};

export default TeacherSidebar;
