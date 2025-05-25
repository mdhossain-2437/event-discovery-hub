import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import useTitle from "../hooks/useTitle.js";
import useSavedEvents from "../hooks/useSavedEvents.js";

const SavedEvents = () => {
	const { savedEventIds, clearAllSaved, loading } = useSavedEvents();
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [allEvents, setAllEvents] = useState([]);

	// Set page title
	useTitle("Saved Events");

	// Load events from JSON file
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/data/events.json");
				const data = await response.json();
				setAllEvents(data.events);
			} catch (error) {
				console.error("Failed to load events.json", error);
			}
		};
		fetchEvents();
	}, []);

	// Filter events based on saved IDs whenever savedEventIds or allEvents changes
	useEffect(() => {
		if (!loading) {
			const filtered = allEvents.filter((event) =>
				savedEventIds.includes(event.id)
			);
			setFilteredEvents(filtered);
		}
	}, [savedEventIds, loading, allEvents]);

	// Handle save/unsave toggle
	const handleSaveToggle = (eventId, isSaved) => {
		if (!isSaved) {
			// This provides immediate visual feedback without waiting for the next render
			setFilteredEvents((prev) => prev.filter((event) => event.id !== eventId));
		}
	};

	// Get recommended events - events not in the saved list
	const recommendedEvents = useMemo(() => {
		return allEvents
			.filter((event) => !savedEventIds.includes(event.id))
			.slice(0, 3);
	}, [savedEventIds, allEvents]);

	return (
		<div className="min-h-screen py-4 md:py-8 lg:py-12">
			<div className="container mx-auto px-4 md:px-8 lg:px-[75px]">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<div data-aos="fade-right">
						<h1 className="text-3xl font-bold font-heading mb-2">
							Your <span className="gradient-text">Saved Events</span>
						</h1>
						<p className="text-gray-300">
							{filteredEvents.length > 0
								? `You have ${filteredEvents.length} saved event${
										filteredEvents.length > 1 ? "s" : ""
								  }`
								: "You have no saved events yet"}
						</p>
					</div>

					{filteredEvents.length > 0 && (
						<button
							onClick={clearAllSaved}
							className="mt-4 md:mt-0 px-4 py-2 glass-dark rounded-lg hover:bg-dark-light transition-colors text-sm"
							data-aos="fade-left"
						>
							<i className="f-trash-alt mr-2"></i> Clear All
						</button>
					)}
				</div>

				{/* Events Grid */}
				{filteredEvents.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{filteredEvents.map((event) => (
							<EventCard
								key={event.id}
								event={event}
								onSaveToggle={handleSaveToggle}
							/>
						))}
					</div>
				) : (
					<div
						className="glass-dark rounded-xl p-8 text-center"
						data-aos="fade-up"
					>
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
								<i className="far fa-bookmark text-gray-400 text-2xl"></i>
							</div>
						</div>
						<h3 className="text-xl font-bold mb-2">No saved events yet</h3>
						<p className="text-gray-400 mb-6">
							Start exploring and save events you're interested in to find them
							here later.
						</p>
						<Link
							to="/all-events"
							className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 inline-block"
						>
							Explore Events
						</Link>
					</div>
				)}

				{/* Recommendations Section (only shown if they have saved events) */}
				{filteredEvents.length > 0 && (
					<div className="mt-12" data-aos="fade-up">
						<h2 className="text-2xl font-bold mb-6 font-heading">
							You Might Also Like
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{recommendedEvents.map((event) => (
								<EventCard
									key={event.id}
									event={event}
									onSaveToggle={handleSaveToggle}
								/>
							))}
						</div>

						<div className="flex justify-center mt-8">
							<Link
								to="/all-events"
								className="px-6 py-3 glass border border-primary/30 rounded-lg text-white font-medium hover:bg-primary/10 transition duration-300"
							>
								Discover More Events <i className="f-arrow-right ml-2"></i>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SavedEvents;
