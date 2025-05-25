import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import toast from "react-hot-toast";

const Login = () => {
	const { login, loginWithGoogle, currentUser, loading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// For automatic redirection
	const from = location.state?.from?.pathname || "/";

	// Set page title
	useTitle("Login");

	// Redirect if already logged in
	useEffect(() => {
		if (currentUser && !loading) {
			navigate(from, { replace: true });
		}
	}, [currentUser, loading, navigate, from]);

	// Store email for password reset
	useEffect(() => {
		if (formData.email) {
			localStorage.setItem("lastEmail", formData.email);
		}
	}, [formData.email]);

	// Handle form changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			await login(formData.email, formData.password);
			toast.success("Login successful!");
			navigate(from, { replace: true });
		} catch (error) {
			console.error("Login error:", error);
			let errorMessage = "Failed to login. Please try again.";

			if (error.code === "auth/user-not-found") {
				errorMessage = "User not found. Please check your email.";
			} else if (error.code === "auth/wrong-password") {
				errorMessage = "Incorrect password. Please try again.";
			} else if (error.code === "auth/invalid-credential") {
				errorMessage =
					"Invalid credentials. Please check your email and password.";
			} else if (error.code === "auth/invalid-email") {
				errorMessage = "Invalid email format.";
			} else if (error.code === "auth/too-many-requests") {
				errorMessage =
					"Too many failed login attempts. Please try again later.";
			}

			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle Google sign-in
	const handleGoogleSignIn = async () => {
		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			await loginWithGoogle();
			toast.success("Login successful!");
			navigate(from, { replace: true });
		} catch (error) {
			console.error("Google login error:", error);
			toast.error("Failed to login with Google. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card" data-aos="fade-up">
				<h1 className="auth-title">Welcome back!</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="form-input"
							placeholder="your@email.com"
							required
						/>
					</div>

					<div>
						<div className="flex items-center justify-between mb-2">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<Link
								to="/forgot-password"
								state={{ email: formData.email }}
								className="text-xs text-primary hover:text-primary/80"
							>
								Forgot password?
							</Link>
						</div>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="form-input"
							placeholder="••••••••"
							required
						/>
					</div>

					<button type="submit" className="btn-primary" disabled={isSubmitting}>
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
								Logging in...
							</span>
						) : (
							"Log In"
						)}
					</button>

					<div className="relative flex items-center justify-center my-4">
						<div className="absolute left-0 top-1/2 h-px w-full bg-gray-700"></div>
						<span className="relative bg-card px-4 text-sm text-gray-500">
							or continue with
						</span>
					</div>

					<button
						type="button"
						onClick={handleGoogleSignIn}
						className="btn-oauth"
						disabled={isSubmitting}
					>
						<i
							className="fab fa-google mr-2"
							style={{ fontStyle: "normal" }}
						></i>{" "}
						Sign in with Google
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-400">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-primary hover:text-primary/80 font-medium"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
