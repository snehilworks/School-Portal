import React, { useState, useEffect } from "react";
import { Payment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import axiosInstance from "../../../utils/axiosInstance";
import ErrorModal from "../../../components/ErrorModal";
import InternalServerModal from "../../../components/InternalServerModal";
import { IoArrowBackOutline } from "react-icons/io5";

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
  const [internalServerError, setInternalServerError] = useState("");
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axiosInstance.get("/api/student/me");
        const studentData = response.data;
        setStudentId(studentData._id);
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

  const calculateFinalAmount = () => {
    let finalAmount = amount;

    switch (feeType) {
      case "Annual":
        finalAmount = amount * 0.9; // 10% discount
        break;
      case "6 Month":
        finalAmount = (amount / 2) * 0.95; // 5% discount
        break;
      case "Monthly":
        finalAmount = amount / 12;
        break;
      default:
        finalAmount = amount;
    }

    return Math.round(finalAmount);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setInternalServerError("");

    const finalAmount = calculateFinalAmount() * 100; // Amount in paise

    try {
      const response = await axiosInstance.post(`/api/pay/order`, {
        amount: finalAmount,
      });
      const order = response.data;
      if (response.status === 512) {
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
        return;
      }
      VerifyPayment(order, finalAmount);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const VerifyPayment = async (data, finalAmount) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "",
      amount: data.amount,
      currency: "INR",
      name: "Shivam Public, Aarni",
      description: "School Fee Payment",
      image: "https://example.com/your_logo",
      order_id: data.id,
      handler: async function (response) {
        // Verify the payment
        try {
          const verifyResponse = await axiosInstance.post(
            `/api/pay/verify-payment`,
            {
              orderId: data.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              studentId: studentId,
              studentName: name,
              fieldType: "FEES",
              feeType: feeType.toUpperCase().replace(" ", "-"), // Convert to the required format
              studentClass: studentClass,
              amount: finalAmount / 100, // Convert back to INR
              paymentDate: new Date(),
            }
          );

          if (verifyResponse.status === 201) {
            navigate("/student/payment-completion", {
              state: { paymentId: response.razorpay_payment_id },
            });
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setError("Payment verification failed. Please contact support.");
        }
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
        color: "#115E59",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp1.open();
  };

  return (
    <div className="min-h-screen mt-12 md:mt-12 bg-gradient-to-r from-gray-100 to-teal-300 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 xl:px-16">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="absolute bg-teal-600 text-white shadow-md font-bold px-2 py-1.5 text-sm md:py-2 md:px-5 rounded-md hover:bg-gray-500 transition duration-200"
        >
          <span className="block md:hidden px-3 py-1">
            <IoArrowBackOutline className="text-md" />
          </span>
          <span className="hidden md:flex md:gap-1">
            <IoArrowBackOutline className="mt-0.3 text-lg" /> Back
          </span>
        </button>

        <div className="text-center mb-6">
          <Payment className="text-6xl font-bold text-blue-600 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            School Fee Payment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter your details to make a payment
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-around gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Father's Name
              </label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-around items-center gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Student Class
              </label>
              <div className="mt-1 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
                {description}
              </div>
            </div>

            {amount && (
              <div className="w-full">
                <div className="p-4 md:mt-5 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
                  <p>Fee Amount for Class: INR {amount}</p>
                </div>
              </div>
            )}
          </div>

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

          <div className="flex items-center justify-center text-center">
            <PrimaryButton
              className={"!px-14 !py-2 !bg-teal-700  "}
              type="submit"
            >
              Pay Now
            </PrimaryButton>
          </div>
        </form>
      </div>
      {internalServerError && (
        <InternalServerModal
          error={internalServerError}
          onClose={() => setInternalServerError("")}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
