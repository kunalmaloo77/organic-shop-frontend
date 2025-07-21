import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FormCheckout from "../components/FormCheckout";
import backendUrl from "../config";
import { emptyCartAction } from "../features/addtocartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("online");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    addressOptional: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const cartItems = useSelector((state) => state.addtocart.items);

  // Calculate total
  let sum = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "pincode",
      "city",
      "state",
      "phone",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      }));

      const orderData = {
        amount: sum,
        currency: "INR",
        items,
        paymentMethod: selectedOption,
        billingDetails: formData,
      };

      // Create the order first, regardless of payment method
      const response = await axios.post(`${backendUrl}/orders`, orderData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        // Redirect to order review page
        dispatch(emptyCartAction());
        navigate(`/order-review/${response.data.order._id}`);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      if (error.response?.status === 401) {
        alert("Please login to continue");
        navigate("/login");
      } else {
        alert("Failed to process your order. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-content-background">
        <div className="max-w-[1200px] lg:mx-auto pt-20 pb-32">
          {/* Show form errors if any */}
          {Object.keys(formErrors).length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mb-4">
              <p className="font-bold">Please correct the following errors:</p>
              <ul className="list-disc ml-5">
                {Object.values(formErrors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h1 className="text-3xl font-merriweather font-semibold mb-10 ml-6">
              Checkout
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="flex flex-col lg:w-[60%] lg:pr-20">
              <div className="mx-6">
                <h2 className="text-xl font-merriweather pb-4 border-b-2 font-bold">
                  Billing details
                </h2>
              </div>
              <div>
                <FormCheckout
                  setFormData={setFormData}
                  formData={formData}
                  errors={formErrors}
                />
              </div>
              <div className="mx-6">
                <div className="text-xl font-merriweather pb-4 border-b-2 font-bold">
                  Additional Information
                </div>
                <div>
                  <form>
                    <div className="my-4">
                      <div>
                        <label htmlFor="additional">
                          Order notes (optional)
                        </label>
                      </div>
                      <div>
                        <textarea
                          id="additional"
                          name="additional"
                          className="p-2 mt-2 w-full border rounded"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:w-[40%] border-2 p-10 m-6">
              <h2 className="text-xl font-merriweather font-bold mb-10">
                Your Order
              </h2>
              <div>
                <div className="flex justify-between font-bold py-4 border-b-2">
                  <p>Product</p>
                  <p>Subtotal</p>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between py-4 border-b-2"
                  >
                    <p>
                      {item.name} x {item.quantity}
                    </p>
                    <p>£{item.price * item.quantity}.00</p>
                  </div>
                ))}
                <div className="flex justify-between py-4 border-b-2">
                  <p>Subtotal</p>
                  <p>£{sum}.00</p>
                </div>
                <div className="flex justify-between py-4 border-b-2">
                  <p>Total</p>
                  <p className="font-bold text-lg">£{sum}.00</p>
                </div>
                <div>
                  <h3 className="font-bold mt-6 mb-2">Payment Method</h3>
                  <div className="flex flex-col space-y-4 mt-4">
                    <div>
                      <input
                        type="radio"
                        id="online"
                        name="paymentMethod"
                        value="online"
                        checked={selectedOption === "online"}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label htmlFor="online">Online Payment (Razorpay)</label>
                      {selectedOption === "online" && (
                        <div>
                          <div className="ml-8 -mb-[10px]">
                            <FontAwesomeIcon
                              icon={faCaretUp}
                              size="2xl"
                              style={{ color: "#e5e7eb" }}
                            />
                          </div>
                          <div className="bg-gray-200 p-4">
                            <p>
                              Pay securely using credit/debit card, UPI,
                              netbanking or wallet.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={selectedOption === "cash"}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label htmlFor="cash">Cash on delivery</label>
                      {selectedOption === "cash" && (
                        <div>
                          <div className="ml-8 -mb-[10px]">
                            <FontAwesomeIcon
                              icon={faCaretUp}
                              size="2xl"
                              style={{ color: "#e5e7eb" }}
                            />
                          </div>
                          <div className="bg-gray-200 p-4">
                            <p>Pay with cash upon delivery.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 mt-6">
                  <button
                    onClick={handlePlaceOrder}
                    className="flex w-full justify-center bg-[#6a9739] py-3 px-5 rounded-md cursor-pointer hover:bg-[#8bc34a] transition ease-linear delay-100 text-white font-medium"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
