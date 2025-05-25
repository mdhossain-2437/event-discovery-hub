import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";

const Contact = () => {
	// Set page title
	useTitle("Contact");

	useEffect(() => {
		if (window.AOS) {
			window.AOS.refresh();
		}
	}, []);

	// Redirect to NotFound page
	return <Navigate to="/not-found" />;
};

export default Contact;

