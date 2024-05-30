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
    <div className="w-full min-h-screen bg-white">
      <div className="component-container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 font-bold text-2xl md:text-4xl">Admissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Seats Available</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {seatAvailability.map((row) => (
                <tr key={row.class} className="odd:bg-gray-100">
                  <td className="px-4 py-2 font-medium">{`Class ${row.class}`}</td>
                  <td className="px-4 py-2">{row.seatsAvailable}</td>
                  <td className="px-4 py-2">
                    <PrimaryButton
                      onClick={handleOpenModal}
                      color={"student"}
                      disabled={row.seatsAvailable === 0}
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
