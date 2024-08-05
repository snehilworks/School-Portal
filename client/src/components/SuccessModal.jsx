import React from "react";
import { Modal, Fade, Typography, Button } from "@mui/material";

const SuccessModal = ({ message, onClose }) => {
  return (
    <Modal
      open={!!message}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
      className="flex items-center justify-center"
    >
      <Fade in={!!message}>
        <div className="relative bg-white rounded-lg p-4 md:p-6 max-w-sm mx-auto shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Typography
            id="success-modal-title"
            variant="h6"
            align="center"
            className="mb-4 text-lg font-bold text-green-600"
          >
            Success
          </Typography>
          <Typography
            id="success-modal-description"
            variant="body1"
            align="center"
            className="text-gray-700"
          >
            {message}
          </Typography>
          <Button
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Close
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;
