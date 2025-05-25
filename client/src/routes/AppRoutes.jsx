import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import AllEvents from '../pages/AllEvents.jsx';
import EventDetails from '../pages/EventDetails.jsx';
import Profile from '../pages/Profile.jsx';
import ExtraPage from '../pages/ExtraPage.jsx';
import SavedEvents from '../pages/SavedEvents.jsx';
import Blog from '../pages/Blog.jsx';
import Contact from '../pages/Contact.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const AppRoutes = () => {
  const auth = useContext(AuthContext);
  const { loading } = auth || { loading: true };

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    
      <Route path="/" element={<Home />} />
      <Route path="/all-events" element={<AllEvents />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/not-found" element={<NotFound />} />
      
      {/* Protected Routes */}
      <Route path="/event/:id" element={
        
          <EventDetails />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/about" element={
        
          <ExtraPage />
        </PrivateRoute>
      } />
      <Route path="/saved-events" element={
        
          <SavedEvents />
        </PrivateRoute>
      } />
      <Route path="/blog" element={<Blog />} />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

