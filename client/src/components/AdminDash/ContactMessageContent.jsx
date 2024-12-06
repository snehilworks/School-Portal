import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ContactMessageContent = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMessages = async (page) => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/contact-messages`,
          {
            params: { page, limit: 20 },
          }
        );
        setMessages(response.data.messages);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchMessages(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8 bg-custom-gray min-h-screen mb-10 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-white font-poppins mb-8">
        Contact Messages
      </h2>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li
              key={message._id}
              className="p-6 flex flex-col space-y-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-semibold text-gray-900 font-serif">
                    {capitalizeFirstLetter(message.name)}
                  </p>
                  <p className="text-sm text-gray-500 font-poppins">
                    {message.email}
                  </p>
                </div>
                <p className="text-md text-gray-700 font-poppins">
                  {message.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center space-x-2">
            {/* Previous Button */}
            <li>
              <button
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                &laquo; Prev
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ContactMessageContent;
