import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HostelFeesForm from "../../../components/StudentDash/HostelFeesForm"; // Adjust the import path as needed

function HostelDetailsPage() {
  const [hostelDetails, setHostelDetails] = useState({
    name: "Shivam Public Hostel",
    address: "123 ABC Street, City",
    capacity: 100,
    occupancy: 80,
    facilities: ["Food", "Laundry", "Cafeteria"],
    roomTypes: [
      { class: "3 to 6", price: "60,000" },
      { class: "7 & 10", price: "100,000" },
    ],
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 py-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md mb-6 hover:bg-teal-700 transition duration-300"
        >
          ← Back
        </button>
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-teal-800 mb-4">
            {hostelDetails.name}
          </h1>
          <div className="flex flex-col space-y-2 mb-6">
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-teal-600">Address:</span>{" "}
              {hostelDetails.address}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-teal-600">Capacity:</span>{" "}
              {hostelDetails.capacity}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-teal-600">Occupancy:</span>{" "}
              {hostelDetails.occupancy}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Facilities
          </h2>
          <ul className="list-disc list-inside pl-5 space-y-2">
            {hostelDetails.facilities.map((facility, index) => (
              <li key={index} className="text-gray-700">
                {facility}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Room Types & Prices
          </h2>
          <ul className="space-y-2">
            {hostelDetails.roomTypes.map((roomType, index) => (
              <li key={index} className="text-lg text-gray-800">
                Class {roomType.class}:{" "}
                <span className="font-semibold text-teal-600">
                  ₹{roomType.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handlePayFees}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Pay Hostel Fees
          </button>
        </div>
      </div>

      {/* HostelFeesForm Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative z-60">
            <HostelFeesForm isOpen={isFormOpen} onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HostelDetailsPage;
