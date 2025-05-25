import React, { useEffect, useRef, useState } from "react";
import useTitle from "../hooks/useTitle.js";
import CountUp from "react-countup";

const ExtraPage = () => {
	// Set page title
	useTitle("About Us");

	// Stats section reference for scroll triggering CountUp
	const statsRef = useRef(null);
	const [statsVisible, setStatsVisible] = useState(false);

	// Check if stats section is visible and start CountUp animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Set visible when entering viewport, not visible when leaving
				setStatsVisible(entry.isIntersecting);
			},
			{ threshold: 0.3 }
		);

		if (statsRef.current) {
			observer.observe(statsRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	// Initialize AOS on component mount
	useEffect(() => {
		if (window.AOS) {
			window.AOS.refresh();
		}
	}, []);

	return (
		<div className="min-h-screen py-4 md:py-8 lg:py-12">
			<div className="px-4 md:px-8 lg:px-[75px]">
				{/* Hero Section */}
				<div
					className="glass rounded-xl overflow-hidden mb-12"
					data-aos="fade-up"
				>
					<div className="relative h-64 md:h-80">
						<div
							className="absolute inset-0 bg-cover bg-center filter brightness-75"
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=600')",
							}}
						></div>
						<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
						<div className="px-4 md:px-8 lg:px-[75px] h-full flex flex-col justify-end pb-8 relative z-10">
							<h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
								About <span className="gradient-text">Event Explorer</span>
							</h1>
							<p className="text-lg text-gray-300 max-w-2xl">
								Connecting event lovers with unforgettable experiences since
								2023
							</p>
						</div>
					</div>
				</div>

				{/* Our Story Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div className="glass rounded-xl p-8" data-aos="fade-right">
						<h2 className="text-2xl font-bold mb-4 font-heading">Our Story</h2>
						<p className="text-gray-300 mb-4">
							Event Explorer began with a simple idea: make it easier for people
							to discover and join amazing events happening around them. Our
							founders, passionate event-goers themselves, were frustrated by
							how difficult it was.
						</p>
						<p className="text-gray-300">
							What started as a small project has grown into something amazing.
							We're proud to showcase the vibrant cultural and social landscape
							of our cities through the events we feature.
						</p>
					</div>

					<div className="glass rounded-xl p-8" data-aos="fade-left">
						<h2 className="text-2xl font-bold mb-4 font-heading">
							Our Mission
						</h2>
						<div className="space-y-4">
							<div className="flex items-start">
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
									<i
										className="f-compass fa fa-compass text-primary"
										style={{ fontStyle: "normal" }}
									></i>
								</div>
								<div>
									<h3 className="font-bold mb-1">Discovery</h3>
									<p className="text-gray-300">
										Make it simple to find events that match your interests and
										expand your horizons
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
									<i
										className="f-users fa fa-users text-secondary"
										style={{ fontStyle: "normal" }}
									></i>
								</div>
								<div>
									<h3 className="font-bold mb-1">Community</h3>
									<p className="text-gray-300">
										Foster connections between event-goers and organizers,
										building vibrant local communities
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
									<i
										className="f-handshake fa fa-handshake text-accent"
										style={{ fontStyle: "normal" }}
									></i>
								</div>
								<div>
									<h3 className="font-bold mb-1">Accessibility</h3>
									<p className="text-gray-300">
										Make events accessible to everyone, regardless of background
										or experience
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Section */}
				<div
					className="glass-dark rounded-xl p-8 mb-12"
					data-aos="fade-up"
					ref={statsRef}
				>
					<h2 className="text-2xl font-bold mb-8 text-center font-heading">
						Growing Together
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<div className="p-4" data-aos="zoom-in" data-aos-delay="100">
							<div className="glass rounded-lg p-4">
								<div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
									{statsVisible ? (
										<CountUp
											start={0}
											end={10000}
											duration={2.5}
											separator=","
											suffix="+"
											useEasing={true}
										/>
									) : (
										"0+"
									)}
								</div>
								<p className="text-gray-400">Monthly Users</p>
							</div>
						</div>

						<div className="p-4" data-aos="zoom-in" data-aos-delay="200">
							<div className="glass rounded-lg p-4">
								<div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
									{statsVisible ? (
										<CountUp
											start={0}
											end={500}
											duration={2.5}
											suffix="+"
											useEasing={true}
										/>
									) : (
										"0+"
									)}
								</div>
								<p className="text-gray-400">Event Organizers</p>
							</div>
						</div>

						<div className="p-4" data-aos="zoom-in" data-aos-delay="300">
							<div className="glass rounded-lg p-4">
								<div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
									{statsVisible ? (
										<CountUp
											start={0}
											end={1200}
											duration={2.5}
											suffix="+"
											useEasing={true}
										/>
									) : (
										"0+"
									)}
								</div>
								<p className="text-gray-400">Events Monthly</p>
							</div>
						</div>

						<div className="p-4" data-aos="zoom-in" data-aos-delay="400">
							<div className="glass rounded-lg p-4">
								<div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
									{statsVisible ? (
										<CountUp
											start={0}
											end={15}
											duration={2.5}
											suffix="+"
											useEasing={true}
										/>
									) : (
										"0+"
									)}
								</div>
								<p className="text-gray-400">Categories</p>
							</div>
						</div>
					</div>
				</div>

				{/* Team Section */}
				<div className="mb-12" data-aos="fade-up">
					<h2 className="text-2xl font-bold mb-8 text-center font-heading">
						Meet Our Team
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Team Member 1 */}
						<div
							className="glass rounded-xl overflow-hidden card-hover"
							data-aos="fade-up"
							data-aos-delay="100"
						>
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80"
									alt="David Chen - CEO & Founder"
									className="w-full h-64 object-cover object-center"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-1">David Chen</h3>
								<p className="text-primary mb-4">CEO & Founder</p>
								<p className="text-gray-300 mb-4">
									Former event organizer with a passion for technology and
									connecting people.
								</p>
								<div className="flex space-x-3">
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-linkedin"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-twitter"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
								</div>
							</div>
						</div>

						{/* Team Member 2 */}
						<div
							className="glass rounded-xl overflow-hidden card-hover"
							data-aos="fade-up"
							data-aos-delay="200"
						>
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80"
									alt="Sarah Johnson - CTO"
									className="w-full h-64 object-cover object-center"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
								<p className="text-secondary mb-4">CTO</p>
								<p className="text-gray-300 mb-4">
									Tech innovator with experience building scalable platforms for
									entertainment industry.
								</p>
								<div className="flex space-x-3">
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-linkedin"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-github"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
								</div>
							</div>
						</div>

						{/* Team Member 3 */}
						<div
							className="glass rounded-xl overflow-hidden card-hover"
							data-aos="fade-up"
							data-aos-delay="300"
						>
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80"
									alt="Michael Rodriguez - Head of Partnerships"
									className="w-full h-64 object-cover object-center"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-1">Michael Rodriguez</h3>
								<p className="text-accent mb-4">Head of Partnerships</p>
								<p className="text-gray-300 mb-4">
									Relationship builder with deep connections in entertainment
									and event industries.
								</p>
								<div className="flex space-x-3">
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-linkedin"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<i
											className="fab fa-instagram"
											style={{ fontStyle: "normal" }}
										></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Section */}
				<div className="glass rounded-xl overflow-hidden" data-aos="fade-up">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
						<div className="p-8 md:p-12">
							<h2 className="text-2xl font-bold mb-6 font-heading">
								Get In <span className="gradient-text">Touch</span>
							</h2>
							<p className="text-gray-300 mb-8">
								Have questions, feedback, or want to partner with us? We'd love
								to hear from you!
							</p>

							<form className="space-y-6">
								<div>
									<label htmlFor="name" className="form-label">
										Your Name
									</label>
									<input
										type="text"
										id="name"
										className="form-input"
										placeholder="Enter your name"
									/>
								</div>

								<div>
									<label htmlFor="email" className="form-label">
										Email Address
									</label>
									<input
										type="email"
										id="email"
										className="form-input"
										placeholder="Enter your email"
									/>
								</div>

								<div>
									<label htmlFor="message" className="form-label">
										Message
									</label>
									<textarea
										id="message"
										rows={4}
										className="form-input"
										placeholder="How can we help?"
									></textarea>
								</div>

								<button
									type="submit"
									className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 shadow-lg neon-button"
								>
									Send Message
								</button>
							</form>
						</div>

						<div className="relative h-96 md:h-auto">
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{
									backgroundImage:
										"url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&h=900&q=80')",
								}}
							></div>
							<div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent"></div>
							<div className="absolute inset-0 flex items-center justify-center p-8">
								<div
									className="glass rounded-xl p-6 max-w-xs"
									data-aos="flip-right"
								>
									<div className="flex items-center justify-center mb-4">
										<div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
											<i
												className="f-map-marker-alt fa fa-map-marker-alt text-primary text-2xl"
												style={{ fontStyle: "normal" }}
											></i>
										</div>
									</div>
									<h3 className="text-xl font-bold text-center mb-2">
										Visit Our Office
									</h3>
									<p className="text-gray-300 text-center mb-0">
										123 Event Street, Dhaka, Bangladesh
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExtraPage;
