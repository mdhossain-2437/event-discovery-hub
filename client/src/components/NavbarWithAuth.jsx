import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import {
	ChevronsDown,
	LogOut,
	UserIcon,
	Menu,
	X,
	Settings,
	BookmarkIcon,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip.jsx";
import { showLogoutAlert } from "../lib/sweetAlert.js";
import logoImg from "../assets/event-explorer-logo.png";
import { useDevice } from "../context/DeviceContext.jsx";
import {
	createProfileImageProps,
	processProfileImageUrl,
} from "../lib/imageUtils.js";

const NavbarWithAuth = () => {
	const location = useLocation();
	const { currentUser, loading, logout } = useAuth();
	const { isTablet, isMobile } = useDevice();
	const [is768px, setIs768px] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dropdown768Ref = useRef(null);

	// Check if screen width is exactly 768px
	useEffect(() => {
		const checkScreenWidth = () => {
			setIs768px(window.innerWidth === 768);
		};

		// Initial check
		checkScreenWidth();

		// Add event listener for resize
		window.addEventListener("resize", checkScreenWidth);

		// Cleanup
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	// Close dropdown when clicking outside - for both regular and 768px dropdowns
	useEffect(() => {
		const handleClickOutside = (event) => {
			// For regular tablet dropdown
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setProfileDropdownOpen(false);
			}

			// For 768px specific dropdown
			if (
				dropdown768Ref.current &&
				!dropdown768Ref.current.contains(event.target)
			) {
				setProfileDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Get user initials for avatar fallback
	const getUserInitials = (user) => {
		if (!user) return "GU";

		if (user.displayName) {
			const nameParts = user.displayName.split(" ");
			if (nameParts.length > 1 && nameParts[0] && nameParts[1]) {
				return `${nameParts[0][0] || ""}${nameParts[1][0] || ""}`.toUpperCase();
			}
			return (user.displayName.substring(0, 2) || "GU").toUpperCase();
		}

		if (user.email) {
			return (user.email.substring(0, 2) || "GU").toUpperCase();
		}

		return "GU"; // Guest User
	};

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

	// Don't show navbar on error pages
	if (isNotFoundPage) {
		return null;
	}

	// Handle body scroll when mobile menu is open
	React.useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [mobileMenuOpen]);

	// Close dropdown when route changes
	React.useEffect(() => {
		setProfileDropdownOpen(false);
	}, [location.pathname]);

	// Show loading state while auth is initializing
	if (loading) {
		return (
			<div className="sticky top-0 z-50 px-4 sm:px-6 md:px-8 lg:px-[75px] py-2 border-b border-gray-800 shadow-lg glass-dark">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center text-xl sm:text-2xl font-bold font-heading gradient-text">
						<img
							src={logoImg}
							alt="Event Explorer Logo"
							className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] mr-2"
						/>
						<span className="hidden sm:inline">Event Explorer</span>
					</div>
					<div className="w-6 h-6 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
				</div>
			</div>
		);
	}

	// Check if this is an auth page
	const isAuthPage =
		location.pathname === "/login" ||
		location.pathname === "/register" ||
		location.pathname === "/forgot-password";

	// Navbar implementation with responsive design
	return (
		<nav
			className={`sticky top-0 z-50 px-4 sm:px-6 md:px-8 lg:px-[75px] py-2 border-b border-gray-800 shadow-lg ${
				isAuthPage ? "bg-dark-light/70" : "glass-dark"
			} ${is768px ? "navbar-container" : ""}`}
		>
			{is768px ? (
				<>
					{/* Logo - Special styling for 768px */}
					<Link
						to="/"
						className="navbar-logo flex items-center text-xl font-bold font-heading"
					>
						<img
							src={logoImg}
							alt="Event Explorer Logo"
							className="h-[40px] w-[40px] mr-2"
						/>
						<span>Event Explorer</span>
					</Link>

					{/* User Controls for 768px */}
					<div className="flex items-center space-x-3">
						{currentUser ? (
							<div className="flex items-center relative" ref={dropdown768Ref}>
								<button
									onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
									className="profile-button-768 cursor-pointer"
								>
									<Avatar className="avatar h-9 w-9 border-2 border-primary/30">
										<AvatarImage
											src={currentUser.photoURL || undefined}
											onError={(e) => {
												if (
													currentUser.photoURL &&
													!currentUser.photoURL.includes("?t=")
												) {
													const timestamp = new Date().getTime();
													e.target.src = `${currentUser.photoURL}?t=${timestamp}`;
												}
											}}
										/>
										<AvatarFallback className="bg-primary/20 text-primary">
											{getUserInitials(currentUser)}
										</AvatarFallback>
									</Avatar>
									<div className="user-info flex flex-col items-start mr-1">
										<span className="user-name text-sm font-medium text-white">
											{currentUser.displayName?.split(" ")[0] || "User"}
										</span>
									</div>
									<ChevronsDown className="h-4 w-4 text-gray-400" />
								</button>

								{/* Custom Dropdown Menu */}
								{profileDropdownOpen && (
									<div className="fixed right-4 mt-2 top-[70px] w-64 rounded-md shadow-lg glass-dark border border-gray-800 overflow-hidden z-[100] animate-dropdown-fade">
										<div className="py-3 px-4 border-b border-gray-800 flex items-center">
											<div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden mr-3 flex-shrink-0">
												<img
													src={
														currentUser.photoURL ||
														`https://ui-avatars.com/api/?name=${encodeURIComponent(
															currentUser.displayName || "User"
														)}&background=8b5cf6&color=fff`
													}
													alt={currentUser.displayName || "User"}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-white font-medium">
													{currentUser.displayName || "User"}
												</p>
												<p className="text-sm text-gray-400 truncate">
													{currentUser.email}
												</p>
											</div>
										</div>
										<div className="py-2">
											<Link
												to="/profile"
												className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
													location.pathname === "/profile" ? "text-primary" : ""
												}`}
												onClick={() => setProfileDropdownOpen(false)}
											>
												<UserIcon className="mr-3 h-5 w-5 text-primary" />
												Profile
											</Link>
											<Link
												to="/saved-events"
												className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
													location.pathname === "/saved-events"
														? "text-primary"
														: ""
												}`}
												onClick={() => setProfileDropdownOpen(false)}
											>
												<BookmarkIcon className="mr-3 h-5 w-5 text-primary" />
												Saved Events
											</Link>
											<button
												onClick={() => {
													logout();
													setProfileDropdownOpen(false);
												}}
												className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors"
											>
												<LogOut className="mr-3 h-5 w-5" />
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<Link
								to="/login"
								className="px-4 py-2 rounded bg-primary hover:bg-primary/80 transition text-white"
							>
								Log In
							</Link>
						)}

						{/* Mobile Menu Button - Only for non-logged in users */}
						{!currentUser && (
							<button
								className="md:hidden text-gray-300 hover:text-white focus:outline-none navbar-mobile-button ml-3"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								aria-label="Toggle mobile menu"
							>
								{mobileMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						)}
					</div>
				</>
			) : (
				<div className="flex items-center justify-between w-full">
					{/* Logo for other screen sizes */}
					<Link
						to="/"
						className="flex items-center text-xl sm:text-2xl font-bold font-heading gradient-text"
					>
						<img
							src={logoImg}
							alt="Event Explorer Logo"
							className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] mr-2"
						/>
						<span className="hidden sm:inline">Event Explorer</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6 navbar-desktop-links">
						<Link
							to="/"
							className={`font-medium ${
								location.pathname === "/"
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white"
							}`}
						>
							Home
						</Link>
						<Link
							to="/all-events"
							className={`font-medium ${
								location.pathname === "/all-events"
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white"
							}`}
						>
							All Events
						</Link>
						<Link
							to="/about"
							className={`font-medium ${
								location.pathname === "/about"
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white"
							}`}
						>
							About
						</Link>
						<Link
							to="/blog"
							className={`font-medium ${
								location.pathname === "/blog"
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white"
							}`}
						>
							Blog
						</Link>
						<Link
							to="/contact"
							className={`font-medium ${
								location.pathname === "/contact"
									? "text-white border-b-2 border-primary"
									: "text-gray-300 hover:text-white"
							}`}
						>
							Contact
						</Link>
					</div>

					{/* User Controls */}
					<div className="flex items-center space-x-3">
						{currentUser ? (
							<div className="flex items-center space-x-3">
								{/* Saved Events button - only visible on desktop */}
								<Link
									to="/saved-events"
									className="hidden md:flex px-4 py-2 rounded glass text-white hover:bg-dark-light transition"
								>
									<i className="f-bookmark mr-2"></i>
									<span>Saved Events</span>
								</Link>

								{/* Special 768px Layout - Matches the image exactly */}
								{is768px && currentUser && (
									<div
										className="flex items-center relative"
										ref={dropdown768Ref}
									>
										<button
											onClick={() =>
												setProfileDropdownOpen(!profileDropdownOpen)
											}
											className="profile-button-768 cursor-pointer"
										>
											<Avatar className="avatar h-9 w-9 border-2 border-primary/30">
												<AvatarImage
													src={currentUser.photoURL || undefined}
													onError={(e) => {
														if (
															currentUser.photoURL &&
															!currentUser.photoURL.includes("?t=")
														) {
															const timestamp = new Date().getTime();
															e.target.src = `${currentUser.photoURL}?t=${timestamp}`;
														}
													}}
												/>
												<AvatarFallback className="bg-primary/20 text-primary">
													{getUserInitials(currentUser)}
												</AvatarFallback>
											</Avatar>
											<div className="user-info flex flex-col items-start mr-1">
												<span className="user-name text-sm font-medium text-white">
													{currentUser.displayName?.split(" ")[0] || "User"}
												</span>
											</div>
											<ChevronsDown className="h-4 w-4 text-gray-400" />
										</button>

										{/* Custom Dropdown Menu */}
										{profileDropdownOpen && (
											<div className="fixed right-4 mt-2 top-[70px] w-64 rounded-md shadow-lg glass-dark border border-gray-800 overflow-hidden z-[100] animate-dropdown-fade">
												<div className="py-3 px-4 border-b border-gray-800 flex items-center">
													<div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden mr-3 flex-shrink-0">
														<img
															{...createProfileImageProps(
																currentUser.photoURL,
																`https://ui-avatars.com/api/?name=${encodeURIComponent(
																	currentUser.displayName || "User"
																)}&background=8b5cf6&color=fff`
															)}
															alt={currentUser.displayName || "User"}
															className="w-full h-full object-cover"
														/>
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-white font-medium">
															{currentUser.displayName || "User"}
														</p>
														<p className="text-sm text-gray-400 truncate">
															{currentUser.email}
														</p>
													</div>
												</div>
												<div className="py-2">
													<Link
														to="/"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/" ? "text-primary" : ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i className="f-home mr-3 h-5 w-5 text-primary"></i>
														Home
													</Link>
													<Link
														to="/all-events"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/all-events"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i className="f-calendar mr-3 h-5 w-5 text-primary"></i>
														All Events
													</Link>
													<Link
														to="/blog"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/blog"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i className="f-edit mr-3 h-5 w-5 text-primary"></i>
														Blog
													</Link>
													<Link
														to="/about"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/about"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i className="f-info-circle mr-3 h-5 w-5 text-primary"></i>
														About Us
													</Link>
													<Link
														to="/contact"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/contact"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i className="f-envelope mr-3 h-5 w-5 text-primary"></i>
														Contact Us
													</Link>

													<div className="my-2 border-t border-gray-800"></div>

													<Link
														to="/profile"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/profile"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<UserIcon className="mr-3 h-5 w-5 text-primary" />
														Profile
													</Link>
													<Link
														to="/saved-events"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/saved-events"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<BookmarkIcon className="mr-3 h-5 w-5 text-primary" />
														Saved Events
													</Link>
													<button
														onClick={() => {
															logout();
															setProfileDropdownOpen(false);
														}}
														className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors"
													>
														<LogOut className="mr-3 h-5 w-5" />
														Logout
													</button>
												</div>
											</div>
										)}
									</div>
								)}

								{/* Tablet/Mobile Profile Dropdown - For other tablet sizes */}
								{isTablet && !is768px && (
									<div className="relative" ref={dropdownRef}>
										<div className="flex items-center space-x-3">
											{/* Profile Avatar Button */}
											<button
												onClick={() =>
													setProfileDropdownOpen(!profileDropdownOpen)
												}
												className="flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-full glass hover:bg-dark-light transition-colors"
											>
												<Avatar className="h-9 w-9 border-2 border-primary/30">
													<AvatarImage
														src={currentUser.photoURL || undefined}
														onError={(e) => {
															if (
																currentUser.photoURL &&
																!currentUser.photoURL.includes("?t=")
															) {
																const timestamp = new Date().getTime();
																e.target.src = `${currentUser.photoURL}?t=${timestamp}`;
															}
														}}
													/>
													<AvatarFallback className="bg-primary/20 text-primary">
														{getUserInitials(currentUser)}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col items-start mr-1">
													<span className="text-sm font-medium text-white">
														{currentUser.displayName?.split(" ")[0] || "User"}
													</span>
												</div>
												<ChevronsDown className="h-4 w-4 text-gray-400" />
											</button>

											{/* Custom Dropdown Menu */}
											{profileDropdownOpen && (
												<div className="fixed right-4 mt-2 top-[70px] w-64 rounded-md shadow-lg glass-dark border border-gray-800 overflow-hidden z-[100] animate-dropdown-fade">
													<div className="py-3 px-4 border-b border-gray-800 flex items-center">
														<div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden mr-3 flex-shrink-0">
															<img
																{...createProfileImageProps(
																	currentUser.photoURL,
																	`https://ui-avatars.com/api/?name=${encodeURIComponent(
																		currentUser.displayName || "User"
																	)}&background=8b5cf6&color=fff`
																)}
																alt={currentUser.displayName || "User"}
																className="w-full h-full object-cover"
															/>
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-white font-medium">
																{currentUser.displayName || "User"}
															</p>
															<p className="text-sm text-gray-400 truncate">
																{currentUser.email}
															</p>
														</div>
													</div>
													<div className="py-2">
														<Link
															to="/"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/" ? "text-primary" : ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<i className="f-home mr-3 h-5 w-5 text-primary"></i>
															Home
														</Link>
														<Link
															to="/all-events"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/all-events"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<i className="f-calendar mr-3 h-5 w-5 text-primary"></i>
															All Events
														</Link>
														<Link
															to="/blog"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/blog"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<i className="f-edit mr-3 h-5 w-5 text-primary"></i>
															Blog
														</Link>
														<Link
															to="/about"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/about"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<i className="f-info-circle mr-3 h-5 w-5 text-primary"></i>
															About Us
														</Link>
														<Link
															to="/contact"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/contact"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<i className="f-envelope mr-3 h-5 w-5 text-primary"></i>
															Contact Us
														</Link>

														<div className="my-2 border-t border-gray-800"></div>

														<Link
															to="/profile"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/profile"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<UserIcon className="mr-3 h-5 w-5 text-primary" />
															Profile
														</Link>
														<Link
															to="/saved-events"
															className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
																location.pathname === "/saved-events"
																	? "text-primary"
																	: ""
															}`}
															onClick={() => setProfileDropdownOpen(false)}
														>
															<BookmarkIcon className="mr-3 h-5 w-5 text-primary" />
															Saved Events
														</Link>
														<button
															onClick={() => {
																logout();
																setProfileDropdownOpen(false);
															}}
															className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors"
														>
															<LogOut className="mr-3 h-5 w-5" />
															Logout
														</button>
													</div>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Desktop User Profile */}
								<div className="hidden md:flex items-center space-x-3">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Link to="/profile" className="cursor-pointer">
													<Avatar className="h-10 w-10 border-2 border-primary/30 hover:border-primary transition-all duration-300">
														<AvatarImage
															src={processProfileImageUrl(currentUser.photoURL)}
															referrerPolicy="no-referrer"
															crossOrigin="anonymous"
														/>
														<AvatarFallback className="bg-primary/20 text-primary">
															{getUserInitials(currentUser)}
														</AvatarFallback>
													</Avatar>
												</Link>
											</TooltipTrigger>
											<TooltipContent className="bg-dark-light/95 backdrop-blur-lg text-white border border-gray-800">
												<p>
													{currentUser.displayName ||
														currentUser.email?.split("@")[0] ||
														"User"}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>

									{/* Logout button - only visible on desktop */}
									<button
										onClick={() => logout()}
										className="hidden md:flex px-4 rounded glass text-white hover:bg-red-700/20 hover:text-red-400 transition-all duration-300"
										aria-label="Logout"
									>
										<span className="inline-flex items-center">
											<LogOut className="mr-2 h-4 w-4" />
											Logout
										</span>
									</button>
								</div>
							</div>
						) : (
							<div className="flex items-center space-x-3">
								{/* Always show login button */}
								<Link
									to="/login"
									className="px-4 py-2 rounded bg-primary hover:bg-primary/80 transition text-white"
								>
									Log In
								</Link>

								{/* Non-logged in user dropdown for tablet */}
								{(isTablet || is768px) && (
									<div className="relative" ref={dropdown768Ref}>
										<button
											onClick={() =>
												setProfileDropdownOpen(!profileDropdownOpen)
											}
											className="flex items-center space-x-2 px-4 py-2 rounded glass text-white hover:bg-dark-light/50 transition-colors"
											aria-label="Menu"
										>
											<span>Menu</span>
											<ChevronsDown className="h-4 w-4 text-gray-400" />
										</button>

										{/* Dropdown Menu for Non-logged in Users */}
										{profileDropdownOpen && (
											<div className="fixed right-4 mt-2 top-[70px] w-64 rounded-md shadow-lg glass-dark border border-gray-800 overflow-hidden z-[100] animate-dropdown-fade">
												<div className="py-2">
													<Link
														to="/"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/" ? "text-primary" : ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-home mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														Home
													</Link>
													<Link
														to="/all-events"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/all-events"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-calendar mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														All Events
													</Link>
													<Link
														to="/blog"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/blog"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-edit mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														Blog
													</Link>
													<Link
														to="/about"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/about"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-info-circle mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														About Us
													</Link>
													<Link
														to="/contact"
														className={`flex items-center px-4 py-3 text-gray-300 hover:bg-dark-light hover:text-white transition-colors ${
															location.pathname === "/contact"
																? "text-primary"
																: ""
														}`}
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-envelope mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														Contact Us
													</Link>

													<div className="my-2 border-t border-gray-800"></div>

													<Link
														to="/register"
														className="flex items-center px-4 py-3 text-primary hover:bg-dark-light hover:text-primary-light transition-colors"
														onClick={() => setProfileDropdownOpen(false)}
													>
														<i
															className="fa fa-user-plus mr-3 h-5 w-5 text-primary"
															style={{ fontStyle: "normal" }}
														></i>
														Register
													</Link>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						)}

						{/* Mobile Menu Button - Only for mobile devices */}
						{isMobile && (
							<button
								className="md:hidden text-gray-300 hover:text-white focus:outline-none navbar-mobile-button ml-3"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								aria-label="Toggle mobile menu"
							>
								{mobileMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						)}
					</div>
				</div>
			)}

			{/* Mobile Menu Overlay - Only for mobile devices */}
			{isMobile && mobileMenuOpen && (
				<div className="fixed inset-0 z-40 bg-dark/95 md:hidden transition-opacity duration-300">
					<div className="flex flex-col h-full pt-16 pb-6 px-6">
						<div className="flex flex-col space-y-3 mb-6">
							<Link
								to="/"
								className={`py-3 px-4 font-medium rounded-lg text-center ${
									location.pathname === "/"
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								to="/all-events"
								className={`py-3 px-4 font-medium rounded-lg text-center ${
									location.pathname === "/all-events"
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								All Events
							</Link>
							<Link
								to="/about"
								className={`py-3 px-4 font-medium rounded-lg text-center ${
									location.pathname === "/about"
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
							<Link
								to="/blog"
								className={`py-3 px-4 font-medium rounded-lg text-center ${
									location.pathname === "/blog"
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Blog
							</Link>
							<Link
								to="/contact"
								className={`py-3 px-4 font-medium rounded-lg text-center ${
									location.pathname === "/contact"
										? "text-white bg-dark-light"
										: "text-gray-300 hover:bg-dark-light hover:text-white"
								}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Contact
							</Link>
						</div>

						{/* Authentication for Mobile */}
						<div className="mt-auto">
							{currentUser ? (
								<div className="glass rounded-lg p-4">
									<div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-700">
										<div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
											<img
												{...createProfileImageProps(
													currentUser.photoURL,
													`https://ui-avatars.com/api/?name=${encodeURIComponent(
														currentUser.displayName || "User"
													)}&background=8b5cf6&color=fff`
												)}
												alt={currentUser.displayName || "User"}
												className="w-full h-full object-cover"
											/>
										</div>
										<div>
											<p className="font-medium text-white">
												{currentUser.displayName || "User"}
											</p>
											<p className="text-sm text-gray-400 truncate max-w-[180px]">
												{currentUser.email}
											</p>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<Link
											to="/profile"
											className="w-full py-2.5 px-4 rounded-lg glass text-white hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											Profile
										</Link>
										<Link
											to="/saved-events"
											className="w-full py-2.5 px-4 rounded-lg glass text-white hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											Saved
										</Link>
										<button
											onClick={() => {
												logout();
												setMobileMenuOpen(false);
											}}
											className="w-full col-span-2 py-2.5 px-4 rounded-lg glass-dark text-red-400 hover:bg-red-900/20 transition text-center"
										>
											Logout
										</button>
									</div>
								</div>
							) : (
								<div className="glass rounded-lg p-4">
									<div className="grid grid-cols-2 gap-3">
										<Link
											to="/login"
											className="w-full py-2.5 px-4 rounded-lg glass-dark text-primary hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											<i
												className="fa fa-sign-in-alt mr-2"
												style={{ fontStyle: "normal" }}
											></i>
											Log In
										</Link>
										<Link
											to="/register"
											className="w-full py-2.5 px-4 rounded-lg glass-dark text-primary hover:bg-dark-light transition text-center"
											onClick={() => setMobileMenuOpen(false)}
										>
											<i
												className="fa fa-user-plus mr-2"
												style={{ fontStyle: "normal" }}
											></i>
											Register
										</Link>
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
			)}
		</nav>
	);
};

export default NavbarWithAuth;
