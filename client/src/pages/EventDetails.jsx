import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatCurrency } from "../lib/utils.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { SavedEventsContext } from "../context/SavedEventsContext.jsx";
import useTitle from "../hooks/useTitle.js";
import toast from "react-hot-toast";

const EventDetails = () => {
	const { id } = useParams();
	const auth = useContext(AuthContext);
	const { currentUser } = auth || { currentUser: null };
	const savedEventsContext = useContext(SavedEventsContext);
	const { isSaved: isEventSaved, toggleSave } = savedEventsContext;

	const [event, setEvent] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [formData, setFormData] = useState({
		name: currentUser?.displayName || "",
		email: currentUser?.email || "",
	});

	// Set page title
	useTitle(event ? event.name : "Event Details");

	// Load event from JSON file
	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await fetch("/data/events.json");
				const data = await response.json();
				const foundEvent = data.events.find((e) => e.id === id);
				setEvent(foundEvent);
			} catch (error) {
				console.error("Failed to load events.json", error);
			}
		};
		fetchEvent();
	}, [id]);

	// Check if event is saved (using context)
	useEffect(() => {
		if (id) {
			setIsSaved(isEventSaved(id));
		}
	}, [id, isEventSaved, savedEventsContext.savedEventIds]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Auto-save the event when booking (if not already saved)
		if (id && !isSaved) {
			toggleSave(id);
			setIsSaved(true);
			toast.success(`${event.name} saved to your collection!`, {
				icon: "🔖",
				position: "top-right",
				duration: 3000,
			});
		}

		// Show booking success message with user's name
		const userName = formData.name.split(" ")[0]; // Get first name
		toast.success(
			`Thanks ${userName}! Your seat for "${event.name}" has been reserved. Check your email for confirmation.`,
			{
				icon: "🎟️",
				position: "top-right",
				duration: 4000,
			}
		);

		// Reset form (optional)
		setFormData({
			name: currentUser?.displayName || "",
			email: currentUser?.email || "",
		});
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle save/unsave toggle
	const handleSaveToggle = () => {
		if (id) {
			toggleSave(id);
			const newSavedState = !isSaved;
			setIsSaved(newSavedState);

			// Show toast notification with dynamic event name
			if (newSavedState) {
				toast.success(`${event.name} added to your saved events!`, {
					icon: "🔖",
					position: "top-right",
					duration: 3000,
				});
			} else {
				toast.success(`${event.name} removed from your saved events`, {
					icon: "🗑️",
					position: "top-right",
					duration: 3000,
				});
			}
		}
	};

	// If event not found
	if (!event) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="glass p-8 rounded-xl text-center max-w-md">
					<i className="f-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
					<h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
					<p className="text-gray-300 mb-6">
						Sorry, we couldn't find the event you're looking for.
					</p>
					<a
						href="/"
						className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300"
					>
						Back to Home
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-12">
			<div className="px-[75px]">
				<div
					className="glass rounded-xl overflow-hidden mb-8"
					data-aos="fade-up"
				>
					<div className="relative h-80 md:h-96">
						<img
							src={event.thumbnail}
							alt={event.name}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
						<div className="absolute bottom-0 left-0 right-0 p-6">
							<div className="flex flex-wrap items-center justify-between">
								<div>
									<span
										className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4
                    ${
											event.category === "Technology"
												? "bg-primary"
												: event.category === "Music"
												? "bg-secondary"
												: event.category === "Art"
												? "bg-accent"
												: event.category === "Food"
												? "bg-secondary"
												: event.category === "Business"
												? "bg-accent"
												: event.category === "Gaming"
												? "bg-primary"
												: "bg-primary"
										}`}
									>
										{event.category}
									</span>
									<h1 className="text-3xl md:text-4xl font-bold font-heading text-white">
										{event.name}
									</h1>
								</div>
								<button
									className="h-12 w-12 rounded-full glass-dark flex items-center justify-center transition hover:bg-primary/20"
									onClick={handleSaveToggle}
								>
									<i
										className={`${
											isSaved ? "fas" : "far"
										} fa-bookmark text-white text-xl`}
									></i>
								</button>
							</div>
						</div>
					</div>

					<div className="p-6 md:p-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2" data-aos="fade-right">
								<div className="mb-8">
									<h2 className="text-2xl font-bold mb-4">About This Event</h2>
									<p className="text-gray-300 leading-relaxed">
										{event.description}
									</p>
								</div>

								<div className="mb-8">
									<h2 className="text-2xl font-bold mb-4">Event Details</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-calendar-alt text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Date</h3>
													<p className="text-gray-300">
														{formatDate(event.date)}
													</p>
												</div>
											</div>
										</div>

										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-map-marker-alt text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Location</h3>
													<p className="text-gray-300">{event.location}</p>
												</div>
											</div>
										</div>

										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-clock text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Time</h3>
													<p className="text-gray-300">
														{event.time || "To be announced"}
													</p>
												</div>
											</div>
										</div>

										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-money-bill-wave text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Entry Fee</h3>
													<p className="text-gray-300">
														{formatCurrency(event.entry_fee)}
													</p>
												</div>
											</div>
										</div>

										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-user-tie text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Organizer</h3>
													<p className="text-gray-300">
														{event.organizer || "Event Explorer"}
													</p>
												</div>
											</div>
										</div>

										<div className="glass p-4 rounded-lg">
											<div className="flex items-start">
												<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
													<i className="f-envelope text-primary"></i>
												</div>
												<div>
													<h3 className="font-semibold mb-1">Contact</h3>
													<p className="text-gray-300">
														{event.contact || "info@eventexplorer.com"}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="lg:col-span-1" data-aos="fade-left">
								<div className="glass rounded-xl p-6">
									<h2 className="text-2xl font-bold mb-6">Reserve Your Seat</h2>
									<form onSubmit={handleSubmit}>
										<div className="mb-4">
											<label
												htmlFor="name"
												className="block mb-2 text-sm font-medium text-gray-300"
											>
												Your Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="Enter your full name"
												className="form-input"
												required
											/>
										</div>

										<div className="mb-6">
											<label
												htmlFor="email"
												className="block mb-2 text-sm font-medium text-gray-300"
											>
												Email Address
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="Enter your email"
												className="form-input"
												required
											/>
										</div>

										<button
											type="submit"
											className="w-full py-3 px-4 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition duration-300 neon-button"
										>
											Reserve Seat
										</button>

										<p className="text-center text-sm text-gray-400 mt-4">
											You'll receive confirmation via email
										</p>
									</form>
								</div>

								<div className="glass rounded-xl p-6 mt-6">
									<h3 className="text-xl font-bold mb-4">Share This Event</h3>
									<div className="flex space-x-4">
										<a
											href="#"
											className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
										>
											<i className="fab fa-facebook-f"></i>
										</a>
										<a
											href="#"
											className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
										>
											<i className="fab fa-twitter"></i>
										</a>
										<a
											href="#"
											className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
										>
											<i className="fab fa-linkedin-in"></i>
										</a>
										<a
											href="#"
											className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
										>
											<i className="fab fa-whatsapp"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
