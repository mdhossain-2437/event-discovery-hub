import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import useTitle from "../hooks/useTitle.js";
import toast from "react-hot-toast";
import { showLogoutAlert } from "../lib/sweetAlert.js";
import { LogOut } from "lucide-react";
import {
	createProfileImageProps,
	processProfileImageUrl,
} from "../lib/imageUtils.js";

const Profile = () => {
	const auth = useContext(AuthContext);
	const { currentUser, updateProfile, logout } = auth || {
		currentUser: null,
		updateProfile: () => {
			throw new Error("Auth not initialized");
		},
		logout: () => {
			throw new Error("Auth not initialized");
		},
	};

	// Handle logout
	const handleLogout = async () => {
		try {
			await logout();
			showLogoutAlert();
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Failed to logout. Please try again.");
		}
	};
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		displayName: "",
		photoURL: "",
	});

	// Set page title
	useTitle("My Profile");

	// Initialize form with user data
	useEffect(() => {
		if (currentUser) {
			setFormData({
				displayName: currentUser.displayName || "",
				photoURL: currentUser.photoURL || "",
			});
		}
	}, [currentUser]);

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

		// Validate form data
		if (!formData.displayName.trim()) {
			toast.error("Name cannot be empty.");
			return;
		}

		try {
			setIsSubmitting(true);

			// Process the photoURL if provided
			const photoURL = formData.photoURL
				? processProfileImageUrl(formData.photoURL)
				: undefined;

			await updateProfile({
				displayName: formData.displayName,
				photoURL: photoURL,
			});

			// If there's a photoURL, preload it
			if (photoURL) {
				try {
					const img = new Image();
					img.referrerPolicy = "no-referrer";
					img.crossOrigin = "anonymous";
					img.src = photoURL;
				} catch (imgError) {
					console.warn("Failed to preload updated profile image:", imgError);
					// Continue anyway
				}
			}

			toast.success("Profile updated successfully!");
		} catch (error) {
			console.error("Profile update error:", error);
			toast.error("Failed to update profile. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen py-4 md:py-8 lg:py-12">
			<div className="px-4 md:px-8 lg:px-[75px]">
				<div className="max-w-xl mx-auto" data-aos="fade-up">
					<div className="glass rounded-xl overflow-hidden">
						<div className="p-6 md:p-8">
							<div className="flex items-center justify-between mb-6">
								<h1 className="text-2xl font-bold text-center font-heading">
									My Profile
								</h1>
								<button
									onClick={handleLogout}
									className="flex items-center px-4 py-2 rounded glass text-red-400 hover:bg-red-700/20 transition-all duration-300"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</button>
							</div>

							<div className="flex flex-col items-center mb-8">
								<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
									<img
										{...createProfileImageProps(
											currentUser?.photoURL,
											`https://api.dicebear.com/7.x/initials/svg?seed=${
												currentUser?.displayName || "User"
											}`
										)}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								</div>
								<h2 className="text-xl font-bold">
									{currentUser?.displayName || "User"}
								</h2>
								<p className="text-gray-400">{currentUser?.email}</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label htmlFor="displayName" className="form-label">
										Display Name
									</label>
									<input
										type="text"
										id="displayName"
										name="displayName"
										value={formData.displayName}
										onChange={handleChange}
										className="form-input"
										placeholder="Your name"
										required
									/>
								</div>

								<div>
									<label htmlFor="photoURL" className="form-label">
										Photo URL
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
											Updating...
										</span>
									) : (
										"Save Changes"
									)}
								</button>
							</form>

							<div className="mt-8 pt-6 border-t border-gray-700">
								<h3 className="text-lg font-bold mb-4">Account Information</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-gray-400">Email</span>
										<span>{currentUser?.email}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-gray-400">Account Created</span>
										<span>
											{currentUser?.metadata.creationTime
												? new Date(
														currentUser.metadata.creationTime
												  ).toLocaleDateString()
												: "N/A"}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-gray-400">Last Sign In</span>
										<span>
											{currentUser?.metadata.lastSignInTime
												? new Date(
														currentUser.metadata.lastSignInTime
												  ).toLocaleDateString()
												: "N/A"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
