import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./assets/responsive-fixes.css"; // Import responsive fixes
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "./context/AuthContext";
import { SavedEventsProvider } from "./context/SavedEventsContext";
import { DeviceProvider } from "./context/DeviceContext";
import fixAllIcons from "./utils/iconFixer";

// Initialize AOS animation
AOS.init({
	duration: 800,
	easing: "ease-in-out",
	once: true,
	mirror: false,
});

// Fix all icons in the application
fixAllIcons();

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SavedEventsProvider>
					<DeviceProvider>
						<App />
						<Toaster
							position="top-right"
							toastOptions={{
								className:
									"glass dark:text-white border border-gray-700 shadow-lg",
								style: {
									background: "rgba(31, 41, 55, 0.9)",
									color: "white",
									padding: "16px",
									backdropFilter: "blur(12px)",
									borderRadius: "12px",
									boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
									fontSize: "14px",
									display: "flex",
									alignItems: "center",
									gap: "10px",
									maxWidth: "380px",
								},
								success: {
									iconTheme: {
										primary: "#8b5cf6",
										secondary: "white",
									},
									style: {
										border: "1px solid rgba(139, 92, 246, 0.4)",
										background: "rgba(31, 41, 55, 0.95)",
									},
								},
								error: {
									iconTheme: {
										primary: "#ef4444",
										secondary: "white",
									},
									style: {
										border: "1px solid rgba(239, 68, 68, 0.4)",
										background: "rgba(31, 41, 55, 0.95)",
									},
								},
								loading: {
									iconTheme: {
										primary: "#3b82f6",
										secondary: "white",
									},
									style: {
										border: "1px solid rgba(59, 130, 246, 0.4)",
										background: "rgba(31, 41, 55, 0.95)",
									},
								},
								duration: 4000,
							}}
							gutter={16}
							containerStyle={{
								top: 70,
							}}
							containerClassName="toast-container"
						/>
					</DeviceProvider>
				</SavedEventsProvider>
			</AuthProvider>
		</QueryClientProvider>
	</BrowserRouter>
);

