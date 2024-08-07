// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header'; 
import Update from './Components/Update';
import Form from './Components/Form';
import SuperAdminDashboard from './Components/SuperAdminDashboard';
import Updatedata from './Components/Updatedata';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';
import Sidebar from './Components/Sidebar';
import '../src/Styles/Sidebar.css';
import './App.css';
import HospitalDetail from './Components/HospitalDetail';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Header />} />
          <Route path="/hospital/:id" element={<HospitalDetail/>} />
          <Route path="/update" element={<ProtectedRoute><Update /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><Form /></ProtectedRoute>} />
          <Route path="/super" element={<AdminRoute><SuperAdminDashboard /></AdminRoute>} />
          <Route path="/update/:id" element={<ProtectedRoute><Updatedata /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
