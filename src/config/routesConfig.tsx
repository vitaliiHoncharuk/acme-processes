import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../Pages/ProtectedRoute/ProtectedRoute';
import Editor from '../Pages/Editor/Editor';
import NotFound from '../Pages/NotFound/NotFound';
import Login from '../Pages/Login/Login';

const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/editor"
      element={
        <ProtectedRoute>
          <Editor />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesConfig;
