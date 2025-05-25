import { useMemo } from 'react';
import { useDevice, useOrientation, useNetworkInfo, useAccessibilityPreferences } from '../context/DeviceContext';

/**
 * Custom hook for responsive values and utilities
 * Provides easy access to device-specific values and responsive utilities
 */
export const useResponsive = () => {
  const deviceInfo = useDevice();
  const { isLandscape, isPortrait } = useOrientation();
  const { isSlowConnection, shouldSaveData } = useNetworkInfo();
  const { shouldReduceMotion, shouldUseDarkMode } = useAccessibilityPreferences();

  const {
    isMobile,
    isTablet,
    isDesktop,
    width,
    height,
    breakpoint,
    isTouchDevice,
    supportsHover,
    os,
    browser,
  } = deviceInfo;

  // Responsive value selector
  const getValue = useMemo(() => {
    return (values) => {
      // Handle different value formats
      if (typeof values === 'object' && values !== null) {
        // Object format: { mobile: 'value1', tablet: 'value2', desktop: 'value3' }
        if (isMobile && values.mobile !== undefined) return values.mobile;
        if (isTablet && values.tablet !== undefined) return values.tablet;
        if (isDesktop && values.desktop !== undefined) return values.desktop;
        
        // Fallback to default or first available value
        return values.default || values.desktop || values.tablet || values.mobile;
      }
      
      // Array format: [mobile, tablet, desktop]
      if (Array.isArray(values)) {
        if (isMobile) return values[0];
        if (isTablet) return values[1] || values[0];
        if (isDesktop) return values[2] || values[1] || values[0];
      }
      
      // Single value
      return values;
    };
  }, [isMobile, isTablet, isDesktop]);

  // Responsive class selector
  const getClasses = useMemo(() => {
    return (classes) => {
      const classArray = [];
      
      if (typeof classes === 'object' && classes !== null) {
        // Add base classes
        if (classes.base) classArray.push(classes.base);
        
        // Add device-specific classes
        if (isMobile && classes.mobile) classArray.push(classes.mobile);
        if (isTablet && classes.tablet) classArray.push(classes.tablet);
        if (isDesktop && classes.desktop) classArray.push(classes.desktop);
        
        // Add orientation classes
        if (isLandscape && classes.landscape) classArray.push(classes.landscape);
        if (isPortrait && classes.portrait) classArray.push(classes.portrait);
        
        // Add touch classes
        if (isTouchDevice && classes.touch) classArray.push(classes.touch);
        if (supportsHover && classes.hover) classArray.push(classes.hover);
        
        // Add network classes
        if (isSlowConnection && classes.slowConnection) classArray.push(classes.slowConnection);
        if (shouldSaveData && classes.saveData) classArray.push(classes.saveData);
        
        // Add accessibility classes
        if (shouldReduceMotion && classes.reducedMotion) classArray.push(classes.reducedMotion);
        if (!shouldReduceMotion && classes.motion) classArray.push(classes.motion);
        
        // Add OS-specific classes
        if (classes[os]) classArray.push(classes[os]);
        
        // Add browser-specific classes
        if (classes[browser]) classArray.push(classes[browser]);
      } else {
        // Simple string or array of classes
        classArray.push(classes);
      }
      
      return classArray.filter(Boolean).join(' ');
    };
  }, [
    isMobile, isTablet, isDesktop, isLandscape, isPortrait,
    isTouchDevice, supportsHover, isSlowConnection, shouldSaveData,
    shouldReduceMotion, os, browser
  ]);

  // Grid columns calculator
  const getGridCols = useMemo(() => {
    return (cols = { mobile: 1, tablet: 2, desktop: 3 }) => {
      let columns = cols.desktop;
      
      if (isMobile) {
        columns = cols.mobile;
      } else if (isTablet) {
        // Adjust for orientation
        columns = isLandscape ? Math.min(cols.tablet + 1, cols.desktop) : cols.tablet;
      }
      
      return `grid-cols-${columns}`;
    };
  }, [isMobile, isTablet, isLandscape]);

  // Spacing calculator
  const getSpacing = useMemo(() => {
    return (spacing = { mobile: 'gap-4', tablet: 'gap-6', desktop: 'gap-8' }) => {
      // Reduce spacing for slow connections
      if (shouldSaveData || isSlowConnection) {
        return 'gap-2';
      }
      
      return getValue(spacing);
    };
  }, [getValue, shouldSaveData, isSlowConnection]);

  // Padding calculator
  const getPadding = useMemo(() => {
    return (padding = { mobile: 'p-4', tablet: 'p-6', desktop: 'p-8' }) => {
      return getValue(padding);
    };
  }, [getValue]);

  // Font size calculator
  const getFontSize = useMemo(() => {
    return (sizes = { mobile: 'text-sm', tablet: 'text-base', desktop: 'text-lg' }) => {
      return getValue(sizes);
    };
  }, [getValue]);

  // Container width calculator
  const getContainerWidth = useMemo(() => {
    return (widths = { mobile: 'w-full', tablet: 'max-w-4xl', desktop: 'max-w-6xl' }) => {
      return getValue(widths);
    };
  }, [getValue]);

  // Image quality selector based on device capabilities
  const getImageQuality = useMemo(() => {
    return () => {
      if (shouldSaveData || isSlowConnection) return 'low';
      if (deviceInfo.pixelRatio > 2) return 'high';
      if (deviceInfo.pixelRatio > 1) return 'medium';
      return 'standard';
    };
  }, [shouldSaveData, isSlowConnection, deviceInfo.pixelRatio]);

  // Animation preferences
  const shouldAnimate = useMemo(() => {
    return !shouldReduceMotion && !isSlowConnection;
  }, [shouldReduceMotion, isSlowConnection]);

  // Touch target size
  const getTouchTargetSize = useMemo(() => {
    return () => {
      if (isTouchDevice) {
        return isMobile ? 'min-h-[44px] min-w-[44px]' : 'min-h-[48px] min-w-[48px]';
      }
      return 'min-h-[32px] min-w-[32px]';
    };
  }, [isTouchDevice, isMobile]);

  // Layout type selector
  const getLayoutType = useMemo(() => {
    return (layouts = { mobile: 'stack', tablet: 'grid', desktop: 'grid' }) => {
      return getValue(layouts);
    };
  }, [getValue]);

  // Responsive utilities object
  const utils = useMemo(() => ({
    // Device checks
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    supportsHover,
    
    // Orientation
    isLandscape,
    isPortrait,
    
    // Screen info
    width,
    height,
    breakpoint,
    
    // Network
    isSlowConnection,
    shouldSaveData,
    
    // Accessibility
    shouldReduceMotion,
    shouldUseDarkMode,
    shouldAnimate,
    
    // System info
    os,
    browser,
    
    // Responsive functions
    getValue,
    getClasses,
    getGridCols,
    getSpacing,
    getPadding,
    getFontSize,
    getContainerWidth,
    getImageQuality,
    getTouchTargetSize,
    getLayoutType,
    
    // Convenience functions
    isSmallScreen: width <= 640,
    isMediumScreen: width > 640 && width <= 1024,
    isLargeScreen: width > 1024,
    isVeryLargeScreen: width > 1280,
    
    // Orientation helpers
    isSquarish: Math.abs(width - height) < 100,
    isWideScreen: width / height > 1.5,
    isTallScreen: height / width > 1.5,
    
    // Performance helpers
    isLowEndDevice: deviceInfo.deviceMemory && deviceInfo.deviceMemory <= 4,
    isHighEndDevice: deviceInfo.deviceMemory && deviceInfo.deviceMemory >= 8,
    
    // Platform helpers
    isIOS: os === 'ios',
    isAndroid: os === 'android',
    isWindows: os === 'windows',
    isMacOS: os === 'macos',
    
    // Browser helpers
    isChrome: browser === 'chrome',
    isFirefox: browser === 'firefox',
    isSafari: browser === 'safari',
    isEdge: browser === 'edge',
  }), [
    isMobile, isTablet, isDesktop, isTouchDevice, supportsHover,
    isLandscape, isPortrait, width, height, breakpoint,
    isSlowConnection, shouldSaveData, shouldReduceMotion, shouldUseDarkMode,
    shouldAnimate, os, browser, deviceInfo.deviceMemory,
    getValue, getClasses, getGridCols, getSpacing, getPadding,
    getFontSize, getContainerWidth, getImageQuality, getTouchTargetSize, getLayoutType
  ]);

  return utils;
};

export default useResponsive;
