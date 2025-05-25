import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from "firebase/auth";

// Firebase configuration from environment variables
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

// Check if all required Firebase config values are present
const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"];
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

if (missingKeys.length > 0) {
	console.error(
		`Missing required Firebase configuration: ${missingKeys.join(", ")}`
	);
	throw new Error(
		"Firebase configuration is incomplete. Please check your environment variables."
	);
}

// Initialize Firebase with error handling
let app;
let auth;
let googleProvider;

try {
	// Initialize Firebase
	app = initializeApp(firebaseConfig);

	// Initialize Auth
	auth = getAuth(app);

	// Initialize Google Provider
	googleProvider = new GoogleAuthProvider();
} catch (error) {
	console.error("Error initializing Firebase:", error);
	console.error("Error details:", error.message);
	throw new Error(
		"Firebase initialization failed. Please check your configuration."
	);
}

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's display name
 * @param {string} photoURL - User's photo URL
 * @returns {Promise<Object>} User credential
 */
export const registerWithEmailAndPassword = async (
	email,
	password,
	displayName,
	photoURL
) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	await updateProfile(userCredential.user, {
		displayName,
		photoURL:
			photoURL ||
			"https://api.dicebear.com/7.x/initials/svg?seed=" + displayName,
	});
	return userCredential;
};

/**
 * Login with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential
 */
export const loginWithEmailAndPassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in with Google
 * @returns {Promise<Object>} User credential
 */
export const signInWithGoogle = () => {
	return signInWithPopup(auth, googleProvider);
};

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export const logoutUser = () => {
	return signOut(auth);
};

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise<void>}
 */
export const resetPassword = (email) => {
	return sendPasswordResetEmail(auth, email);
};

/**
 * Update user profile
 * @param {Object} user - User object
 * @param {Object} data - Profile data to update
 * @param {string} [data.displayName] - New display name
 * @param {string} [data.photoURL] - New photo URL
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (user, data) => {
	return updateProfile(user, data);
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function that receives the user object
 * @returns {Function} Unsubscribe function
 */
export const listenToAuthChanges = (callback) => {
	const unsubscribe = onAuthStateChanged(auth, callback);
	return unsubscribe;
};

export { auth };
export default app;
