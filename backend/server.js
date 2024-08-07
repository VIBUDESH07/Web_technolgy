const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb+srv://vibudesh:040705@cluster0.oug8gz8.mongodb.net/hospitalDB?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Ensure TLS/SSL is used
  tlsInsecure: false // Prevent insecure connections
});

client.connect()
  .then(client => {
    console.log('MongoDB Connected');
    const db = client.db('hospitalDB');
    const hospitalsCollection = db.collection('hospitals');
    const usersCollection = db.collection('users');

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vibudeshrb.22cse@kongu.edu',
        pass: 'andx xznk qhsn aagi'
      }
    });

    const sendEmailAlert = (machine, hospital) => {
      const mailOptions = {
        from: 'vibudeshrb.22cse@kongu.edu',
        to: hospital.email,
        subject: 'Machine Maintenance Alert',
        text: `The machine ${machine.type} (${machine.make} - ${machine.model} - ${machine.year}) at ${hospital.name} needs maintenance. It has been in use for more than 3 years.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    };

    const checkMachineYears = async () => {
      try {
        console.log('Checking machine years and sending email alerts...');
        const hospitals = await hospitalsCollection.find().toArray();
        const currentYear = new Date().getFullYear();

        hospitals.forEach(hospital => {
          hospital.machines.forEach(machine => {
            if (currentYear - machine.year > 3) {
              sendEmailAlert(machine, hospital);
              console.log('Sending email alert for machine:', machine);
            }
          });
        });
      } catch (error) {
        console.error('Error checking machine years:', error);
      }
    };

    schedule.scheduleJob('*/5 * * * * *', checkMachineYears);

    app.post('/api/hospitals', (req, res) => {
      const { name, location, machines, capacity, specialties, email } = req.body;
      const newHospital = {
        name,
        location,
        capacity,
        specialties,
        machines,
        email
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

    app.put('/api/hospitals/:id', (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;

      hospitalsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })
        .then(result => {
          res.json({ success: true, message: 'Hospital updated successfully' });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to update hospital' });
        });
    });

    app.delete('/api/hospitals/:id', (req, res) => {
      const { id } = req.params;

      hospitalsCollection.deleteOne({ _id: new ObjectId(id) })
        .then(result => {
          if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Hospital deleted successfully' });
          } else {
            res.status(404).json({ success: false, message: 'Hospital not found' });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to delete hospital' });
        });
    });

    app.get('/api/hospitals/:id', (req, res) => {
      const { id } = req.params;

      hospitalsCollection.findOne({ _id: new ObjectId(id) })
        .then(hospital => {
          if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
          }
          res.json(hospital);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch hospital' });
        });
    });

    app.post('/api/superadmin/login', (req, res) => {
      const { email, password } = req.body;

      usersCollection.findOne({ email, password })
        .then(user => {
          if (user && user.role === 'superadmin') {
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

    app.post('/api/superadmin/users', (req, res) => {
      const { email, password, role } = req.body;
      const newUser = { email, password, role };

      usersCollection.insertOne(newUser)
        .then(result => {
          res.json({ _id: result.insertedId, ...newUser });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Failed to add user' });
        });
    });

    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await usersCollection.findOne({ email, password });
        console.log(user);
        if (user) {
          res.json({ success: true, data: user });
        } else {
          res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
      } catch (err) {
        console.error('Error performing login:', err);
        res.status(500).json({ error: 'Failed to perform login' });
      }
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
