import React, { createContext, useState, useEffect, useCallback } from "react";
import { getSavedEvents, saveEvent, unsaveEvent } from "../lib/utils.js";
import {
	showEventSavedAlert,
	showEventRemovedAlert,
	showSuccessAlert,
	showConfirmationAlert,
} from "../lib/sweetAlert.js";
import {
	eventSavedToast,
	eventRemovedToast,
	successToast,
} from "../lib/toastUtils.js";

/**
 * Context for managing saved events
 * @typedef {Object} SavedEventsContextType
 * @property {string[]} savedEventIds - Array of saved event IDs
 * @property {Function} isSaved - Check if an event is saved
 * @property {Function} toggleSave - Toggle save/unsave an event
 * @property {Function} clearAllSaved - Clear all saved events
 * @property {boolean} loading - Loading state
 */

export const SavedEventsContext = createContext({
	savedEventIds: [],
	isSaved: () => false,
	toggleSave: () => {},
	clearAllSaved: () => {},
	loading: true,
});

/**
 * Provider component for saved events context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} SavedEventsContext.Provider
 */
export const SavedEventsProvider = ({ children }) => {
	const [savedEventIds, setSavedEventIds] = useState([]);
	const [loading, setLoading] = useState(true);

	// Load saved events from localStorage on mount
	useEffect(() => {
		const loadSavedEvents = () => {
			const savedIds = getSavedEvents();
			setSavedEventIds(savedIds);
			setLoading(false);
		};

		loadSavedEvents();
	}, []);

	/**
	 * Check if an event is saved
	 * @param {string} eventId - Event ID
	 * @returns {boolean} True if event is saved
	 */
	const isSaved = useCallback(
		(eventId) => {
			return savedEventIds.includes(eventId);
		},
		[savedEventIds]
	);

	/**
	 * Toggle save/unsave an event
	 * @param {string} eventId - Event ID
	 */
	const toggleSave = useCallback(
		(eventId) => {
			const eventIsSaved = isSaved(eventId);

			if (eventIsSaved) {
				const updatedEvents = unsaveEvent(eventId);
				setSavedEventIds(updatedEvents);

				// Show removed alert and toast
				showEventRemovedAlert();
				eventRemovedToast();
			} else {
				const updatedEvents = saveEvent(eventId);
				setSavedEventIds(updatedEvents);

				// Show saved alert and toast
				showEventSavedAlert();
				eventSavedToast();
			}
		},
		[isSaved]
	);

	/**
	 * Clear all saved events
	 */
	const clearAllSaved = useCallback(async () => {
		if (savedEventIds.length === 0) return;

		// Use SweetAlert confirmation
		const result = await showConfirmationAlert(
			"Clear Saved Events",
			"Are you sure you want to remove all saved events?",
			"Yes, clear all",
			"Cancel"
		);

		// If confirmed (user clicked "Yes")
		if (result.isConfirmed) {
			localStorage.setItem("savedEvents", JSON.stringify([]));
			setSavedEventIds([]);

			// Show success alert and toast
			showSuccessAlert("Events Cleared", "All saved events have been removed.");
			successToast("All saved events have been removed.");
		}
	}, [savedEventIds.length]);

	// Provide the saved events context
	const value = {
		savedEventIds,
		isSaved,
		toggleSave,
		clearAllSaved,
		loading,
	};

	return (
		<SavedEventsContext.Provider value={value}>
			{children}
		</SavedEventsContext.Provider>
	);
};
