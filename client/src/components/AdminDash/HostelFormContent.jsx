import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Calendar,
  Phone,
  Utensils,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const HostelFormContent = () => {
  const [hostelForms, setHostelForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFormId, setExpandedFormId] = useState(null);
  const [formToReview, setFormToReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHostelForms = async (page) => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/hostel-forms-preview`,
          {
            params: { page, limit: 20 },
          }
        );
        const { data, totalPages, currentPage } = response.data;
        setHostelForms(data);
        setFilteredForms(data);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching hostel forms:", error);
        setError("Failed to load hostel forms.");
      } finally {
        setLoading(false);
      }
    };
    fetchHostelForms(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = hostelForms.filter((form) =>
      form.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredForms(filtered);
  }, [searchQuery, hostelForms]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleReviewClick = (form) => {
    setFormToReview(form);
  };

  const handleConfirmReview = async () => {
    try {
      await axiosInstance.put(
        `/api/admin/hostel-form-reviewed/${formToReview._id}`
      );
      setHostelForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, review: true } : form
        )
      );
      setFilteredForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, review: true } : form
        )
      );
      setFormToReview(null);
    } catch (error) {
      console.error("Error marking form as reviewed:", error);
      setError("Failed to mark the form as reviewed.");
    }
  };

  const toggleExpandForm = (formId) => {
    setExpandedFormId((prevId) => (prevId === formId ? null : formId));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading hostel applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <HomeIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Hostel Applications
            </h1>
          </div>
          <p className="text-gray-600">
            Manage and review student hostel accommodation requests
          </p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name..."
                className="w-full pl-12 pr-12 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600">Total Applications</div>
              <div className="text-2xl font-bold text-gray-900">
                {hostelForms.length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600">Pending Review</div>
              <div className="text-2xl font-bold text-indigo-600">
                {hostelForms.filter((form) => !form.review).length}
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredForms.length > 0 ? (
            filteredForms.map((form) => (
              <div
                key={form._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {form.studentName}
                      </h3>
                      <p className="text-gray-600">Class {form.class}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {form.review ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <ClipboardCheck className="w-4 h-4 mr-1" />
                          Reviewed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReviewClick(form)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Review Application
                        </button>
                      )}
                      <button
                        onClick={() => toggleExpandForm(form._id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {expandedFormId === form._id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedFormId === form._id && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Joining:{" "}
                            {new Date(form.joiningDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <HomeIcon className="w-4 h-4" />
                          <span>Preference: {form.roomPreference}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>Contact: {form.parentContact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Utensils className="w-4 h-4" />
                          <span>Mess: {form.messFacilities}</span>
                        </div>
                      </div>
                      {form.additionalNotes && (
                        <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Additional Notes
                          </h4>
                          <p className="text-gray-600">
                            {form.additionalNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No applications found matching your search
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200">
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

        {/* Review Modal */}
        {formToReview && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Confirm Review
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark this application as reviewed? This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setFormToReview(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReview}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Confirm Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelFormContent;
