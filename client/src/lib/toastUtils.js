import toast from "react-hot-toast";

/**
 * Custom toast notification with enhanced styling
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const customToast = (message, options = {}) => {
	return toast(message, {
		duration: 4000,
		position: "top-right",
		...options,
	});
};

/**
 * Success toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const successToast = (message, options = {}) => {
	return toast.success(message, {
		duration: 4000,
		position: "top-right",
		icon: "🎉",
		...options,
	});
};

/**
 * Error toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const errorToast = (message, options = {}) => {
	return toast.error(message, {
		duration: 5000,
		position: "top-right",
		icon: "❌",
		...options,
	});
};

/**
 * Info toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const infoToast = (message, options = {}) => {
	return toast(message, {
		duration: 4000,
		position: "top-right",
		icon: "ℹ️",
		style: {
			border: "1px solid rgba(59, 130, 246, 0.3)",
			background: "rgba(31, 41, 55, 0.9)",
		},
		...options,
	});
};

/**
 * Warning toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const warningToast = (message, options = {}) => {
	return toast(message, {
		duration: 4500,
		position: "top-right",
		icon: "⚠️",
		style: {
			border: "1px solid rgba(245, 158, 11, 0.3)",
			background: "rgba(31, 41, 55, 0.9)",
		},
		...options,
	});
};

/**
 * Loading toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const loadingToast = (message, options = {}) => {
	return toast.loading(message, {
		duration: 10000,
		position: "top-right",
		...options,
	});
};

/**
 * Custom toast with icon
 * @param {string} message - Toast message
 * @param {string} icon - Icon to display
 * @param {Object} options - Toast options
 * @returns {string} Toast ID
 */
export const iconToast = (message, icon, options = {}) => {
	return toast(message, {
		duration: 4000,
		position: "top-right",
		icon,
		...options,
	});
};

/**
 * Login success toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const loginSuccessToast = (username) => {
	const firstName = username?.split(" ")[0] || username;
	return successToast(`Welcome back, ${firstName}! 👋`, {
		icon: "🔐",
		duration: 3000,
	});
};

/**
 * Logout success toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const logoutSuccessToast = (username) => {
	const firstName = username?.split(" ")[0] || "user";
	return infoToast(
		`Goodbye, ${firstName}! You've been logged out successfully`,
		{
			icon: "👋",
			duration: 3000,
		}
	);
};

/**
 * Registration success toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const registrationSuccessToast = (username) => {
	const firstName = username?.split(" ")[0] || "there";
	return successToast(
		`Welcome aboard, ${firstName}! Your account has been created successfully! 🚀`,
		{
			duration: 4000,
		}
	);
};

/**
 * Password reset email sent toast
 * @param {string} email - User's email
 * @returns {string} Toast ID
 */
export const passwordResetEmailSentToast = (email) => {
	return infoToast(
		`Password reset link sent to ${email}. Please check your inbox!`,
		{
			duration: 5000,
			icon: "📧",
		}
	);
};

/**
 * Event saved toast
 * @param {string} eventName - Name of the event
 * @returns {string} Toast ID
 */
export const eventSavedToast = (eventName = "Event") => {
	return successToast(`"${eventName}" saved to your collection!`, {
		icon: "🎟️",
		duration: 3000,
	});
};

/**
 * Event removed toast
 * @param {string} eventName - Name of the event
 * @returns {string} Toast ID
 */
export const eventRemovedToast = (eventName = "Event") => {
	return infoToast(`"${eventName}" removed from your collection`, {
		icon: "🗑️",
		duration: 3000,
	});
};

/**
 * Profile updated toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const profileUpdatedToast = (username) => {
	const firstName = username?.split(" ")[0] || "";
	const message = firstName
		? `${firstName}, your profile has been updated successfully!`
		: "Your profile has been updated successfully!";

	return successToast(message, {
		icon: "👤",
		duration: 3000,
	});
};

/**
 * Password updated toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const passwordUpdatedToast = (username) => {
	const firstName = username?.split(" ")[0] || "";
	const message = firstName
		? `${firstName}, your password has been updated successfully!`
		: "Your password has been updated successfully!";

	return successToast(message, {
		icon: "🔒",
		duration: 3000,
	});
};

/**
 * Email verification sent toast
 * @param {string} email - User's email
 * @returns {string} Toast ID
 */
export const emailVerificationSentToast = (email) => {
	return infoToast(
		`Verification email sent to ${email}. Please check your inbox and follow the instructions.`,
		{
			icon: "✉️",
			duration: 5000,
		}
	);
};

/**
 * Network error toast
 * @param {string} action - The action that failed (optional)
 * @returns {string} Toast ID
 */
export const networkErrorToast = (action = "") => {
	const message = action
		? `Network error while ${action}. Please check your connection and try again.`
		: "Network error. Please check your connection and try again.";

	return errorToast(message, {
		duration: 5000,
	});
};

/**
 * Session expired toast
 * @param {string} username - User's name
 * @returns {string} Toast ID
 */
export const sessionExpiredToast = (username) => {
	const firstName = username?.split(" ")[0] || "";
	const message = firstName
		? `${firstName}, your session has expired. Please log in again.`
		: "Your session has expired. Please log in again.";

	return warningToast(message, {
		duration: 5000,
	});
};

/**
 * Feature not available toast
 * @param {string} featureName - Name of the feature (optional)
 * @returns {string} Toast ID
 */
export const featureNotAvailableToast = (featureName = "") => {
	const message = featureName
		? `${featureName} is coming soon! Stay tuned!`
		: "This feature is coming soon! Stay tuned!";

	return infoToast(message, {
		icon: "🚧",
		duration: 3000,
	});
};

export default {
	customToast,
	successToast,
	errorToast,
	infoToast,
	warningToast,
	loadingToast,
	iconToast,
	loginSuccessToast,
	logoutSuccessToast,
	registrationSuccessToast,
	passwordResetEmailSentToast,
	eventSavedToast,
	eventRemovedToast,
	profileUpdatedToast,
	passwordUpdatedToast,
	emailVerificationSentToast,
	networkErrorToast,
	sessionExpiredToast,
	featureNotAvailableToast,
};
