import React, { useState } from "react";
import axios from "axios";
import Snackbar from "./Snackbar";

const HostelFeesForm = ({ isOpen, onClose }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    grade: "",
    parentContact: "",
    joiningDate: "",
    roomPreference: "",
    messFacilities: "",
    additionalNotes: "",
  });

  const amount = 499;
  const currency = "INR";
  const receiptId = "OrderReceipt 1";

  const handlePay = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.API_URL}/order`, {
      amount,
      currency,
      receipt: receiptId,
    });
    const order = response.data;

    var options = {
      key: process.env.RAZORPAY_KEY || "",
      amount,
      currency,
      name: "Shivam Public",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        setShowSnackbar(true); // Show the Snackbar with the success message
        onClose(); // Close the modal after successful payment
      },
      prefill: {
        name: formData.studentName,
        email: formData.email,
        contact: formData.parentContact,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-y-auto mt-30 md:mt-0">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hostel Fees Form
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="studentName">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                className="w-full p-2 border rounded"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="studentId">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="grade">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="parentContact"
              >
                Parent's Contact Number
              </label>
              <input
                type="tel"
                id="parentContact"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="joiningDate">
                Hostel Joining Date
              </label>
              <input
                type="date"
                id="joiningDate"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="roomPreference"
              >
                Room Preference
              </label>
              <select id="roomPreference" className="w-full p-2 border rounded">
                <option value="single">Single</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="messFacilities"
              >
                Mess Facilities
              </label>
              <select id="messFacilities" className="w-full p-2 border rounded">
                <option value="vegetarian">Vegetarian</option>
                <option value="nonVegetarian">Non-Vegetarian</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="col-span-2 mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="additionalNotes"
              >
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                id="rzp-button1"
                onClick={handlePay}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={showSnackbar}
        handleClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};

export default HostelFeesForm;
