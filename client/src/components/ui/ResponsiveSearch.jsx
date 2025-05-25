import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiFilter, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useDevice, useIsTouchDevice, useAccessibilityPreferences } from '../../context/DeviceContext';

/**
 * ResponsiveSearch Component
 * A search component that adapts to different device types and capabilities
 */
const ResponsiveSearch = ({
  onSearch,
  onFilterChange,
  placeholder = "Search events...",
  showFilters = true,
  showLocationFilter = true,
  showDateFilter = true,
  className = '',
  autoFocus = false,
}) => {
  const { isMobile, isTablet, isDesktop, width, isLandscape } = useDevice();
  const isTouchDevice = useIsTouchDevice();
  const { shouldReduceMotion } = useAccessibilityPreferences();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    dateRange: '',
    priceRange: '',
  });
  
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus on desktop, but not on mobile to prevent keyboard popup
  useEffect(() => {
    if (autoFocus && isDesktop && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus, isDesktop]);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value, filters);
  }, [onSearch, filters]);

  // Handle filter change
  const handleFilterChange = useCallback((filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
    onSearch?.(searchTerm, newFilters);
  }, [filters, searchTerm, onFilterChange, onSearch]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    onSearch?.('', filters);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [onSearch, filters]);

  // Toggle advanced filters
  const toggleAdvancedFilters = useCallback(() => {
    setShowAdvancedFilters(prev => !prev);
  }, []);

  // Get search container classes
  const getSearchContainerClasses = () => {
    const baseClasses = [
      'relative',
      'w-full',
      className
    ];

    if (isMobile) {
      baseClasses.push('mobile-search-container');
    } else if (isTablet) {
      baseClasses.push('tablet-search-container');
    } else {
      baseClasses.push('desktop-search-container');
    }

    return baseClasses.join(' ');
  };

  // Get search input classes
  const getSearchInputClasses = () => {
    const baseClasses = [
      'w-full',
      'glass-dark',
      'border',
      'border-gray-700',
      'rounded-lg',
      'text-white',
      'placeholder-gray-400',
      'focus:outline-none',
      'focus:border-primary',
      'focus:ring-2',
      'focus:ring-primary/20'
    ];

    // Device-specific sizing
    if (isMobile) {
      baseClasses.push('px-4', 'py-3', 'text-base', 'pl-12', 'pr-12');
    } else if (isTablet) {
      baseClasses.push('px-5', 'py-3', 'text-base', 'pl-12', 'pr-16');
    } else {
      baseClasses.push('px-6', 'py-4', 'text-lg', 'pl-14', 'pr-20');
    }

    // Touch-specific optimizations
    if (isTouchDevice) {
      baseClasses.push('touch-manipulation');
    }

    // Animation classes
    if (!shouldReduceMotion) {
      baseClasses.push('transition-all', 'duration-200');
    }

    return baseClasses.join(' ');
  };

  // Get layout for filters based on device
  const getFiltersLayout = () => {
    if (isMobile) {
      return 'flex flex-col space-y-3';
    } else if (isTablet && !isLandscape) {
      return 'grid grid-cols-2 gap-3';
    } else {
      return 'flex flex-wrap gap-4';
    }
  };

  return (
    <div ref={containerRef} className={getSearchContainerClasses()}>
      {/* Main Search Input */}
      <div className="relative">
        {/* Search Icon */}
        <FiSearch className={`
          absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400
          ${isMobile ? 'w-5 h-5' : isTablet ? 'w-5 h-5' : 'w-6 h-6'}
        `} />
        
        {/* Search Input */}
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className={getSearchInputClasses()}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={clearSearch}
            className={`
              absolute right-4 top-1/2 transform -translate-y-1/2
              text-gray-400 hover:text-white transition-colors duration-200
              ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}
            `}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
        
        {/* Filter Toggle Button */}
        {showFilters && (
          <button
            onClick={toggleAdvancedFilters}
            className={`
              absolute top-1/2 transform -translate-y-1/2
              text-gray-400 hover:text-white transition-colors duration-200
              ${isMobile ? 'right-12 w-5 h-5' : 'right-16 w-6 h-6'}
              ${showAdvancedFilters ? 'text-primary' : ''}
            `}
            aria-label="Toggle filters"
          >
            <FiFilter />
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && showAdvancedFilters && (
        <div className={`
          mt-4 p-4 glass-dark rounded-lg border border-gray-700
          ${!shouldReduceMotion ? 'animate-in slide-in-from-top-2 duration-200' : ''}
        `}>
          <div className={getFiltersLayout()}>
            {/* Location Filter */}
            {showLocationFilter && (
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-dark border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
            )}

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 glass-dark border border-gray-600 rounded-md text-white bg-gray-800 focus:outline-none focus:border-primary"
            >
              <option value="">All Categories</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Art">Art</option>
              <option value="Gaming">Gaming</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
            </select>

            {/* Date Filter */}
            {showDateFilter && (
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-dark border border-gray-600 rounded-md text-white bg-gray-800 focus:outline-none focus:border-primary"
                >
                  <option value="">Any Date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="next-month">Next Month</option>
                </select>
              </div>
            )}

            {/* Price Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-4 py-2 glass-dark border border-gray-600 rounded-md text-white bg-gray-800 focus:outline-none focus:border-primary"
            >
              <option value="">Any Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveSearch;
