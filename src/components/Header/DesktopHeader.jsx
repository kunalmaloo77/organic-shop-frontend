import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isVisibleAction } from "../../features/addtocartSlice";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../features/authSlice";

const DesktopHeader = ({
  background,
  getActiveClass,
  totalQuantity,
  sum,
  isAdmin,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <header
        className="flex justify-center h-[85px]"
        style={{ backgroundColor: `${background}` }}
      >
        <nav className="grid grid-cols-2 w-full px-10">
          <div className="flex items-center">
            <div className="flex">
              <Link to="/">
                <img
                  src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/organic-store-logo5.svg"
                  alt="logo"
                  className="w-36"
                ></img>
              </Link>
            </div>
            <div>
              {isAdmin ? (
                <ul className="flex">
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/admin/dashboard"
                    )}`}
                  >
                    <Link
                      to="/admin/dashboard"
                      className="hover:text-nature-green"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/admin/products"
                    )}`}
                  >
                    <Link
                      to="/admin/products"
                      className="hover:text-nature-green"
                    >
                      Products
                    </Link>
                  </li>
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/admin/orders"
                    )}`}
                  >
                    <Link
                      to="/admin/orders"
                      className="hover:text-nature-green"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              ) : (
                // Regular site menu
                <ul className="flex">
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/shop"
                    )}`}
                  >
                    <Link
                      to="/shop"
                      className="hover:text-nature-green"
                    >
                      Everything
                    </Link>
                  </li>
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/product-category/grocery"
                    )}`}
                  >
                    <Link
                      to="/product-category/grocery"
                      className="hover:text-nature-green"
                    >
                      Groceries
                    </Link>
                  </li>
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/product-category/juice"
                    )}`}
                  >
                    <Link
                      to="/product-category/juice"
                      className="hover:text-nature-green"
                    >
                      Juice
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div>
              {!isAdmin ? (
                <ul className="flex">
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/about"
                    )}`}
                  >
                    <Link to="/about" className="hover:text-nature-green">
                      About
                    </Link>
                  </li>
                  <li
                    className={`px-5 cursor-pointer transition ${getActiveClass(
                      "/contact"
                    )}`}
                  >
                    <Link to="/contact" className="hover:text-nature-green">
                      Contact
                    </Link>
                  </li>
                  <li className="px-5">
                    <button
                      className="flex"
                      onClick={() => {
                        dispatch(isVisibleAction(true));
                      }}
                    >
                      <div className="mr-2 text-nature-green font-bold">
                        {totalQuantity ? <p>₹{sum}.00</p> : <p>₹0.00</p>}
                      </div>
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          style={{ color: "#8bc34a" }}
                        />
                        <span className="h-4 w-4 rounded-full bg-nature-green flex items-center justify-center absolute top-[-5px] left-3 drop-shadow-2xl">
                          <p className="font-bold text-sm">{totalQuantity}</p>
                        </span>
                      </div>
                    </button>
                  </li>
                  <li className="px-5">
                    <Link to="/profile">
                      <img
                        src="/images/user.png"
                        className="h-5 w-5"
                        alt=""
                      ></img>
                    </Link>
                  </li>
                </ul>
              ) : (
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/admin/login");
                  }}
                  className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default DesktopHeader;
