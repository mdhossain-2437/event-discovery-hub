import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const NavigationWrapper = ({ children }) => {
	const location = useLocation();
	const auth = useContext(AuthContext);
	const { loading } = auth || { loading: true };

	// Determine if the current route is one where we don't want to show the navbar
	const isNotFoundPage =
		location.pathname === "/404" || location.pathname === "*";

	// Don't render anything while auth is initializing to prevent flashing
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-12 h-12 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<>
			{!isNotFoundPage && <Navbar />}
			{children}
			{!isNotFoundPage && <Footer />}
		</>
	);
};

export default NavigationWrapper;
