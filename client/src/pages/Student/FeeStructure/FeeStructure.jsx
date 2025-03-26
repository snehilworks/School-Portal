import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const FeeStructure = () => {
  const [feeStructureData, setFeeStructureData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("annual");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feeResponse = await axiosInstance.get(
          `/api/student/fee-structure`
        );
        setFeeStructureData(feeResponse.data);

        const classResponse = await axiosInstance.get(`/api/teacher/classes`);
        setClassData(classResponse.data);

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-4 bg-red-50 text-red-600 rounded-md border border-red-200 mx-4 my-8">
        {error}
      </div>
    );

  // Create a map for classId to className
  const classMap = classData.reduce((map, item) => {
    map[item._id] = item.className;
    return map;
  }, {});

  const hostelFeeData = [
    { type: "3rd to 6th Class", annualFee: 60000 },
    { type: "7th and 10th Class", annualFee: 100000 },
    { type: "Others", annualFee: 120000 },
  ];

  return (
    <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-6 hover:bg-blue-700 transition duration-200 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Fee Structure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All fees information for the academic year 2025
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
          <button
            onClick={() => setActiveTab("annual")}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors duration-200 ${
              activeTab === "annual"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Annual Fees
          </button>
          <button
            onClick={() => setActiveTab("hostel")}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors duration-200 ${
              activeTab === "hostel"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Hostel Fees
          </button>
        </div>

        {/* Annual Fees Tab */}
        {activeTab === "annual" && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-sky-600 text-white text-center text-xl sm:text-2xl font-semibold py-4 px-6">
              Annual Fee Structure
            </h2>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">
                        Class
                      </th>
                      <th className="py-3 px-4 text-right font-semibold text-gray-700">
                        Annual Fee (INR)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructureData.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 border-b border-gray-200 font-medium">
                          {classMap[item.class] || item.description}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-right">
                          ₹{item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fee Information
                </h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>Annual fees can be paid in full or in installments</li>
                  <li>
                    For payment methods and schedules, please contact the
                    accounts office
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Hostel Fees Tab */}
        {activeTab === "hostel" && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-sky-600 text-white text-center text-xl sm:text-2xl font-semibold py-4 px-6">
              Hostel Fee Structure
            </h2>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">
                        Class Range
                      </th>
                      <th className="py-3 px-4 text-right font-semibold text-gray-700">
                        Annual Fee (INR)
                      </th>
                      <th className="py-3 px-4 text-center font-semibold text-gray-700">
                        Room Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostelFeeData.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 border-b border-gray-200 font-medium">
                          {item.type}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-right">
                          ₹{item.annualFee.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-200 text-center">
                          {item.type === "3rd to 6th Class"
                            ? "Shared (4 students)"
                            : item.type === "7th and 10th Class"
                            ? "Shared (3 students)"
                            : "Shared (2 students)"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Hostel Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center text-sm text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 Security
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Three Meals Daily
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    WiFi Access
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Study Facilities
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF Download Button
        <div className="mt-8 flex justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-200 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clipRule="evenodd"
              />
            </svg>
            Download Fee Structure PDF
          </button>
        </div> */}

        {/* Contact Info */}
        <div className="mt-8 mb-4 text-center text-gray-600 text-sm">
          For more information, please contact the accounts department at{" "}
          <span className="font-medium">accounts@school.edu</span> or call{" "}
          <span className="font-medium">123-456-7890</span>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;
