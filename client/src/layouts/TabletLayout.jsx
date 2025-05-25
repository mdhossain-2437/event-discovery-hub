import React from "react";
import { useLocation } from "react-router-dom";
import NavbarWithAuth from "../components/NavbarWithAuth";
import FooterWithAuth from "../components/FooterWithAuth";

/**
 * Tablet Layout Component
 * Provides a layout optimized for tablet devices
 */
const TabletLayout = ({ children }) => {
	const location = useLocation();

	// Determine if the current route is the NotFound page or any error route
	const isNotFoundPage =
		location.pathname === "/not-found" ||
		location.pathname === "/404" ||
		location.pathname === "/error" ||
		location.pathname === "/500" ||
		location.pathname === "/403" ||
		location.pathname === "/401" ||
		location.pathname.includes("error");

	return (
		<div className="flex flex-col min-h-screen bg-dark">
			{!isNotFoundPage && <NavbarWithAuth />}
			<main className="flex-grow">{children}</main>
			{!isNotFoundPage && <FooterWithAuth />}
		</div>
	);
};

export default TabletLayout;
