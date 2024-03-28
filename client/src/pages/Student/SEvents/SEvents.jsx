import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Grid, Container } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import "./SEvents.css"; // Import your CSS file

function EventsPage() {
  // Sample events data
  const sampleEventsData = [
    {
      date: "15/aug/2023",
      title: "Independence Day",
      description: "Celebrate Independence Day on 15th August",
      time: "8:00 AM",
    },
    {
      date: "25/dec/2023",
      title: "Christmas Celebration",
      description: "Join us for Christmas celebrations",
      time: "7:00 PM",
    },
    {
      date: "31/dec/2023",
      title: "New Year's Eve Party",
      description: "Welcome the New Year with us",
      time: "9:00 PM",
    },
    // Add more events as needed
  ];

  // State for events data
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch events data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch events data
      // For now, we're using the sample events data
      setEvents(sampleEventsData);
    };

    fetchData();
  }, []);

  return (
    <div className="events-page">
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom className="title">
          School Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} className="event-card">
                <CardContent>
                  <EventIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="h2" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Date: {event.date}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Time: {event.time}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default EventsPage;
