import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import PrimaryButton from "../../../components/ui/PrimaryButton";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    class: "",
    villageName: "",
    address: "",
    aadharCardNumber: "",
    previousSchoolTCNumber: "",
  });

  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Data:", formData);
    // Add your form submission logic here, such as sending the data to your server
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-gray-100 border-stone-800 mt-10 mb-10 shadow-lg rounded-lg p-8 max-w-4xl w-full">
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
                htmlFor="guardianName"
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
                value={formData.guardianPhone}
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
                    <option key={classItem.id} value={classItem.className}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="villageName"
              >
                Village Name
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="villageName"
                type="text"
                name="villageName"
                value={formData.villageName}
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
                htmlFor="aadharCardNumber"
              >
                Aadhar Card Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="aadharCardNumber"
                type="text"
                name="aadharCardNumber"
                pattern="[0-9]{12}"
                value={formData.aadharCardNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="previousSchoolTCNumber"
              >
                Previous School TC Number
              </label>
              <input
                className="form-input block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="previousSchoolTCNumber"
                type="text"
                name="previousSchoolTCNumber"
                value={formData.previousSchoolTCNumber}
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
              Register
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
