/**
 * Enhanced Device Detector utility
 * This file provides comprehensive device detection capabilities
 */

// Device breakpoints
export const BREAKPOINTS = {
	mobile: 640, // 0-640px
	tablet: 1024, // 641-1024px
	desktop: Infinity, // 1025px and above
	// Additional breakpoints for more granular control
	xs: 480, // Extra small devices
	sm: 640, // Small devices
	md: 768, // Medium devices
	lg: 1024, // Large devices
	xl: 1280, // Extra large devices
	xxl: 1536, // 2X large devices
};

// Device types
export const DEVICE_TYPES = {
	MOBILE: "mobile",
	TABLET: "tablet",
	DESKTOP: "desktop",
	TV: "tv",
	WATCH: "watch",
};

// Operating systems
export const OS_TYPES = {
	IOS: "ios",
	ANDROID: "android",
	WINDOWS: "windows",
	MACOS: "macos",
	LINUX: "linux",
	UNKNOWN: "unknown",
};

// Browser types
export const BROWSER_TYPES = {
	CHROME: "chrome",
	FIREFOX: "firefox",
	SAFARI: "safari",
	EDGE: "edge",
	OPERA: "opera",
	UNKNOWN: "unknown",
};

// Check if the device is mobile based on screen width
export const isMobile = () => {
	return window.innerWidth <= BREAKPOINTS.mobile;
};

// Check if the device is tablet based on screen width
export const isTablet = () => {
	return (
		window.innerWidth > BREAKPOINTS.mobile &&
		window.innerWidth <= BREAKPOINTS.tablet
	);
};

// Check if the device is desktop based on screen width
export const isDesktop = () => {
	return window.innerWidth > BREAKPOINTS.tablet;
};

// Enhanced touch device detection
export const isTouchDevice = () => {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0 ||
		(window.DocumentTouch && document instanceof window.DocumentTouch)
	);
};

// Detect if device supports hover
export const supportsHover = () => {
	return window.matchMedia("(hover: hover)").matches;
};

// Detect device pixel ratio
export const getDevicePixelRatio = () => {
	return window.devicePixelRatio || 1;
};

// Detect if device is in landscape mode
export const isLandscape = () => {
	return window.innerWidth > window.innerHeight;
};

// Detect if device is in portrait mode
export const isPortrait = () => {
	return window.innerHeight > window.innerWidth;
};

// Get screen orientation
export const getOrientation = () => {
	if (screen.orientation) {
		return screen.orientation.angle;
	}
	return window.orientation || 0;
};

// Detect operating system
export const getOperatingSystem = () => {
	const userAgent = navigator.userAgent.toLowerCase();

	if (/iphone|ipad|ipod/.test(userAgent)) return OS_TYPES.IOS;
	if (/android/.test(userAgent)) return OS_TYPES.ANDROID;
	if (/windows/.test(userAgent)) return OS_TYPES.WINDOWS;
	if (/macintosh|mac os x/.test(userAgent)) return OS_TYPES.MACOS;
	if (/linux/.test(userAgent)) return OS_TYPES.LINUX;

	return OS_TYPES.UNKNOWN;
};

// Detect browser
export const getBrowser = () => {
	const userAgent = navigator.userAgent.toLowerCase();

	if (/chrome/.test(userAgent) && !/edge/.test(userAgent))
		return BROWSER_TYPES.CHROME;
	if (/firefox/.test(userAgent)) return BROWSER_TYPES.FIREFOX;
	if (/safari/.test(userAgent) && !/chrome/.test(userAgent))
		return BROWSER_TYPES.SAFARI;
	if (/edge/.test(userAgent)) return BROWSER_TYPES.EDGE;
	if (/opera/.test(userAgent)) return BROWSER_TYPES.OPERA;

	return BROWSER_TYPES.UNKNOWN;
};

// Enhanced device type detection using user agent
export const getDeviceTypeFromUserAgent = () => {
	const userAgent = navigator.userAgent.toLowerCase();

	// Check for mobile devices
	if (
		/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(
			userAgent
		)
	) {
		return DEVICE_TYPES.MOBILE;
	}

	// Check for tablets
	if (/tablet|ipad|playbook|silk/.test(userAgent)) {
		return DEVICE_TYPES.TABLET;
	}

	// Check for TV devices
	if (/tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast/.test(userAgent)) {
		return DEVICE_TYPES.TV;
	}

	// Check for watch devices
	if (/watch/.test(userAgent)) {
		return DEVICE_TYPES.WATCH;
	}

	return DEVICE_TYPES.DESKTOP;
};

// Get the device type (combining screen size and user agent)
export const getDeviceType = () => {
	const screenBasedType = isMobile()
		? DEVICE_TYPES.MOBILE
		: isTablet()
		? DEVICE_TYPES.TABLET
		: DEVICE_TYPES.DESKTOP;

	return screenBasedType;
};

// Detect network connection type
export const getNetworkConnection = () => {
	if ("connection" in navigator) {
		const connection =
			navigator.connection ||
			navigator.mozConnection ||
			navigator.webkitConnection;
		return {
			effectiveType: connection.effectiveType || "unknown",
			downlink: connection.downlink || 0,
			rtt: connection.rtt || 0,
			saveData: connection.saveData || false,
		};
	}
	return {
		effectiveType: "unknown",
		downlink: 0,
		rtt: 0,
		saveData: false,
	};
};

// Detect device memory (if available)
export const getDeviceMemory = () => {
	return navigator.deviceMemory || "unknown";
};

// Detect if device prefers reduced motion
export const prefersReducedMotion = () => {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Detect if device prefers dark mode
export const prefersDarkMode = () => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// Get comprehensive device information
export const getDeviceInfo = () => {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const deviceType = getDeviceType();
	const os = getOperatingSystem();
	const browser = getBrowser();
	const network = getNetworkConnection();

	// Get current breakpoint name
	let breakpointName = "xs";
	if (screenWidth >= BREAKPOINTS.xxl) breakpointName = "xxl";
	else if (screenWidth >= BREAKPOINTS.xl) breakpointName = "xl";
	else if (screenWidth >= BREAKPOINTS.lg) breakpointName = "lg";
	else if (screenWidth >= BREAKPOINTS.md) breakpointName = "md";
	else if (screenWidth >= BREAKPOINTS.sm) breakpointName = "sm";
	else if (screenWidth >= BREAKPOINTS.xs) breakpointName = "xs";

	return {
		// Basic device info
		deviceType,
		isMobile: deviceType === DEVICE_TYPES.MOBILE,
		isTablet: deviceType === DEVICE_TYPES.TABLET,
		isDesktop: deviceType === DEVICE_TYPES.DESKTOP,
		isTV: deviceType === DEVICE_TYPES.TV,
		isWatch: deviceType === DEVICE_TYPES.WATCH,

		// Screen info
		width: screenWidth,
		height: screenHeight,
		breakpoint: breakpointName,
		pixelRatio: getDevicePixelRatio(),

		// Orientation
		isLandscape: isLandscape(),
		isPortrait: isPortrait(),
		orientation: getOrientation(),

		// Capabilities
		isTouchDevice: isTouchDevice(),
		supportsHover: supportsHover(),

		// System info
		os,
		browser,
		deviceMemory: getDeviceMemory(),

		// Network
		network,

		// Preferences
		prefersReducedMotion: prefersReducedMotion(),
		prefersDarkMode: prefersDarkMode(),

		// Timestamps
		timestamp: Date.now(),
	};
};

// Enhanced screen size tracking with comprehensive device info
export const subscribeToScreenSize = (callback) => {
	const handleResize = () => {
		callback(getDeviceInfo());
	};

	const handleOrientationChange = () => {
		// Small delay to ensure dimensions are updated
		setTimeout(() => {
			callback(getDeviceInfo());
		}, 100);
	};

	// Initial call
	handleResize();

	// Add event listeners
	window.addEventListener("resize", handleResize);
	window.addEventListener("orientationchange", handleOrientationChange);

	// Listen for network changes if supported
	if ("connection" in navigator) {
		const connection =
			navigator.connection ||
			navigator.mozConnection ||
			navigator.webkitConnection;
		if (connection) {
			connection.addEventListener("change", handleResize);
		}
	}

	// Return unsubscribe function
	return () => {
		window.removeEventListener("resize", handleResize);
		window.removeEventListener("orientationchange", handleOrientationChange);

		if ("connection" in navigator) {
			const connection =
				navigator.connection ||
				navigator.mozConnection ||
				navigator.webkitConnection;
			if (connection) {
				connection.removeEventListener("change", handleResize);
			}
		}
	};
};

// Utility function to check if device matches specific criteria
export const matchesDevice = (criteria) => {
	const deviceInfo = getDeviceInfo();

	return Object.keys(criteria).every((key) => {
		const criteriaValue = criteria[key];
		const deviceValue = deviceInfo[key];

		if (Array.isArray(criteriaValue)) {
			return criteriaValue.includes(deviceValue);
		}

		return deviceValue === criteriaValue;
	});
};

// Utility function to get responsive value based on device
export const getResponsiveValue = (values) => {
	const deviceInfo = getDeviceInfo();

	if (deviceInfo.isMobile && values.mobile !== undefined) {
		return values.mobile;
	}

	if (deviceInfo.isTablet && values.tablet !== undefined) {
		return values.tablet;
	}

	if (deviceInfo.isDesktop && values.desktop !== undefined) {
		return values.desktop;
	}

	// Fallback to default or first available value
	return values.default || values.desktop || values.tablet || values.mobile;
};

export default {
	// Basic detection functions
	isMobile,
	isTablet,
	isDesktop,
	isTouchDevice,
	getDeviceType,

	// Enhanced detection functions
	supportsHover,
	getDevicePixelRatio,
	isLandscape,
	isPortrait,
	getOrientation,
	getOperatingSystem,
	getBrowser,
	getNetworkConnection,
	getDeviceMemory,
	prefersReducedMotion,
	prefersDarkMode,

	// Comprehensive functions
	getDeviceInfo,
	subscribeToScreenSize,
	matchesDevice,
	getResponsiveValue,

	// Constants
	BREAKPOINTS,
	DEVICE_TYPES,
	OS_TYPES,
	BROWSER_TYPES,
};
