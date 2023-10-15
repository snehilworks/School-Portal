import React, { useState, useEffect } from "react";
import "./SEvents.css"; // Import your CSS file

function EventsPage() {
  // Simulated events data (replace with actual data)
  const [events, setEvents] = useState([
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
    {
      date: "15/aug/2023",
      title: "independence day",
      description: "independence day 15 aug",
      time: "8:00 am",
    },
  ]);

  useEffect(() => {
    // Simulated API call to fetch events data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch events data
      const response = await fetch("/api/events-data");
      const data = await response.json();
      setEvents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="events-page">
      <h1>School Events</h1>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
