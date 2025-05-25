import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/event-explorer-logo.png";
import { useDevice } from "../context/DeviceContext.jsx";

const FooterWithAuth = () => {
	const location = useLocation();
	const { isTablet, isMobile } = useDevice();

	// Determine if the current route is the NotFound page or any error route
	// Check if the current route matches any of our defined routes
	const validRoutes = [
		"/",
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
		"/all-events",
		"/blog",
		"/contact",
		"/terms",
		"/privacy",
		"/event",
		"/profile",
		"/about",
		"/saved-events",
	];

	const isValidRoute = validRoutes.some(
		(route) =>
			location.pathname === route ||
			(route !== "/" && location.pathname.startsWith(route + "/"))
	);

	const isNotFoundPage =
		!isValidRoute ||
		location.pathname === "/not-found" ||
		location.pathname === "/404" ||
		location.pathname === "/error" ||
		location.pathname === "/500" ||
		location.pathname === "/403" ||
		location.pathname === "/401" ||
		location.pathname.includes("error");

	// Don't show footer on error pages
	if (isNotFoundPage) {
		return null;
	}

	// Responsive footer implementation
	return (
		<footer className="bg-gray-900 border-t border-gray-800">
			<div className="px-4 sm:px-6 md:px-8 lg:px-[75px] py-8 md:py-12 w-full">
				{/* Top section with logo, description and navigation */}
				<div
					className={`grid ${
						isMobile
							? "grid-cols-1 gap-8"
							: isTablet
							? "grid-cols-1 md:grid-cols-2 gap-8"
							: "grid-cols-3 gap-10"
					} footer-grid`}
				>
					{/* Logo and description - full width on tablet */}
					<div className={`${isTablet ? "col-span-full mb-6" : "col-span-1"}`}>
						<div className="flex items-center justify-start text-xl sm:text-2xl font-bold gradient-text mb-4">
							<img
								src={logoImg}
								alt="Event Explorer Logo"
								className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] mr-2"
							/>
							Event Explorer
						</div>
						<p className="text-gray-400 max-w-xs mb-6 text-left">
							Discover and explore exciting local events happening near you.
							Find conferences, workshops, meetups and more.
						</p>

						{/* Social media icons */}
						<div className="flex justify-start space-x-4 mb-6">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all duration-300"
								aria-label="Facebook"
							>
								<i className="fab fa-facebook-f text-lg"></i>
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all duration-300"
								aria-label="Twitter"
							>
								<i className="fab fa-twitter text-lg"></i>
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all duration-300"
								aria-label="Instagram"
							>
								<i className="fab fa-instagram text-lg"></i>
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all duration-300"
								aria-label="LinkedIn"
							>
								<i className="fab fa-linkedin-in text-lg"></i>
							</a>
						</div>
					</div>

					{/* Quick links */}
					<div className="col-span-1">
						<h3 className="text-white text-lg font-semibold mb-5 text-left">
							Quick Links
						</h3>
						<ul className="grid grid-cols-1 gap-y-3 justify-items-start">
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>Home</span>
								</Link>
							</li>

							<li>
								<Link
									to="/all-events"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>All Events</span>
								</Link>
							</li>

							<li>
								<Link
									to="/about"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>About Us</span>
								</Link>
							</li>

							<li>
								<Link
									to="/blog"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>Blog</span>
								</Link>
							</li>

							<li>
								<Link
									to="/contact"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>Contact</span>
								</Link>
							</li>

							<li>
								<Link
									to="/terms"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>Terms & Conditions</span>
								</Link>
							</li>

							<li>
								<Link
									to="/privacy"
									className="text-gray-400 hover:text-primary transition flex items-center"
								>
									<i className="f-chevron-right text-xs mr-2"></i>
									<span>Privacy Policy</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact information */}
					<div className="col-span-1">
						<h3 className="text-white text-lg font-semibold mb-5 text-left">
							Contact Us
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start justify-start">
								<div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-dark-light flex items-center justify-center text-primary">
									<i className="f-map-marker-alt"></i>
								</div>
								<div className="ml-3">
									<p className="text-gray-400">
										123 Event Street, Dhaka, Bangladesh
									</p>
								</div>
							</li>
							<li className="flex items-start justify-start">
								<div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-dark-light flex items-center justify-center text-primary">
									<i className="f-envelope"></i>
								</div>
								<div className="ml-3">
									<p className="text-gray-400">info@eventexplorer.com</p>
								</div>
							</li>
							<li className="flex items-start justify-start">
								<div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-dark-light flex items-center justify-center text-primary">
									<i className="f-phone-alt"></i>
								</div>
								<div className="ml-3">
									<p className="text-gray-400">+880 123 456 7890</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom copyright section */}
				<div className="border-t border-gray-800 mt-8 md:mt-10 pt-6 flex flex-col md:flex-row justify-between items-center footer-bottom">
					<p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
						&copy; {new Date().getFullYear()} Event Explorer. All rights
						reserved.
					</p>
					<p className="text-gray-500 flex items-center justify-center md:justify-end">
						<i
							className="fas fa-code text-gray-500 mr-2"
							style={{
								fontSize: "inherit",
								fontStyle: "normal",
							}}
						></i>
						Design and Developed By Delowar Hossain
					</p>
				</div>
			</div>
		</footer>
	);
};

export default FooterWithAuth;
