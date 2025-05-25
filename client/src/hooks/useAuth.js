import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook for Firebase authentication
 * Provides better error handling and fallback values for development
 * @returns {Object} Authentication context
 */
const useAuth = () => {
	const auth = useContext(AuthContext);

	if (!auth) {
		console.warn(
			"AuthContext not found - using fallback values. Make sure AuthProvider is wrapping your component."
		);

		// In development mode, return mock implementation for easier debugging
		return {
			currentUser: null,
			loading: false,
			authAction: null,
			login: async () => {
				console.warn("Using mock auth login");
				return Promise.resolve(null);
			},
			register: async () => {
				console.warn("Using mock auth register");
				return Promise.resolve(null);
			},
			loginWithGoogle: async () => {
				console.warn("Using mock auth Google login");
				return Promise.resolve(null);
			},
			logout: async () => {
				console.warn("Using mock auth logout");
				return Promise.resolve();
			},
			forgotPassword: async () => {
				console.warn("Using mock auth password reset");
				return Promise.resolve();
			},
			updateProfile: async () => {
				console.warn("Using mock auth profile update");
				return Promise.resolve();
			},
		};
	}

	return auth;
};

export default useAuth;
