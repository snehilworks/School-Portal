import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const sampleEventsData = [
    {
      date: "15/aug/2023",
      title: "Independence Day",
      description:
        "Join us for a grand celebration with a parade, music, and fireworks.",
      time: "8:00 AM",
      image: "https://example.com/independence-day.jpg", // Add real image URL
    },
    {
      date: "25/dec/2023",
      title: "Christmas Celebration",
      description:
        "Celebrate Christmas with music, food, and exciting activities.",
      time: "7:00 PM",
      image: "https://example.com/christmas.jpg", // Add real image URL
    },
    {
      date: "31/dec/2023",
      title: "New Year's Eve Party",
      description:
        "Welcome the New Year with live music, drinks, and a countdown to midnight.",
      time: "9:00 PM",
      image: "https://example.com/new-years-eve.jpg", // Add real image URL
    },
  ];

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setEvents(sampleEventsData);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-teal-300 py-16">
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
          className="mb-8 text-white bg-teal-500 shadow-xl hover:shadow-2xl"
          style={{
            backgroundColor: "#0F766E",
            borderRadius: "30px",
            padding: "14px 28px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#00796b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#004d40")}
        >
          ← Back
        </Button>

        {/* Header */}
        <Typography
          variant="h2"
          align="center"
          className="text-black !font-serif text-5xl font-extrabold mb-12 tracking-tight leading-tight"
        >
          Upcoming Events
        </Typography>

        {/* Event Cards (Responsive Layout) */}
        <div className="flex flex-col items-center">
          {events.map((event, index) => (
            <div key={index} className="w-full max-w-3xl">
              {/* Event Image */}
              <div
                className="w-full bg-cover rounded-t-lg mb-6"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px 10px 0 0",
                }}
              />

              {/* Event Details */}
              <Card
                elevation={6}
                className="w-full p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <CardContent className="flex flex-col sm:flex-row space-y-4 sm:space-x-8">
                  {/* Left Side - Event Title */}
                  <div className="flex-1">
                    <Typography
                      variant="h4"
                      className="text-teal-700 text-2xl font-bold mb-4"
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="h6" className="text-gray-800 mb-2">
                      <strong>{event.date}</strong>
                    </Typography>
                    <Typography variant="h6" className="text-gray-800 mb-4">
                      <strong>{event.time}</strong>
                    </Typography>
                  </div>

                  {/* Right Side - Event Description */}
                  <div className="flex-1">
                    <Typography
                      variant="body1"
                      className="text-gray-700"
                      style={{ lineHeight: "1.6", textAlign: "left" }}
                    >
                      {event.description}
                    </Typography>
                  </div>
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
