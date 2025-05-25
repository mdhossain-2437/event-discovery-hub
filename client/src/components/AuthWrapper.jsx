import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase.js";

const AuthWrapper = ({ children }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			// Just wait for the auth state to be initialized
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// Show loader while auth is initializing
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-900">
				<div className="w-12 h-12 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
			</div>
		);
	}

	return <>{children}</>;
};

export default AuthWrapper;
