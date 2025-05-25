import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "../context/DeviceContext";

const ResponsiveSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [category, setCategory] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const { isMobile } = useDevice();

	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();

		// Build query params
		const params = new URLSearchParams();

		if (searchQuery) params.append("q", searchQuery);
		if (category) params.append("category", category);
		if (date) params.append("date", date);
		if (price) params.append("price", price);

		// Navigate to search results
		navigate(`/events?${params.toString()}`);

		// Close filters if open
		setShowFilters(false);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};

	const resetFilters = () => {
		setCategory("");
		setDate("");
		setPrice("");
	};

	return (
		<div className="mb-4">
			<form onSubmit={handleSearch} className="relative">
				<div className="flex items-center">
					<div className="relative flex-grow">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search events..."
							className="w-full p-3 pr-10 glass-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={clearSearch}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							>
								<i className="fa fa-times" style={{ fontStyle: "normal" }}></i>
							</button>
						)}
					</div>
					<button
						type="button"
						onClick={toggleFilters}
						className="ml-2 p-3 glass border border-gray-700 text-gray-300 rounded-lg"
					>
						<i className="fa fa-filter" style={{ fontStyle: "normal" }}></i>
					</button>
					<button
						type="submit"
						className="ml-2 p-3 bg-purple-600 rounded-lg text-white"
					>
						<i className="fa fa-search" style={{ fontStyle: "normal" }}></i>
					</button>
				</div>

				<AnimatePresence>
					{showFilters && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="glass rounded-lg shadow-lg mt-2 p-4 overflow-hidden"
						>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-1">
										Category
									</label>
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="w-full p-2 border border-gray-700 bg-dark text-gray-300 rounded-md"
									>
										<option value="">All Categories</option>
										<option value="Music">Music</option>
										<option value="Technology">Technology</option>
										<option value="Art">Art</option>
										<option value="Food">Food</option>
										<option value="Sports">Sports</option>
										<option value="Business">Business</option>
									</select>
								</div>

								<div>
									<label
										className={`block text-sm font-medium ${
											isMobile ? "text-gray-700" : "text-gray-300"
										} mb-1`}
									>
										Date
									</label>
									<select
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="w-full p-2 border border-gray-700 bg-dark text-gray-300 rounded-md"
									>
										<option value="">Any Date</option>
										<option value="today">Today</option>
										<option value="tomorrow">Tomorrow</option>
										<option value="this-week">This Week</option>
										<option value="this-weekend">This Weekend</option>
										<option value="next-week">Next Week</option>
										<option value="this-month">This Month</option>
									</select>
								</div>

								<div>
									<label
										className={`block text-sm font-medium ${
											isMobile ? "text-gray-700" : "text-gray-300"
										} mb-1`}
									>
										Price
									</label>
									<select
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										className="w-full p-2 border border-gray-700 bg-dark text-gray-300 rounded-md"
									>
										<option value="">Any Price</option>
										<option value="free">Free</option>
										<option value="paid">Paid</option>
										<option value="0-500">$0-$500</option>
										<option value="500-1000">$500-$1000</option>
										<option value="1000+">$1000+</option>
									</select>
								</div>

								<div className="flex justify-between pt-2">
									<button
										type="button"
										onClick={resetFilters}
										className="px-4 py-2 text-sm text-purple-400 hover:text-purple-300"
									>
										Reset Filters
									</button>

									<button
										type="submit"
										className="px-4 py-2 bg-purple-600 text-white rounded-md"
									>
										Apply Filters
									</button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</div>
	);
};

export default ResponsiveSearch;

