import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    class: "",
    placeName: "",
    address: "",
    aadharNumber: "",
    previousSchoolTC: "",
  });

  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/classes`);
        setClassList(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load classes. Please try again.");
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const filledFields = Object.values(formData).filter(
      (field) => field !== ""
    ).length;
    const totalFields = Object.keys(formData).length;
    const newProgress = (filledFields / totalFields) * 100;
    setProgress(newProgress);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axiosInstance.post(
        `/api/student/complete-student-profile`,
        formData
      );

      if (response.status === 200) {
        navigate("/student/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to complete profile. Please try again."
      );
      setSubmitted(false);
    }
  };

  const getInputClasses = (value) => `
    transition-all duration-200
    w-full px-4 py-3 
    border rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
    ${value ? "border-teal-500 bg-teal-50" : "border-gray-300"}
    ${error ? "border-red-500 bg-red-50" : ""}
  `;

  return (
    <div className="min-h-screen mt-8 mb-0 bg-gradient-to-br from-teal-800 to-teal-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Complete Your Profile
          </h2>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-teal-600">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="transition-all duration-500 ease-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={getInputClasses(formData.name)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    className={getInputClasses(formData.phone)}
                    placeholder="10-digit phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={getInputClasses(formData.dob)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={getInputClasses(formData.gender)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parents Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">
                Parent Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={getInputClasses(formData.fatherName)}
                    placeholder="Enter father's name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Father's Phone
                  </label>
                  <input
                    type="tel"
                    name="fatherPhone"
                    pattern="[0-9]{10}"
                    value={formData.fatherPhone}
                    onChange={handleChange}
                    className={getInputClasses(formData.fatherPhone)}
                    placeholder="Father's phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className={getInputClasses(formData.motherName)}
                    placeholder="Enter mother's name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Mother's Phone
                  </label>
                  <input
                    type="tel"
                    name="motherPhone"
                    pattern="[0-9]{10}"
                    value={formData.motherPhone}
                    onChange={handleChange}
                    className={getInputClasses(formData.motherPhone)}
                    placeholder="Mother's phone number"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">
                Academic Details
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Class
                  </label>
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-12 rounded-lg" />
                  ) : (
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      className={getInputClasses(formData.class)}
                      required
                    >
                      <option value="">Select Class</option>
                      {classList.map((classItem) => (
                        <option key={classItem._id} value={classItem._id}>
                          {classItem.className}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Previous School TC Number
                  </label>
                  <input
                    type="text"
                    name="previousSchoolTC"
                    value={formData.previousSchoolTC}
                    onChange={handleChange}
                    className={getInputClasses(formData.previousSchoolTC)}
                    placeholder="Enter TC number"
                  />
                </div>
              </div>
            </div>

            {/* Address & Documents */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">
                Address & Documents
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Village Name
                  </label>
                  <input
                    type="text"
                    name="placeName"
                    value={formData.placeName}
                    onChange={handleChange}
                    className={getInputClasses(formData.placeName)}
                    placeholder="Enter village name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`${getInputClasses(
                      formData.address
                    )} resize-none min-h-[100px]`}
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Aadhar Card Number
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    pattern="[0-9]{12}"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    className={getInputClasses(formData.aadharNumber)}
                    placeholder="12-digit Aadhar number"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <PrimaryButton
                color="student"
                className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                type="submit"
                disabled={submitted || progress < 100}
              >
                {submitted ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Submitting...
                  </div>
                ) : (
                  "Complete Profile"
                )}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
