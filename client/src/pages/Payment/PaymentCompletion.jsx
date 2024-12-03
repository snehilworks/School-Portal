import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCopy } from "react-icons/io5";

const PaymentCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = location.state || {};

  const handleGoBackHome = () => {
    navigate("/");
  };

  const copyToClipboard = () => {
    if (paymentId) {
      navigator.clipboard.writeText(paymentId);
      alert("Payment ID copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[91.3vh] bg-gradient-to-br from-teal-400 to-teal-700 flex flex-col items-center justify-center text-white">
      <div className="text-center">
        {/* Animated Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-28 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 text-teal-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-extrabold mb-4 animate-fade-in">
          Payment Successful!
        </h1>
        <p className="text-lg mb-4">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>

        {/* Payment ID and Copy Button */}
        {paymentId && (
          <div className="flex justify-center items-center mb-6">
            <p className="text-sm bg-white bg-opacity-10 px-6 py-3 rounded-lg inline-block">
              <span className="font-bold">Payment ID:</span> {paymentId}
              <button
                onClick={copyToClipboard}
                className="ml-4 p-2 bg-white text-teal-700 font-bold rounded-2xl shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              >
                <IoCopy />
              </button>
            </p>
          </div>
        )}

        {/* Encouraging Message */}
        <p className="text-base mb-6">
          Share this with your School Teacher and celebrate your success!
        </p>

        {/* Call to Action */}
        <button
          onClick={handleGoBackHome}
          className="px-8 py-3 bg-white text-teal-600 font-bold rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white transition-all"
        >
          Go Back to Home
        </button>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-center text-sm text-teal-200">
        Need help? Contact our{" "}
        <a
          href="mailto:support@example.com"
          className="underline hover:text-white"
        >
          support team
        </a>
        .
      </div>
    </div>
  );
};

export default PaymentCompletion;
