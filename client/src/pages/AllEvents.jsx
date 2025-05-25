import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import MobileEventCard from "../components/MobileEventCard.jsx";
import ResponsiveContainer from "../components/ui/ResponsiveContainer.jsx";
import ResponsiveSearch from "../components/ui/ResponsiveSearch.jsx";
import { useDevice } from "../context/DeviceContext.jsx";
import useResponsive from "../hooks/useResponsive.js";
import useTitle from "../hooks/useTitle.js";

// Define categories
const categories = [
	"All",
	"Technology",
	"Music",
	"Art",
	"Gaming",
	"Food",
	"Business",
];

const AllEvents = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [allEvents, setAllEvents] = useState([]);
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [filters, setFilters] = useState({});

	const { isMobile, isTablet, isDesktop } = useDevice();
	const responsive = useResponsive();

	// Constants for pagination using responsive values
	const eventsPerPage = responsive.getValue({
		mobile: 4,
		tablet: 6,
		desktop: 9,
	});
	const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

	// Set page title
	useTitle("All Events");

	// Load events from JSON file
	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/data/events.json");
				const data = await response.json();
				setAllEvents(data.events);
				setFilteredEvents(data.events);
			} catch (error) {
				console.error("Failed to load events.json", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchEvents();
	}, []);

	// Initialize state from URL parameters
	useEffect(() => {
		const categoryParam = searchParams.get("category");
		if (categoryParam && categories.includes(categoryParam)) {
			setActiveCategory(categoryParam);
		}

		const searchParam = searchParams.get("search");
		if (searchParam) {
			setSearchTerm(searchParam);
		}

		const pageParam = searchParams.get("page");
		if (pageParam) {
			setCurrentPage(parseInt(pageParam, 10));
		}
	}, [searchParams]);

	// Filter events based on category and search term
	useEffect(() => {
		setIsLoading(true);

		// Simulate loading delay
		const timer = setTimeout(() => {
			let filtered = [...allEvents];

			// Filter by category if not 'All'
			if (activeCategory !== "All") {
				filtered = filtered.filter(
					(event) => event.category === activeCategory
				);
			}

			// Filter by search term
			if (searchTerm) {
				const term = searchTerm.toLowerCase();
				filtered = filtered.filter(
					(event) =>
						event.name.toLowerCase().includes(term) ||
						event.location.toLowerCase().includes(term) ||
						event.description.toLowerCase().includes(term)
				);
			}

			setFilteredEvents(filtered);
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [activeCategory, searchTerm, allEvents]);

	// Update URL params when filters change
	useEffect(() => {
		const params = {};

		if (activeCategory !== "All") {
			params.category = activeCategory;
		}

		if (searchTerm) {
			params.search = searchTerm;
		}

		if (currentPage > 1) {
			params.page = currentPage.toString();
		}

		setSearchParams(params, { replace: true });
	}, [activeCategory, searchTerm, currentPage, setSearchParams]);

	// Handle category change
	const handleCategoryChange = (category) => {
		setActiveCategory(category);
		setCurrentPage(1); // Reset to first page on category change
	};

	// Handle search input change
	const handleSearchChange = (searchValue, searchFilters = {}) => {
		setSearchTerm(searchValue);
		setFilters(searchFilters);
		setCurrentPage(1); // Reset to first page on search change
	};

	// Handle filter change
	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
		setCurrentPage(1);
	};

	// Handle pagination
	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Get current page events
	const getCurrentEvents = () => {
		const startIndex = (currentPage - 1) * eventsPerPage;
		const endIndex = startIndex + eventsPerPage;
		return filteredEvents.slice(startIndex, endIndex);
	};

	// Common view for all devices
	return (
		<div className={`min-h-screen ${isMobile ? "py-4 px-4" : "py-12"}`}>
			<div className={isMobile ? "" : "px-[75px]"}>
				{/* Hero Section - Only show on desktop */}
				{!isMobile && (
					<div className="glass rounded-xl p-8 mb-10">
						<div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
							<h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
								Discover <span className="gradient-text">Amazing Events</span>
							</h1>
							<p className="text-gray-300 mb-8">
								Find the perfect events that match your interests. From tech
								conferences to art exhibitions, music festivals to business
								networking - it's all here.
							</p>

							{/* Search Bar */}
							<div className="relative max-w-xl mx-auto mb-4">
								<input
									type="text"
									placeholder="Search events by name, location, or description..."
									value={searchTerm}
									onChange={handleSearchChange}
									className="w-full py-3 px-4 pl-12 glass-dark border border-gray-700 rounded-lg focus:border-primary focus:outline-none"
								/>
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<i className="f-search text-gray-400"></i>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Mobile Search Component - Only show on mobile */}
				{isMobile && <ResponsiveSearch />}

				{/* Category Filters */}
				{isMobile ? (
					<div className="overflow-x-auto pb-2 mb-4">
						<div className="flex gap-2 min-w-min">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => handleCategoryChange(category)}
									className={`px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium whitespace-nowrap
										${
											activeCategory === category
												? "bg-primary text-white"
												: "glass text-gray-300 hover:text-white"
										}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				) : (
					<div
						className="flex flex-wrap justify-center gap-3 mb-8"
						data-aos="fade-up"
					>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryChange(category)}
								className={`px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium
									${
										activeCategory === category
											? "bg-primary text-white"
											: "glass text-gray-300 hover:text-white"
									}`}
							>
								{category}
							</button>
						))}
					</div>
				)}

				{/* Event Grid/List */}
				<div className={isMobile ? "mb-6" : "mb-10"}>
					{isLoading ? (
						// Loading skeleton
						// Responsive loading skeleton
						<div
							className={`${
								isMobile
									? "space-y-4"
									: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							}`}
						>
							{[...Array(isMobile ? 4 : 6)].map((_, index) => (
								<div
									key={index}
									className="glass rounded-xl overflow-hidden h-[350px] animate-pulse"
								>
									<div className="h-48 bg-gray-700"></div>
									<div className="p-5">
										<div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
										<div className="h-4 bg-gray-700 rounded mb-2"></div>
										<div className="h-4 bg-gray-700 rounded mb-4 w-1/2"></div>
										<div className="mt-auto pt-4 flex items-center justify-between">
											<div className="h-6 bg-gray-700 rounded w-1/4"></div>
											<div className="h-10 bg-gray-700 rounded w-1/3"></div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : filteredEvents.length > 0 ? (
						// Responsive event grid
						<div
							className={`${
								isMobile
									? "space-y-4"
									: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							}`}
						>
							{getCurrentEvents().map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>
					) : (
						// No results state
						// Responsive no results
						<div
							className="glass-dark rounded-xl p-4 md:p-8 text-center"
							data-aos="fade-up"
						>
							{!isMobile && (
								<div className="flex justify-center mb-4">
									<div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
										<i
											className="fa fa-search text-gray-400 text-2xl"
											style={{ fontStyle: "normal" }}
										></i>
									</div>
								</div>
							)}
							<h3 className="text-xl font-bold mb-2">No events found</h3>
							<p className="text-gray-400 mb-4 md:mb-6">
								We couldn't find any events matching your criteria. Try
								adjusting your filters or search term.
							</p>
							<button
								onClick={() => {
									setActiveCategory("All");
									setSearchTerm("");
								}}
								className="px-4 py-2 md:px-6 md:py-2 bg-primary hover:bg-primary/80 transition-colors text-white rounded-md md:rounded-lg"
							>
								Reset Filters
							</button>
						</div>
					)}
				</div>

				{/* Pagination */}
				{filteredEvents.length > eventsPerPage && (
					// Responsive Pagination
					<div
						className="flex justify-center items-center space-x-2 py-4"
						data-aos="fade-up"
					>
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="w-10 h-10 rounded-full glass text-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<i
								className="fa fa-chevron-left text-gray-300"
								style={{ fontStyle: "normal" }}
							></i>
						</button>

						{/* Simplified pagination for mobile */}
						{isMobile ? (
							<span className="text-sm text-gray-300">
								{currentPage} / {totalPages}
							</span>
						) : (
							/* Page numbers for desktop */
							[...Array(totalPages)].map((_, index) => {
								const pageNum = index + 1;
								// Show current page, first, last, and pages around current
								if (
									pageNum === 1 ||
									pageNum === totalPages ||
									(pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
								) {
									return (
										<button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											className={`w-10 h-10 rounded-full flex items-center justify-center ${
												currentPage === pageNum
													? "bg-primary text-white"
													: "glass text-gray-300 hover:text-white"
											}`}
										>
											{pageNum}
										</button>
									);
								}
								// Show dots for skipped pages
								if (
									pageNum === currentPage - 2 ||
									pageNum === currentPage + 2
								) {
									return (
										<span
											key={pageNum}
											className="text-gray-400 flex items-center justify-center"
										>
											...
										</span>
									);
								}
								return null;
							})
						)}

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="w-10 h-10 rounded-full glass text-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<i
								className="fa fa-chevron-right text-gray-300"
								style={{ fontStyle: "normal" }}
							></i>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllEvents;
