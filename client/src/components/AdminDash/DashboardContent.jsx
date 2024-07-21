import React from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Card, CardContent, CardHeader, Avatar, Divider } from "@mui/material";
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import {
  EventAvailable as EventIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";

const DashboardContent = () => {
  const handleClick = async () => {
    try {
      await axiosInstance.get(`/api/admin/teachers`);
      // Handle successful response (optional)
      console.log("Request to /api/admin/teachers successful");
    } catch (error) {
      // Handle error (optional)
      console.error("Error fetching teachers:", error);
    }
  };
  return (
    <Grid container spacing={3}>
      {/* Total Students Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: "#f3f4f6" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Total Students
            </Typography>
            <Avatar sx={{ backgroundColor: "#4caf50" }}>500</Avatar>{" "}
            {/* Example: Total number of students */}
          </Box>
          <Divider />
          <Button variant="contained" fullWidth color="primary">
            View Students
          </Button>
        </Paper>
      </Grid>

      {/* Total Teachers Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: "#f3f4f6" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Total Teachers
            </Typography>
            <Avatar sx={{ backgroundColor: "#ff9800" }}>50</Avatar>{" "}
            {/* Example: Total number of teachers */}
          </Box>
          <Divider />
          <Button
            onClick={handleClick}
            variant="contained"
            fullWidth
            color="primary"
          >
            View Teachers
          </Button>
        </Paper>
      </Grid>

      {/* Recent Announcements Card */}
      <Grid item xs={12}>
        <Card sx={{ bgcolor: "#f3f4f6" }}>
          <CardHeader
            title="Recent Announcements"
            sx={{ bgcolor: "#2196f3", color: "#fff" }}
          />
          <CardContent>
            <List>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#2196f3" }}>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Lorem ipsum dolor sit amet"
                  secondary="2 days ago"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#2196f3" }}>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Consectetur adipiscing elit"
                  secondary="1 week ago"
                />
              </ListItem>
            </List>
            <Button variant="contained" fullWidth color="primary">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Upcoming Events Card */}
      <Grid item xs={12}>
        <Card sx={{ bgcolor: "#f3f4f6" }}>
          <CardHeader
            title="Upcoming Events"
            sx={{ bgcolor: "#f44336", color: "#fff" }}
          />
          <CardContent>
            <List>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#f44336" }}>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Parent-Teacher Meeting"
                  secondary="10th March 2024"
                />
              </ListItem>
              <ListItem disablePadding>
                {/* <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#f44336" }}>
                  <EventIcon />
                </Avatar>
              </ListItemAvatar> */}
                {/* <ListItemText
                primary="School Picnic"
                secondary="15th March 2024"
              /> */}
              </ListItem>
            </List>
            {/* <Button variant="contained" fullWidth color="primary">
            Add New Event
          </Button> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
