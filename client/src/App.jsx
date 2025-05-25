import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import ResponsiveLayout from "./components/ResponsiveLayout";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ExtraPage from "./pages/ExtraPage";
import AllEvents from "./pages/AllEvents";
import SavedEvents from "./pages/SavedEvents";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import PrivateRoute from "./routes/PrivateRoute";

/**
 * Main App component
 * @returns {JSX.Element} App component
 */
function App() {
	const location = useLocation();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	// We don't need to determine error pages here anymore
	// The layout components will handle this internally

	return (
		<TooltipProvider>
			<ResponsiveLayout>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgetPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/all-events" element={<AllEvents />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:id" element={<BlogDetail />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/terms" element={<TermsAndConditions />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/not-found" element={<NotFound />} />

					{/* Protected Routes */}
					<Route
						path="/event/:id"
						element={
							<PrivateRoute>
								<EventDetails />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/about"
						element={
							<PrivateRoute>
								<ExtraPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/saved-events"
						element={
							<PrivateRoute>
								<SavedEvents />
							</PrivateRoute>
						}
					/>

					{/* 404 Page */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ResponsiveLayout>
		</TooltipProvider>
	);
}

export default App;
