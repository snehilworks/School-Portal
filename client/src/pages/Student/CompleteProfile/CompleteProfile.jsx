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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/classes`);
        setClassList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/api/student/complete-student-profile`,
        formData
      );

      if (response.status === 201) {
        console.log("Profile completed successfully:", response.data);
        navigate("/student/dashboard");
      } else {
        console.error("Profile completion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Profile completion failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-blue-500 to-green-200  border-stone-800 mt-10 mb-10 shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="phone"
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="form-select block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="fatherName"
              >
                Father Name
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="fatherName"
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="fatherPhone"
              >
                Father Phone Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="fatherPhone"
                type="tel"
                name="fatherPhone"
                pattern="[0-9]{10}"
                value={formData.fatherPhone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="motherName"
              >
                Mother Name
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="motherName"
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="motherPhone"
              >
                Mother Phone Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="motherPhone"
                type="tel"
                name="motherPhone"
                pattern="[0-9]{10}"
                value={formData.motherPhone}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="class"
              >
                Class
              </label>
              {loading ? (
                <p className="text-gray-500">Loading classes...</p>
              ) : (
                <select
                  className="form-select block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
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
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="placeName"
              >
                Village Name
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="placeName"
                type="text"
                name="placeName"
                value={formData.placeName}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                className="form-textarea block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 resize-y"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="aadharNumber"
              >
                Aadhar Card Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="aadharNumber"
                type="text"
                name="aadharNumber"
                pattern="[0-9]{12}"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="previousSchoolTC"
              >
                Previous School TC Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="previousSchoolTC"
                type="text"
                name="previousSchoolTC"
                value={formData.previousSchoolTC}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <PrimaryButton
              color="student"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Submit
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
