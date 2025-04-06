import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import { loginSchema, signUpSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { checkAuthStatus, loginUser, signupUser } from "../features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, loading, error } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from ,navigate]);

  useEffect(() => {
    if (error) {
      console.log("Authentication error:", error);
      setMessage(error);
    }
  }, [error]);

  const formik_login = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      dispatch(loginUser(values));
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
      dispatch(signupUser(values));
      action.resetForm();
    },
  });

  const toggleAuthView = () => {
    setIsLoginView(!isLoginView);
    setMessage("");
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-content-background">
          <Loader2 className="animate-spin size-6 text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="bg-content-background">
            <div className="flex flex-col justify-center items-center py-16">
              <div className="w-full max-w-md p-8 shadow-md rounded-lg bg-white">
                {isLoginView ? (
                  <>
                    <h2 className="text-2xl mb-6 text-center font-bold">
                      Welcome Back
                    </h2>
                    {message && <p className="text-red-500 mb-4">{message}</p>}
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
                          disabled={loading}
                          className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                          type="submit"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin size-5 mx-auto" />
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </form>
                    <p className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        className="text-[#6a9739] font-semibold hover:underline"
                        onClick={toggleAuthView}
                      >
                        Sign up here
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl mb-6 text-center font-bold">
                      Create an Account
                    </h2>
                    {message && <p className="text-red-500 mb-4">{message}</p>}
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
                          value={formik_signup.values.name}
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
                          value={formik_signup.values.email}
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
                          value={formik_signup.values.password}
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
                          value={formik_signup.values.confirm_password}
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
                          disabled={loading}
                          type="submit"
                          className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin size-5 mx-auto" />
                          ) : (
                            "Sign Up"
                          )}
                        </button>
                      </div>
                    </form>
                    <p className="text-center mt-4 text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        className="text-[#6a9739] font-semibold hover:underline"
                        onClick={toggleAuthView}
                      >
                        Login here
                      </button>
                    </p>
                  </>
                )}
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
