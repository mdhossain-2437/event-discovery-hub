import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	base: "/",
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "shared"),
			"@assets": path.resolve(__dirname, "attached_assets"),
			"@": path.resolve(__dirname, "client/src"),
		},
		extensions: [".js", ".jsx", ".json"],
	},
	root: path.resolve(__dirname, "client"),
	publicDir: path.resolve(__dirname, "client/public"),
	build: {
		outDir: path.resolve(__dirname, "dist/public"),
		emptyOutDir: true,
		copyPublicDir: true,
	},
	esbuild: {
		loader: "jsx",
		include: /src\/.*\.[jt]sx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
});
