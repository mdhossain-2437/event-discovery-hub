import Swal from "sweetalert2";

// Glass morphism style for SweetAlert2
export const GlassSwal = Swal.mixin({
	backdrop: "rgba(0, 0, 0, 0.4)",
	customClass: {
		popup: "glass-swal",
		title: "text-xl font-bold text-white",
		htmlContainer: "text-gray-200",
		confirmButton:
			"bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition duration-300",
		cancelButton:
			"bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300",
	},
	timer: 3000,
	timerProgressBar: true,
	showConfirmButton: false,
});

// Custom animation style for SweetAlert2
export const AnimatedSwal = Swal.mixin({
	backdrop: "rgba(0, 0, 0, 0.4)",
	customClass: {
		popup: "animated-swal",
		title: "text-xl font-bold text-white",
		htmlContainer: "text-gray-200",
		confirmButton:
			"bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition duration-300",
		cancelButton:
			"bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300",
	},
	showClass: {
		popup: "animate__animated animate__fadeInUp animate__faster",
	},
	hideClass: {
		popup: "animate__animated animate__fadeOutDown animate__faster",
	},
	timer: 3000,
	timerProgressBar: true,
	showConfirmButton: false,
});

/**
 * Show success alert
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {number} [timer=3000] - Alert duration in milliseconds
 * @returns {Promise} SweetAlert2 promise
 */
export const showSuccessAlert = (title, message, timer = 3000) => {
	return GlassSwal.fire({
		icon: "success",
		title: title,
		text: message,
		timer: timer,
	});
};

/**
 * Show error alert
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {number} [timer=3000] - Alert duration in milliseconds
 * @returns {Promise} SweetAlert2 promise
 */
export const showErrorAlert = (title, message, timer = 3000) => {
	return GlassSwal.fire({
		icon: "error",
		title: title,
		text: message,
		timer: timer,
	});
};

/**
 * Show info alert
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {number} [timer=3000] - Alert duration in milliseconds
 * @returns {Promise} SweetAlert2 promise
 */
export const showInfoAlert = (title, message, timer = 3000) => {
	return GlassSwal.fire({
		icon: "info",
		title: title,
		text: message,
		timer: timer,
	});
};

/**
 * Show warning alert
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {number} [timer=3000] - Alert duration in milliseconds
 * @returns {Promise} SweetAlert2 promise
 */
export const showWarningAlert = (title, message, timer = 3000) => {
	return GlassSwal.fire({
		icon: "warning",
		title: title,
		text: message,
		timer: timer,
	});
};

/**
 * Show confirmation alert
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {string} [confirmText='Yes'] - Confirm button text
 * @param {string} [cancelText='No'] - Cancel button text
 * @returns {Promise} SweetAlert2 promise
 */
export const showConfirmationAlert = (
	title,
	message,
	confirmText = "Yes",
	cancelText = "No"
) => {
	return GlassSwal.fire({
		icon: "question",
		title: title,
		text: message,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: confirmText,
		cancelButtonText: cancelText,
		timer: undefined,
	});
};

/**
 * Show login success alert
 * @param {string} username - User's name
 * @returns {Promise} SweetAlert2 promise
 */
export const showLoginSuccessAlert = (username) => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Login Successful",
		text: `Welcome back, ${username}!`,
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show registration success alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showRegistrationSuccessAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Registration Successful",
		text: "Your account has been created successfully!",
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show logout alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showLogoutAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Logged Out",
		text: "You have been successfully logged out.",
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show event saved alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showEventSavedAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Event Saved",
		text: "This event has been added to your saved events!",
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show event removed alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showEventRemovedAlert = () => {
	return AnimatedSwal.fire({
		icon: "info",
		title: "Event Removed",
		text: "This event has been removed from your saved events.",
		timer: 2000,
		iconColor: "#ec4899",
	});
};

/**
 * Show password reset email sent alert
 * @param {string} email - User's email
 * @returns {Promise} SweetAlert2 promise
 */
export const showPasswordResetEmailSentAlert = (email) => {
	return AnimatedSwal.fire({
		icon: "info",
		title: "Password Reset Email Sent",
		text: `We've sent password reset instructions to ${email}. Please check your inbox.`,
		timer: 4000,
		iconColor: "#0ea5e9",
	});
};

// ===================== Additional Custom Alerts =====================

/**
 * Show profile update success alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showProfileUpdateSuccessAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Profile Updated",
		text: "Your profile has been updated successfully!",
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show password update success alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showPasswordUpdateSuccessAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Password Updated",
		text: "Your password has been changed successfully!",
		timer: 2000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show email verification sent alert
 * @param {string} email - User's email
 * @returns {Promise} SweetAlert2 promise
 */
export const showEmailVerificationSentAlert = (email) => {
	return AnimatedSwal.fire({
		icon: "info",
		title: "Verification Email Sent",
		text: `We've sent a verification email to ${email}. Please check your inbox to verify your account.`,
		timer: 4000,
		iconColor: "#0ea5e9",
	});
};

/**
 * Show event booking success alert
 * @param {string} eventName - Name of the event
 * @returns {Promise} SweetAlert2 promise
 */
export const showEventBookingSuccessAlert = (eventName) => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Booking Confirmed",
		text: `Your ticket for "${eventName}" has been booked successfully!`,
		timer: 3000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show contact form success alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showContactFormSuccessAlert = () => {
	return AnimatedSwal.fire({
		icon: "success",
		title: "Message Sent",
		text: "Thank you for your message! We will get back to you soon.",
		timer: 3000,
		iconColor: "#8b5cf6",
	});
};

/**
 * Show network error alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showNetworkErrorAlert = () => {
	return AnimatedSwal.fire({
		icon: "error",
		title: "Connection Error",
		text: "Unable to connect to the server. Please check your internet connection and try again.",
		timer: 4000,
		iconColor: "#ef4444",
	});
};

/**
 * Show session expired alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showSessionExpiredAlert = () => {
	return AnimatedSwal.fire({
		icon: "warning",
		title: "Session Expired",
		text: "Your session has expired. Please log in again to continue.",
		timer: 4000,
		iconColor: "#f59e0b",
		showConfirmButton: true,
		confirmButtonText: "Log In",
	});
};

/**
 * Show event reminder alert
 * @param {string} eventName - Name of the event
 * @param {string} timeRemaining - Time remaining until the event
 * @returns {Promise} SweetAlert2 promise
 */
export const showEventReminderAlert = (eventName, timeRemaining) => {
	return AnimatedSwal.fire({
		icon: "info",
		title: "Event Reminder",
		text: `Your event "${eventName}" is starting in ${timeRemaining}!`,
		timer: 5000,
		iconColor: "#0ea5e9",
	});
};

/**
 * Show feature not available alert
 * @returns {Promise} SweetAlert2 promise
 */
export const showFeatureNotAvailableAlert = () => {
	return AnimatedSwal.fire({
		icon: "info",
		title: "Coming Soon",
		text: "This feature is not available yet. Stay tuned for updates!",
		timer: 3000,
		iconColor: "#0ea5e9",
	});
};
