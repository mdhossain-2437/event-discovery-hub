import React from 'react';
import { useDevice, useOrientation, useNetworkInfo, useAccessibilityPreferences } from '../../context/DeviceContext';

/**
 * ResponsiveContainer Component
 * A smart container that adapts its layout and behavior based on device capabilities
 */
const ResponsiveContainer = ({ 
  children, 
  className = '', 
  mobileLayout = 'stack',
  tabletLayout = 'grid',
  desktopLayout = 'grid',
  gridCols = { mobile: 1, tablet: 2, desktop: 3 },
  spacing = { mobile: 'gap-4', tablet: 'gap-6', desktop: 'gap-8' },
  padding = { mobile: 'p-4', tablet: 'p-6', desktop: 'p-8' },
  maxWidth = 'max-w-7xl',
  centerContent = true,
  adaptToNetwork = true,
  adaptToMotion = true,
  ...props 
}) => {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    width, 
    height, 
    breakpoint,
    isLandscape,
    isPortrait 
  } = useDevice();
  
  const { isSlowConnection, shouldSaveData } = useNetworkInfo();
  const { shouldReduceMotion } = useAccessibilityPreferences();

  // Determine layout type based on device
  const getLayoutType = () => {
    if (isMobile) return mobileLayout;
    if (isTablet) return tabletLayout;
    return desktopLayout;
  };

  // Get grid columns based on device and orientation
  const getGridColumns = () => {
    const layoutType = getLayoutType();
    if (layoutType !== 'grid') return '';

    let cols = gridCols.desktop;
    if (isMobile) cols = gridCols.mobile;
    else if (isTablet) {
      cols = isLandscape ? Math.min(gridCols.tablet + 1, gridCols.desktop) : gridCols.tablet;
    }

    return `grid-cols-${cols}`;
  };

  // Get spacing based on device and network
  const getSpacing = () => {
    if (shouldSaveData && adaptToNetwork) {
      return 'gap-2'; // Reduced spacing for data saving
    }

    if (isMobile) return spacing.mobile;
    if (isTablet) return spacing.tablet;
    return spacing.desktop;
  };

  // Get padding based on device
  const getPadding = () => {
    if (isMobile) return padding.mobile;
    if (isTablet) return padding.tablet;
    return padding.desktop;
  };

  // Get layout classes
  const getLayoutClasses = () => {
    const layoutType = getLayoutType();
    const baseClasses = [];

    switch (layoutType) {
      case 'grid':
        baseClasses.push('grid', getGridColumns(), getSpacing());
        break;
      case 'flex':
        baseClasses.push('flex', 'flex-wrap', getSpacing());
        break;
      case 'stack':
        baseClasses.push('flex', 'flex-col', getSpacing());
        break;
      case 'masonry':
        baseClasses.push('columns-1', isMobile ? '' : isTablet ? 'md:columns-2' : 'lg:columns-3', getSpacing());
        break;
      default:
        baseClasses.push('block');
    }

    return baseClasses.join(' ');
  };

  // Get container classes
  const getContainerClasses = () => {
    const classes = [
      'w-full',
      maxWidth,
      centerContent ? 'mx-auto' : '',
      getPadding(),
      className
    ];

    // Add motion classes if not reduced
    if (!shouldReduceMotion && adaptToMotion) {
      classes.push('transition-all duration-300 ease-in-out');
    }

    // Add touch-friendly classes for touch devices
    if (isMobile || isTablet) {
      classes.push('touch-friendly');
    }

    return classes.filter(Boolean).join(' ');
  };

  // Get content wrapper classes
  const getContentClasses = () => {
    const classes = [getLayoutClasses()];

    // Add orientation-specific classes
    if (isTablet) {
      classes.push(isLandscape ? 'tablet-landscape' : 'tablet-portrait');
    }

    // Add network-aware classes
    if (isSlowConnection && adaptToNetwork) {
      classes.push('low-bandwidth');
    }

    return classes.join(' ');
  };

  return (
    <div className={getContainerClasses()} {...props}>
      <div className={getContentClasses()}>
        {children}
      </div>
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50 max-w-xs">
          <div>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</div>
          <div>Layout: {getLayoutType()}</div>
          <div>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</div>
          <div>Breakpoint: {breakpoint}</div>
          <div>Grid Cols: {getGridColumns()}</div>
          {isSlowConnection && <div className="text-yellow-400">Slow Connection</div>}
          {shouldReduceMotion && <div className="text-blue-400">Reduced Motion</div>}
        </div>
      )}
    </div>
  );
};

export default ResponsiveContainer;
