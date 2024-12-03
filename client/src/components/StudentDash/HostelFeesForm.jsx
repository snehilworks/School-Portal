import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import ErrorModal from "../ErrorModal";
import InternalServerModal from "../InternalServerModal";
import { useNavigate } from "react-router-dom";

const HostelFeesForm = ({ isOpen, onClose }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [hostelFee, setHostelFee] = useState(1000);
  const [classesList, setClassesList] = useState([]);
  const [isClassesFetched, setIsClassesFetched] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    class: "",
    parentContact: "",
    joiningDate: "",
    roomPreference: "",
    messFacilities: "",
    additionalNotes: "",
  });
  const [error, setError] = useState("");
  const [internalServerError, setInternalServerError] = useState("");
  const navigate = useNavigate();

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
            class: studentData.class || "",
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
        return;
      } else {
        setInternalServerError(
          "Internal Server Error. Please try again later."
        );
        return;
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

      try {
        // Create Razorpay order
        const paymentResponse = await axiosInstance.post(
          `${process.env.API_URL}/api/pay/order`,
          {
            amount
          }
        );
        const order = paymentResponse.data;
        VerifyPayment(order);
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
      class: selectedClassId,
    }));
  };

  const VerifyPayment = async (data) => {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "",
      amount: data.amount,
      currency: "INR",
      name: "Shivam Public, Aarni(Hostel)",
      description: "Hotel Fees",
      image: "https://example.com/your_logo",
      order_id: data.id,
      handler: async function (response) {
        try {
          // Verify payment
          const verificationResponse = await axiosInstance.post(
            `${process.env.API_URL}/api/pay/verify-payment`,
            {
              orderId: data.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              studentName: formData.studentName,
              studentClass: formData.class,
              amount: data.amount / 100, // Convert back to INR
              paymentDate: new Date(),
              fieldType: "HOSTEL",
            }
          );

          if (verificationResponse.status === 201) {
            navigate("/student/payment-completion", {
              state: { paymentId: response.razorpay_payment_id },
            });
          } else {
            alert("Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Payment verification error.");
        }
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
        color: "#14B8A6",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp1.open();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mt-40 md:mt-16 mb-20 md:mb-5 bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen mt-0">
        <button
          className="absolute top-2 right-2 hidden md:block text-red-600 p-3"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
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
          <div className="flex">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Hostel Fees Form
            </h2>
            <button
              className="mb-3 pl-10 text-red-700 md:hidden"
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[25px] w-[25px]"
                fill="none"
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
          </div>

          <form className="md:grid gap-4 md:grid-cols-2">
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
                className="w-full bg-gradient-to-l from-teal-600 to-teal-200 text-black font-semibold shadow-lg hover:bg-black py-2 px-4 rounded"
                onClick={handleSubmitAndPay}
              >
                Submit and Pay
              </button>
            </div>
            {/* </div> */}
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
