import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { cn } from "../lib/utils.js";

const Navbar = () => {
	const auth = useContext(AuthContext);
	const { currentUser, logout } = auth || {
		currentUser: null,
		logout: () => {
			throw new Error("Auth not initialized");
		},
	};
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [userDropdownOpen, setUserDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const mobileDropdownRef = useRef(null);

	// Check if current route is active
	const isActiveRoute = (path) => {
		return location.pathname === path;
	};

	// Handle scroll event to change navbar appearance
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setUserDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	// Handle body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [mobileMenuOpen]);

	// Handle logout
	const handleLogout = async () => {
		try {
			await logout();
			setUserDropdownOpen(false);
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<nav
			className={cn(
				"sticky top-0 z-50 px-4 py-2 sm:py-3 border-b border-gray-800 shadow-lg transition-all duration-300",
				isScrolled ? "glass-dark" : "glass"
			)}
		>
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<span className="text-xl sm:text-2xl font-bold font-heading gradient-text truncate">
							<i className="f-ticket-alt mr-2"></i>Event Explorer
						</span>
					</Link>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle mobile menu"
					>
						{mobileMenuOpen ? (
							<i className="f-times text-xl"></i>
						) : (
							<i className="f-bars text-xl"></i>
						)}
					</button>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-6">
						<Link
							to="/"
							className={cn(
								"font-medium",
								isActiveRoute("/")
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white transition duration-300"
							)}
						>
							Home
						</Link>
						<Link
							to="/all-events"
							className={cn(
								"font-medium",
								isActiveRoute("/all-events")
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white transition duration-300"
							)}
						>
							All Events
						</Link>
						<Link
							to="/about"
							className={cn(
								"font-medium",
								isActiveRoute("/about")
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white transition duration-300"
							)}
						>
							About
						</Link>
					</div>

					{/* Authentication Section */}
					<div className="hidden lg:flex flex-row items-center space-x-4">
						{/* Not Logged In State */}
						{!currentUser ? (
							<div className="flex space-x-2">
								<Link
									to="/login"
									className="px-4 py-2 rounded glass text-white hover:bg-dark-light transition duration-300 focus:outline-none font-medium"
								>
									Log In
								</Link>
								<Link
									to="/register"
									className="px-4 py-2 rounded bg-primary hover:bg-primary/80 transition duration-300 focus:outline-none font-medium"
								>
									Sign Up
								</Link>
							</div>
						) : (
							<div className="relative" ref={dropdownRef}>
								<div
									className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer overflow-hidden"
									onClick={() => setUserDropdownOpen(!userDropdownOpen)}
								>
									<img
										src={
											currentUser.photoURL ||
											`https://api.dicebear.com/7.x/initials/svg?seed=${
												currentUser.displayName || "User"
											}`
										}
										alt={currentUser.displayName || "User profile"}
										className="w-full h-full object-cover"
									/>
								</div>
								<div
									className={cn(
										"absolute right-0 mt-2 w-48 glass rounded-md shadow-lg py-1 z-50 border border-gray-700 transition-all duration-200",
										userDropdownOpen
											? "opacity-100 visible"
											: "opacity-0 invisible"
									)}
								>
									<div className="px-4 py-2 border-b border-gray-700">
										<p className="text-sm font-medium text-white">
											{currentUser.displayName || "User"}
										</p>
										<p className="text-xs text-gray-400">{currentUser.email}</p>
									</div>
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-light"
										onClick={() => setUserDropdownOpen(false)}
									>
										My Profile
									</Link>
									<Link
										to="/saved-events"
										className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-light"
										onClick={() => setUserDropdownOpen(false)}
									>
										Saved Events
									</Link>
									<button
										onClick={handleLogout}
										className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-light border-t border-gray-700"
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Mobile Navigation - Overlay for better UX */}
				<div
					className={cn(
						"fixed inset-0 z-40 bg-dark/95 lg:hidden transition-opacity duration-300",
						mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
					)}
				>
					<div className="flex flex-col h-full pt-16 pb-6 px-6">
						<div className="flex flex-col space-y-3 mb-6">
							<Link
								to="/"
								className={cn(
									"py-3 px-4 font-medium rounded-lg text-center",
									isActiveRoute("/")
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								to="/all-events"
								className={cn(
									"py-3 px-4 font-medium rounded-lg text-center",
									isActiveRoute("/all-events")
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								All Events
							</Link>
							<Link
								to="/about"
								className={cn(
									"py-3 px-4 font-medium rounded-lg text-center",
									isActiveRoute("/about")
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
						</div>

						{/* Authentication for Mobile */}
						<div className="mt-auto">
							{!currentUser ? (
								<div className="flex flex-col space-y-3">
									<Link
										to="/login"
										className="w-full py-3 px-4 rounded-lg glass text-center text-white hover:bg-dark-light transition"
										onClick={() => setMobileMenuOpen(false)}
									>
										Log In
									</Link>
									<Link
										to="/register"
										className="w-full py-3 px-4 rounded-lg bg-primary text-center text-white hover:bg-primary/80 transition"
										onClick={() => setMobileMenuOpen(false)}
									>
										Sign Up
									</Link>
								</div>
							) : (
								<div className="glass rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-700">
										<div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
											<img
												src={
													currentUser.photoURL ||
													`https://api.dicebear.com/7.x/initials/svg?seed=${
														currentUser.displayName || "User"
													}`
												}
												alt={currentUser.displayName || "User profile"}
												className="w-full h-full object-cover"
												onError={(e) => {
													if (
														currentUser.photoURL &&
														!currentUser.photoURL.includes("?t=")
													) {
														const timestamp = new Date().getTime();
														e.target.src = `${currentUser.photoURL}?t=${timestamp}`;
													} else {
														e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${
															currentUser.displayName || "User"
														}`;
													}
												}}
											/>
										</div>
										<div>
											<p className="text-base font-medium text-white">
												{currentUser.displayName || "User"}
											</p>
											<p className="text-sm text-gray-400">
												{currentUser.email}
											</p>
										</div>
									</div>
									<div className="flex flex-col space-y-2">
										<Link
											to="/profile"
											className="w-full py-2.5 px-4 rounded-lg glass text-white hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											My Profile
										</Link>
										<Link
											to="/saved-events"
											className="w-full py-2.5 px-4 rounded-lg glass text-white hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											Saved Events
										</Link>
										<button
											onClick={() => {
												handleLogout();
												setMobileMenuOpen(false);
											}}
											className="w-full py-2.5 px-4 rounded-lg glass text-white hover:bg-dark-light transition text-center"
										>
											Logout
										</button>
									</div>
								</div>
							)}

							{/* Close button at the bottom */}
							<button
								onClick={() => setMobileMenuOpen(false)}
								className="w-full mt-6 py-3 px-4 rounded-lg border border-gray-700 text-center text-gray-400 hover:text-white hover:border-gray-600 transition"
							>
								Close Menu
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

