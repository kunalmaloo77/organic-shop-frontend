import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import backendUrl from "../config";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  // Sample order data - in a real app, this would come from an API
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // State for order filter
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter orders based on status
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  // Status badge color mapper
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOrderDetails = (orderId) => {
    navigate(`/order-review/${orderId}`);
  };

  // Fetch orders from API
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`${backendUrl}/orders`, {
          withCredentials: true,
        });
        const formattedOrders = res.data.map((order) => {
          const formattedOrderId = "#ORD-" + order._id.slice(-6).toUpperCase();
          return { ...order, formattedOrderId };
        });

        setOrders(formattedOrders);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-700">
              Filter by status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-1 px-3 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">
              No orders found with the selected filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {order.formattedOrderId}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Order Summary
                    </h3>

                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            {item.product.small_image_url && (
                              <img
                                src={item.product.small_image_url}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded mr-3"
                              />
                            )}
                            <span className="text-gray-600">
                              {item.quantity} × {item.product.name}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200 text-sm font-medium">
                      <span>Total</span>
                      <span className="text-green-600">
                        ${order.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Method:{" "}
                      <span className="font-medium text-gray-900">
                        {order.paymentMethod}
                      </span>
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOrderDetails(order._id)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Order Details
                    </button>
                    {order.status !== "Delivered" &&
                      order.status !== "Cancelled" && (
                        <button className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Track Order
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
