import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaConciergeBell,
  FaUtensils,
  FaTshirt,
  FaPlug,
  FaWater,
} from "react-icons/fa"; // Import icons
import HostelFeesForm from "../../../components/StudentDash/HostelFeesForm"; // Adjust the import path as needed

function HostelDetailsPage() {
  const [hostelDetails, setHostelDetails] = useState({
    name: "Shivam Public Hostel, Aarni",
    address: "Aarni, Matrikundiya, Near Shivam Public School",
    capacity: 100,
    occupancy: 80,
    facilities: ["Food", "Laundry", "Cafeteria", "Electricity", "Water"],
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
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-teal-600 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between px-8 py-4 bg-teal-800 text-white">
          {/* Back button */}

          {/* Hostel name */}
          <h1 className="text-4xl font-extrabold">{hostelDetails.name}</h1>

          <button
            onClick={() => navigate(-1)}
            className="text-lg font-semibold hover:text-teal-300 transition duration-300"
          >
            {/* Mobile view: Only arrow */}
            <span className="sm:hidden p-2 shadow-lg rounded-lg text-black font-bold bg-gray-300">
              ←
            </span>

            {/* Desktop view: Arrow with 'Back' */}
            <span className="hidden sm:block bg-gray-300 px-2 py-1 rounded-lg text-black hover:bg-gray-400">
              ← Back
            </span>
          </button>
        </div>

        {/* Hostel Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          <div className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-teal-700">Address</h2>
            <p className="mt-2 text-lg text-gray-700">
              {hostelDetails.address}
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-teal-700">Capacity</h2>
            <p className="mt-2 text-lg text-gray-700">
              {hostelDetails.capacity}
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-teal-700">Occupancy</h2>
            <p className="mt-2 text-lg text-gray-700">
              {hostelDetails.occupancy}
            </p>
          </div>
        </div>

        {/* Hostel Facilities Section with Icons */}
        <div className="p-8">
          <h2 className="text-3xl font-semibold text-teal-700 mb-6">
            Facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-teal-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <FaUtensils className="text-4xl text-teal-600 hover:text-teal-700 transition duration-300" />
              <p className="text-lg text-gray-700">Food</p>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-teal-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <FaTshirt className="text-4xl text-teal-600 hover:text-teal-700 transition duration-300" />
              <p className="text-lg text-gray-700">Laundry</p>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-teal-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <FaConciergeBell className="text-4xl text-teal-600 hover:text-teal-700 transition duration-300" />
              <p className="text-lg text-gray-700">Cafeteria</p>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-teal-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <FaPlug className="text-4xl text-teal-600 hover:text-teal-700 transition duration-300" />
              <p className="text-lg text-gray-700">Electricity</p>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-teal-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <FaWater className="text-4xl text-teal-600 hover:text-teal-700 transition duration-300" />
              <p className="text-lg text-gray-700">Water</p>
            </div>
          </div>
        </div>

        {/* Room Types & Pricing Section */}
        <div className="p-8 bg-teal-50">
          <h2 className="text-3xl font-semibold text-teal-700 mb-6">
            Room Types & Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostelDetails.roomTypes.map((roomType, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-teal-700">
                  Class {roomType.class}
                </h3>
                <p className="mt-4 text-lg text-gray-700">
                  Price:{" "}
                  <span className="font-semibold text-teal-600">
                    ₹{roomType.price}
                  </span>
                </p>
                <button
                  onClick={handlePayFees}
                  className="mt-6 w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Fees Button */}
        <div className="flex justify-center p-8">
          <button
            onClick={handlePayFees}
            className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
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
