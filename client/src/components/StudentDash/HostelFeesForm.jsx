import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import ErrorModal from "../ErrorModal";
import InternalServerModal from "../InternalServerModal";

const HostelFeesForm = ({ isOpen, onClose }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [hostelFee, setHostelFee] = useState(1000);
  const [classesList, setClassesList] = useState([]);
  const [isClassesFetched, setIsClassesFetched] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "", // Make sure this matches the ID of your select element
    parentContact: "",
    joiningDate: "",
    roomPreference: "",
    messFacilities: "",
    additionalNotes: "",
  });
  const [error, setError] = useState("");
  const [internalServerError, setInternalServerError] = useState("");

  const handleOpenClassesDropdown = async () => {
    if (!isClassesFetched) {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/home/classes`
        );
        setClassesList(response.data);
        setIsClassesFetched(true);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchStudentData = async () => {
        try {
          const response = await axiosInstance.get(`/api/student/me`);
          const studentData = response.data;
          setFormData({
            studentName: studentData.name || "",
            studentId: studentData.id || "",
            class: studentData.class || "", // Make sure this matches the ID of your select element
            parentContact: studentData.fatherPhone || "",
            joiningDate: "",
            roomPreference: "",
            messFacilities: "",
            additionalNotes: "",
          });
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };
      fetchStudentData();
    }
  }, [isOpen]);

  const handleSubmitAndPay = async (e) => {
    e.preventDefault();
    setError("");
    setInternalServerError("");
    let formSubmissionSuccess = false;

    try {
      // Submit the hostel form data
      const formResponse = await axiosInstance.post(
        `${process.env.API_URL}/api/student/hostel-form`,
        formData
      );

      if (formResponse.status === 201) {
        formSubmissionSuccess = true;
      } else if (formResponse.status === 422) {
        setError("Validation Error. Please check your form data.");
        return; // Exit early
      } else {
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
        return; // Exit early
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.status === 422) {
        setError("Validation Error. Please check your form data.");
      } else {
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
      }
      return;
    }

    if (formSubmissionSuccess) {
      const amount = hostelFee * 100;
      const currency = "INR";
      const receiptId = "OrderReceipt_1";

      try {
        // Create Razorpay order
        const paymentResponse = await axiosInstance.post(
          `${process.env.API_URL}/api/pay/order`,
          {
            amount,
            currency,
            receipt: receiptId,
          }
        );
        const order = paymentResponse.data;

        var options = {
          key: import.meta.env.VITE_RAZORPAY_KEY || "",
          amount: order.amount,
          currency: order.currency,
          name: "Shivam Public",
          description: "Admission Fee",
          image: "https://example.com/your_logo",
          order_id: order.id,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
          prefill: {
            name: formData.studentName,
            email: formData.email,
            contact: formData.parentContact,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: "#3399cc",
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      } catch (error) {
        console.error("Error creating payment order:", error);
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleClassSelect = (e) => {
    const selectedClassId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      class: selectedClassId, // Ensure this matches the key in your formData state
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen">
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 md:hidden"
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

        <button
          className="absolute top-2 right-2 hidden md:block text-gray-600 p-2"
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

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hostel Fees Form
          </h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="studentName">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                className="w-full p-2 border rounded"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="studentId">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                className="w-full p-2 border rounded"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="class">
                Class
              </label>
              <select
                id="class"
                name="class"
                className="w-full p-2 border rounded"
                value={formData.class}
                onChange={handleClassSelect}
                onClick={handleOpenClassesDropdown}
                required
              >
                <option value="">Select Class</option>
                {classesList.map((classItem) => (
                  <option key={classItem._id} value={classItem._id}>
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="parentContact"
              >
                Parent Contact
              </label>
              <input
                type="text"
                id="parentContact"
                className="w-full p-2 border rounded"
                value={formData.parentContact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="joiningDate">
                Joining Date
              </label>
              <input
                type="date"
                id="joiningDate"
                className="w-full p-2 border rounded"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="roomPreference"
              >
                Room Preference
              </label>
              <select
                id="roomPreference"
                className="w-full p-2 border rounded"
                value={formData.roomPreference}
                onChange={handleChange}
                required
              >
                <option value="">Select Room Preference</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="messFacilities"
              >
                Mess Facilities
              </label>
              <select
                id="messFacilities"
                className="w-full p-2 border rounded"
                value={formData.messFacilities}
                onChange={handleChange}
                required
              >
                <option value="">Select Mess Facilities</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="additionalNotes"
              >
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                className="w-full p-2 border rounded"
                value={formData.additionalNotes}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleSubmitAndPay}
              >
                Submit and Pay
              </button>
            </div>
          </form>
        </div>
      </div>
      {error && <ErrorModal error={error} onClose={() => setError("")} />}
      {internalServerError && (
        <InternalServerModal
          error={internalServerError}
          onClose={() => setInternalServerError("")}
        />
      )}
    </div>
  );
};

export default HostelFeesForm;
