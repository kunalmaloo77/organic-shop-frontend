import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

function Header(props) {
  const isDesktop = useMediaQuery({
    query: "(min-width : 920px)",
  });
  const totalQuantity = useSelector((state) => state.addtocart.totalQuantity);
  const cartItem = useSelector((state) => state.addtocart.items);
  let sum = 0;

  cartItem.map((item) => {
    return (sum += item.price * item.quantity);
  });

  const location = useLocation();
  const activeRoute = location.pathname;

  // Determine if current route or user is admin
  const authUser = useSelector((state) => state.auth.user);
  const isAdminRoute = activeRoute.startsWith("/admin");
  const isAdminUser = authUser && authUser.role === "admin";
  const isAdmin = Boolean(isAdminRoute || isAdminUser);

  const getActiveClass = (path) =>
    activeRoute === path ? "text-secondary-nature font-bold" : "text-gray-400";

  return (
    <>
      {isDesktop ? (
        <DesktopHeader
          background={props.background}
          getActiveClass={getActiveClass}
          totalQuantity={totalQuantity}
          sum={sum}
          isAdmin={isAdmin}
        />
      ) : (
        <MobileHeader
          background={props.background}
          totalQuantity={totalQuantity}
          sum={sum}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}

export default Header;
