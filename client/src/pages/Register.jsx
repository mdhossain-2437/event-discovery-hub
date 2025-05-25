import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useTitle from "../hooks/useTitle.js";
import { checkPasswordStrength } from "../lib/utils.js";
import toast from "react-hot-toast";

const Register = () => {
	const { register, loginWithGoogle, currentUser, loading } = useAuth();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		photoURL: "",
	});

	// Password validation state
	const [passwordValidation, setPasswordValidation] = useState({
		isValid: false,
		hasUpperCase: false,
		hasLowerCase: false,
		hasMinLength: false,
		strength: "weak",
	});

	// Set page title
	useTitle("Register");

	// Redirect if already logged in
	useEffect(() => {
		if (currentUser && !loading) {
			navigate("/");
		}
	}, [currentUser, loading, navigate]);

	// Check password strength on password change
	useEffect(() => {
		if (formData.password) {
			const strength = checkPasswordStrength(formData.password);
			setPasswordValidation(strength);
		} else {
			setPasswordValidation({
				isValid: false,
				hasUpperCase: false,
				hasLowerCase: false,
				hasMinLength: false,
				strength: "weak",
			});
		}
	}, [formData.password]);

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

		// Check if password meets requirements
		if (!passwordValidation.isValid) {
			toast.error("Password does not meet the requirements.");
			return;
		}

		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			await register(
				formData.email,
				formData.password,
				formData.name,
				formData.photoURL
			);

			toast.success("Account created successfully!");
			navigate("/");
		} catch (error) {
			console.error("Registration error:", error);
			let errorMessage = "Failed to create account. Please try again.";

			if (error.code === "auth/email-already-in-use") {
				errorMessage = "Email already in use. Please try another one.";
			} else if (error.code === "auth/invalid-email") {
				errorMessage = "Invalid email format.";
			} else if (error.code === "auth/weak-password") {
				errorMessage = "Password is too weak. Please use a stronger one.";
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
			toast.success("Account created successfully!");
			navigate("/");
		} catch (error) {
			console.error("Google registration error:", error);
			toast.error("Failed to register with Google. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="auth-container">
			<div className="auth-card" data-aos="fade-up">
				<h1 className="auth-title">Create an account</h1>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label htmlFor="name" className="form-label">
							Full Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="form-input"
							placeholder="John Doe"
							required
						/>
					</div>

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
						<label htmlFor="photoURL" className="form-label">
							Photo URL (Optional)
						</label>
						<input
							type="url"
							id="photoURL"
							name="photoURL"
							value={formData.photoURL}
							onChange={handleChange}
							className="form-input"
							placeholder="https://example.com/your-photo.jpg"
						/>
						<p className="text-xs text-gray-400 mt-1">
							Leave empty for a default avatar
						</p>
					</div>

					<div>
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="form-input pr-10"
								placeholder="••••••••"
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<i className="f-eye-slash"></i>
								) : (
									<i className="f-eye"></i>
								)}
							</button>
						</div>

						{/* Password strength indicator */}
						<div
							className={`password-strength mt-2 ${
								passwordValidation.strength === "weak"
									? "strength-weak"
									: passwordValidation.strength === "medium"
									? "strength-medium"
									: "strength-strong"
							}`}
						>
							<span className="strength-bar"></span>
							<span className="strength-bar"></span>
							<span className="strength-bar"></span>
						</div>

						<div className="mt-2 space-y-1">
							<p
								className={`text-xs ${
									passwordValidation.hasUpperCase
										? "text-green-500"
										: "text-gray-400"
								}`}
							>
								<i
									className={`fas ${
										passwordValidation.hasUpperCase ? "fa-check" : "fa-times"
									} mr-1`}
								></i>
								Must have at least one uppercase letter
							</p>
							<p
								className={`text-xs ${
									passwordValidation.hasLowerCase
										? "text-green-500"
										: "text-gray-400"
								}`}
							>
								<i
									className={`fas ${
										passwordValidation.hasLowerCase ? "fa-check" : "fa-times"
									} mr-1`}
								></i>
								Must have at least one lowercase letter
							</p>
							<p
								className={`text-xs ${
									passwordValidation.hasMinLength
										? "text-green-500"
										: "text-gray-400"
								}`}
							>
								<i
									className={`fas ${
										passwordValidation.hasMinLength ? "fa-check" : "fa-times"
									} mr-1`}
								></i>
								Must be at least 6 characters long
							</p>
						</div>
					</div>

					<button
						type="submit"
						className="btn-primary"
						disabled={isSubmitting || !passwordValidation.isValid}
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
								Creating account...
							</span>
						) : (
							"Create Account"
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
						Sign up with Google
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-400">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-primary hover:text-primary/80 font-medium"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;

