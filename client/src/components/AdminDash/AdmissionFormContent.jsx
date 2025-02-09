import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  Filter,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import useDebounce from "../../hooks/useDebounce";

const AdmissionFormContent = () => {
  const [admissionForms, setAdmissionForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [formToReview, setFormToReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // new status filter
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filteredForms, setFilteredForms] = useState([]);

  const stats = {
    total: admissionForms.length,
    reviewed: admissionForms.filter((form) => form.review).length,
    pending: admissionForms.filter((form) => !form.review).length,
  };

  const fetchAdmissionForms = useCallback(async (page, query = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/admin/admission-forms-preview`,
        {
          params: { page, limit: 20, search: query },
        }
      );
      const { data, totalPages, currentPage } = response.data;
      setAdmissionForms(data);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching admission forms:", error);
      setError("Failed to load admission forms.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmissionForms(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchAdmissionForms]);

  useEffect(() => {
    let filtered = admissionForms.filter((form) =>
      form.studentName
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
    );

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((form) =>
        statusFilter === "reviewed" ? form.review : !form.review
      );
    }

    setFilteredForms(filtered);
  }, [debouncedSearchQuery, admissionForms, statusFilter]);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchAdmissionForms(1, debouncedSearchQuery);
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

  const handleViewDetails = (form) => {
    setSelectedForm(form);
  };

  const handleReviewClick = (form) => {
    setFormToReview(form);
    setReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedForm(null);
    setReviewModalOpen(false);
  };

  const handleConfirmReview = async () => {
    try {
      await axiosInstance.put(
        `/api/admin/admission-form-reviewed/${formToReview._id}`
      );
      setAdmissionForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, review: true } : form
        )
      );
      setFormToReview(null);
      setReviewModalOpen(false);
    } catch (error) {
      console.error("Error marking form as reviewed:", error);
      setError("Failed to mark the form as reviewed.");
    }
  };

  // useEffect(() => {
  //   const filtered = admissionForms.filter((form) =>
  //     form.studentName
  //       .toLowerCase()
  //       .includes(debouncedSearchQuery.toLowerCase())
  //   );
  //   setFilteredForms(filtered);
  // }, [debouncedSearchQuery, admissionForms]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 relative animate-spin">
          <div className="w-full h-full rounded-full border-4 border-t-indigo-600 border-r-indigo-600 border-b-indigo-200 border-l-indigo-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-lg text-gray-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admission Forms
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Total Applications</div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Reviewed</div>
              <div className="text-2xl font-bold text-green-600">
                {stats.reviewed}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Pending Review</div>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name..."
              className="w-full pl-12 pr-12 py-4 bg-white rounded-xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                statusFilter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              All
            </button>
            <button
              onClick={() => handleFilterChange("reviewed")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                statusFilter === "reviewed"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Reviewed
            </button>
            <button
              onClick={() => handleFilterChange("pending")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                statusFilter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Pending
            </button>
          </div>
        </div>

        {/* Table with updated styling */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredForms.map((form) => (
                  <tr
                    key={form._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {form.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {form.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {form.class}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900">{form.fatherPhone}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {form.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {form.review ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Reviewed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end space-x-3">
                        {!form.review && (
                          <button
                            onClick={() => handleReviewClick(form)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Review
                          </button>
                        )}
                        <button
                          onClick={() => handleViewDetails(form)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredForms.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-500">No admission forms found</div>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        {selectedForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Student Details
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(selectedForm).map(([key, value]) => {
                  if (key !== "_id" && key !== "review") {
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-start"
                      >
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-gray-900 text-right">
                          {value}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedForm(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Confirm Review
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark this form as reviewed?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReview}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionFormContent;
