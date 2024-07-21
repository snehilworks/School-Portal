import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const FeeStructure = () => {
  const [feeStructureData, setFeeStructureData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feeResponse = await axiosInstance.get(
          `/api/student/fee-structure`
        );
        setFeeStructureData(feeResponse.data);

        // Fetch class data
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  // Create a map for classId to className
  const classMap = classData.reduce((map, item) => {
    map[item._id] = item.className;
    return map;
  }, {});

  // Dummy data for hostel fees
  const hostelFeeData = [
    { type: "3rd to 6th Class", annualFee: 60000 },
    { type: "7th and 10th Class", annualFee: 100000 },
    { type: "Others", annualFee: 120000 },
  ];

  return (
    <div className="pt-2 pb-2 px-4 mb-20 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-7xl min-h-screen">
        <div className="text-center mb-32">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
            Fee Structure Overview
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Comprehensive details on the annual and hostel fee structures.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Annual Fee Structure */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="bg-indigo-600 text-white text-center text-2xl font-semibold py-4 px-6 rounded-t-lg">
              Annual Fee Structure
            </h2>
            <div className="overflow-x-auto lg:overflow-x-auto">
              <table className="w-full lg:min-w-[600px] text-sm lg:text-base">
                <thead className="bg-gray-200 border-b border-gray-300">
                  <tr>
                    <th className="py-4 px-3 lg:px-6 font-semibold text-gray-700 uppercase">
                      Class
                    </th>
                    <th className="py-4 px-3 lg:px-6 font-semibold text-gray-700 uppercase">
                      Annual Fee (INR)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructureData.map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 transition-colors duration-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-3 text-center lg:px-6 text-gray-800 border-b border-gray-300">
                        {classMap[item.class] || item.description}
                      </td>
                      <td className="py-4 px-3 text-center lg:px-6 text-gray-800 border-b border-gray-300">
                        {item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hostel Fee Structure */}
          <div className="bg-gray-200 border border-gray-300 text-center rounded-lg shadow-lg">
            <h2 className="bg-indigo-600 text-white text-center text-2xl font-semibold py-4 px-6 rounded-t-lg">
              Hostel Fee Structure
            </h2>
            <div className="overflow-x-auto lg:overflow-x-auto">
              <table className="w-full lg:min-w-[600px] text-sm lg:text-base">
                <thead className="bg-gray-200 border-b border-gray-300">
                  <tr>
                    <th className="py-4 px-3 lg:px-6 font-semibold text-gray-700 uppercase">
                      Room Type
                    </th>
                    <th className="py-4 px-3 lg:px-6 font-semibold text-gray-700 uppercase">
                      Annual Fee (INR)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hostelFeeData.map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 transition-colors duration-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-3 lg:px-6 text-gray-800 border-b border-gray-300">
                        {item.type}
                      </td>
                      <td className="py-4 px-3 lg:px-6 text-gray-800 border-b border-gray-300">
                        {item.annualFee.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;
