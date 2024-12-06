import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";
import Modal from "../ui/Modal";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FaSearch, FaTimes } from "react-icons/fa";
// import AdmissionFormService from "./services/AdmissionFormService";
import useDebounce from "../../hooks/useDebounce"; // Adjust the import path as necessary

const AdmissionFormContent = () => {
  const [admissionForms, setAdmissionForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [formToReview, setFormToReview] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Adjust debounce delay as necessary
  const [filteredForms, setFilteredForms] = useState([]);

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
      setError(null); // Clear error if data is fetched successfully
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

  useEffect(() => {
    const filtered = admissionForms.filter((form) =>
      form.studentName
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredForms(filtered);
  }, [debouncedSearchQuery, admissionForms]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
    <div className="p-8 bg-custom-gray min-h-screen rounded-2xl mb-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Admission Forms</h2>

        {/* Enhanced Search Box */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by student name..."
                className="w-full p-4 pl-12 pr-16 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-300 ease-in-out" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-300 ease-in-out"
                >
                  <FaTimes />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full bg-white border border-gray-900 rounded-xl shadow-lg">
          <thead className="bg-gray-900 shadow-lg text-white">
            <tr>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Father's Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.length > 0 ? (
              filteredForms.map((form) => (
                <tr
                  key={form._id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 text-gray-700">{form.studentName}</td>
                  <td className="p-4 text-gray-700">{form.class}</td>
                  <td className="p-4 text-gray-700">{form.email}</td>
                  <td className="p-4 text-gray-700">{form.fatherPhone}</td>
                  <td className="p-4 text-center flex justify-center items-center space-x-2">
                    {form.review ? (
                      <span className="flex items-center space-x-2 text-green-600">
                        <CheckCircleIcon className="w-8 h-8" />
                        <span className="text-lg font-medium">Reviewed</span>
                      </span>
                    ) : (
                      <PrimaryButton
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md shadow-md"
                        onClick={() => handleReviewClick(form)}
                      >
                        Review Form
                      </PrimaryButton>
                    )}
                    <PrimaryButton
                      className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-4 rounded-md shadow-md"
                      onClick={() => handleViewDetails(form)}
                    >
                      View Details
                    </PrimaryButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-600">
                  No admission forms found
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
          className="bg-gray-600 text-white hover:bg-gray-700 transition-colors py-2 px-4 rounded-md shadow-md"
        >
          Previous
        </PrimaryButton>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <PrimaryButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-600 text-white hover:bg-gray-700 transition-colors py-2 px-4 rounded-md shadow-md"
        >
          Next
        </PrimaryButton>
      </div>

      {/* View Details Modal */}
      {selectedForm && (
        <Modal onClose={() => setSelectedForm(null)}>
          <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
              Form Details
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Student Name:</p>
                <p className="text-gray-900">{selectedForm.studentName}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-blue-600">{selectedForm.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Class:</p>
                <p className="text-gray-900">{selectedForm.class}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Father's Phone:</p>
                <p className="text-gray-900">{selectedForm.fatherPhone}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Address:</p>
                <p className="text-gray-900">{selectedForm.address}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">Admission Status:</p>
                <p
                  className={`font-medium ${
                    selectedForm.admissionStatus
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <span
                    className={`${
                      selectedForm.admissionStatus
                        ? "bg-green-100 text-green-600 px-2 py-1 rounded-full"
                        : "bg-red-100 text-red-600 px-2 py-1 rounded-full"
                    }`}
                  >
                    {selectedForm.admissionStatus ? "Admitted" : "Not Admitted"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setSelectedForm(null)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Confirm Review</h2>
            <p>Are you sure you want to mark this form as reviewed?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <PrimaryButton
                className="bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md shadow-md"
                onClick={handleConfirmReview}
              >
                Confirm
              </PrimaryButton>
              <PrimaryButton
                className="bg-red-600 text-white hover:bg-red-700 transition-colors py-2 px-4 rounded-md shadow-md"
                onClick={handleCloseModal}
              >
                Cancel
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdmissionFormContent;
