import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Everything from "./pages/product category/Everything";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import MobNav from "./components/MobNav";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import TopLoadingBar from "./components/Loading Bar/LoadingBar";
import Orders from "./pages/Orders";
import { checkAuthStatus } from "./features/authSlice";
import ProtectedRouteLayout from "./routes/ProtectedRouteLayout";
import ProfilePage from "./pages/Profile";
import OrderDetail from "./pages/OrderDetail";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div>
      <Cart />
      <MobNav />
      <TopLoadingBar />
      <ToastContainer autoClose={1250} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product-category/juice" element={<Everything />} />
        <Route path="/product-category/grocery" element={<Everything />} />
        <Route path="/product-category/shop" element={<Everything />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<ProtectedRouteLayout />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-review/:orderId" element={<OrderDetail />} />
        </Route>
      </Routes>
    </div>
  );
}
