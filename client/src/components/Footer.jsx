import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="glass-dark border-t border-gray-800 pt-16 pb-8">
			<div className="container mx-auto px-4">
				{/* Footer Top */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					{/* Logo & About */}
					<div>
						<Link to="/" className="flex items-center mb-4">
							<span className="text-2xl font-bold font-heading gradient-text">
								<i
									className="f-ticket-alt mr-2 fa fa-ticket-alt"
									style={{ fontStyle: "normal" }}
								></i>
								Event Explorer
							</span>
						</Link>
						<p className="text-gray-400 mb-4">
							Discover and explore the most exciting events happening in your
							city. Connect with like-minded people and create unforgettable
							memories.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
							>
								<i
									className="fab fa-facebook-f"
									style={{ fontStyle: "normal" }}
								></i>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
							>
								<i
									className="fab fa-twitter"
									style={{ fontStyle: "normal" }}
								></i>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
							>
								<i
									className="fab fa-instagram"
									style={{ fontStyle: "normal" }}
								></i>
							</a>
							<a
								href="#"
								className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
							>
								<i
									className="fab fa-linkedin-in"
									style={{ fontStyle: "normal" }}
								></i>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-bold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="/all-events"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									All Events
								</Link>
							</li>
							<li>
								<Link
									to="/saved-events"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Saved Events
								</Link>
							</li>
							<li>
								<Link
									to="/profile"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									My Profile
								</Link>
							</li>
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h3 className="text-lg font-bold mb-4">Event Categories</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Music Concerts
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Tech Conferences
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Art Exhibitions
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Sports Events
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition duration-300"
								>
									Food Festivals
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-bold mb-4">Contact Us</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<i
									className="f-map-marker-alt text-primary mt-1 mr-3 fa fa-map-marker-alt"
									style={{ fontStyle: "normal" }}
								></i>
								<span className="text-gray-400">
									123 Event Street, Dhaka, Bangladesh
								</span>
							</li>
							<li className="flex items-center">
								<i
									className="f-phone-alt text-primary mr-3 fa fa-phone-alt"
									style={{ fontStyle: "normal" }}
								></i>
								<span className="text-gray-400">+880 1234 567890</span>
							</li>
							<li className="flex items-center">
								<i
									className="f-envelope text-primary mr-3 fa fa-envelope"
									style={{ fontStyle: "normal" }}
								></i>
								<span className="text-gray-400">info@eventexplorer.com</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-800 pt-8 mt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm mb-4 md:mb-0">
							© {new Date().getFullYear()} Event Explorer. All rights reserved.
						</p>
						<div className="flex space-x-6">
							<a
								href="#"
								className="text-gray-400 text-sm hover:text-white transition duration-300"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-400 text-sm hover:text-white transition duration-300"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-400 text-sm hover:text-white transition duration-300"
							>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

