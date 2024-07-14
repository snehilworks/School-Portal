import React, { useState, useEffect } from "react";
import axios from "axios";

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
  });

  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/admin/classes`
        );
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                Date of Birth:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender:
              </label>
              <select
                className="form-select block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="guardianName"
              >
                Guardian Name:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="guardianName"
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="guardianPhone"
              >
                Guardian Phone:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="guardianPhone"
                type="tel"
                name="guardianPhone"
                pattern="[0-9]{10}"
                value={formData.guardianPhone}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="class"
              >
                Class:
              </label>
              {loading ? (
                <p className="text-gray-500">Loading classes...</p>
              ) : (
                <select
                  className="form-select block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="villageName"
              >
                Village Name:
              </label>
              <input
                className="form-input block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                id="villageName"
                type="text"
                name="villageName"
                value={formData.villageName}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address:
              </label>
              <textarea
                className="form-textarea block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 resize-y"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
