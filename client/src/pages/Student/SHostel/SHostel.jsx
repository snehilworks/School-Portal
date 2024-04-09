import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
// import "./HostelDetails.css"; // Import your CSS file

function HostelDetailsPage() {
  // Simulated hostel details data (replace with actual data)
  const [hostelDetails, setHostelDetails] = useState({
    name: "Sunshine Hostel",
    address: "123 ABC Street, City",
    capacity: 100,
    occupancy: 80,
    facilities: ["WiFi", "Laundry", "Gym", "Cafeteria"],
  });

  useEffect(() => {
    // Simulated API call to fetch hostel details data (replace with actual API call)
    const fetchHostelDetails = async () => {
      // Replace this with the API endpoint to fetch hostel details data
      const response = await fetch("/api/hostel-details");
      const data = await response.json();
      setHostelDetails(data);
    };

    fetchHostelDetails();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Hostel Details
      </Typography>
      <Card elevation={10} className="hostel-card">
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: "#3f51b5" }}>
            {hostelDetails.name}
          </Typography>
          <Grid container spacing={2} alignItems="center" marginBottom={2}>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocationOnIcon style={{ color: "#f50057" }} />
                </ListItemIcon>
                <ListItemText primary={`Address: ${hostelDetails.address}`} />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PeopleIcon style={{ color: "#4caf50" }} />
                </ListItemIcon>
                <ListItemText primary={`Capacity: ${hostelDetails.capacity}`} />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PeopleIcon style={{ color: "#fdd835" }} />
                </ListItemIcon>
                <ListItemText
                  primary={`Occupancy: ${hostelDetails.occupancy}`}
                />
              </ListItem>
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ color: "#3f51b5" }}
          >
            Facilities:
          </Typography>
          <List>
            {hostelDetails.facilities.map((facility, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {facility === "WiFi" && (
                    <WifiIcon style={{ color: "#2196f3" }} />
                  )}
                  {facility === "Laundry" && (
                    <LocalLaundryServiceIcon style={{ color: "#ff5722" }} />
                  )}
                  {facility === "Gym" && (
                    <FitnessCenterIcon style={{ color: "#4caf50" }} />
                  )}
                  {facility === "Cafeteria" && (
                    <RestaurantIcon style={{ color: "#f44336" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={facility} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default HostelDetailsPage;
