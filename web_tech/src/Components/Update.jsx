import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Update.css'; // Ensure you have styles for the form

const Update = () => {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all hospital records
    axios.get('http://localhost:5000/api/hospitals')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Do you confirm you want to delete this hospital?')) {
      axios.delete(`http://localhost:5000/api/hospitals/${id}`)
        .then(response => {
          console.log('Hospital deleted:', response.data);
          setMessage('Hospital deleted successfully');
          setHospitals(hospitals.filter(hospital => hospital._id !== id));
          setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
        })
        .catch(error => console.error('Error deleting hospital:', error));
    }
  };

  return (
    <div className="update-container">
      <h2>Hospital Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Specialties</th>
            <th>Machines</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(hospital => (
            <tr key={hospital._id}>
              <td>{hospital.name}</td>
              <td>{hospital.location}</td>
              <td>{hospital.capacity}</td>
              <td>{hospital.specialties}</td>
              <td>
                <ul>
                  {hospital.machines.map((machine, index) => (
                    <li key={index}>
                      {machine.type} - {machine.make} - {machine.model} - {machine.year}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{hospital.address}</td>
              <td>{hospital.email}</td>
              <td>
                <Link to={`/update/${hospital._id}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(hospital._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Update;
