import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { loginSchema } from "../../schemas";
import { loginAdmin } from "../../features/authSlice";

function AuthErrorMessage({ message }) {
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

function LoginForm({ formik, loading, message }) {
  return (
    <>
      <h2 className="text-2xl mb-6 text-center font-bold">
        Welcome Back Admin
      </h2>
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
    </>
  );
}

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";
  const { user, loading, error } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
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
        await dispatch(loginAdmin(values)).unwrap();
        action.resetForm();
      } catch (error) {
        const errorMessage = error?.message || error || "Login failed";
        setMessage(errorMessage);
      }
    },
  });

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-content-background">
          <Loader2 className="animate-spin size-6 text-muted-foreground" />
        </div>
      ) : (
        <div className="bg-content-background h-screen flex justify-center  ">
          <div className="flex flex-col justify-center w-full max-w-md ">
            <div className="p-8 shadow-md rounded-lg bg-white">
              <LoginForm
                formik={formik_login}
                loading={loading}
                message={message}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
