import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCode } from "react-icons/fa";

/**
 * Mobile Footer Component
 * A simplified footer designed specifically for mobile devices
 */
const MobileFooter = () => {
  return (
    <footer className="glass-dark border-t border-gray-800 pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Logo & About */}
        <div className="mb-6">
          <Link to="/" className="flex items-center justify-center mb-4">
            <span className="text-xl font-bold font-heading gradient-text">
              <i
                className="f-ticket-alt mr-2 fa fa-ticket-alt"
                style={{ fontStyle: "normal" }}
              ></i>
              Event Explorer
            </span>
          </Link>
          <p className="text-gray-400 mb-4 text-center text-sm">
            Discover and explore the most exciting events happening in your
            city. Connect with like-minded people and create unforgettable
            memories.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="#"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
            >
              <FaFacebookF style={{ fontStyle: "normal" }} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
            >
              <FaTwitter style={{ fontStyle: "normal" }} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
            >
              <FaInstagram style={{ fontStyle: "normal" }} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary/20 transition duration-300"
            >
              <FaLinkedinIn style={{ fontStyle: "normal" }} />
            </a>
          </div>
        </div>

        {/* Quick Links - Two Column Layout */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/all-events"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i
                  className="f-map-marker-alt text-primary mt-1 mr-2 fa fa-map-marker-alt"
                  style={{ fontStyle: "normal" }}
                ></i>
                <span className="text-gray-400">
                  123 Event Street, Dhaka
                </span>
              </li>
              <li className="flex items-center">
                <i
                  className="f-phone-alt text-primary mr-2 fa fa-phone-alt"
                  style={{ fontStyle: "normal" }}
                ></i>
                <span className="text-gray-400">+880 1234 567890</span>
              </li>
              <li className="flex items-center">
                <i
                  className="f-envelope text-primary mr-2 fa fa-envelope"
                  style={{ fontStyle: "normal" }}
                ></i>
                <span className="text-gray-400 text-xs">info@eventexplorer.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-xs mb-2 text-center">
              © {new Date().getFullYear()} Event Explorer. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs flex items-center justify-center">
              <FaCode className="mr-1" style={{ color: 'inherit', fontSize: 'inherit' }} />
              Design and Developed By Delowar Hossain
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;

