import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../Styles/Form.css'; // Import CSS file

const Form = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('');
  const [machines, setMachines] = useState([]);

  const handleHospitalNameChange = (e) => {
    setHospitalName(e.target.value);
  };

  const handleHospitalLocationChange = (e) => {
    setHospitalLocation(e.target.value);
  };

  const handleMachineChange = (index, key, value) => {
    const updatedMachines = [...machines];
    updatedMachines[index][key] = value;
    setMachines(updatedMachines);
  };

  const handleAddMachine = () => {
    setMachines([...machines, { type: '', make: '', model: '', year: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to server
      const response = await axios.post('http://localhost:5000/api/hospitals', {
        name: hospitalName,
        location: hospitalLocation,
        machines: machines
      });

      console.log(response.data); // Log response from server
      // Reset form fields
      setHospitalName('');
      setHospitalLocation('');
      setMachines([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="hospitalName">Hospital Name:</label>
        <input
          type="text"
          id="hospitalName"
          value={hospitalName}
          onChange={handleHospitalNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="hospitalLocation">Hospital Location:</label>
        <input
          type="text"
          id="hospitalLocation"
          value={hospitalLocation}
          onChange={handleHospitalLocationChange}
          required
        />
      </div>
      <div className="machine-section">
        <label>Hospital Machines:</label>
        {machines.map((machine, index) => (
          <div key={index} className="machine">
            <label htmlFor={`type_${index}`}>Machine Type:</label>
            <select
              id={`type_${index}`}
              value={machine.type}
              onChange={(e) => handleMachineChange(index, 'type', e.target.value)}
              required
            >
              <option value="">Select Machine Type</option>
              <option value="ECG Machine">ECG Machine</option>
              <option value="MRI Machine">MRI Machine</option>
              <option value="X-ray Machine">X-ray Machine</option>
              <option value="Ultrasound Machine">Ultrasound Machine</option>
              <option value="CT Scanner">CT Scanner</option>
              <option value="Blood Analyzer">Blood Analyzer</option>
              <option value="Ventilator">Ventilator</option>
              <option value="Defibrillator">Defibrillator</option>
              <option value="Anesthesia Machine">Anesthesia Machine</option>
              {/* Add more options */}
            </select>
            <label htmlFor={`make_${index}`}>Make:</label>
            <input
              type="text"
              id={`make_${index}`}
              value={machine.make}
              onChange={(e) => handleMachineChange(index, 'make', e.target.value)}
              required
            />
            <label htmlFor={`model_${index}`}>Model:</label>
            <input
              type="text"
              id={`model_${index}`}
              value={machine.model}
              onChange={(e) => handleMachineChange(index, 'model', e.target.value)}
              required
            />
            <label htmlFor={`year_${index}`}>Year:</label>
            <input
              type="text"
              id={`year_${index}`}
              value={machine.year}
              onChange={(e) => handleMachineChange(index, 'year', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMachine}>Add Machine</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
