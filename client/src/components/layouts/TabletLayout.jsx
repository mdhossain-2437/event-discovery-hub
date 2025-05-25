import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	useDevice,
	useOrientation,
	useIsTouchDevice,
} from "../../context/DeviceContext";
import NavbarWithAuth from "../NavbarWithAuth";
import FooterWithAuth from "../FooterWithAuth";

/**
 * Enhanced Tablet Layout Component
 * Provides a layout optimized for tablet devices with orientation awareness
 */
const TabletLayout = ({ children }) => {
	const location = useLocation();
	const { width, height, breakpoint } = useDevice();
	const { isLandscape, isPortrait } = useOrientation();
	const isTouchDevice = useIsTouchDevice();
	const [showSidebar, setShowSidebar] = useState(false);

	// Determine if the current route is the NotFound page or any error route
	const isErrorPage =
		location.pathname === "/not-found" ||
		location.pathname === "/404" ||
		location.pathname === "/error" ||
		location.pathname === "/500" ||
		location.pathname === "/403" ||
		location.pathname === "/401" ||
		location.pathname.includes("error");

	// Auto-hide sidebar on orientation change for better UX
	useEffect(() => {
		setShowSidebar(false);
	}, [isLandscape, isPortrait]);

	// Determine layout style based on orientation and screen size
	const getLayoutClasses = () => {
		const baseClasses = "flex min-h-screen bg-dark";

		if (isLandscape && width >= 900) {
			// Landscape mode with enough width - use sidebar layout
			return `${baseClasses} flex-row`;
		}

		// Portrait mode or narrow landscape - use stacked layout
		return `${baseClasses} flex-col`;
	};

	// Determine main content classes
	const getMainClasses = () => {
		const baseClasses = "flex-grow";

		if (isLandscape && width >= 900) {
			// In landscape with sidebar, add proper spacing
			return `${baseClasses} transition-all duration-300 ${
				showSidebar ? "ml-64" : ""
			}`;
		}

		return baseClasses;
	};

	// Determine container padding based on orientation
	const getContainerPadding = () => {
		if (isLandscape) {
			return "px-6 md:px-8 lg:px-12"; // More horizontal padding in landscape
		}
		return "px-4 md:px-6"; // Standard padding in portrait
	};

	return (
		<div className={getLayoutClasses()}>
			{/* Tablet-optimized Navigation */}
			{!isErrorPage && (
				<NavbarWithAuth
					className={`
						${isLandscape && width >= 900 ? "tablet-landscape-nav" : "tablet-portrait-nav"}
						${isTouchDevice ? "touch-optimized" : ""}
					`}
				/>
			)}

			{/* Main Content Area */}
			<main className={`${getMainClasses()} ${getContainerPadding()}`}>
				{/* Content wrapper with tablet-specific styling */}
				<div
					className={`
					w-full max-w-none
					${isLandscape ? "tablet-landscape-content" : "tablet-portrait-content"}
					${isTouchDevice ? "touch-friendly-spacing" : ""}
				`}
				>
					{children}
				</div>
			</main>

			{/* Tablet-optimized Footer */}
			{!isErrorPage && (
				<FooterWithAuth
					className={`
						${isLandscape ? "tablet-landscape-footer" : "tablet-portrait-footer"}
						${getContainerPadding()}
					`}
				/>
			)}

			{/* Orientation change indicator (optional) */}
			{process.env.NODE_ENV === "development" && (
				<div className="fixed bottom-4 left-4 bg-black/80 text-white px-2 py-1 rounded text-xs z-50">
					{width}x{height} - {isLandscape ? "Landscape" : "Portrait"} -{" "}
					{breakpoint}
				</div>
			)}
		</div>
	);
};

export default TabletLayout;
