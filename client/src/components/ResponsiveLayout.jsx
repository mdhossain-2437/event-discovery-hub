import React from "react";
import { useDevice } from "../context/DeviceContext";
import MobileLayout from "../layouts/MobileLayout";
import TabletLayout from "../layouts/TabletLayout";
import { useLocation } from "react-router-dom";
import NavbarWithAuth from "./NavbarWithAuth";
import FooterWithAuth from "./FooterWithAuth";

/**
 * Responsive Layout Component
 * Conditionally renders mobile, tablet, or desktop layout based on device type
 */
const ResponsiveLayout = ({ children }) => {
	const { isMobile, isTablet, deviceType } = useDevice();
	const location = useLocation();

	// Define valid routes
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
		"/not-found",
		"/profile",
		"/about",
		"/saved-events",
	];

	// Check if current path is a valid route or starts with valid dynamic routes
	const isValidRoute =
		validRoutes.includes(location.pathname) ||
		location.pathname.startsWith("/event/") ||
		location.pathname.startsWith("/blog/");

	// Determine if the current route is the NotFound page or any error route
	const isErrorPage =
		location.pathname === "/not-found" ||
		location.pathname === "/404" ||
		location.pathname === "/error" ||
		location.pathname === "/500" ||
		location.pathname === "/403" ||
		location.pathname === "/401" ||
		location.pathname.includes("error") ||
		!isValidRoute;

	// If it's a mobile device, use the mobile layout
	if (isMobile) {
		return <MobileLayout>{children}</MobileLayout>;
	}

	// If it's a tablet device, use the tablet layout
	if (isTablet) {
		return <TabletLayout>{children}</TabletLayout>;
	}

	// Otherwise, use the desktop layout
	return (
		<>
			{!isErrorPage && <NavbarWithAuth />}
			<main className="min-h-screen">{children}</main>
			{!isErrorPage && <FooterWithAuth />}
		</>
	);
};

export default ResponsiveLayout;
