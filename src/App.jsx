import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProductsList from "./pages/ProductsList";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import MobNav from "./components/MobNav";
import CartPage from "./pages/CartPage"; 
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import TopLoadingBar from "./components/Loading Bar/LoadingBar";
import Orders from "./pages/Orders";
import ProtectedRouteLayout from "./routes/ProtectedRouteLayout";
import ProfilePage from "./pages/Profile";
import OrderDetail from "./pages/OrderDetail";
import AdminRoutesLayout from "./routes/AdminRoutesLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProductList from "./pages/admin/AdminProductsList";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import OrdersList from "./pages/admin/OrdersList";
import ForgotPassword from "./pages/ForgotPassword";
import SuccessfullLogin from "./pages/SuccessfulLogin";
import ResetPasswordPage from "./pages/ResetPassword";

export default function App() {
  return (
    <div className="min-h-screen">
      <Cart />
      <MobNav />
      <TopLoadingBar />
      <ToastContainer autoClose={1250} position="top-right" />
      <ScrollToTop />
      <Routes>
        <Route element={<AdminRoutesLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<OrdersList />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessfullLogin />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<ProductsList />} />
        <Route path="/product-category/:category" element={<ProductsList />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRouteLayout />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-review/:orderId" element={<OrderDetail />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
