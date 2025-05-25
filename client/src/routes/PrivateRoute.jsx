import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingAnimation from "../components/LoadingAnimation";

/**
 * Private route component that requires authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Protected route
 */
const PrivateRoute = ({ children }) => {
	const { currentUser, loading } = useAuth();
	const location = useLocation();

	// If still loading, show our playful loader
	if (loading) {
		return <LoadingAnimation message="Verifying your credentials..." />;
	}

	// If not logged in, redirect to login page
	if (!currentUser) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// If logged in, render the protected component
	return <>{children}</>;
};

export default PrivateRoute;


