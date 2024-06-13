const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb://localhost:27017/hospitalDB'; // Include the database name in the URI

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB Connected');
    const db = client.db('hospitalDB');
    const hospitalsCollection = db.collection('hospitals');
    const usersCollection = db.collection('users'); // Reference to the users collection

    // Endpoint to add a new hospital
    app.post('/api/hospitals', (req, res) => {
      const { name, location, machines, capacity, specialties } = req.body;
      const newHospital = {
        name,
        location,
        capacity,
        specialties,
        machines
      };

      hospitalsCollection.insertOne(newHospital)
        .then(result => {
          res.json({ _id: result.insertedId, ...newHospital });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to add hospital' });
        });
    });

    // Endpoint to retrieve all hospitals
    app.get('/api/hospitals', (req, res) => {
      hospitalsCollection.find().toArray()
        .then(results => {
          res.json(results);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to retrieve hospitals' });
        });
    });

    // Endpoint to handle login
    app.post('/api/login', (req, res) => {
      const { email, password } = req.body;

      usersCollection.findOne({ email, password }) // Simple validation, improve with hashing in production
        .then(user => {
          if (user) {
            res.json({ success: true });
          } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to perform login' });
        });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
