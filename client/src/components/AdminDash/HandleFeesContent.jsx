import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ErrorModal from "../ErrorModal";

const FeeForm = () => {
  const [classes, setClasses] = useState([]);
  const [feeData, setFeeData] = useState({
    name: "",
    description: "",
    amount: 0,
    currency: "USD",
    type: "Annual",
    selectedClass: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/classes`);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeeData({ ...feeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await axiosInstance.post(
        `/api/admin/set-fees`,
        {
          class: feeData.selectedClass,
          description: feeData.description,
          amount: feeData.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Failed to set fees for classes");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to set fees for classes"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Set Fees
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="class-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Class
          </label>
          <select
            id="class-select"
            name="selectedClass"
            value={feeData.selectedClass}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={feeData.description}
            onChange={handleInputChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={feeData.amount}
            onChange={handleInputChange}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:-translate-y-0.5"
          >
            Set Fees
          </button>
        </div>
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
          <p className="text-center text-lg font-semibold">
            Thank you! {feeData.type} Fees for the selected class have been set.
          </p>
        </div>
      )}
      {error && <ErrorModal error={error} onClose={() => setError("")} />}
    </div>
  );
};

export default FeeForm;
