import React, { useState, useEffect } from "react";
import "./Hostel.css"; // Import your CSS file

function HostelDetails() {
  // Simulated hostel room data (replace with actual data)
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch room data (replace with actual API call)
    const fetchData = async () => {
      // Replace this with the API endpoint to fetch hostel room data
      const response = await fetch("/api/hostel-room-data");
      const data = await response.json();
      setRoomData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="hostel-details">
      <h1>Hostel Room Details</h1>
      <div className="room-list">
        {roomData.map((room, index) => (
          <div className="room" key={index}>
            <h2>Room {room.number}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>Available: {room.available ? "Yes" : "No"}</p>
            <p>Price: ${room.price} per month</p>
            <p>Facilities: {room.facilities.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostelDetails;
