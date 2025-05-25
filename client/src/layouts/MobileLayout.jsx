import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FiHome,
	FiCalendar,
	FiSearch,
	FiBookmark,
	FiUser,
	FiMenu,
	FiX,
	FiMail,
	FiInfo,
	FiEdit,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth.js";
import logoImg from "../assets/event-explorer-logo.png";
import MobileFooter from "../components/MobileFooter.jsx";

const MobileLayout = ({ children }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const { currentUser, logout } = useAuth();

	// Determine if the current route is an error page or not found page
	const isErrorPage =
		location.pathname === "/not-found" ||
		location.pathname === "/404" ||
		location.pathname === "/error" ||
		location.pathname === "/500" ||
		location.pathname === "/403" ||
		location.pathname === "/401" ||
		location.pathname.includes("error");

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	// Handle body scroll when mobile menu is open
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [menuOpen]);

	const navItems = [
		{ path: "/", label: "Home", icon: <FiHome className="text-xl" /> },
		{
			path: "/all-events",
			label: "Events",
			icon: <FiCalendar className="text-xl" />,
		},
		{
			path: "/blog",
			label: "Blog",
			icon: <FiEdit className="text-xl" />,
		},
		{
			path: "/saved-events",
			label: "Saved",
			icon: <FiBookmark className="text-xl" />,
		},
		{
			path: "/profile",
			label: "Profile",
			icon: <FiUser className="text-xl" />,
		},
	];

	const menuVariants = {
		closed: {
			x: "100%",
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
		open: {
			x: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
	};

	const isActive = (path) => {
		return location.pathname === path ? "text-primary" : "text-gray-400";
	};

	return (
		<div className="flex flex-col min-h-screen bg-dark">
			{/* Mobile Header - Only show on non-error pages */}
			{!isErrorPage && (
				<header className="sticky top-0 z-50 flex items-center justify-between p-4 glass-dark border-b border-gray-800 shadow-lg">
					<Link to="/" className="flex items-center space-x-2">
						<img
							src={logoImg}
							alt="Event Explorer Logo"
							className="h-10 w-10"
						/>
						<span className="text-xl font-bold gradient-text">
							Event Explorer
						</span>
					</Link>
					<button
						onClick={toggleMenu}
						className="flex items-center justify-center w-10 h-10 rounded-full glass text-white focus:outline-none"
						aria-label="Toggle menu"
					>
						<FiMenu className="text-xl" />
					</button>
				</header>
			)}

			{/* Main Content */}
			<main
				className={`flex-grow overflow-auto ${!isErrorPage ? "pb-20" : ""}`}
			>
				{children}
			</main>

			{/* Mobile Footer - Only show on non-error pages */}
			{!isErrorPage && (
				<>
					{/* Mobile Bottom Navigation */}
					<nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 glass-dark border-t border-gray-800 shadow-lg">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`flex flex-col items-center justify-center w-full h-full ${isActive(
									item.path
								)}`}
								onClick={closeMenu}
							>
								{item.icon}
								<span className="text-xs mt-1">{item.label}</span>
							</Link>
						))}
					</nav>

					{/* Mobile Footer - Shown on main pages */}
					{(location.pathname === "/" ||
						location.pathname === "/about" ||
						location.pathname === "/contact" ||
						location.pathname === "/all-events" ||
						location.pathname === "/blog") && <MobileFooter />}
				</>
			)}

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={closeMenu}
					/>
				)}
			</AnimatePresence>

			{/* Mobile Side Menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
						className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs glass-dark shadow-lg z-50 overflow-y-auto flex flex-col border-l border-gray-800"
					>
						<div className="flex items-center justify-between p-4 border-b border-gray-800">
							<h2 className="text-xl font-bold gradient-text">Menu</h2>
							<button
								onClick={closeMenu}
								className="flex items-center justify-center w-10 h-10 rounded-full glass text-white focus:outline-none"
								aria-label="Close menu"
							>
								<FiX className="text-xl" />
							</button>
						</div>

						<div className="flex-grow overflow-y-auto">
							<div className="p-4 border-b border-gray-800">
								{currentUser ? (
									<div className="flex items-center space-x-3">
										<div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-white text-xl font-bold glass">
											{currentUser.displayName
												? currentUser.displayName.charAt(0).toUpperCase()
												: "U"}
										</div>
										<div>
											<p className="font-medium text-white">
												{currentUser.displayName || "User"}
											</p>
											<p className="text-sm text-gray-400">
												{currentUser.email}
											</p>
										</div>
									</div>
								) : (
									<div className="flex flex-col space-y-2">
										<Link
											to="/login"
											className="w-full py-2 px-4 bg-primary hover:bg-primary/80 text-white rounded-md text-center transition"
											onClick={closeMenu}
										>
											Login
										</Link>
										<Link
											to="/register"
											className="w-full py-2 px-4 glass text-white rounded-md text-center hover:bg-dark-light transition"
											onClick={closeMenu}
										>
											Register
										</Link>
									</div>
								)}
							</div>

							<nav className="p-4">
								<ul className="space-y-2">
									{[
										{ path: "/", label: "Home", icon: <FiHome /> },
										{
											path: "/all-events",
											label: "All Events",
											icon: <FiCalendar />,
										},
										{ path: "/blog", label: "Blog", icon: <FiEdit /> },
										{
											path: "/saved-events",
											label: "Saved Events",
											icon: <FiBookmark />,
										},
										{ path: "/profile", label: "Profile", icon: <FiUser /> },
										{ path: "/contact", label: "Contact Us", icon: <FiMail /> },
										{ path: "/about", label: "About Us", icon: <FiInfo /> },
									].map((item) => (
										<li key={item.path}>
											<Link
												to={item.path}
												className={`flex items-center space-x-3 p-3 rounded-md ${
													location.pathname === item.path
														? "bg-dark-light text-primary"
														: "text-gray-300 hover:bg-dark-light hover:text-white"
												}`}
												onClick={closeMenu}
											>
												{item.icon}
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>

						{currentUser && (
							<div className="p-4 border-t border-gray-800">
								<button
									onClick={() => {
										logout();
										closeMenu();
									}}
									className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-center transition"
								>
									Logout
								</button>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileLayout;
