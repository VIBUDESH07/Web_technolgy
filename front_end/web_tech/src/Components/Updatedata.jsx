import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Update.css'; // Ensure you have styles for the form

const Updatedata = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    specialties: '',
    machines: [],
    address: '',
    email: ''
  });

  const [newMachine, setNewMachine] = useState({
    type: '',
    make: '',
    model: '',
    year: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospitals/${id}`);
        const { name, location, capacity, specialties, machines, address, email } = response.data;
        setFormData({ name, location, capacity, specialties, machines, address, email });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMachineChange = (e) => {
    const { name, value } = e.target;
    setNewMachine({ ...newMachine, [name]: value });
  };

  const handleAddMachine = () => {
    setFormData({ ...formData, machines: [...formData.machines, newMachine] });
    setNewMachine({ type: '', make: '', model: '', year: '' }); // Clear new machine input fields
  };

  const handleRemoveMachine = (index) => {
    const updatedMachines = formData.machines.filter((_, i) => i !== index);
    setFormData({ ...formData, machines: updatedMachines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/hospitals/${id}`, formData);
      navigate('/'); // Redirect to home or another page after update
    } catch (error) {
      console.error('Error updating hospital:', error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Hospital</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>
          Capacity:
          <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </label>
        <label>
          Specialties:
          <input type="text" name="specialties" value={formData.specialties} onChange={handleChange} required />
        </label>
        <label>
          Machines:
          <ul>
            {formData.machines.map((machine, index) => (
              <li key={index}>
                {machine.type} - {machine.make} - {machine.model} - {machine.year}
                <button type="button" onClick={() => handleRemoveMachine(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <input type="text" name="type" placeholder="Type" value={newMachine.type} onChange={handleMachineChange} required />
            <input type="text" name="make" placeholder="Make" value={newMachine.make} onChange={handleMachineChange} required />
            <input type="text" name="model" placeholder="Model" value={newMachine.model} onChange={handleMachineChange} required />
            <input type="number" name="year" placeholder="Year" value={newMachine.year} onChange={handleMachineChange} required />
            <button type="button" onClick={handleAddMachine}>Add Machine</button>
          </div>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Updatedata;
