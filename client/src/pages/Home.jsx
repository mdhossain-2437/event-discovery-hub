import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider.jsx";
import EventCard from "../components/EventCard.jsx";
import useTitle from "../hooks/useTitle.js";
import CountUp from "react-countup";

const Home = () => {
	// Set page title
	useTitle("Home");

	const [eventsData, setEventsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/data/events.json");
				const data = await response.json();
				setEventsData(data.events);
			} catch (error) {
				console.error("Failed to load events.json", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchEvents();
	}, []);

	// Initialize AOS on component mount
	useEffect(() => {
		if (window.AOS) {
			window.AOS.init();
		}
	}, []);

	return (
		<div className="min-h-screen">
			{/* Hero Slider */}
			<Slider />

			{/* Category Filter */}
			<div className="px-4 sm:px-6 md:px-8 lg:px-[75px] mt-8 md:mt-12 mb-4 md:mb-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<h2
						className="text-2xl md:text-3xl font-bold font-heading mb-4 md:mb-0"
						data-aos="fade-right"
					>
						Upcoming <span className="gradient-text">Events</span>
					</h2>

					<div className="flex flex-wrap gap-2" data-aos="fade-left">
						<Link
							to="/all-events"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary text-white font-medium text-xs md:text-sm"
						>
							All
						</Link>
						<Link
							to="/all-events?category=Music"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-gray-300 hover:text-white font-medium text-xs md:text-sm transition duration-300"
						>
							Music
						</Link>
						<Link
							to="/all-events?category=Technology"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-gray-300 hover:text-white font-medium text-xs md:text-sm transition duration-300"
						>
							Tech
						</Link>
						<Link
							to="/all-events?category=Art"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-gray-300 hover:text-white font-medium text-xs md:text-sm transition duration-300"
						>
							Art
						</Link>
						<Link
							to="/all-events?category=Gaming"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-gray-300 hover:text-white font-medium text-xs md:text-sm transition duration-300"
						>
							Gaming
						</Link>
						<Link
							to="/all-events?category=Food"
							className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-gray-300 hover:text-white font-medium text-xs md:text-sm transition duration-300"
						>
							Food
						</Link>
					</div>
				</div>
			</div>

			{/* Event Grid - Show only 6 events */}
			<div className="px-4 sm:px-6 md:px-8 lg:px-[75px] py-4 md:py-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{isLoading
						? [...Array(6)].map((_, idx) => (
								<div
									key={idx}
									className="glass rounded-xl overflow-hidden h-[400px] animate-pulse"
								></div>
						  ))
						: eventsData
								.slice(0, 6)
								.map((event) => <EventCard key={event.id} event={event} />)}
				</div>

				<div className="flex justify-center mt-6 md:mt-10" data-aos="fade-up">
					<Link
						to="/all-events"
						className="px-4 py-2 md:px-6 md:py-3 glass border border-primary/30 rounded-lg text-white font-medium hover:bg-primary/10 transition duration-300 text-sm md:text-base"
					>
						View All Events <i className="f-arrow-right ml-2"></i>
					</Link>
				</div>
			</div>

			{/* Featured Section */}
			<div className="px-4 sm:px-6 md:px-8 lg:px-[75px] py-8 md:py-16">
				<div className="glass rounded-xl overflow-hidden" data-aos="fade-up">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
						{/* Image Column */}
						<div className="relative h-64 md:h-auto order-2 md:order-1">
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{
									backgroundImage:
										"url('https://images.unsplash.com/photo-1563784462386-044fd95e9852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80')",
								}}
							></div>
							<div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-dark"></div>
						</div>

						{/* Content Column */}
						<div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center relative order-1 md:order-2">
							<div className="md:max-w-lg">
								<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 md:mb-6">
									Discover The <span className="gradient-text">Pulse</span> Of
									Your City
								</h2>
								<p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8">
									Experience events that shape culture, inspire innovation, and
									create unforgettable memories. Our platform connects you with
									the most exciting happenings around you.
								</p>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
									<div
										className="flex items-start"
										data-aos="fade-up"
										data-aos-delay="100"
									>
										<div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3 md:mr-4">
											<i
												className="f-ticket-alt fa fa-ticket-alt text-primary text-lg md:text-xl"
												style={{ fontStyle: "normal" }}
											></i>
										</div>
										<div>
											<h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
												Easy Booking
											</h3>
											<p className="text-gray-400 text-xs md:text-sm">
												Reserve your spot with just a few clicks
											</p>
										</div>
									</div>

									<div
										className="flex items-start"
										data-aos="fade-up"
										data-aos-delay="200"
									>
										<div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-3 md:mr-4">
											<i
												className="f-bell fa fa-bell text-secondary text-lg md:text-xl"
												style={{ fontStyle: "normal" }}
											></i>
										</div>
										<div>
											<h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
												Event Alerts
											</h3>
											<p className="text-gray-400 text-xs md:text-sm">
												Never miss events that match your interests
											</p>
										</div>
									</div>

									<div
										className="flex items-start"
										data-aos="fade-up"
										data-aos-delay="300"
									>
										<div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mr-3 md:mr-4">
											<i
												className="f-map-marked-alt fa fa-map-marker-alt text-accent text-lg md:text-xl"
												style={{ fontStyle: "normal" }}
											></i>
										</div>
										<div>
											<h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
												Local Discovery
											</h3>
											<p className="text-gray-400 text-xs md:text-sm">
												Find hidden gems in your neighborhood
											</p>
										</div>
									</div>

									<div
										className="flex items-start"
										data-aos="fade-up"
										data-aos-delay="400"
									>
										<div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3 md:mr-4">
											<i
												className="f-users fa fa-users text-primary text-lg md:text-xl"
												style={{ fontStyle: "normal" }}
											></i>
										</div>
										<div>
											<h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
												Community
											</h3>
											<p className="text-gray-400 text-xs md:text-sm">
												Connect with like-minded event-goers
											</p>
										</div>
									</div>
								</div>

								<Link
									to="/about"
									className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 shadow-lg neon-button"
								>
									Learn More
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="px-[75px] py-16">
				<div className="text-center mb-12" data-aos="fade-up">
					<h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
						What <span className="gradient-text">People Say</span> About Us
					</h2>
					<p className="text-gray-300 max-w-3xl mx-auto">
						Hear from the community of event-goers who have discovered amazing
						experiences through our platform.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					{/* Testimonial 1 */}
					<div
						className="glass rounded-xl p-6 flex flex-col h-full card-hover"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<div className="text-primary mb-4">
							<i
								className="f-quote-left fa fa-quote-left text-3xl opacity-50"
								style={{ fontStyle: "normal" }}
							></i>
						</div>
						<p className="text-gray-300 mb-6 flex-grow">
							"Event Explorer helped me discover local tech meetups that
							completely changed my career trajectory. The platform is intuitive
							and h."
						</p>
						<div className="flex items-center mt-auto">
							<img
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
								alt="Sarah Johnson"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<div className="ml-4">
								<p className="font-bold">Sarah Johnson</p>
								<p className="text-gray-400 text-sm">Software Developer</p>
							</div>
						</div>
					</div>

					{/* Testimonial 2 */}
					<div
						className="glass rounded-xl p-6 flex flex-col h-full card-hover"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<div className="text-secondary mb-4">
							<i
								className="f-quote-left fa fa-quote-left text-3xl opacity-50"
								style={{ fontStyle: "normal" }}
							></i>
						</div>
						<p className="text-gray-300 mb-6 flex-grow">
							"I used to miss out on so many events in my city until I found
							Event Explorer. Now I'm always in the loop for concerts,
							exhibitions, and workshops. It's become my go-to for weekend
							plans!"
						</p>
						<div className="flex items-center mt-auto">
							<img
								src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
								alt="Michael Rodriguez"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<div className="ml-4">
								<p className="font-bold">Michael Rodriguez</p>
								<p className="text-gray-400 text-sm">Graphic Designer</p>
							</div>
						</div>
					</div>

					{/* Testimonial 3 */}
					<div
						className="glass rounded-xl p-6 flex flex-col h-full card-hover"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<div className="text-accent mb-4">
							<i
								className="f-quote-left fa fa-quote-left text-3xl opacity-50"
								style={{ fontStyle: "normal" }}
							></i>
						</div>
						<p className="text-gray-300 mb-6 flex-grow">
							"As an event organizer, this platform h. The streamlined booking
							process and promotional features have boosted our attendance rates
							significantly."
						</p>
						<div className="flex items-center mt-auto">
							<img
								src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80"
								alt="Priya Sharma"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<div className="ml-4">
								<p className="font-bold">Priya Sharma</p>
								<p className="text-gray-400 text-sm">Event Organizer</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Newsletter */}
			<div className="px-[75px] py-16">
				<div
					className="glass-dark rounded-xl p-8 md:p-12 text-center"
					data-aos="fade-up"
				>
					<h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
						Stay <span className="gradient-text">Updated</span>
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto mb-8">
						Subscribe to our newsletter and be the first to know about upcoming
						events, exclusive offers, and personalized recommendations.
					</p>

					<form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
						<input
							type="email"
							placeholder="Your email address"
							className="flex-grow px-5 py-3 rounded-lg glass-dark border border-gray-700 focus:border-primary focus:outline-none placeholder-gray-500"
						/>
						<button
							type="submit"
							className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 shadow-lg whitespace-nowrap"
						>
							Subscribe
						</button>
					</form>

					<p className="text-gray-400 text-sm mt-4">
						We respect your privacy. Unsubscribe at any time.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
