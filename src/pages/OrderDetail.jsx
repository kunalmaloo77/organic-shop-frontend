import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import backendUrl from "../config";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setLoading(false);
    }
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.patch(
        `${backendUrl}/orders/${order._id}/cancel`,
        {},
        { withCredentials: true }
      );
      alert("Order cancelled successfully.");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert(
        error.response?.data?.message ||
          "Failed to cancel order. Please try again."
      );
    }
  };

  // Function to display Razorpay checkout
  const displayRazorpay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      if (!order.razorpayOrderId) {
        alert("Order not found");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_API_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Organic Store",
        description: "Order Payment",
        order_id: order.razorpayOrderId,
        handler: async function (response) {
          const verificationRes = await axios.post(
            `${backendUrl}/orders/verify-order`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          console.log(verificationRes);

          if (verificationRes.status === 200) {
            window.location.href = "/orders";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name:
            order.billingDetails.firstName +
            " " +
            order.billingDetails.lastName,
          email: order.billingDetails.email,
          contact: order.billingDetails.phone,
        },
        theme: {
          color: "#6a9739",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Please login to continue");
        window.location.href = "/login";
      } else {
        alert(
          "An error occurred while processing your payment. Please try again."
        );
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6a9739]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <Header />
        <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-merriweather">Order not found</h2>
          <Link to="/" className="mt-4 text-[#6a9739] hover:underline">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-content-background">
        <div className="max-w-[1200px] mx-auto pt-20 pb-32 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="border p-4">
              <p className="text-sm text-gray-600">Order Number:</p>
              <p className="font-bold">
                #{order._id.substring(order._id.length - 8)}
              </p>
            </div>
            <div className="border p-4">
              <p className="text-sm text-gray-600">Date:</p>
              <p className="font-bold">
                {formatDate(order.createdAt || new Date())}
              </p>
            </div>
            <div className="border p-4">
              <p className="text-sm text-gray-600">Total:</p>
              <p className="font-bold">£{order.amount}.00</p>
            </div>
            <div className="border p-4">
              <p className="text-sm text-gray-600">Payment Method:</p>
              <p className="font-bold">
                {order.paymentMethod === "online"
                  ? "Online Payment"
                  : "Cash on Delivery"}
              </p>
            </div>
            <div className="border p-4">
              <p className="text-sm text-gray-600">Status:</p>
              <p className="font-bold">{order.status}</p>
            </div>
            {(order.status === "created" || order.status === "pending") && (
              <button
                className="bg-red-600 py-3 px-6 rounded-md text-white font-medium hover:bg-red-700 transition ease-linear delay-100"
                onClick={handleCancelOrder}
              >
                CANCEL ORDER
              </button>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-merriweather font-semibold mb-4">
              Order Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left border-b">Product</th>
                    <th className="py-3 px-4 text-left border-b">Quantity</th>
                    <th className="py-3 px-4 text-right border-b">Price</th>
                    <th className="py-3 px-4 text-right border-b">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 border-b">
                        {item.product.name || `Product #${item.product._id}`}
                      </td>
                      <td className="py-3 px-4 border-b">{item.quantity}</td>
                      <td className="py-3 px-4 text-right border-b">
                        £{item.product.price}.00
                      </td>
                      <td className="py-3 px-4 text-right border-b">
                        £{item.product.price * item.quantity}.00
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td
                      colSpan="3"
                      className="py-3 px-4 text-right border-b font-semibold"
                    >
                      Subtotal:
                    </td>
                    <td className="py-3 px-4 text-right border-b">
                      £{order.amount}.00
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td
                      colSpan="3"
                      className="py-3 px-4 text-right border-b font-semibold"
                    >
                      Total:
                    </td>
                    <td className="py-3 px-4 text-right border-b font-bold">
                      £{order.amount}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-merriweather font-semibold mb-4">
                Billing Address
              </h3>
              <div className="border p-4">
                <p>
                  {order.billingDetails.firstName}{" "}
                  {order.billingDetails.lastName}
                </p>
                {order.billingDetails.companyName && (
                  <p>{order.billingDetails.companyName}</p>
                )}
                <p>{order.billingDetails.address}</p>
                {order.billingDetails.addressOptional && (
                  <p>{order.billingDetails.addressOptional}</p>
                )}
                <p>
                  {order.billingDetails.city}, {order.billingDetails.state}{" "}
                  {order.billingDetails.pincode}
                </p>
                <p>Phone: {order.billingDetails.phone}</p>
                <p>Email: {order.billingDetails.email}</p>
              </div>
            </div>

            {/* Check payment instructions */}
            {order.paymentMethod === "check" && (
              <div>
                <h3 className="text-xl font-merriweather font-semibold mb-4">
                  Payment Instructions
                </h3>
                <div className="border p-4 bg-yellow-50">
                  <p className="mb-2 font-semibold">
                    Please send your check to:
                  </p>
                  <p>Organic Store</p>
                  <p>123 Store Street</p>
                  <p>Store Town, ST 12345</p>
                  <p className="mt-4">
                    Please include your order number in the memo line: #
                    {order._id.substring(order._id.length - 8)}
                  </p>
                </div>
              </div>
            )}

            {/* COD instructions */}
            {order.paymentMethod === "cash" && order.status === "pending" && (
              <div>
                <h3 className="text-xl font-merriweather font-semibold mb-4">
                  Delivery Information
                </h3>
                <div className="border p-4 bg-blue-50">
                  <p>Your order will be delivered within 3-5 business days.</p>
                  <p className="mt-2">
                    Please have the exact amount (£{order.amount}.00) ready for
                    the delivery person.
                  </p>
                </div>
              </div>
            )}
          </div>
          {order.paymentMethod === "online" && order.status === "created" ? (
            <div className="mt-8">
              <button
                className="bg-[#6a9739] py-3 px-6 rounded-md text-white font-medium hover:bg-[#8bc34a] transition ease-linear delay-100"
                onClick={displayRazorpay}
              >
                PAY NOW
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <Link
                to="/product-category/shop"
                className="bg-[#6a9739] py-3 px-6 rounded-md text-white font-medium hover:bg-[#8bc34a] transition ease-linear delay-100"
              >
                <button>CONTINUE SHOPPING</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
