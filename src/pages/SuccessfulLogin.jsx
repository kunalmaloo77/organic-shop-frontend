import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { store } from "../app/store";

const SuccessfulLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userJson = params.get("user");
    if (accessToken && userJson) {
      const user = JSON.parse(decodeURIComponent(userJson));
      sessionStorage.setItem("access_token", accessToken);
      localStorage.setItem("auth", JSON.stringify(user));
      store.dispatch({ type: "auth/setUserDirectly", payload: user });
      let target = "/";
      try {
        const stored = localStorage.getItem("post_login_redirect");
        target = stored || "/";
        if (stored) localStorage.removeItem("post_login_redirect");
      } catch (e) {
        target = "/";
      }
      navigate(target, { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <Loader2 className="animate-spin m-20 mx-auto" size={48} />
    </div>
  );
};

export default SuccessfulLogin;
