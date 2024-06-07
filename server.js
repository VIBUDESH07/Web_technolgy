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

    app.post('/api/hospitals', (req, res) => {
      const { name, location, machines } = req.body;
      const newHospital = {
        name,
        location,
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

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
