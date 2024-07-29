import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PrimaryButton from "../ui/PrimaryButton";
import Modal from "../ui/Modal";

const AdmissionFormContent = () => {
  const [admissionForms, setAdmissionForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [formToReview, setFormToReview] = useState(null);

  useEffect(() => {
    const fetchAdmissionForms = async (page) => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/admission-forms-preview`,
          {
            params: { page, limit: 20 },
          }
        );
        const { data, totalPages, currentPage } = response.data;
        setAdmissionForms(data);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching admission forms:", error);
        setError("Failed to load admission forms.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionForms(currentPage);
  }, [currentPage]);

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
      // Update the local state to reflect the change
      setAdmissionForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, reviewed: true } : form
        )
      );
      setFormToReview(null);
      setReviewModalOpen(false);
    } catch (error) {
      console.error("Error marking form as reviewed:", error);
      setError("Failed to mark the form as reviewed.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Admission Forms
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Father's Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissionForms.length > 0 ? (
              admissionForms.map((form) => (
                <tr
                  key={form._id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 text-gray-700">{form.studentName}</td>
                  <td className="p-4 text-gray-700">{form.class}</td>
                  <td className="p-4 text-gray-700">{form.email}</td>
                  <td className="p-4 text-gray-700">{form.fatherPhone}</td>
                  <td className="p-4 text-center flex justify-center space-x-2">
                    <PrimaryButton
                      className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-4 rounded-md shadow-md"
                      onClick={() => handleViewDetails(form)}
                    >
                      View Details
                    </PrimaryButton>
                    <PrimaryButton
                      className="bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md shadow-md"
                      onClick={() => handleReviewClick(form)}
                    >
                      Review Form
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
        <span className="text-gray-700">
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

      {/* Modal for detailed view */}
      {selectedForm && (
        <Modal
          onClose={handleCloseModal}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Details for {selectedForm.studentName}
          </h3>
          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Student Name:</strong>{" "}
              {selectedForm.studentName}
            </p>
            <p>
              <strong className="text-gray-700">Father's Name:</strong>{" "}
              {selectedForm.fatherName}
            </p>
            <p>
              <strong className="text-gray-700">Mother's Name:</strong>{" "}
              {selectedForm.motherName}
            </p>
            <p>
              <strong className="text-gray-700">Class:</strong>{" "}
              {selectedForm.class}
            </p>
            <p>
              <strong className="text-gray-700">Father's Phone:</strong>{" "}
              {selectedForm.fatherPhone}
            </p>
            <p>
              <strong className="text-gray-700">Gender:</strong>{" "}
              {selectedForm.gender}
            </p>
            <p>
              <strong className="text-gray-700">Email:</strong>{" "}
              {selectedForm.email}
            </p>
            <p>
              <strong className="text-gray-700">Address:</strong>{" "}
              {selectedForm.address}
            </p>
          </div>
        </Modal>
      )}

      {/* Modal for review confirmation */}
      {reviewModalOpen && (
        <Modal
          onClose={() => setReviewModalOpen(false)}
          className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Have you reviewed the admission form?
          </h3>
          <p className="text-gray-600 mb-6">
            Please confirm if you have reviewed the admission form to proceed.
          </p>
          <div className="flex justify-center">
            <PrimaryButton
              onClick={handleConfirmReview}
              className="bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-colors py-3 px-6 rounded-lg shadow-lg"
            >
              Yes, Review
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdmissionFormContent;
