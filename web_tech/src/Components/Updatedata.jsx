import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Updatedata = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    specialties: '',
    machines: '',
    address: '',
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospitals/${id}`);
        const { name, location, capacity, specialties, machines, address, email } = response.data;
        setFormData({ name, location, capacity, specialties, machines: machines.join(', '), address, email });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <h2>Update Hospital</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
        </label>
        <label>
          Capacity:
          <input type="number" name="capacity" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />
        </label>
        <label>
          Specialties:
          <input type="text" name="specialties" value={formData.specialties} onChange={(e) => setFormData({ ...formData, specialties: e.target.value })} required />
        </label>
        <label>
          Machines (comma-separated):
          <input type="text" name="machines" value={formData.machines} onChange={(e) => setFormData({ ...formData, machines: e.target.value })} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Updatedata;
