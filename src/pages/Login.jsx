import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../features/loadingSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const backendUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
      : process.env.REACT_APP_BACKEND_URL_PRODUCTION;

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        dispatch(startLoading());
        const res = await axios.get(`${backendUrl}/auth/login`, {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          setLoggedIn(true);
          setName(
            res.data.user.charAt(0).toUpperCase() + res.data.user.slice(1)
          );
        } else {
          setLoggedIn(false);
        }
        dispatch(stopLoading());
      } catch (error) {
        dispatch(stopLoading());
        console.log("error:", error);
        if (error.response && error.response.status === 401) {
          setLoggedIn(false);
        } else {
          console.error("Error fetching login page:", error);
        }
      }
    };
    checkAuthenticated();
  }, [backendUrl, dispatch]);

  const formik_login = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    onSubmit: (values, action) => {
      console.log(values);
      loginUser(values);
      action.resetForm();
    },
  });
  const formik_signup = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      addUser(values);
      action.resetForm();
    },
  });

  const addUser = async (user) => {
    try {
      dispatch(startLoading());
      const res = await axios.post(`${backendUrl}/users`, user, {
        withCredentials: true,
      });
      if (res.status === 201) {
        setLoggedIn(true);
        setName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1));
      }
      dispatch(stopLoading());
    } catch (error) {
      if (error.response.status === 409) {
        console.log("User Already exists", error);
        setRegistrationMessage(error.response.data.error);
      } else {
        console.log("Registration error:", error);
      }
    }
  };

  const loginUser = async (user) => {
    try {
      dispatch(startLoading());
      const res = await axios.post(`${backendUrl}/auth/login/password`, user, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        setLoggedIn(true);
        setName(
          res.data.user.name.charAt(0).toUpperCase() +
            res.data.user.name.slice(1)
        );
      }
      dispatch(stopLoading());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(error.response.data.error);
      } else {
        console.log("Login error:", error);
      }
    }
  };

  const handlelogout = async () => {
    try {
      dispatch(startLoading());
      const res = await axios.delete(`${backendUrl}/auth/logout`, {
        withCredentials: true,
      });
      console.log("res->", res);
      if (res.status === 200) {
        setLoggedIn(false);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log("error logging out->", error);
    }
  };

  return (
    <>
      <Header />
      {loggedIn ? (
        <>
          <div className="flex flex-col justify-center items-center py-16">
            <div className="flex w-full max-w-4xl justify-center">
              {/* Logout Column */}
              <div className="p-8">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="animate-spin size-6 text-mutead-foreground" />
                  </div>
                ) : (
                  <h2 className="text-4xl mb-10 text-center font-bold font-merriweather">
                    Welcome to Organic Store {name}!
                  </h2>
                )}

                <div className="flex items-center justify-center">
                  <button
                    disabled={isLoading}
                    className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
                    onClick={handlelogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin size-6 text-mutead-foreground" />
        </div>
      ) : (
        <>
          <div className="bg-content-background">
            <div className="flex flex-col justify-center items-center py-16">
              <div className="flex flex-col md:flex-row w-full max-w-4xl">
                {/* Login Column */}
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
                  {message ? <h1 className="text-red-500">{message}</h1> : null}
                  <form className="mb-4" onSubmit={formik_login.handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="loginEmail"
                      >
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="loginEmail"
                        type="email"
                        name="loginEmail"
                        placeholder="Enter your email"
                        value={formik_login.values.loginEmail}
                        onChange={formik_login.handleChange}
                        onBlur={formik_login.handleBlur}
                        autoComplete="off"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="loginPassword"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="loginPassword"
                        name="loginPassword"
                        type="password"
                        placeholder="Enter your password"
                        value={formik_login.values.loginPassword}
                        onChange={formik_login.handleChange}
                        onBlur={formik_login.handleBlur}
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        disabled={isLoading}
                        className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>

                {/* Signup Column */}
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl mb-6 text-center font-bold">
                    Sign Up
                  </h2>
                  {registrationMessage ? (
                    <h1 className="text-red-500">{registrationMessage}</h1>
                  ) : null}
                  <form onSubmit={formik_signup.handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="signupName"
                      >
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="signupName"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        values={formik_signup.values.name}
                        onChange={formik_signup.handleChange}
                        onBlur={formik_signup.handleBlur}
                        autoComplete="off"
                      />
                      {formik_signup.errors.name &&
                      formik_signup.touched.name ? (
                        <p className="text-red-600 text-sm">
                          {formik_signup.errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="signupEmail"
                      >
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="signupEmail"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        values={formik_signup.values.email}
                        onChange={formik_signup.handleChange}
                        onBlur={formik_signup.handleBlur}
                        autoComplete="off"
                      />
                      {formik_signup.errors.email &&
                      formik_signup.touched.email ? (
                        <p className="text-red-600 text-sm">
                          {formik_signup.errors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="signupPassword"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="signupPassword"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        values={formik_signup.values.password}
                        onChange={formik_signup.handleChange}
                        onBlur={formik_signup.handleBlur}
                        autoComplete="off"
                      />
                      {formik_signup.errors.password &&
                      formik_signup.touched.password ? (
                        <p className="text-red-600 text-sm">
                          {formik_signup.errors.password}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        name="confirm_password"
                        placeholder="Enter your password again"
                        values={formik_signup.values.confirm_password}
                        onChange={formik_signup.handleChange}
                        onBlur={formik_signup.handleBlur}
                        autoComplete="off"
                      />
                      {formik_signup.errors.confirm_password &&
                      formik_signup.touched.confirm_password ? (
                        <p className="text-red-600 text-sm">
                          {formik_signup.errors.confirm_password}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Login;
