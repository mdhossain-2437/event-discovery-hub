/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		// Enhanced responsive breakpoints
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			// Custom breakpoints for specific use cases
			mobile: { max: "640px" },
			tablet: { min: "641px", max: "1024px" },
			desktop: { min: "1025px" },
			touch: { raw: "(hover: none) and (pointer: coarse)" },
			"no-touch": { raw: "(hover: hover) and (pointer: fine)" },
			landscape: { raw: "(orientation: landscape)" },
			portrait: { raw: "(orientation: portrait)" },
			"high-dpi": {
				raw: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
			},
			"reduced-motion": { raw: "(prefers-reduced-motion: reduce)" },
			"dark-mode": { raw: "(prefers-color-scheme: dark)" },
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
			heading: ["Montserrat", "sans-serif"],
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				dark: "#111827",
				"dark-light": "#1F2937",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				// Device-aware animations
				"fade-in": "fadeIn 0.3s ease-in-out",
				"slide-up": "slideUp 0.3s ease-out",
				"scale-in": "scaleIn 0.2s ease-out",
				"bounce-gentle": "bounceGentle 0.6s ease-out",
			},
			// Touch-friendly sizing
			spacing: {
				touch: "44px", // Minimum touch target size
				"touch-lg": "48px", // Large touch target
				"safe-top": "env(safe-area-inset-top)",
				"safe-bottom": "env(safe-area-inset-bottom)",
				"safe-left": "env(safe-area-inset-left)",
				"safe-right": "env(safe-area-inset-right)",
			},
			// Device-specific utilities
			minHeight: {
				touch: "44px",
				"touch-lg": "48px",
				"screen-safe": "100vh",
				"screen-small":
					"calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
			},
			minWidth: {
				touch: "44px",
				"touch-lg": "48px",
			},
			// Enhanced grid templates
			gridTemplateColumns: {
				"auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
				"auto-fill": "repeat(auto-fill, minmax(200px, 1fr))",
				responsive: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		// Custom plugin for device-aware utilities
		function ({ addUtilities, theme, addComponents }) {
			// Touch-friendly utilities
			addUtilities({
				".touch-manipulation": {
					"touch-action": "manipulation",
				},
				".touch-pan-x": {
					"touch-action": "pan-x",
				},
				".touch-pan-y": {
					"touch-action": "pan-y",
				},
				".touch-none": {
					"touch-action": "none",
				},
				// Safe area utilities
				".pt-safe": {
					"padding-top": "env(safe-area-inset-top)",
				},
				".pb-safe": {
					"padding-bottom": "env(safe-area-inset-bottom)",
				},
				".pl-safe": {
					"padding-left": "env(safe-area-inset-left)",
				},
				".pr-safe": {
					"padding-right": "env(safe-area-inset-right)",
				},
				".p-safe": {
					"padding-top": "env(safe-area-inset-top)",
					"padding-bottom": "env(safe-area-inset-bottom)",
					"padding-left": "env(safe-area-inset-left)",
					"padding-right": "env(safe-area-inset-right)",
				},
			});

			// Responsive components
			addComponents({
				".glass": {
					background: "rgba(255, 255, 255, 0.1)",
					"backdrop-filter": "blur(10px)",
					border: "1px solid rgba(255, 255, 255, 0.2)",
				},
				".glass-dark": {
					background: "rgba(31, 41, 55, 0.8)",
					"backdrop-filter": "blur(12px)",
					border: "1px solid rgba(75, 85, 99, 0.3)",
				},
				".card-hover": {
					transition: "all 0.3s ease",
					"&:hover": {
						transform: "translateY(-4px)",
						"box-shadow":
							"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
					},
				},
				".gradient-text": {
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					"background-clip": "text",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
			});
		},
	],
};
