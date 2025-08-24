import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import { loginSchema, signUpSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { checkAuthStatus, loginUser, signupUser } from "../features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

function AuthErrorMessage({ message }) {
  console.log(message, "ErrorMessage");
  if (!message) return null;
  return <p className="text-red-500 mb-4">{message}</p>;
}

function InputField({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  label,
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {error && touched ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : null}
    </div>
  );
}

function AuthButton({ loading, children }) {
  return (
    <button
      disabled={loading}
      className="bg-[#6a9739] hover:bg-[#8bc34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      type="submit"
    >
      {loading ? <Loader2 className="animate-spin size-5 mx-auto" /> : children}
    </button>
  );
}

function LoginForm({ formik, loading, message, toggleAuthView }) {
  return (
    <>
      <h2 className="text-2xl mb-6 text-center font-bold">Welcome Back</h2>
      <AuthErrorMessage message={message} />
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <InputField
          id="loginEmail"
          name="loginEmail"
          type="email"
          placeholder="Enter your email"
          value={formik.values.loginEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.loginEmail}
          touched={formik.touched.loginEmail}
          label="Email"
        />
        <InputField
          id="loginPassword"
          name="loginPassword"
          type="password"
          placeholder="Enter your password"
          value={formik.values.loginPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.loginPassword}
          touched={formik.touched.loginPassword}
          label="Password"
        />
        <div className="flex items-center justify-center">
          <AuthButton loading={loading}>Login</AuthButton>
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
  );
}

function SignupForm({ formik, loading, message, toggleAuthView }) {
  return (
    <>
      <h2 className="text-2xl mb-6 text-center font-bold">Create an Account</h2>
      <AuthErrorMessage message={message} />
      <form onSubmit={formik.handleSubmit}>
        <InputField
          id="signupName"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
          label="Name"
        />
        <InputField
          id="signupEmail"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          label="Email"
        />
        <InputField
          id="signupPassword"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          label="Password"
        />
        <InputField
          id="confirmPassword"
          name="confirm_password"
          type="password"
          placeholder="Enter your password again"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirm_password}
          touched={formik.touched.confirm_password}
          label="Confirm Password"
        />
        <div className="flex items-center justify-center">
          <AuthButton loading={loading}>Sign Up</AuthButton>
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
  );
}
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
  }, [user, from, navigate]);

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
  }, [error]);

  const formik_login = useFormik({
    initialValues: {
      loginEmail: "",
      loginPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        dispatch(checkAuthStatus());
        action.resetForm();
      } catch (error) {
        const errorMessage = error?.message || error || "Login failed";
        setMessage(errorMessage);
      }
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
    onSubmit: async (values, action) => {
      try {
        await dispatch(signupUser(values)).unwrap();
        dispatch(checkAuthStatus());
        action.resetForm();
      } catch (error) {
        setMessage(error);
      }
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
        <div className="bg-content-background">
          <div className="flex flex-col justify-center items-center py-16">
            <div className="w-full max-w-md p-8 shadow-md rounded-lg bg-white">
              {isLoginView ? (
                <LoginForm
                  formik={formik_login}
                  loading={loading}
                  message={message}
                  toggleAuthView={toggleAuthView}
                />
              ) : (
                <SignupForm
                  formik={formik_signup}
                  loading={loading}
                  message={message}
                  toggleAuthView={toggleAuthView}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Login;
