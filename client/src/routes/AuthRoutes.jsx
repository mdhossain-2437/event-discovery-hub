import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ForgetPassword from '../pages/ForgetPassword.jsx';
import NotFound from '../pages/NotFound.jsx';

const AuthRoutes = () => {
  return (

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;

