import React, { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle } from "lucide-react";
import instance from "../utils/axios";
import { Link, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { token } = useParams();
  sessionStorage.setItem("access_token", token);

  const validatePassword = (pwd) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    return checks;
  };

  const checks = validatePassword(password);
  const allChecksPassed = Object.values(checks).every((v) => v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!allChecksPassed) {
      setError("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await instance.patch("/auth/reset-password", { newPassword: password });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error resetting password", error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "#f8f6f3" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#8bc34a" }}
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been updated successfully.
          </p>
          <Link
            className="bg-nature-green w-full py-3 px-4 rounded-lg text-white font-medium transition-colors hover:bg-[#6a9739]"
            to={"/login"}
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-content-background min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#8bc34a" }}
          >
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your new password below
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 pr-12"
                  style={{ focusRingColor: "#8bc34a" }}
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 pr-12"
                  placeholder="Confirm new password"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Password must contain:
            </p>
            <div className="space-y-2">
              {[
                { key: "length", label: "At least 8 characters" },
                { key: "uppercase", label: "One uppercase letter" },
                { key: "lowercase", label: "One lowercase letter" },
                { key: "number", label: "One number" },
                { key: "special", label: "One special character" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  {checks[key] ? (
                    <CheckCircle2
                      className="w-4 h-4"
                      style={{ color: "#8bc34a" }}
                    />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300" />
                  )}
                  <span
                    className={`text-sm ${
                      checks[key] ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#8bc34a] w-full py-3 px-4 rounded-lg text-white font-medium transition-colors hover:bg-[#6a9739] ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link
            to={"/login"}
            className="font-medium hover:underline text-[#8bc34a]"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
