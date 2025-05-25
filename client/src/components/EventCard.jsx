import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatCurrency } from "../lib/utils.js";
import useSavedEvents from "../hooks/useSavedEvents.js";
import { useDevice } from "../context/DeviceContext.jsx";

const EventCard = ({ event, onSaveToggle }) => {
	const { isSaved, toggleSave } = useSavedEvents();
	const eventIsSaved = isSaved(event.id);
	const { isMobile } = useDevice();

	// Handle save/unsave button click
	const handleSaveToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();

		toggleSave(event.id);

		if (onSaveToggle) {
			// We pass the NEW state, which is the opposite of the current state
			onSaveToggle(event.id, !eventIsSaved);
		}
	};

	// Determine button color based on category
	const getCategoryColor = () => {
		switch (event.category) {
			case "Technology":
				return "bg-primary";
			case "Music":
				return "bg-secondary";
			case "Art":
				return "bg-accent";
			case "Food":
				return "bg-secondary";
			case "Business":
				return "bg-accent";
			case "Gaming":
				return "bg-primary";
			default:
				return "bg-primary";
		}
	};

	// Determine text icon color based on category
	const getIconColor = () => {
		switch (event.category) {
			case "Technology":
				return "text-primary";
			case "Music":
				return "text-secondary";
			case "Art":
				return "text-accent";
			case "Food":
				return "text-secondary";
			case "Business":
				return "text-accent";
			case "Gaming":
				return "text-primary";
			default:
				return "text-primary";
		}
	};

	// Determine button color for View More button
	const getButtonColor = () => {
		switch (event.category) {
			case "Technology":
				return "bg-primary hover:bg-primary/80";
			case "Music":
				return "bg-secondary hover:bg-secondary/80";
			case "Art":
				return "bg-accent hover:bg-accent/80";
			case "Food":
				return "bg-secondary hover:bg-secondary/80";
			case "Business":
				return "bg-accent hover:bg-accent/80";
			case "Gaming":
				return "bg-primary hover:bg-primary/80";
			default:
				return "bg-primary hover:bg-primary/80";
		}
	};

	return (
		<div
			className="glass rounded-xl overflow-hidden card-hover h-full flex flex-col"
			data-aos="fade-up"
		>
			<div className="relative">
				<img
					src={event.thumbnail || event.image}
					alt={event.name || event.title}
					className="w-full h-40 sm:h-48 object-cover"
					loading="lazy"
				/>
				<div className="absolute top-0 right-0 p-2">
					<span
						className={`${getCategoryColor()} px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold`}
					>
						{event.category}
					</span>
				</div>
				<button
					className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-dark text-white flex items-center justify-center transition hover:bg-primary/20"
					aria-label={eventIsSaved ? "Remove from saved events" : "Save event"}
					onClick={handleSaveToggle}
				>
					<i
						className={`${
							eventIsSaved ? "fas" : "far"
						} fa-bookmark text-sm sm:text-base ${
							eventIsSaved ? "text-red-500" : ""
						}`}
						style={{ fontStyle: "normal" }}
					></i>
				</button>

				{event.featured && (
					<div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
						Featured
					</div>
				)}
			</div>

			<div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
				<div className="flex items-start justify-between mb-2">
					<h3 className="text-base sm:text-lg md:text-xl font-bold font-heading line-clamp-2">
						{event.name || event.title}
					</h3>
				</div>

				<div className="flex items-center text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">
					<i
						className={`fa fa-map-marker-alt mr-1.5 sm:mr-2 ${getIconColor()}`}
						style={{ fontStyle: "normal" }}
					></i>
					<div className="truncate">{event.location}</div>
				</div>

				<div className="flex items-center text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">
					<i
						className={`fa fa-calendar-alt mr-1.5 sm:mr-2 ${getIconColor()}`}
						style={{ fontStyle: "normal" }}
					></i>
					<span className="font-mono">{formatDate(event.date)}</span>
				</div>

				{event.time && (
					<div className="flex items-center text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">
						<i
							className={`fa fa-clock mr-1.5 sm:mr-2 ${getIconColor()}`}
							style={{ fontStyle: "normal" }}
						></i>
						<span>{event.time}</span>
					</div>
				)}

				<div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between">
					<div className="text-base sm:text-lg font-bold">
						<span className={getIconColor()}>
							{event.entry_fee ? formatCurrency(event.entry_fee) : event.price}
						</span>
					</div>
					<Link
						to={`/event/${event.id}`}
						className={`px-3 py-1.5 sm:px-4 sm:py-2 ${getButtonColor()} rounded transition-colors duration-300 text-white font-medium text-xs sm:text-sm`}
					>
						View More
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
