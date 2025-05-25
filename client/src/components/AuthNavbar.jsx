import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const AuthNavbar = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { currentUser, logout } = auth || {
    currentUser: null,
    logout: () => {
      throw new Error("Auth not initialized");
    },
  };
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check if the current route is active
  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Get user initials for default avatar
  const getUserInitials = () => {
    if (!currentUser || !currentUser.displayName) return "DH";
    
    const nameParts = currentUser.displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return currentUser.displayName.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-[#0e1320] border-b border-gray-800 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L12 14.17l-4.59-4.59L6 11l6 6 6-6-1.41-1.42z" fill="currentColor"/>
          </svg>
          <span className="text-purple-500 font-bold text-xl">Event Explorer</span>
        </Link>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`${isActive("/") ? "text-white border-b-2 border-purple-500" : "text-gray-300 hover:text-white"} transition px-1 py-1`}
          >
            Home
          </Link>
          <Link 
            to="/all-events" 
            className={`${isActive("/all-events") ? "text-white border-b-2 border-purple-500" : "text-gray-300 hover:text-white"} transition px-1 py-1`}
          >
            All Events
          </Link>
          <Link 
            to="/about" 
            className={`${isActive("/about") ? "text-white border-b-2 border-purple-500" : "text-gray-300 hover:text-white"} transition px-1 py-1`}
          >
            About
          </Link>
          <Link 
            to="/blog" 
            className={`${isActive("/blog") ? "text-white border-b-2 border-purple-500" : "text-gray-300 hover:text-white"} transition px-1 py-1`}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className={`${isActive("/contact") ? "text-white border-b-2 border-purple-500" : "text-gray-300 hover:text-white"} transition px-1 py-1`}
          >
            Contact
          </Link>
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              {/* Saved Events Button */}
              <Link to="/saved-events" className="flex items-center text-white hover:text-purple-300 transition mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="font-medium text-sm">Saved Events</span>
              </Link>

              {/* User Profile with Initials */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center"
                  aria-label="User menu"
                >
                  <div className="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center text-white font-medium">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                    <div className="p-3 border-b border-gray-800">
                      <p className="text-sm font-medium text-white truncate">{currentUser.displayName || "User"}</p>
                      <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/saved-events" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Saved Events
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white border-t border-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center text-white hover:text-red-300 transition ml-2"
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="font-medium text-sm">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar; 