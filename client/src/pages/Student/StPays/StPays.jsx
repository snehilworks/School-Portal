import React, { useState, useEffect } from "react";
import { Payment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import axiosInstance from "../../../utils/axiosInstance";

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [feeType, setFeeType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axiosInstance.get("/api/student/me");
        const studentData = response.data;
        setStudentClass(studentData.class);
        setName(studentData.name);
        setFatherName(studentData.fatherName);
        setEmail(studentData.email);

        if (studentData.class) {
          fetchFeeDetails(studentData.class);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    const fetchFeeDetails = async (classId) => {
      try {
        const response = await axiosInstance.get(
          `/api/student/class-fee/${classId}`
        );
        const feeData = response.data;
        setAmount(feeData.amount);
        setDescription(feeData.description);
      } catch (error) {
        console.error("Error fetching fee details:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleFeeTypeChange = (event) => {
    setFeeType(event.target.value);
  };

  const calculateFinalAmount = () => {
    let finalAmount = amount;
    if (feeType === "Annual") {
      finalAmount = finalAmount * (1 - 0.1); // 10% dis
    } else if (feeType === "6 Month") {
      finalAmount = (finalAmount / 2) * (1 - 0.05); // 5% dis
    } else if (feeType === "Monthly") {
      finalAmount = finalAmount / 12;
    }

    return Math.round(finalAmount);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const finalAmount = calculateFinalAmount();
    try {
      const response = await axiosInstance.post(`/api/pay/order`, {
        amount: finalAmount * 100,
        currency: "INR",
        receipt: "OrderReceipt1",
      });
      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "",
        amount: order.amount,
        currency: "INR",
        name: "Shivam Public",
        description: "School Fee Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: function (response) {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: name,
          email: email,
          contact: fatherName,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 xl:px-16">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-8 hover:bg-blue-700 transition duration-200"
      >
        ← Back
      </button>
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6 mx-auto">
        <div className="text-center mb-6">
          <Payment className="text-6xl text-blue-600 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            School Fee Payment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter your details to make a payment
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Father's Name
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Class
            </label>
            <div className="mt-1 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
              {description}
            </div>
          </div>

          {amount && (
            <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
              <p>Fee Amount for Class: INR {amount}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fee Type
            </label>
            <select
              value={feeType}
              onChange={handleFeeTypeChange}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              required
            >
              <option value="">Select Fee Type</option>
              <option value="Annual">Annual</option>
              <option value="6 Month">6 Month</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {feeType && (
            <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
              <p>Final Amount: INR {calculateFinalAmount()}</p>
            </div>
          )}

          <button
            type="submit"
            id="rzp-button1"
            className="w-full py-3 px-6 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>

      <div className="mt-6 flex justify-center w-full">
        <PrimaryButton onClick={() => navigate("/student/fee-structure")}>
          Fee Structure Here
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PaymentsPage;
