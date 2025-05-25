import { createServer } from "http";
import { storage } from "./storage.js";

/**
 * Register application routes
 * @param {Express} app - Express application
 * @returns {Promise<Server>} HTTP server
 */
export async function registerRoutes(app) {
	// put application routes here
	// prefix all routes with /api

	// Health check endpoint
	app.get("/api/health", (req, res) => {
		res.json({ status: "ok", message: "Server is running properly" });
	});

	// Test events endpoint
	app.get("/api/events/test", (req, res) => {
		res.json({
			status: "ok",
			message: "Events API is working",
			timestamp: new Date().toISOString(),
			data: [
				{ id: "test-1", name: "Test Event 1" },
				{ id: "test-2", name: "Test Event 2" },
			],
		});
	});

	// use storage to perform CRUD operations on the storage interface
	// e.g. storage.insertUser(user) or storage.getUserByUsername(username)

	const httpServer = createServer(app);

	return httpServer;
}
