import React, { useState } from "react";
import { Payment } from "@mui/icons-material";
import "./StPays.css"; // Ensure this file contains any additional custom styles you need.

function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      setDiscount(10); // 10% discount
    } else {
      alert("Invalid discount code");
    }
  };

  const handlePayment = async () => {
    const discountedAmount = amount - (amount * discount) / 100;
    alert(`Processing payment of INR ${discountedAmount} for ${name}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <Payment className="text-6xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            School Fee Payment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter your details to make a payment
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (INR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
            />
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
            onClick={handlePayment}
            disabled={!amount || !name || !email}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage;
