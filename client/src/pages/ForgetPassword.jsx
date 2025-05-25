import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import toast from "react-hot-toast";

const ForgetPassword = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { forgotPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resetSent, setResetSent] = useState(false);

	// Set page title
	useTitle("Forgot Password");

	// Get the email from URL search params or localStorage
	useEffect(() => {
		const stateEmail = location.state?.email;

		if (stateEmail) {
			setEmail(stateEmail);
			// Also save to localStorage for future use
			localStorage.setItem("lastEmail", stateEmail);
		} else {
			// Fallback to localStorage if no email in state
			const lastEmail = localStorage.getItem("lastEmail");
			if (lastEmail) {
				setEmail(lastEmail);
			}
		}
	}, [location]);

	// Save the last used email to localStorage
	const saveLastEmail = (email) => {
		localStorage.setItem("lastEmail", email);
	};

	// Detect email provider
	const getEmailProvider = (email) => {
		if (email.includes("@gmail.com")) return "gmail";
		if (email.includes("@yahoo.com")) return "yahoo";
		if (email.includes("@outlook.com") || email.includes("@hotmail.com"))
			return "outlook";
		return "other";
	};

	// Get the email provider URL
	const getProviderUrl = (provider) => {
		switch (provider) {
			case "gmail":
				return "https://mail.google.com";
			case "yahoo":
				return "https://mail.yahoo.com";
			case "outlook":
				return "https://outlook.live.com";
			default:
				return "";
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			toast.error("Please enter your email address");
			return;
		}

		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			// Save email to localStorage
			saveLastEmail(email);

			// Send password reset email
			await forgotPassword(email);
			setResetSent(true);
			toast.success("Password reset email sent. Please check your inbox.");

			// Automatically redirect to the appropriate email provider after a short delay
			const provider = getEmailProvider(email);
			const providerUrl = getProviderUrl(provider);

			if (providerUrl) {
				setTimeout(() => {
					window.open(providerUrl, "_blank", "noopener,noreferrer");
				}, 1500);
			}
		} catch (error) {
			console.error("Password reset error:", error);
			let errorMessage =
				"Failed to send password reset email. Please try again.";

			if (error.code === "auth/user-not-found") {
				errorMessage = "No account found with this email address.";
			} else if (error.code === "auth/invalid-email") {
				errorMessage = "Invalid email format.";
			} else if (error.code === "auth/too-many-requests") {
				errorMessage = "Too many requests. Please try again later.";
			}

			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Redirect to email provider
	const redirectToEmailProvider = (provider) => {
		const url = getProviderUrl(provider);
		if (url) {
			window.open(url, "_blank", "noopener,noreferrer");
		}
	};

	// Go back to login page
	const goToLogin = () => {
		navigate("/login");
	};

	// Get email provider name for display
	const getProviderName = (email) => {
		const provider = getEmailProvider(email);
		switch (provider) {
			case "gmail":
				return "Gmail";
			case "yahoo":
				return "Yahoo Mail";
			case "outlook":
				return "Outlook";
			default:
				return "email provider";
		}
	};

	// Get provider icon
	const getProviderIcon = (email) => {
		const provider = getEmailProvider(email);
		switch (provider) {
			case "gmail":
				return "fa-google";
			case "yahoo":
				return "fa-yahoo";
			case "outlook":
				return "fa-microsoft";
			default:
				return "fa-envelope";
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card" data-aos="fade-up">
				<h1 className="auth-title">Reset Your Password</h1>

				{!resetSent ? (
					<>
						<p className="text-center text-gray-300 mb-6">
							Enter your email address and we'll send you a link to reset your
							password.
						</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="form-input"
									placeholder="your@email.com"
									required
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
										Sending...
									</span>
								) : (
									"Reset Password"
								)}
							</button>
						</form>
					</>
				) : (
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
							We've sent a password reset link to{" "}
							<span className="font-semibold text-white">{email}</span>
						</p>
						<p className="text-gray-400 text-sm mt-2">
							Click the link in the email to reset your password. The link will
							expire in 1 hour.
						</p>
						{getProviderUrl(getEmailProvider(email)) && (
							<p className="text-gray-400 text-sm mt-2">
								<i
									className="fa fa-info-circle mr-1"
									style={{ fontStyle: "normal" }}
								></i>
								{getProviderName(email)} will open automatically in a new tab.
							</p>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
							{/* Gmail button */}
							<button
								onClick={() =>
									window.open(
										"https://mail.google.com",
										"_blank",
										"noopener,noreferrer"
									)
								}
								className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
							>
								<i
									className="fab fa-google mr-2"
									style={{ fontStyle: "normal" }}
								></i>{" "}
								Open Gmail
							</button>

							{/* Yahoo button */}
							{getEmailProvider(email) === "yahoo" && (
								<button
									onClick={() =>
										window.open(
											"https://mail.yahoo.com",
											"_blank",
											"noopener,noreferrer"
										)
									}
									className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
								>
									<i
										className="fab fa-yahoo mr-2"
										style={{ fontStyle: "normal" }}
									></i>{" "}
									Open Yahoo Mail
								</button>
							)}

							{/* Outlook button */}
							{getEmailProvider(email) === "outlook" && (
								<button
									onClick={() =>
										window.open(
											"https://outlook.live.com",
											"_blank",
											"noopener,noreferrer"
										)
									}
									className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
								>
									<i
										className="fab fa-microsoft mr-2"
										style={{ fontStyle: "normal" }}
									></i>{" "}
									Open Outlook
								</button>
							)}

							{/* Generic email button for other providers */}
							{getEmailProvider(email) === "other" && (
								<button
									onClick={() => setResetSent(false)}
									className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition duration-300 w-full flex items-center justify-center"
								>
									<i
										className="fa fa-envelope mr-2"
										style={{ fontStyle: "normal" }}
									></i>{" "}
									Try Again
								</button>
							)}
						</div>

						<div className="flex flex-col space-y-3">
							<p className="text-sm text-gray-400">
								Didn't receive the email? Check your spam folder or{" "}
								<button
									onClick={() => setResetSent(false)}
									className="text-primary hover:text-primary/80 font-medium"
								>
									try again
								</button>
								.
							</p>

							<button
								onClick={goToLogin}
								className="text-sm text-primary hover:text-primary/80 font-medium"
							>
								Back to login
							</button>
						</div>
					</div>
				)}

				{!resetSent && (
					<p className="mt-6 text-center text-sm text-gray-400">
						Remember your password?{" "}
						<Link
							to="/login"
							className="text-primary hover:text-primary/80 font-medium"
						>
							Back to login
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default ForgetPassword;

