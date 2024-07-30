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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

  useEffect(() => {
    if (startDate && feeType) {
      updateEndDate();
    }
  }, [feeType, startDate]);

  const handleFeeTypeChange = (event) => {
    setFeeType(event.target.value);
  };

  const updateEndDate = () => {
    let end = new Date(startDate);

    switch (feeType) {
      case "Monthly":
        end.setMonth(end.getMonth() + 1);
        break;
      case "6 Month":
        end.setMonth(end.getMonth() + 6);
        break;
      case "Annual":
        end.setFullYear(end.getFullYear() + 1);
        break;
      default:
        end = new Date();
    }

    setEndDate(end);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const finalAmount = calculateFinalAmount();
    try {
      const response = await axiosInstance.post(`/api/pay/order`, {
        amount: finalAmount * 100,
        currency: "INR",
        receipt: `OrderReceipt1_${startDate
          .toISOString()
          .slice(0, 10)}_${endDate.toISOString().slice(0, 10)}`,
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

  const calculateFinalAmount = () => {
    // Implement your logic for calculating the final amount
    return amount;
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
              <p>Fee Valid From: {startDate.toISOString().slice(0, 10)}</p>
              <p>Fee Valid Until: {endDate.toISOString().slice(0, 10)}</p>
            </div>
          )}

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Pay From
            </label>
            <input
              id="paymentStartDate"
              name="paymentStartDate"
              type="date"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={startDate.toISOString().slice(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className="text-center">
            <PrimaryButton type="submit" className="mt-6 w-full">
              Pay Now
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentsPage;
