import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactMessageContent = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMessages = async (page) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/admin/contact-messages`,
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
    <div className="p-6 bg-gray-50 min-h-screen mb-10 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-extrabold text-gray-800 mb-6">
        Contact Messages
      </h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li
              key={message._id}
              className="p-6 flex items-start space-x-4 hover:bg-gray-100 transition-colors"
            >
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                {message.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-gray-900">
                    {message.name}
                  </p>
                  <p className="text-sm text-gray-500">({message.email})</p>
                </div>
                <p className="text-md text-gray-700">{message.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-6">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center space-x-1">
            <li>
              <button
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                &laquo; Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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
