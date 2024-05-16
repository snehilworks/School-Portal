import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
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
    <div className="w-full h-full bg-white">
      <div className="component-container flex flex-col gap-2 items-start">
        <p className="mb-2 laptop:mb-4 font-bold text-[30px] laptop:text-[40px]">
          Admissions
        </p>

        <div className="mx-0 tablet:mx-auto w-full tablet:w-fit">
          <TableContainer>
            <Table className="w-full">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <TableCell
                    className="table-header"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      minWidth: "150px",
                    }}
                  >
                    Class
                  </TableCell>
                  <TableCell
                    className="table-header"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      minWidth: "150px",
                    }}
                  >
                    Seats Available
                  </TableCell>
                  <TableCell
                    className="table-header"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      minWidth: "150px",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seatAvailability.map((row) => (
                  <TableRow key={row.class}>
                    <TableCell>{`Class ${row.class}`}</TableCell>
                    <TableCell>{row.seatsAvailable}</TableCell>
                    <TableCell>
                      <PrimaryButton
                        onClick={handleOpenModal}
                        color={"student"}
                        disabled={row.seatsAvailable === 0}
                      >
                        {row.seatsAvailable > 0 ? "Take Admission" : "Full"}
                      </PrimaryButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AdmissionForm open={openModal} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
