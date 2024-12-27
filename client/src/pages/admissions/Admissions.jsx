import React, { useState } from "react";
import AdmissionForm from "../../components/Home/AdmissionForm";

const AdmissionsPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const seatAvailability = [
    { class: "Nursery", seatsAvailable: 1 },
    { class: "LKG", seatsAvailable: 12 },
    { class: "UKG", seatsAvailable: 2 },
    { class: "1", seatsAvailable: 20 },
    { class: "2", seatsAvailable: 15 },
    { class: "3", seatsAvailable: 18 },
    { class: "4", seatsAvailable: 12 },
    { class: "5", seatsAvailable: 25 },
    { class: "6", seatsAvailable: 22 },
    { class: "7", seatsAvailable: 19 },
    { class: "8", seatsAvailable: 16 },
    { class: "9", seatsAvailable: 14 },
    { class: "10", seatsAvailable: 10 },
    { class: "11-Science", seatsAvailable: 12 },
    { class: "11-Arts", seatsAvailable: 0 },
    { class: "12-Science", seatsAvailable: 12 },
    { class: "12-Arts", seatsAvailable: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-emerald-500 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admissions 2024-25
          </h1>
          <div className="flex items-center justify-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium">Admissions are now open</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop View */}
          <div className="hidden sm:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Class
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Available Seats
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {seatAvailability.map((row, idx) => (
                  <tr
                    key={row.class}
                    className={`hover:bg-gray-50 transition-colors ${
                      idx !== seatAvailability.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        Class {row.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.seatsAvailable === 0
                            ? "bg-red-100 text-red-800"
                            : row.seatsAvailable <= 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {row.seatsAvailable} seats
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setOpenModal(true)}
                        disabled={row.seatsAvailable === 0}
                        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          row.seatsAvailable === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                        }`}
                      >
                        {row.seatsAvailable > 0 ? "Apply Now" : "Full"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {seatAvailability.map((row) => (
              <div key={row.class} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      Class {row.class}
                    </h3>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.seatsAvailable === 0
                          ? "bg-red-100 text-red-800"
                          : row.seatsAvailable <= 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {row.seatsAvailable} seats available
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenModal(true)}
                    disabled={row.seatsAvailable === 0}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      row.seatsAvailable === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                    }`}
                  >
                    {row.seatsAvailable > 0 ? "Apply Now" : "Full"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Please keep all required documents ready before starting the
                application process.
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <AdmissionForm open={openModal} onClose={() => setOpenModal(false)} />
        )}
      </div>
    </div>
  );
};

export default AdmissionsPage;
