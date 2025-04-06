import React from "react";
import { FaTimes } from "react-icons/fa";

// Custom Button Component
const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    neutral:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  const sizeClasses =
    props.size === "sm" ? "py-1.5 px-3 text-sm" : "py-2.5 px-4";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? variants.disabled : variants[variant]
      } ${sizeClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Badge Component
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null;

  const timestamp = payment.paymentDate;
  const date = new Date(timestamp);

  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateTime = date.toLocaleString("en-IN", options);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fadeIn">
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h3 className="text-xl font-bold">Payment Details</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg col-span-full">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Payment Information
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment/Razorpay ID:</span>
                <span className="font-semibold">{payment.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">
                  ₹{payment.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant="success">Paid</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Field Type:</span>
                <span className="font-semibold">{payment.fieldType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee Type:</span>
                <span className="font-semibold">
                  {payment.feeType || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-semibold">{formattedDateTime}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Student Information
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{payment.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold">
                  {payment.studentClass.className}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student ID:</span>
                <span className="font-semibold">
                  {payment.studentId || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">
              Razorpay Details
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Razorpay ID:</span>
                <span className="font-semibold">
                  {payment.razorpayPaymentId || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">
                  {payment.razorpayOrderId || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  {payment.paymentMethod || "N/A"}
                </span>
              </div>
            </div>
          </div> */}

          <div className="col-span-full">
            <Button
              variant="success"
              className="w-full"
              disabled={payment.review}
              onClick={onClose}
            >
              {payment.review ? "Already Reviewed" : "Mark as Reviewed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
