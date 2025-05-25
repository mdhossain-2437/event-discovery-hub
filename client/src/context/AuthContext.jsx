import React, { createContext, useState, useEffect } from "react";
import {
	auth,
	loginWithEmailAndPassword,
	registerWithEmailAndPassword,
	signInWithGoogle,
	logoutUser,
	resetPassword,
	listenToAuthChanges,
} from "../lib/firebase.js";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import LoadingAnimation from "../components/LoadingAnimation.jsx";
import {
	showLoginSuccessAlert,
	showRegistrationSuccessAlert,
	showLogoutAlert,
	showPasswordResetEmailSentAlert,
	showErrorAlert,
	showSuccessAlert,
	showConfirmationAlert,
} from "../lib/sweetAlert.js";
import {
	loginSuccessToast,
	registrationSuccessToast,
	logoutSuccessToast,
	passwordResetEmailSentToast,
	errorToast,
	successToast,
	profileUpdatedToast,
} from "../lib/toastUtils.js";

/**
 * Authentication Context
 * @typedef {Object} AuthContextType
 * @property {Object|null} currentUser - Current authenticated user
 * @property {boolean} loading - Loading state
 * @property {string|null} authAction - Current authentication action
 * @property {Function} login - Login with email and password
 * @property {Function} register - Register with email and password
 * @property {Function} loginWithGoogle - Login with Google
 * @property {Function} logout - Logout
 * @property {Function} forgotPassword - Reset password
 * @property {Function} updateProfile - Update user profile
 */

export const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authAction, setAuthAction] = useState(null);

	// Listen to auth state changes
	useEffect(() => {
		try {
			const unsubscribe = listenToAuthChanges((user) => {
				setCurrentUser(user);
				setLoading(false);
				setAuthAction(null);
			});

			return () => unsubscribe();
		} catch (error) {
			console.error("Error setting up auth listener:", error);
			setLoading(false);
			return () => {};
		}
	}, []);

	/**
	 * Login with email and password
	 * @param {string} email - User's email
	 * @param {string} password - User's password
	 * @returns {Promise<Object>} User object
	 */
	const login = async (email, password) => {
		try {
			setAuthAction("Logging in...");
			const { user } = await loginWithEmailAndPassword(email, password);

			// Show success alert and toast
			showLoginSuccessAlert(user.displayName || "User");
			loginSuccessToast(user.displayName || "User");

			return user;
		} catch (error) {
			showErrorAlert(
				"Login Failed",
				error.message || "Failed to login. Please try again."
			);
			errorToast(error.message || "Failed to login. Please try again.");
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	/**
	 * Register with email and password
	 * @param {string} email - User's email
	 * @param {string} password - User's password
	 * @param {string} name - User's display name
	 * @param {string} photoURL - User's photo URL
	 * @returns {Promise<Object>} User object
	 */
	const register = async (email, password, name, photoURL) => {
		try {
			setAuthAction("Creating your account...");
			const { user } = await registerWithEmailAndPassword(
				email,
				password,
				name,
				photoURL
			);

			// Show success alert and toast
			showRegistrationSuccessAlert();
			registrationSuccessToast();

			return user;
		} catch (error) {
			showErrorAlert(
				"Registration Failed",
				error.message || "Failed to create account. Please try again."
			);
			errorToast(
				error.message || "Failed to create account. Please try again."
			);
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	/**
	 * Login with Google
	 * @returns {Promise<Object>} User object
	 */
	const loginWithGoogle = async () => {
		try {
			setAuthAction("Connecting with Google...");
			const { user } = await signInWithGoogle();

			// Ensure the photoURL is properly set and accessible
			if (user.photoURL) {
				// Add a timestamp to the photoURL to prevent caching issues
				const timestamp = new Date().getTime();
				const photoURLWithTimestamp = `${user.photoURL}?t=${timestamp}`;

				// Update the user's profile with the timestamped photoURL
				await firebaseUpdateProfile(user, {
					photoURL: photoURLWithTimestamp,
				});

				// Pre-fetch the image to ensure it's loaded
				const img = new Image();
				img.src = photoURLWithTimestamp;
			}

			// Show success alert and toast
			showLoginSuccessAlert(user.displayName || "User");
			loginSuccessToast(user.displayName || "User");

			return user;
		} catch (error) {
			showErrorAlert(
				"Google Login Failed",
				error.message || "Failed to login with Google. Please try again."
			);
			errorToast(
				error.message || "Failed to login with Google. Please try again."
			);
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	/**
	 * Logout
	 * @returns {Promise<void>}
	 */
	const logout = async () => {
		try {
			// Show confirmation dialog first
			const result = await showConfirmationAlert(
				"Logout Confirmation",
				"Are you sure you want to log out?",
				"Yes, Log Out",
				"Cancel"
			);

			// If user cancels, return early
			if (!result.isConfirmed) {
				return;
			}

			setAuthAction("Logging out...");
			await logoutUser();

			// Show logout success alert and toast
			showLogoutAlert();
			logoutSuccessToast();

			return;
		} catch (error) {
			showErrorAlert(
				"Logout Failed",
				error.message || "Failed to logout. Please try again."
			);
			errorToast(error.message || "Failed to logout. Please try again.");
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	/**
	 * Reset password
	 * @param {string} email - User's email
	 * @returns {Promise<void>}
	 */
	const forgotPassword = async (email) => {
		try {
			setAuthAction("Sending password reset email...");
			await resetPassword(email);

			// Show password reset email sent alert and toast
			showPasswordResetEmailSentAlert(email);
			passwordResetEmailSentToast(email);

			return;
		} catch (error) {
			showErrorAlert(
				"Password Reset Failed",
				error.message ||
					"Failed to send password reset email. Please try again."
			);
			errorToast(
				error.message ||
					"Failed to send password reset email. Please try again."
			);
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	/**
	 * Update user profile
	 * @param {Object} data - Profile data
	 * @param {string} [data.displayName] - New display name
	 * @param {string} [data.photoURL] - New photo URL
	 * @returns {Promise<void>}
	 */
	const updateUserProfile = async (data) => {
		try {
			if (!currentUser) throw new Error("No user logged in");
			setAuthAction("Updating your profile...");
			await firebaseUpdateProfile(currentUser, data);

			// Show success message and toast
			showSuccessAlert(
				"Profile Updated",
				"Your profile has been updated successfully."
			);
			profileUpdatedToast();

			return;
		} catch (error) {
			showErrorAlert(
				"Profile Update Failed",
				error.message || "Failed to update profile. Please try again."
			);
			errorToast(
				error.message || "Failed to update profile. Please try again."
			);
			throw error;
		} finally {
			setAuthAction(null);
		}
	};

	const value = {
		currentUser,
		loading,
		authAction,
		login,
		register,
		loginWithGoogle,
		logout,
		forgotPassword,
		updateProfile: updateUserProfile,
	};

	return (
		<AuthContext.Provider value={value}>
			{authAction && <LoadingAnimation message={authAction} />}
			{children}
		</AuthContext.Provider>
	);
};
