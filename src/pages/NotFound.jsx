import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ShoppingBasket } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header background={"#F8F6F3"} />
      <div className="relative overflow-hidden bg-content-background">
        <img
          src="/images/leaves-free-img.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-6 hidden w-56 rotate-12 opacity-30 md:block"
        />
        <img
          src="/images/leaves-free-img.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-12 hidden w-52 -rotate-[30deg] opacity-30 md:block"
        />

        <div className="mx-auto flex min-h-[70vh] max-w-[800px] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex items-center font-merriweather text-[96px] font-bold leading-none text-footer-blue sm:text-[160px]">
            <span>4</span>
            <img
              src="/images/basil-leaf.png"
              alt="0"
              className="mx-1 h-[80px] w-[80px] object-contain sm:mx-2 sm:h-[140px] sm:w-[140px]"
            />
            <span>4</span>
          </div>

          <span className="mt-6 rounded-full bg-nature-green/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-secondary-nature">
            Page not found
          </span>

          <h1 className="mt-4 font-merriweather text-2xl font-bold text-footer-blue md:text-4xl">
            Looks like this one didn't grow.
          </h1>
          <p className="mt-4 max-w-[520px] text-[#333333]">
            The page you're looking for may have been moved, renamed, or never
            existed. Let's get you back to fresh, organic goodness.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-nature-green px-8 py-3 font-bold text-white transition hover:bg-secondary-nature"
            >
              <Home size={18} /> Back to Home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-footer-blue px-8 py-3 font-bold text-footer-blue transition hover:bg-footer-blue hover:text-white"
            >
              <ShoppingBasket size={18} /> Browse Shop
            </Link>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-secondary-nature"
          >
            <ArrowLeft size={16} /> Go back
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
