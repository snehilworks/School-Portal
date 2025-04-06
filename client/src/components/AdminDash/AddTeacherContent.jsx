import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  BookOpen,
  School,
  CheckCircle,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const AddTeacherContent = () => {
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    phone: "",
    classTeacher: false,
    classId: "",
    classes: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (teacherDetails.classTeacher) {
      fetchClasses();
    }
  }, [teacherDetails.classTeacher]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/admin/classes`);
      setClassesList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("Failed to load classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: name === "classTeacher" ? checked : value,
    });
  };

  const handleClassChange = (event) => {
    setTeacherDetails({
      ...teacherDetails,
      classId: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Convert subjects string to an array
    const subjectsArray = teacherDetails.subjects
      .split(",")
      .map((subject) => subject.trim());

    // Convert classes string to an array
    const classesArray = teacherDetails.classes
      .split(",")
      .map((classItem) => classItem.trim());

    const payload = {
      ...teacherDetails,
      subjects: subjectsArray,
      classes: classesArray,
      classTeacher: teacherDetails.classTeacher ? true : false,
      classId: teacherDetails.classTeacher ? teacherDetails.classId : null,
    };

    if (!teacherDetails.classTeacher) {
      delete payload.classId;
    }

    try {
      const response = await axiosInstance.post(`/api/admin/teacher`, payload);
      console.log("Teacher details submitted successfully:", response.data);

      // Reset form fields after successful submission
      setTeacherDetails({
        name: "",
        email: "",
        password: "",
        subjects: "",
        phone: "",
        classTeacher: false,
        classId: "",
        classes: "",
      });

      // Show success message
      setSuccessMessage("Teacher added successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting teacher details:", error);
      setError("Failed to add teacher. Please check the form and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800 text-center">
          Add New Teacher
        </h2>
        <p className="text-center text-gray-500 mt-1">
          Enter teacher information to register in the system
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teacher Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={teacherDetails.name}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Teacher Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={teacherDetails.email}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
                placeholder="teacher@school.edu"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={teacherDetails.password}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={teacherDetails.phone}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subjects */}
          <div className="space-y-2">
            <label
              htmlFor="subjects"
              className="block text-sm font-medium text-gray-700"
            >
              Subjects (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="subjects"
                name="subjects"
                value={teacherDetails.subjects}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
                placeholder="Math, Science, History"
              />
            </div>
          </div>

          {/* Classes */}
          <div className="space-y-2">
            <label
              htmlFor="classes"
              className="block text-sm font-medium text-gray-700"
            >
              Classes (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <School className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="classes"
                name="classes"
                value={teacherDetails.classes}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
                placeholder="10A, 11B, 12C"
              />
            </div>
          </div>
        </div>

        {/* Class Teacher Checkbox */}
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="classTeacher"
              name="classTeacher"
              type="checkbox"
              checked={teacherDetails.classTeacher}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="classTeacher" className="font-medium text-gray-700">
              Assign as Class Teacher
            </label>
            <p className="text-gray-500">
              The teacher will be assigned as the primary teacher for a class
            </p>
          </div>
        </div>

        {/* Class Selection (Conditional) */}
        {teacherDetails.classTeacher && (
          <div className="space-y-2">
            <label
              htmlFor="classId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Class
            </label>
            <select
              id="classId"
              name="classId"
              value={teacherDetails.classId}
              onChange={handleClassChange}
              required={teacherDetails.classTeacher}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5"
            >
              <option value="">Select a class</option>
              {classesList.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.className}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-200 disabled:bg-blue-400"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Add Teacher
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Notification */}
      {openSnackbar && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg flex items-center transition-all duration-300">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
          <button
            onClick={handleCloseSnackbar}
            className="ml-4 p-1 hover:bg-green-600 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTeacherContent;
