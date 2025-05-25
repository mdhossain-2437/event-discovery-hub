import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
	FiCalendar,
	FiMapPin,
	FiClock,
	FiHeart,
	FiShare2,
	FiMoreVertical,
} from "react-icons/fi";
import {
	useDevice,
	useIsTouchDevice,
	useAccessibilityPreferences,
	useNetworkInfo,
} from "../context/DeviceContext";
import useSavedEvents from "../hooks/useSavedEvents.js";
import LazyImage from "./ui/LazyImage";

const MobileEventCard = ({ event }) => {
	const { savedEventIds, toggleSave, isSaved } = useSavedEvents();
	const { isLandscape, pixelRatio, width } = useDevice();
	const isTouchDevice = useIsTouchDevice();
	const { shouldReduceMotion } = useAccessibilityPreferences();
	const { shouldSaveData, isSlowConnection } = useNetworkInfo();

	const [isPressed, setIsPressed] = useState(false);
	const [showActions, setShowActions] = useState(false);

	const isEventSaved = isSaved(event.id);

	const handleToggleSave = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			toggleSave(event.id);
		},
		[event.id, toggleSave]
	);

	const handleShare = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();

			if (navigator.share) {
				navigator.share({
					title: event.title,
					text: `Check out this event: ${event.title}`,
					url: `${window.location.origin}/events/${event.id}`,
				});
			} else {
				// Fallback to clipboard
				navigator.clipboard.writeText(
					`${window.location.origin}/events/${event.id}`
				);
			}
		},
		[event]
	);

	const handleTouchStart = useCallback(() => {
		if (isTouchDevice) {
			setIsPressed(true);
		}
	}, [isTouchDevice]);

	const handleTouchEnd = useCallback(() => {
		if (isTouchDevice) {
			setIsPressed(false);
		}
	}, [isTouchDevice]);

	// Format date with enhanced options for mobile
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = date.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Tomorrow";
		if (diffDays < 7)
			return date.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
			});

		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	// Determine image quality based on device capabilities and network
	const getImageQuality = () => {
		if (shouldSaveData || isSlowConnection) return "low";
		if (pixelRatio > 2) return "high";
		if (pixelRatio > 1) return "medium";
		return "standard";
	};

	// Calculate card height based on orientation and screen width
	const getCardHeight = () => {
		if (isLandscape && width < 768) return "h-40"; // Shorter in landscape on small screens
		return "h-48"; // Standard height
	};

	return (
		<Link
			to={`/events/${event.id}`}
			className={`
				block mb-4 glass-dark rounded-xl overflow-hidden shadow-lg
				${!shouldReduceMotion ? "transition-all duration-300" : ""}
				${isPressed ? "scale-95 shadow-md" : "hover:shadow-xl hover:scale-[1.02]"}
				${isTouchDevice ? "active:scale-95" : ""}
				border border-gray-800/50
			`}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onMouseLeave={() => setIsPressed(false)}
		>
			<div className="relative">
				{/* Enhanced image with lazy loading and quality optimization */}
				<LazyImage
					src={event.image}
					alt={event.title}
					className={`w-full ${getCardHeight()} object-cover`}
					quality={getImageQuality()}
					loading="lazy"
					placeholder="blur"
				/>

				{/* Gradient overlay for better text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				{/* Action buttons */}
				<div className="absolute top-3 right-3 flex gap-2">
					{/* Share button - only show if native sharing is available or on touch devices */}
					{(navigator.share || isTouchDevice) && (
						<button
							onClick={handleShare}
							className="p-2 rounded-full glass backdrop-blur-sm text-white/90 hover:text-white hover:bg-white/20 transition-all duration-200"
							aria-label="Share event"
						>
							<FiShare2 className="w-4 h-4" />
						</button>
					)}

					{/* Save button */}
					<button
						onClick={handleToggleSave}
						className={`
							p-2 rounded-full backdrop-blur-sm transition-all duration-200
							${
								isEventSaved
									? "bg-red-500/90 text-white hover:bg-red-500"
									: "glass text-white/90 hover:text-white hover:bg-white/20"
							}
						`}
						aria-label={isEventSaved ? "Remove from saved" : "Save event"}
					>
						<FiHeart
							className={`w-4 h-4 ${isEventSaved ? "fill-current" : ""}`}
						/>
					</button>
				</div>

				{/* Featured badge */}
				{event.featured && (
					<div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
						Featured
					</div>
				)}

				{/* Quick info overlay for landscape mode */}
				{isLandscape && (
					<div className="absolute bottom-3 left-3 right-3">
						<div className="glass-dark rounded-lg p-2 backdrop-blur-sm">
							<h3 className="text-white font-semibold text-sm line-clamp-1 mb-1">
								{event.title}
							</h3>
							<div className="flex items-center text-white/80 text-xs">
								<FiCalendar className="mr-1 w-3 h-3" />
								<span className="mr-3">{formatDate(event.date)}</span>
								<FiMapPin className="mr-1 w-3 h-3" />
								<span className="truncate">{event.location}</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Content section - hidden in landscape mode for compact view */}
			{!isLandscape && (
				<div className="p-4">
					<h3 className="text-lg font-bold text-white line-clamp-2 mb-3">
						{event.title}
					</h3>

					<div className="space-y-2 mb-4">
						<div className="flex items-center text-gray-300 text-sm">
							<FiCalendar className="mr-2 w-4 h-4 flex-shrink-0" />
							<span>{formatDate(event.date)}</span>
						</div>

						<div className="flex items-center text-gray-300 text-sm">
							<FiMapPin className="mr-2 w-4 h-4 flex-shrink-0" />
							<span className="truncate">{event.location}</span>
						</div>

						<div className="flex items-center text-gray-300 text-sm">
							<FiClock className="mr-2 w-4 h-4 flex-shrink-0" />
							<span>{event.time}</span>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
							{event.category}
						</div>

						{event.price === "Free" ? (
							<span className="text-green-400 font-semibold text-sm">Free</span>
						) : (
							<span className="text-white font-semibold text-sm">
								{event.price}
							</span>
						)}
					</div>
				</div>
			)}
		</Link>
	);
};

export default MobileEventCard;
