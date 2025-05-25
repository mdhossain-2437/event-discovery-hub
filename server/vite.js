import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteLogger = createLogger();

/**
 * Log a message with timestamp
 * @param {string} message - Message to log
 * @param {string} [source='express'] - Source of the log
 */
export function log(message, source = "express") {
	const formattedTime = new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});

	console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * Set up Vite middleware for development
 * @param {Express} app - Express application
 * @param {Server} server - HTTP server
 */
export async function setupVite(app, server) {
	const serverOptions = {
		middlewareMode: true,
		hmr: { server },
		allowedHosts: true,
	};

	const vite = await createViteServer({
		...viteConfig,
		configFile: false,
		customLogger: viteLogger,
		server: serverOptions,
		appType: "custom",
		root: path.resolve(__dirname, "..", "client"),
	});

	app.use(vite.middlewares);

	app.use("*", async (req, res, next) => {
		const url = req.originalUrl;

		try {
			const clientTemplate = path.resolve(
				__dirname,
				"..",
				"client",
				"index.html"
			);
			let template = await fs.promises.readFile(clientTemplate, "utf-8");
			const page = await vite.transformIndexHtml(url, template);
			res.status(200).set({ "Content-Type": "text/html" }).end(page);
		} catch (e) {
			vite.ssrFixStacktrace(e);
			next(e);
		}
	});
}

/**
 * Serve static files in production
 * @param {Express} app - Express application
 */
export function serveStatic(app) {
	const distPath = path.resolve(__dirname, "..", "dist", "public");

	if (!fs.existsSync(distPath)) {
		throw new Error(
			`Could not find the build directory: ${distPath}, make sure to build the client first`
		);
	}

	app.use(express.static(distPath));

	// fall through to index.html if the file doesn't exist
	app.use("*", (_req, res) => {
		res.sendFile(path.resolve(distPath, "index.html"));
	});
}
