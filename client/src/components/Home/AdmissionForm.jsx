import React, { useState, useEffect } from "react";
import { Modal, Fade, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdmissionForm.css";

const AdmissionForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    class: "",
    fatherPhone: "",
    gender: "",
    address: "",
    email: "",
  });

  const [classesList, setClassesList] = useState([]);
  const [admissionFee, setAdmissionFee] = useState(0);
  const [isClassesFetched, setIsClassesFetched] = useState(false);
  const [internalServerError, setInternalServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOpenClassesDropdown = async () => {
    if (!isClassesFetched) {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/home/classes`
        );
        setClassesList(response.data);
        setIsClassesFetched(true);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }
  };

  const handleClassSelect = async (e) => {
    const selectedClassId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      class: selectedClassId,
    }));

    if (selectedClassId) {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/home/admission-fee/${selectedClassId}`
        );
        setAdmissionFee(response.data.amount);
      } catch (error) {
        console.error("Error fetching admission fee:", error);
      }
    }
  };

  const handleSubmitAndPay = async (e) => {
    e.preventDefault();
    setInternalServerError("");

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/home/admission-form`,
        formData
      );

      if (response.status === 512) {
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
        return; // Exit early
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setInternalServerError("Internal Server Error. Please try again later.");
      return; // Exit early
    }

    // Pay
    const amount = admissionFee * 100; // Amount in smallest currency unit
    const currency = "INR";
    const receiptId = "OrderReceipt_1";

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/pay/order`,
        {
          amount,
          currency,
          receipt: receiptId,
        }
      );
      const order = response.data;
      VerifyPayment(order);
    } catch (error) {
      console.error("Error creating payment order:", error);
      setInternalServerError(
        "Error creating payment order. Please try again later."
      );
    }
  };

  const VerifyPayment = async (data) => {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "",
      amount: data.amount,
      currency: "INR",
      name: "Shivam Public",
      description: "Admission Fee",
      image: "https://example.com/your_logo",
      order_id: data.id,
      handler: async function (response) {
        // Verify the payment
        console.log("handler triggered");
        try {
          const verifyResponse = await axios.post(
            `${process.env.API_URL}/api/pay/verify-payment`,
            {
              orderId: data.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              studentName: formData.studentName,
              studentClass: formData.class,
              amount: data.amount / 100, // Convert back to INR
              paymentDate: new Date(),
              fieldType: "ADMISSION",
            }
          );

          if (verifyResponse.status === 201) {
            alert("Payment verified and saved successfully!");
            // Navigate to another page or show a success message
            navigate("/student/payment-completion", {
              state: { paymentId: response.razorpay_payment_id },
            });
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setInternalServerError(
            "Payment verification failed. Please contact support."
          );
        }
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
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp1.open();
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
        <div className="relative bg-white mt-20 md:mt-0 rounded-lg max-w-lg w-full mx-5 px-4 pt-5 pb-10 md:p-6 md:mx-auto shadow-lg overflow-y-auto max-h-[95vh]">
          <button
            onClick={onClose}
            className="absolute md:top-4 md:right-4 text-red-500 hover:text-red-700"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
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
          <form
            onSubmit={handleSubmitAndPay}
            className="space-y-3 md:space-y-4"
          >
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
                  id="class"
                  name="class"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.class}
                  onChange={handleClassSelect}
                  onClick={handleOpenClassesDropdown}
                  required
                >
                  <option value="">Select Class</option>
                  {classesList.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.className}
                    </option>
                  ))}
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
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-y"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-center text-gray-700">
                  Admission Fee
                </label>
                <input
                  id="admissionFee"
                  name="admissionFee"
                  type="text"
                  className="mt-1 block text-center font-semibold w-full px-3 py-2 bg-green-100 border border-gray-300 rounded-md shadow-sm"
                  value={`₹${admissionFee}`}
                  readOnly
                />
              </div>
            </div>
            <button
              id="rzp-button1"
              className="w-full py-2 px-4 mt-4 bg-blue-500 border-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Save and Pay Now
            </button>
          </form>
          {internalServerError && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
              {internalServerError}
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default AdmissionForm;
