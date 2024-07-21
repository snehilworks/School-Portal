import React, { useState } from "react";
import { Payment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/ui/PrimaryButton"; // Adjust the import path as needed
import axiosInstance from "../../../utils/axiosInstance";

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [feeType, setFeeType] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate(); // Initialize navigate

  const fees = [
    { type: "Annual", amount: 100000, discount: 10 },
    { type: "6 Months", amount: 50000, discount: 5 },
    { type: "Monthly", amount: 5000, discount: 0 },
  ];

  const handleApplyDiscount = () => {
    const selectedFee = fees.find((fee) => fee.type === feeType);
    if (selectedFee && discountCode === "DISCOUNT10") {
      setDiscount(selectedFee.discount);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleFeeTypeChange = (event) => {
    const selectedFeeType = event.target.value;
    setFeeType(selectedFeeType);

    // Find the fee amount based on the selected fee type
    const selectedFee = fees.find((fee) => fee.type === selectedFeeType);
    if (selectedFee) {
      setAmount(selectedFee.amount);
      setDiscount(selectedFee.discount);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const response = await axiosInstance.post(`/api/pay/order`, {
      amount: amount * (1 - discount / 100), // Apply discount to amount
      currency: "INR",
      receipt: "OrderReceipt1",
    });
    const order = response.data;

    var options = {
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
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-8 hover:bg-blue-700 transition duration-200"
      >
        ← Back
      </button>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center mb-6">
          <Payment className="text-6xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            School Fee Payment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter your details to make a payment
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
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
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              required
            />
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
              {fees.map((fee) => (
                <option key={fee.type} value={fee.type}>
                  {fee.type} - INR {fee.amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Code
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
            />
            <button
              type="button"
              onClick={handleApplyDiscount}
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Apply Discount
            </button>
          </div>

          {discount > 0 && (
            <div className="p-2 bg-green-100 border-l-4 border-green-500 text-green-700">
              <p>Discount Applied: {discount}%</p>
              <p>
                New Amount: INR{" "}
                {(amount - (amount * discount) / 100).toFixed(2)}
              </p>
            </div>
          )}

          <button
            type="submit"
            id="rzp-button1"
            className="w-full py-2 px-4 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>

      {/* Fee Structure Button for Mobile View */}
      <div className="mt-6 sm:hidden">
        <PrimaryButton onClick={() => navigate("/student/fee-structure")}>
          Fee Structure Here
        </PrimaryButton>
      </div>

      {/* Fee Structure Button for Larger Screens */}
      <div className="hidden sm:block sm:absolute sm:top-20 sm:right-8">
        <PrimaryButton
          color="fee-structure"
          onClick={() => navigate("/student/fee-structure")}
        >
          Fee Structure Here
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PaymentsPage;
