import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import useTitle from "../hooks/useTitle.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [oobCode, setOobCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  // Set page title
  useTitle("Reset Password");

  // Extract the action code from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("oobCode");
    
    if (code) {
      setOobCode(code);
      verifyCode(code);
    } else {
      setError("Invalid or expired password reset link. Please request a new one.");
    }
  }, [location]);

  // Verify the action code
  const verifyCode = async (code) => {
    try {
      const auth = getAuth();
      const email = await verifyPasswordResetCode(auth, code);
      setEmail(email);
    } catch (error) {
      console.error("Error verifying reset code:", error);
      setError("Invalid or expired password reset link. Please request a new one.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const auth = getAuth();
      
      // Reset the password
      await confirmPasswordReset(auth, oobCode, password);
      
      // Show success message
      toast.success("Password has been reset successfully!");
      setResetComplete(true);
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to reset password. Please try again.";

      if (error.code === "auth/expired-action-code") {
        errorMessage = "The password reset link has expired. Please request a new one.";
      } else if (error.code === "auth/invalid-action-code") {
        errorMessage = "Invalid password reset link. Please request a new one.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      }

      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" data-aos="fade-up">
        <h1 className="auth-title">Reset Your Password</h1>

        {error ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <i
                  className="f-times fa fa-times text-red-500 text-2xl"
                  style={{ fontStyle: "normal" }}
                ></i>
              </div>
            </div>

            <p className="text-gray-300">{error}</p>

            <div className="flex flex-col space-y-3">
              <Link
                to="/forgot-password"
                className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
              >
                Request New Reset Link
              </Link>

              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Back to login
              </Link>
            </div>
          </div>
        ) : resetComplete ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <i
                  className="f-check fa fa-check text-green-500 text-2xl"
                  style={{ fontStyle: "normal" }}
                ></i>
              </div>
            </div>

            <p className="text-gray-300">
              Your password has been reset successfully!
            </p>
            <p className="text-gray-400 text-sm">
              You will be redirected to the login page in a few seconds...
            </p>

            <Link
              to="/login"
              className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-300 mb-6">
              Create a new password for{" "}
              <span className="font-semibold text-white">{email}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

