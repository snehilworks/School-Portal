import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import OrderDetails from "./OrderDetails";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const PaymentsContent = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ordersPerPage = 20; // Default items per page assumed in UI

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/pay/orders?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data.items);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul>
          {isLoading ? (
            <Box sx={{ display: "flex", align: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            orders.map((order) => <OrderDetails key={order.id} order={order} />)
          )}
        </ul>
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:flex sm:flex-row-reverse items-center justify-between">
          <div>
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              count={10} // Set a default count based on your assumption or UI design
              className="mt-3"
            />
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-600">{`Page ${currentPage}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsContent;
