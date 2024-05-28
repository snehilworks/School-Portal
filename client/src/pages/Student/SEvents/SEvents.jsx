import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Container } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";

function EventsPage() {
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

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setEvents(sampleEventsData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-500 py-8">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center text-3xl font-bold text-gray-800 mb-8"
        >
          Upcoming Events
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="flex justify-center">
              <Card
                elevation={3}
                className="w-full max-w-md rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <EventIcon color="primary" fontSize="large" />
                  </div>
                  <Typography
                    variant="h5"
                    className="text-xl font-semibold text-indigo-600 mb-2"
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-800 mb-2"
                  >
                    Date: {event.date}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-800 mb-4"
                  >
                    Time: {event.time}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className="text-gray-700"
                  >
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default EventsPage;
