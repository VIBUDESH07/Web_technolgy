// src/Components/Header.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import '../Styles/Retrieve.css'; // Import the CSS file for styling
import '../Styles/Header.css'; // Ensure this path is correct

const Header = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(localStorage.getItem('isLoggedIn') === 'true');
    };

    // Listen for the custom authChange event
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Hospital Data Report', 14, 20);
    
    const tableColumn = ["Name", "Location", "Capacity", "Specialties", "Machines"];
    const tableRows = [];

    hospitals.forEach(hospital => {
      const machineList = hospital.machines.map(machine => `${machine.type} - ${machine.make} - ${machine.model} - ${machine.year}`).join(', ');
      const hospitalData = [
        hospital.name,
        hospital.location,
        hospital.capacity,
        hospital.specialties,
        machineList,
      ];
      tableRows.push(hospitalData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('hospital_report.pdf');
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.setItem('isLoggedIn', 'false');
    setIsAuthenticated(false);
    navigate('/');
    // Dispatch a custom event to notify about the logout state change
    window.dispatchEvent(new Event('authChange'));
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <FaHome className="home-icon" />
          </Link>
        </div>
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search by hospital name..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input" 
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-links">
          <button onClick={generatePDF} className="download-button">Download Report</button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="login-button">Logout</button>
          ) : (
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </nav>
      <div className="table-container">
        <h2>Hospital Equipment List</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Specialties</th>
              <th>Machines</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital) => (
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
                <td>
                  <button className="view-button" onClick={() => navigate(`/hospital/${hospital._id}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Header;
