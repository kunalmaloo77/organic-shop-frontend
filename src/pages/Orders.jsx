import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import backendUrl from "../config";
import { useNavigate } from "react-router-dom";
import { Package, Calendar, CreditCard, Eye, Truck } from "lucide-react";

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
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Filter by status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg py-2 px-4 text-sm bg-white shadow-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                No orders match the selected filter criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Package className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {order.formattedOrderId}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="text-gray-400" size={16} />
                            <p className="text-sm text-gray-600">
                              Placed on {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Items
                      </h3>

                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-4">
                              {item.product.small_image_url ? (
                                <img
                                  src={item.product.small_image_url}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Package
                                    className="text-gray-400"
                                    size={24}
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {item.product.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                ${item.product.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                        <span className="text-lg font-semibold text-gray-900">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-nature-green">
                          ${order.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-gray-400" size={16} />
                      <p className="text-sm text-gray-600">
                        Payment Method:{" "}
                        <span className="font-medium text-gray-900">
                          {order.paymentMethod}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleOrderDetails(order._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none transition-all duration-200"
                      >
                        <Eye size={16} />
                        Order Details
                      </button>
                      {order.status !== "Delivered" &&
                        order.status !== "Cancelled" && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-nature-green border border-transparent rounded-lg text-sm font-medium text-white hover:bg-secondary-nature focus:outline-none transition-all duration-200">
                            <Truck size={16} />
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
      </div>
      <Footer />
    </>
  );
};

export default Orders;
