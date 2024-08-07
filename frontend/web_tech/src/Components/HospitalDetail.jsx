// src/Components/HospitalDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/HospitalDetail.css';

const HospitalDetail = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospitals/${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    };

    fetchHospital();
  }, [id]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hospital-detail">
      <h2>{hospital.name}</h2>
      <p><strong>Location:</strong> {hospital.location}</p>
      <p><strong>Capacity:</strong> {hospital.capacity}</p>
      <p><strong>Specialties:</strong> {hospital.specialties}</p>
      <h3>Machines</h3>
      <ul>
        {hospital.machines.map((machine, index) => (
          <li key={index}>
            {machine.type} - {machine.make} - {machine.model} - {machine.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalDetail;
