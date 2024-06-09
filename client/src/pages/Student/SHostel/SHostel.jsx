import React, { useState, useEffect } from "react";
import HostelFeesForm from "../../../components/StudentDash/HostelFeesForm"; // Adjust the import path as needed

function HostelDetailsPage() {
  const [hostelDetails, setHostelDetails] = useState({
    name: "Shivam Public Hostel",
    address: "123 ABC Street, City",
    capacity: 100,
    occupancy: 80,
    facilities: ["Food", "Laundry", "Cafeteria"],
    roomTypes: [
      { class: "6 to 10", price: "100,000" },
      { class: "11 & 12", price: "120,000" },
    ],
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      const response = await fetch("/api/hostel-details");
      const data = await response.json();
      setHostelDetails(data);
    };

    fetchHostelDetails();
  }, []);

  const handlePayFees = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-30">
        {" "}
        {/* Adjusted margin-top */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          {hostelDetails.name}
        </h1>
        <ul className="mb-6">
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-800">
              Address: {hostelDetails.address}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-800">
              Capacity: {hostelDetails.capacity}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-800">
              Occupancy: {hostelDetails.occupancy}
            </span>
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          Facilities:
        </h2>
        <ul className="mb-6">
          {hostelDetails.facilities.map((facility, index) => (
            <li key={index} className="flex items-center text-gray-800 mb-2">
              <span className="text-gray-800 mr-2">{facility}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          Room Types & Prices:
        </h2>
        <ul className="mb-6">
          {hostelDetails.roomTypes.map((roomType, index) => (
            <li key={index} className="flex items-center text-gray-800 mb-2">
              <span className="text-gray-800">
                Class {roomType.class}: INR {roomType.price}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handlePayFees}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Pay Hostel Fees
          </button>
        </div>
      </div>

      {/* HostelFeesForm Modal */}
      <HostelFeesForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  );
}

export default HostelDetailsPage;
