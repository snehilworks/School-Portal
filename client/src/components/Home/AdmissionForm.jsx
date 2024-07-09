import React from "react";
import { Modal, Fade, Typography } from "@mui/material";
import axios from "axios";
import "./AdmissionForm.css"; // Add any additional styles here if needed

const AdmissionForm = ({ open, onClose }) => {
  const [formData, setFormData] = React.useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    selectedClass: "",
    fatherPhone: "",
    gender: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or validation here
    onClose();
  };

  const amount = 499;
  const currency = "INR";
  const receiptId = "OrderReceipt 1";

  const handlePay = async (e) => {
    const response = await axios.post(`${process.env.API_URL}/api/pay/order`, {
      amount,
      currency,
      receipt: receiptId,
    });
    const order = response.data;

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "",
      amount,
      currency,
      name: "Shivam Public",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: formData.studentName,
        email: formData.email,
        contact: formData.fatherPhone,
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
    e.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center"
    >
      <Fade in={open}>
        <div className="relative bg-white rounded-lg p-4 md:p-6 max-w-lg w-full mx-4 md:mx-auto shadow-lg overflow-y-auto max-h-screen">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Typography
            variant="h5"
            align="center"
            className="mb-4 md:mb-5 text-xl md:text-2xl font-bold"
          >
            Admission Form
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Student Name</label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Father's Name</label>
                <input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Mother's Name</label>
                <input
                  id="motherName"
                  name="motherName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Class</label>
                <select
                  id="selectedClass"
                  name="selectedClass"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.selectedClass}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* Add more class options */}
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">
                  Father's Phone Number
                </label>
                <input
                  id="fatherPhone"
                  name="fatherPhone"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-gray-700">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Save
            </button>
          </form>
          <button
            id="rzp-button1"
            onClick={handlePay}
            className="w-full py-2 px-4 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Pay Now
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AdmissionForm;
