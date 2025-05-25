import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
	const location = useLocation();

	// Determine if the current route is the NotFound page
	const isNotFoundPage =
		location.pathname === "/404" || location.pathname === "*";

	return (
		<>
			{!isNotFoundPage && <Navbar />}
			<main className="min-h-screen">{children}</main>
			{!isNotFoundPage && <Footer />}
		</>
	);
};

export default Layout;

