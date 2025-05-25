import React, { useContext } from "react";
import { SavedEventsContext } from "../context/SavedEventsContext.jsx";

/**
 * Custom hook for accessing saved events functionality
 * Provides fallback implementation for development
 * @returns {Object} Saved events context
 */
const useSavedEvents = () => {
	const context = useContext(SavedEventsContext);

	if (!context) {
		console.warn(
			"SavedEventsContext not found - using fallback values. Make sure SavedEventsProvider is properly configured."
		);

		// Provide a fallback implementation for development
		return {
			savedEventIds: [],
			isSaved: () => false,
			toggleSave: () => console.warn("Mock toggleSave called"),
			clearAllSaved: () => console.warn("Mock clearAllSaved called"),
			loading: false,
		};
	}

	return context;
};

export default useSavedEvents;
