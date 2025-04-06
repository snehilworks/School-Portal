import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

const PaymentDetailsPopup = ({ payment, onClose }) => {
  if (!payment) return null;

  const timestamp = payment.paymentDate;
  const date = new Date(timestamp);

  // Convert the date to Indian Standard Time
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

  const fieldStyles = (label) => {
    switch (label) {
      case "Amount":
      case "Payment Status":
        return "bg-green-100 text-gray-800";
      case "Payment Date":
        return "bg-gray-800 text-white";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 md:mx-auto relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl text-center font-extrabold text-gray-900 mb-6">
          Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Order ID", value: payment.orderId },
            { label: "Payment ID", value: payment.paymentId },
            { label: "Student ID", value: payment.studentId },
            { label: "Student Name", value: payment.studentName },
            { label: "Class", value: payment.studentClass.className },
            { label: "Amount", value: payment.amount },
            { label: "Field Type", value: payment.fieldType },
            { label: "Fee Type", value: payment.feeType || "N/A" },
            { label: "Payment Status", value: payment.paymentStatus },
            { label: "Payment Date", value: formattedDateTime },
          ].map(({ label, value }) => (
            <div
              key={label}
              className={`flex flex-col justify-between p-4 rounded-lg shadow-lg border border-gray-200 ${fieldStyles(
                label
              )}`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {label}
              </p>
              <p
                className={`mt-1 text-lg font-bold ${
                  label === "Payment Date" ? "text-white" : "text-gray-800"
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="mt-6 flex justify-end">
          <PrimaryButton
            onClick={onClose}
            color="logout"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-6 rounded-full shadow-lg"
          >
            Close
          </PrimaryButton>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentDetailsPopup;
