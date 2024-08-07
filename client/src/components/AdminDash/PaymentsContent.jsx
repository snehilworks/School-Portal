import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";
import { FaSearch, FaTimes } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce"; // Adjust the import path as necessary
import PaymentDetailsModal from "../AdminDash/PaymentDetails"; // Import the new PaymentDetailsModal component

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldTypes, setFieldTypes] = useState(["ADMISSION", "FEES", "HOSTEL"]);
  const [paymentToCheck, setPaymentToCheck] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Adjust debounce delay as necessary

  const fetchPayments = useCallback(async (page, query = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/admin/paid-payments", {
        params: { page, limit: 20, search: query },
      });
      const { payments, totalPages, currentPage } = response.data;
      setPayments(payments);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
      setError(null); // Clear error if data is fetched successfully
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchPayments]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchPayments(1, debouncedSearchQuery);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  const handleCheckPayment = (payment) => {
    setPaymentToCheck(payment);
  };

  const confirmCheckPayment = async () => {
    if (!paymentToCheck) return;

    try {
      const paymentId = paymentToCheck.paymentId;
      await axiosInstance.put(`/api/admin/paid-payments/reviewed/${paymentId}`);
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.paymentId === paymentToCheck.paymentId ? { ...p, review: true } : p
        )
      );
      setPaymentToCheck(null);
    } catch (error) {
      console.error("Error marking payment as reviewed:", error);
      setError("Failed to mark payment as reviewed.");
    }
  };

  const closeCheckPaymentPopup = () => {
    setPaymentToCheck(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Paid Payments</h2>
        <div className="relative inline-block w-full max-w-xs">
          <select
            // value={fieldTypeFilter}
            // onChange={handleFieldTypeChange}
            className="block w-full py-3 px-4 font-bold border border-gray-600 rounded-lg bg-blue-100 text-gray-700 placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
          >
            <option value="">All Fields</option>
            {fieldTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Enhanced Search Box */}
        <div className="relative w-full max-w-md mt-4 md:mt-0">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Payment ID or Student Name..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <button
              type="button"
              onClick={clearSearch}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                searchQuery ? "block" : "hidden"
              } text-gray-500`}
            >
              <FaTimes />
            </button>
            <button
              type="submit"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Payment ID</th>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Field Type</th>
              <th className="p-4 text-left">Fee Type</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 text-gray-700">{payment.paymentId}</td>
                  <td className="p-4 text-gray-700">{payment.studentName}</td>
                  <td className="p-4 text-gray-700">
                    {payment.studentClass.className}
                  </td>
                  <td className="p-4 text-gray-700">{payment.amount}</td>
                  <td className="p-4 text-gray-700">{payment.fieldType}</td>
                  <td className="p-4 text-gray-700">
                    {payment.feeType || "N/A"}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <PrimaryButton
                      className="bg-gray-800 text-white font-semibold hover:bg-black transition-colors ml-2 py-2 px-4 rounded-lg shadow-md"
                      onClick={() => handleViewDetails(payment)}
                    >
                      View Details
                    </PrimaryButton>
                    <PrimaryButton
                      className={`${
                        payment.review
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-400 hover:bg-green-500"
                      } text-white font-bold w-10/12 transition-colors m-2 rounded-lg shadow-md`}
                      onClick={() => handleCheckPayment(payment)}
                      disabled={payment.review}
                    >
                      {payment.review ? "Reviewed" : "Check"}
                    </PrimaryButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-600">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-8">
        <PrimaryButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-600 text-white hover:bg-gray-700 transition-colors py-2 px-4 rounded-lg shadow-md"
        >
          Previous
        </PrimaryButton>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <PrimaryButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-600 text-white hover:bg-gray-700 transition-colors py-2 px-4 rounded-lg shadow-md"
        >
          Next
        </PrimaryButton>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={handleCloseModal}
        />
      )}

      {/* Check Payment Confirmation Popup */}
      {paymentToCheck && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 text-lg mb-4">
              Are you sure you want to mark this payment as reviewed?
            </p>
            <div className="flex justify-end space-x-4">
              <PrimaryButton
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                onClick={confirmCheckPayment}
              >
                Confirm
              </PrimaryButton>
              <PrimaryButton
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                onClick={closeCheckPaymentPopup}
              >
                Cancel
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
