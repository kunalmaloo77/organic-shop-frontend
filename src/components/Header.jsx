import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  isVisibleAction,
  isVisibleMobileAction,
} from "../features/addtocartSlice";
import { useMediaQuery } from "react-responsive";

function Header(props) {
  const isDesktop = useMediaQuery({
    query: "(min-width : 920px)",
  });
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.addtocart.totalQuantity);
  const cartItem = useSelector((state) => state.addtocart.items);
  let sum = 0;

  cartItem.map((item) => {
    return (sum += item.price * item.quantity);
  });

  const location = useLocation();
  const activeRoute = location.pathname;

  const getActiveClass = (path) =>
    activeRoute === path ? "text-secondary-nature font-bold" : "text-gray-400";

  return (
    <>
      {isDesktop ? (
        <div>
          <header
            className="flex justify-center py-2"
            style={{ backgroundColor: `${props.background}` }}
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
                  <ul className="flex">
                    <li
                      className={`px-5 cursor-pointer transition ${getActiveClass(
                        "/product-category/shop"
                      )}`}
                    >
                      <Link
                        to="/product-category/shop"
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
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div>
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
                          {totalQuantity && cartItem ? (
                            <p>£{sum}.00</p>
                          ) : (
                            <p>£0.00</p>
                          )}
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
                </div>
              </div>
            </nav>
          </header>
        </div>
      ) : (
        <div>
          <header
            className="px-8 py-4"
            style={{ backgroundColor: `${props.background}` }}
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
                <div className="flex">
                  <div className="px-5">
                    <button
                      className="flex"
                      onClick={() => {
                        dispatch(isVisibleAction(true));
                      }}
                    >
                      <div className="mr-2 text-nature-green font-bold">
                        {totalQuantity && cartItem ? (
                          <p>£{sum}.00</p>
                        ) : (
                          <p>£0.00</p>
                        )}
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
      )}
    </>
  );
}

export default Header;
