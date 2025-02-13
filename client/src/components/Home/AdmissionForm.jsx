import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdmissionForm = ({ onClose }) => {
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
  const [internalServerError, setInternalServerError] = useState("");
  const navigate = useNavigate();

  const handleSubmitAndPay = async (e) => {
    e.preventDefault();
    setInternalServerError("");
    //creating order
    //and sending axios.post from where order id is being created on backend

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
    const amount = admissionFee * 100;

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/pay/order`,
        { amount }
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

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/home/classes`
      );
      setClassesList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassSelect = async (e) => {
    const selectedClassId = e.target.value;
    setFormData((prev) => ({ ...prev, class: selectedClassId }));

    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/home/admission-fee/${selectedClassId}`
      );
      setAdmissionFee(response.data.amount);
    } catch (error) {
      console.error("Error fetching admission fee:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto pt-52 sm:pt-0 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative mx-4 sm:mx-auto mb-8 sm:my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
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

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-600" />

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-800">
            Student Admission Form
          </h2>

          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
              <input
                type="text"
                name="fatherName"
                placeholder="Father's Name"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
              <input
                type="text"
                name="motherName"
                placeholder="Mother's Name"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
              <select
                name="class"
                value={formData.class}
                onChange={handleClassSelect}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select Class</option>
                {classesList.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <input
                type="tel"
                name="fatherPhone"
                placeholder="Father's Phone Number"
                value={formData.fatherPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none"
                required
              />
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <span className="text-xl font-semibold text-blue-700">
                  Admission Fee: ₹{admissionFee}
                </span>
              </div>
            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none resize-y"
              rows="3"
              required
            />

            <div className="text-center">
              <button
                type="submit"
                onClick={handleSubmitAndPay}
                className="bg-gradient-to-r from-blue-600 to-sky-900 text-white px-10 py-3 rounded-full hover:from-blue-700 hover:to-sky-600 transition-all shadow-lg"
              >
                Submit Admission Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
