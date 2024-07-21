import React from "react";

const ErrorModal = ({ error, onClose }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center z-50 ${
      error ? "block" : "hidden"
    }`}
    role="dialog"
    aria-labelledby="error-modal-title"
    aria-modal="true"
  >
    <div
      className="absolute inset-0 bg-gray-800 opacity-60"
      onClick={onClose}
      aria-hidden="true"
    ></div>
    <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-4 w-full sm:mx-6">
      <div className="flex items-center justify-between border-b px-6 py-4 bg-red-100 border-red-200 rounded-t-lg">
        <h3
          id="error-modal-title"
          className="text-xl font-semibold text-red-600"
        >
          Error
        </h3>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <p className="text-gray-800 text-lg">{error}</p>
      </div>
      <div className="flex justify-end border-t py-2 px-2 border-gray-200 bg-gray-50 rounded-b-lg">
        <button
          type="button"
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorModal;
