import React, { useState } from 'react';
import axios from 'axios';

const SuperAdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // default role is 'admin'

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/superadmin/users', { email, password, role });
      if (response.data._id) {
        alert('User added successfully');
        setEmail('');
        setPassword('');
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">superadmin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default SuperAdminDashboard;
