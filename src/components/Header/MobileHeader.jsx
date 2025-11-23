import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  isVisibleAction,
  isVisibleMobileAction,
} from "../../features/addtocartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const MobileHeader = ({ background, totalQuantity, sum, isAdmin }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <header
          className="px-8 py-4"
          style={{ backgroundColor: `${background}` }}
        >
          <nav className="grid grid-cols-2 ">
            <div className="flex items-center">
              <div className="flex">
                <Link to="/">
                  <img
                    src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/organic-store-logo5.svg"
                    alt="logo"
                    className="w-32"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="flex items-center">
                <div className="px-3">
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
                </div>
              </div>
              <div className="flex">
                <div>
                  <button
                    className="flex bg-nature-green p-3 ml-3"
                    onClick={() => {
                      dispatch(isVisibleMobileAction(true));
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default MobileHeader;
