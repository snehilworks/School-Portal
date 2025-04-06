import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  FaSearch,
  FaTimes,
  FaEye,
  FaCheckCircle,
  FaFilter,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";
import PaymentDetailsModal from "./PaymentDetails";

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

// Main PaymentsPage Component
const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldTypeFilter, setFieldTypeFilter] = useState("");
  const [fieldTypes, setFieldTypes] = useState(["ADMISSION", "FEES", "HOSTEL"]);
  const [paymentToCheck, setPaymentToCheck] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [summaryStats, setSummaryStats] = useState({
    totalPayments: 0,
    totalAmount: 0,
    pendingReview: 0,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchPayments = useCallback(
    async (page, query = "", fieldType = "") => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/admin/paid-payments", {
          params: {
            page,
            limit: 20,
            search: query,
            fieldType: fieldType,
            startDate: dateRange.start || undefined,
            endDate: dateRange.end || undefined,
          },
        });

        const { payments, totalPages, currentPage, summary } = response.data;
        setPayments(payments);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);

        // If API returns summary statistics
        if (summary) {
          setSummaryStats(summary);
        } else {
          // Calculate summary stats from current page data
          const pendingReview = payments.filter((p) => !p.review).length;
          const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
          setSummaryStats({
            totalPayments: payments.length,
            totalAmount,
            pendingReview,
          });
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("Failed to load payments. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [dateRange]
  );

  useEffect(() => {
    fetchPayments(currentPage, debouncedSearchQuery, fieldTypeFilter);
  }, [currentPage, debouncedSearchQuery, fieldTypeFilter, fetchPayments]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchPayments(1, searchQuery, fieldTypeFilter);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleFieldTypeChange = (event) => {
    setFieldTypeFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchPayments(1, searchQuery, fieldTypeFilter);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFieldTypeFilter("");
    setDateRange({ start: "", end: "" });
    setSearchQuery("");
    setCurrentPage(1);
    fetchPayments(1, "", "");
    setShowFilters(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
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

      // Update local state
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.paymentId === paymentToCheck.paymentId ? { ...p, review: true } : p
        )
      );

      // Update summary stats
      setSummaryStats((prev) => ({
        ...prev,
        pendingReview: Math.max(0, prev.pendingReview - 1),
      }));

      setPaymentToCheck(null);
    } catch (error) {
      console.error("Error marking payment as reviewed:", error);
      setError("Failed to mark payment as reviewed.");
    }
  };

  const closeCheckPaymentPopup = () => {
    setPaymentToCheck(null);
  };

  // Loading state with better UI
  if (loading && payments.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-700 font-medium">
          Loading payments data...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Header with summary stats */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Paid Payments Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Total Payments</p>
            <p className="text-3xl font-bold text-gray-800">
              {summaryStats.totalPayments}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-3xl font-bold text-gray-800">
              ₹{summaryStats.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">Pending Review</p>
            <p className="text-3xl font-bold text-gray-800">
              {summaryStats.pendingReview}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
          <div className="w-full">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Payment ID, Student Name or ID..."
                className="w-full py-3 px-4 pr-20 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FaTimes />
                  </button>
                )}
                <button
                  type="submit"
                  className="text-blue-500 hover:text-blue-700 p-1"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="neutral"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto"
            >
              <FaFilter className="mr-1" />{" "}
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {showFilters && (
              <Button
                variant="danger"
                onClick={resetFilters}
                size="sm"
                className="whitespace-nowrap"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fadeIn">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Type
              </label>
              <select
                value={fieldTypeFilter}
                onChange={handleFieldTypeChange}
                className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                <option value="">All Payment Types</option>
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={handleDateRangeChange}
                className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={handleDateRangeChange}
                className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <Button
                variant="primary"
                onClick={applyFilters}
                className="w-full md:w-auto"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Error messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Mobile payment cards (visible on small screens) */}
      <div className="md:hidden space-y-4 mb-6">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-400 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{payment.studentName}</h3>
                <Badge variant={payment.review ? "success" : "warning"}>
                  {payment.review ? "Reviewed" : "Pending"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Payment ID</p>
                  <p className="text-sm font-medium">{payment.paymentId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-sm font-medium">₹{payment.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Class</p>
                  <p className="text-sm font-medium">
                    {payment.studentClass.className}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium">{payment.fieldType}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="neutral"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewDetails(payment)}
                >
                  <FaEye size={14} /> Details
                </Button>

                {!payment.review && (
                  <Button
                    variant="success"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleCheckPayment(payment)}
                  >
                    <FaCheckCircle size={14} /> Review
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500">No payments found</p>
          </div>
        )}
      </div>

      {/* Desktop table (hidden on small screens) */}
      <div className="hidden md:block overflow-x-auto mb-6">
        <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left">Payment ID</th>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Field Type</th>
              <th className="p-4 text-left">Fee Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors border-b border-gray-200`}
                >
                  <td className="p-4 text-gray-700 font-medium">
                    {payment.paymentId}
                  </td>
                  <td className="p-4 text-gray-700">{payment.studentName}</td>
                  <td className="p-4 text-gray-700">
                    {payment.studentClass.className}
                  </td>
                  <td className="p-4 text-gray-700 font-medium">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-700">{payment.fieldType}</td>
                  <td className="p-4 text-gray-700">
                    {payment.feeType || "N/A"}
                  </td>
                  <td className="p-4">
                    <Badge variant={payment.review ? "success" : "warning"}>
                      {payment.review ? "Reviewed" : "Pending"}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="neutral"
                        size="sm"
                        onClick={() => handleViewDetails(payment)}
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </Button>

                      <Button
                        variant={payment.review ? "neutral" : "success"}
                        size="sm"
                        onClick={() => handleCheckPayment(payment)}
                        disabled={payment.review}
                        title={
                          payment.review
                            ? "Already Reviewed"
                            : "Mark as Reviewed"
                        }
                      >
                        <FaCheckCircle size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md">
          <p className="text-gray-600">
            Showing page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="neutral"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>

            <Button
              variant="neutral"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                // Show pagination centered around current page
                const pageOffset = Math.max(0, currentPage - 3);
                const page = i + 1 + pageOffset;

                // Don't show pages beyond total pages
                if (page > totalPages) return null;

                return (
                  <Button
                    key={i}
                    variant={currentPage === page ? "primary" : "neutral"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="neutral"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </Button>

            <Button
              variant="neutral"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={handleCloseModal}
        />
      )}

      {/* Confirmation Dialog */}
      {paymentToCheck && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full animate-scaleIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Review
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to mark payment{" "}
              <span className="font-semibold">{paymentToCheck.paymentId}</span>{" "}
              for{" "}
              <span className="font-semibold">
                {paymentToCheck.studentName}
              </span>{" "}
              as reviewed?
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="neutral" onClick={closeCheckPaymentPopup}>
                Cancel
              </Button>
              <Button variant="success" onClick={confirmCheckPayment}>
                Confirm Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
