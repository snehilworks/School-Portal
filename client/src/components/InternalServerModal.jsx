// InternalServerModal.jsx
import React from "react";

const InternalServerModal = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-800 mb-6">
            We encountered an unexpected issue on our end. Please try again
            later.
          </p>
          <p className="text-gray-500">{error}</p>
          <button
            className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternalServerModal;
