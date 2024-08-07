// src/App.js
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header'; 
import Update from './Components/Update';
import Form from './Components/Form';
import SuperAdminDashboard from './Components/SuperAdminDashboard';
import Updatedata from './Components/Updatedata';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Header />} />
        <Route path="/update" element={<ProtectedRoute><Update /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><Form /></ProtectedRoute>} />
      
        <Route path="/super" element={<AdminRoute><SuperAdminDashboard /></AdminRoute>} />
        <Route path="/update/:id" element={<ProtectedRoute><Updatedata /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
