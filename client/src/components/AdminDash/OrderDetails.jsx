import React, { useState } from "react";

const OrderDetails = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="border-t border-gray-200">
        <div
          className="flex items-center justify-between px-4 py-4 sm:px-6 cursor-pointer"
          onClick={toggleModal}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-indigo-600 truncate">{`Student Name: ${order.notes.studentName}`}</p>
            <p className="text-sm text-gray-600">{`Class: ${order.notes.studentClass}`}</p>
            <p className="text-sm text-gray-600">{`Amount: ${order.amount} ${order.currency}`}</p>
          </div>
          <div className="ml-6 flex-shrink-0">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === "created"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{`Order ID: ${order.id}`}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{`Order Amount: ${order.amount} ${order.currency}`}</p>
                  <p className="text-sm text-gray-500">{`Status: ${order.status}`}</p>
                  <p className="text-sm text-gray-500">{`Amount Due: ${order.amount_due} ${order.currency}`}</p>
                  <p className="text-sm text-gray-500">{`Student Name: ${order.notes.studentName}`}</p>
                  <p className="text-sm text-gray-500">{`Class: ${order.notes.studentClass}`}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
