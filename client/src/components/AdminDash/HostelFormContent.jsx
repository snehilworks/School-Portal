import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";
import { FaArrowLeft, FaArrowRight, FaSearch, FaTimes } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ImSpinner9 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="p-8 bg-custom-gray min-h-screen rounded-2xl">
      <h2 className="text-3xl font-semibold text-white text-center mb-8">
        Hostel Forms
      </h2>

      {/* Enhanced Search Box */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name..."
            className="w-full p-4 pl-12 pr-16 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-200 placeholder-gray-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-transform duration-300 ease-in-out"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredForms.length > 0 ? (
          filteredForms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {form.studentName} (Class: {form.class})
                  </h3>
                  <span
                    className={`text-sm font-medium ${
                      form.review ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {form.review ? "Reviewed" : "Pending Review"}
                  </span>
                </div>
                {!form.review && (
                  <PrimaryButton
                    color={"admin"}
                    className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                    onClick={() => handleReviewClick(form)}
                  >
                    Review Form
                  </PrimaryButton>
                )}
              </div>
              <button
                className={`mt-4 text-lg font-medium ${
                  expandedFormId === form._id
                    ? "text-blue-600"
                    : "text-blue-400"
                } transition-colors`}
                onClick={() => toggleExpandForm(form._id)}
              >
                {expandedFormId === form._id
                  ? "Collapse Details"
                  : "View Details"}
              </button>
              {expandedFormId === form._id && (
                <div className="mt-4 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg shadow-inner">
                  <p>
                    <strong>Joining Date:</strong>{" "}
                    {new Date(form.joiningDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Room Preference:</strong> {form.roomPreference}
                  </p>
                  <p>
                    <strong>Parent's Contact:</strong> {form.parentContact}
                  </p>
                  <p>
                    <strong>Mess Facilities:</strong> {form.messFacilities}
                  </p>
                  <p>
                    <strong>Additional Notes:</strong>{" "}
                    {form.additionalNotes || "N/A"}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 flex flex-col items-center mt-8">
            <FaSearch className="text-6xl mb-4 text-gray-300" />
            <p>No hostel forms found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <PrimaryButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`py-2 px-4 rounded-md flex items-center ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-opacity`}
        >
          <FaArrowLeft className="mr-2" /> Previous
        </PrimaryButton>
        <span className="text-gray-800 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <PrimaryButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`py-2 px-4 rounded-md flex items-center ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-opacity`}
        >
          Next <FaArrowRight className="ml-2" />
        </PrimaryButton>
      </div>

      {/* Confirmation for review */}
      {formToReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto animate__animated animate__fadeIn">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Confirm Review
            </h3>
            <p className="text-lg mb-6 text-center">
              Are you sure you want to mark this form as reviewed?
            </p>
            <div className="flex justify-around">
              <PrimaryButton
                onClick={handleConfirmReview}
                className="bg-green-500 text-white hover:bg-green-600 transition-colors py-2 px-4 rounded-md"
              >
                Confirm
              </PrimaryButton>
              <PrimaryButton
                onClick={() => setFormToReview(null)}
                className="bg-red-500 text-white hover:bg-red-600 transition-colors py-2 px-4 rounded-md"
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

export default HostelFormContent;
