import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const NotFound = () => {
	const navigate = useNavigate();

	// Set page title
	useTitle("Page Not Found");

	// Initialize animation on component mount
	useEffect(() => {
		// Additional animation setup can go here if needed
		const timer = setTimeout(() => {
			if (window.AOS) {
				window.AOS.refresh();
			}
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Navigation handlers
	const handleGoHome = (e) => {
		e.preventDefault();
		console.log("Navigating to home...");
		navigate("/", { replace: true });
	};

	const handleGoToEvents = (e) => {
		e.preventDefault();
		console.log("Navigating to events...");
		navigate("/all-events", { replace: true });
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="container px-4 py-12 max-w-2xl" data-aos="fade-up">
				<div className="glass-dark rounded-xl p-8 text-center">
					<div className="relative mb-8">
						<div className="neon-border absolute -inset-0.5 rounded-full opacity-75 blur-md"></div>
						<div className="glass rounded-full w-32 h-32 mx-auto flex items-center justify-center relative">
							<span className="text-7xl font-bold">404</span>
						</div>
					</div>

					<h1 className="text-4xl font-bold mb-4 font-heading">
						Page <span className="gradient-text">Not Found</span>
					</h1>

					<p className="text-gray-300 mb-8">
						Oops! The page you're looking for doesn't exist or has been moved.
					</p>

					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
						<Link
							to="/"
							onClick={handleGoHome}
							className="px-8 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition duration-300 shadow-lg neon-button text-center"
						>
							<i className="f-home mr-2"></i> Back to Home
						</Link>

						<Link
							to="/all-events"
							onClick={handleGoToEvents}
							className="px-8 py-3 glass hover:bg-dark-light rounded-lg font-medium transition duration-300 text-center"
						>
							<i className="f-search mr-2"></i> Explore Events
						</Link>
					</div>

					<div
						className="mt-12 pt-8 border-t border-gray-700 text-gray-400 text-sm"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<p>
							Lost? Try checking our{" "}
							<button
								onClick={handleGoHome}
								className="text-primary hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
							>
								homepage
							</button>{" "}
							or searching for{" "}
							<button
								onClick={handleGoToEvents}
								className="text-primary hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
							>
								events
							</button>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
