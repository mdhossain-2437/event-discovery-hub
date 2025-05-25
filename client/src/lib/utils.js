import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's merge utility
 * @param {...any} inputs - Class names to combine
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Format date to readable format
 * @param {string} dateStr - Date string
 * @returns {string} Formatted date
 */
export function formatDate(dateStr) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(dateStr).toLocaleDateString("en-US", options);
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount) {
	return "৳" + amount.toLocaleString();
}

/**
 * Check if password meets requirements
 * @param {string} password - Password to check
 * @returns {Object} Password strength information
 * @returns {boolean} .isValid - Whether password meets all requirements
 * @returns {boolean} .hasUpperCase - Whether password has uppercase letters
 * @returns {boolean} .hasLowerCase - Whether password has lowercase letters
 * @returns {boolean} .hasMinLength - Whether password meets minimum length
 * @returns {string} .strength - Password strength ('weak', 'medium', or 'strong')
 */
export function checkPasswordStrength(password) {
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasMinLength = password.length >= 6;

	const isValid = hasUpperCase && hasLowerCase && hasMinLength;

	let strength = "weak";

	if (isValid && password.length >= 8) {
		strength = "strong";
	} else if (isValid) {
		strength = "medium";
	}

	return {
		isValid,
		hasUpperCase,
		hasLowerCase,
		hasMinLength,
		strength,
	};
}

/**
 * Get saved events from localStorage
 * @returns {string[]} Array of saved event IDs
 */
export function getSavedEvents() {
	const saved = localStorage.getItem("savedEvents");
	return saved ? JSON.parse(saved) : [];
}

/**
 * Save an event ID to localStorage
 * @param {string} eventId - Event ID to save
 * @returns {string[]} Updated array of saved event IDs
 */
export function saveEvent(eventId) {
	const savedEvents = getSavedEvents();
	if (!savedEvents.includes(eventId)) {
		const updatedEvents = [...savedEvents, eventId];
		localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));
		return updatedEvents;
	}
	return savedEvents;
}

/**
 * Remove an event ID from localStorage
 * @param {string} eventId - Event ID to remove
 * @returns {string[]} Updated array of saved event IDs
 */
export function unsaveEvent(eventId) {
	const savedEvents = getSavedEvents();
	const updatedEvents = savedEvents.filter((id) => id !== eventId);
	localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));
	return updatedEvents;
}

/**
 * Check if an event is saved
 * @param {string} eventId - Event ID to check
 * @returns {boolean} Whether the event is saved
 */
export function isEventSaved(eventId) {
	return getSavedEvents().includes(eventId);
}
