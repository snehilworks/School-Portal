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
    <div className="p-6 bg-gray-100 min-h-screen mb-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <ul>
          {messages.map((message) => (
            <li key={message._id} className="border-b border-gray-200 py-3">
              <p className="text-sm font-semibold text-gray-700">
                Name: <span className="text-gray-600">{message.name}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Email: <span className="text-gray-600">{message.email}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Message:{" "}
                <span className="text-gray-600">{message.message}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactMessageContent;
