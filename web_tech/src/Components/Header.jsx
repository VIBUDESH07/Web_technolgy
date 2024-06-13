import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import '../Styles/Retrieve.css'; // Import the CSS file for styling
import '../Styles/Header.css'; // Ensure this path is correct

const Header = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <FaHome />
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
          <Link to="/search">
            <FaSearch className="search-icon" />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </nav>
      <div className="table-container">
        <h2>Hospital Data</h2>
        <button onClick={generatePDF} className="download-button">Download Report</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Specialties</th>
              <th>Machines</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Header;
