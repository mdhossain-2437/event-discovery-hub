import React, { createContext, useState, useEffect, useContext } from "react";
import {
	subscribeToScreenSize,
	getDeviceInfo,
	BREAKPOINTS,
	DEVICE_TYPES,
} from "../utils/DeviceDetector";

// Create the context
export const DeviceContext = createContext(null);

// Create a provider component
export const DeviceProvider = ({ children }) => {
	// Get initial device info using the enhanced detector
	const getInitialDeviceInfo = () => {
		if (typeof window !== "undefined") {
			return getDeviceInfo();
		}

		// Fallback for SSR
		return {
			deviceType: DEVICE_TYPES.DESKTOP,
			isMobile: false,
			isTablet: false,
			isDesktop: true,
			isTV: false,
			isWatch: false,
			width: 1200,
			height: 800,
			breakpoint: "lg",
			pixelRatio: 1,
			isLandscape: true,
			isPortrait: false,
			orientation: 0,
			isTouchDevice: false,
			supportsHover: true,
			os: "unknown",
			browser: "unknown",
			deviceMemory: "unknown",
			network: {
				effectiveType: "unknown",
				downlink: 0,
				rtt: 0,
				saveData: false,
			},
			prefersReducedMotion: false,
			prefersDarkMode: false,
			timestamp: Date.now(),
		};
	};

	const [deviceInfo, setDeviceInfo] = useState(getInitialDeviceInfo());

	useEffect(() => {
		// Subscribe to device info changes
		const unsubscribe = subscribeToScreenSize((info) => {
			setDeviceInfo(info);
		});

		// Clean up subscription
		return () => {
			unsubscribe();
		};
	}, []);

	// Enhanced device context value with utility methods
	const contextValue = {
		...deviceInfo,

		// Utility methods for easier usage
		isSmallScreen: deviceInfo.width <= BREAKPOINTS.sm,
		isMediumScreen:
			deviceInfo.width > BREAKPOINTS.sm && deviceInfo.width <= BREAKPOINTS.lg,
		isLargeScreen: deviceInfo.width > BREAKPOINTS.lg,

		// Device-specific checks
		isIOS: deviceInfo.os === "ios",
		isAndroid: deviceInfo.os === "android",
		isWindows: deviceInfo.os === "windows",
		isMacOS: deviceInfo.os === "macos",

		// Browser-specific checks
		isChrome: deviceInfo.browser === "chrome",
		isFirefox: deviceInfo.browser === "firefox",
		isSafari: deviceInfo.browser === "safari",
		isEdge: deviceInfo.browser === "edge",

		// Network-aware checks
		isSlowConnection:
			deviceInfo.network.effectiveType === "slow-2g" ||
			deviceInfo.network.effectiveType === "2g",
		isFastConnection: deviceInfo.network.effectiveType === "4g",
		shouldSaveData: deviceInfo.network.saveData,

		// Accessibility checks
		shouldReduceMotion: deviceInfo.prefersReducedMotion,
		shouldUseDarkMode: deviceInfo.prefersDarkMode,

		// Performance checks
		isHighDPI: deviceInfo.pixelRatio > 1,
		isLowMemoryDevice:
			typeof deviceInfo.deviceMemory === "number" &&
			deviceInfo.deviceMemory <= 4,
	};

	return (
		<DeviceContext.Provider value={contextValue}>
			{children}
		</DeviceContext.Provider>
	);
};

// Create a custom hook to use the device context
export const useDevice = () => {
	const context = useContext(DeviceContext);
	if (context === null) {
		throw new Error("useDevice must be used within a DeviceProvider");
	}
	return context;
};

// Custom hooks for specific device checks
export const useIsMobile = () => {
	const { isMobile } = useDevice();
	return isMobile;
};

export const useIsTablet = () => {
	const { isTablet } = useDevice();
	return isTablet;
};

export const useIsDesktop = () => {
	const { isDesktop } = useDevice();
	return isDesktop;
};

export const useIsTouchDevice = () => {
	const { isTouchDevice } = useDevice();
	return isTouchDevice;
};

export const useBreakpoint = () => {
	const { breakpoint } = useDevice();
	return breakpoint;
};

export const useOrientation = () => {
	const { isLandscape, isPortrait, orientation } = useDevice();
	return { isLandscape, isPortrait, orientation };
};

export const useNetworkInfo = () => {
	const { network, isSlowConnection, isFastConnection, shouldSaveData } =
		useDevice();
	return { network, isSlowConnection, isFastConnection, shouldSaveData };
};

export const useAccessibilityPreferences = () => {
	const { shouldReduceMotion, shouldUseDarkMode } = useDevice();
	return { shouldReduceMotion, shouldUseDarkMode };
};

export const useDeviceCapabilities = () => {
	const {
		supportsHover,
		isHighDPI,
		isLowMemoryDevice,
		deviceMemory,
		pixelRatio,
	} = useDevice();
	return {
		supportsHover,
		isHighDPI,
		isLowMemoryDevice,
		deviceMemory,
		pixelRatio,
	};
};

export default DeviceProvider;
