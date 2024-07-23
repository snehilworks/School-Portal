import React, { useState } from "react";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AdmissionForm from "../../components/Home/AdmissionForm";

const AdmissionsPage = () => {
  const [openModal, setOpenModal] = useState(false);

  // Dummy data for seat availability
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
    { class: "11-Arts", seatsAvailable: 10 },
    { class: "12-Science", seatsAvailable: 12 },
    { class: "12-Arts", seatsAvailable: 10 },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-red-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-extrabold text-2xl text-center sm:text-3xl md:text-4xl text-gray-900">
          Admissions
        </h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-2 py-3 sm:px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats Available
                </th>
                <th className="px-2 py-3 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {seatAvailability.map((row) => (
                <tr key={row.class}>
                  <td className="px-2 py-4 sm:px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {`Class ${row.class}`}
                  </td>
                  <td className="px-2 py-4 sm:px-4 whitespace-nowrap text-sm text-gray-500">
                    {row.seatsAvailable}
                  </td>
                  <td className="px-2 py-4 sm:px-4 whitespace-nowrap text-sm text-gray-500">
                    <PrimaryButton
                      onClick={handleOpenModal}
                      color={"student"}
                      disabled={row.seatsAvailable === 0}
                      className={`px-2 py-1 text-sm sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-2 md:text-lg rounded-md ${
                        row.seatsAvailable === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {row.seatsAvailable > 0 ? "Take Admission" : "Full"}
                    </PrimaryButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdmissionForm open={openModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default AdmissionsPage;
