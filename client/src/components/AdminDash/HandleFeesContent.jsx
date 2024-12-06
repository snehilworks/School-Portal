import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ErrorModal from "../ErrorModal";
import PrimaryButton from "../ui/PrimaryButton";

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
    <div
      className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl mt-10"
    >
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Set Annual Fees
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
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
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
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
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          />
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            type="submit"
            className="inline-flex bg-custom-gray items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
          >
            Set Fees
          </PrimaryButton>
        </div>
      </form>

      {submitted && (
        <div className="mt-8 p-6 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg shadow-lg">
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
