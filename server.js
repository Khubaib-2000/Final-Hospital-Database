const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// MySQL database connection setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Greninja@2024', // Add your MySQL password here
  database: 'AlphaHospitalDB', // Update with your actual database name
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release connection back to the pool
});

// Signup Route for Doctor
app.post('/signup/doctor', async (req, res) => {
  const { firstName, lastName, dob, cnic, specialization, gender, isSurgeon, experience, password } = req.body;

  if (!firstName || !lastName || !dob || !cnic || !specialization || !gender || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  const query = 'INSERT INTO Doctors (FirstName, LastName, DOB, CNIC, Specialization, Gender, IsSurgeon, Experience, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, dob, cnic, specialization, gender, isSurgeon, experience, hashedPassword];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Error during doctor sign-up:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
    res.status(201).json({ message: 'Doctor signed up successfully' });
  });
});

// Signup Route for Patient
app.post('/signup/patient', async (req, res) => {
  const { name, dob, cnic, gender, medicalHistory, password } = req.body;

  if (!name || !dob || !cnic || !gender || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  const query = 'INSERT INTO Patients (Name, DOB, CNIC, Gender, MedicalHistory, Password) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, dob, cnic, gender, medicalHistory, hashedPassword];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Error during patient sign-up:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
    res.status(201).json({ message: 'Patient signed up successfully' });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { cnic, password, userType } = req.body;

  if (!cnic || !password || !userType) {
    return res.status(400).json({ message: 'CNIC, Password, and User Type are required' });
  }

  const table = userType === 'doctor' ? 'Doctors' : 'Patients';
  const query = `SELECT * FROM ${table} WHERE CNIC = ?`;

  pool.query(query, [cnic], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.Password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send user data back on successful login
    res.status(200).json({
      message: 'Login successful',
      userType: userType,
      firstName: user.FirstName,
      userId: user.ID, // Assuming you have an ID field
    });
  });
});

// Get Doctors with Search and Filtering
app.get('/api/doctors', (req, res) => {
  const { specialization, name } = req.query;
  let query = 'SELECT * FROM Doctors WHERE 1=1';
  const params = [];

  if (specialization) {
    query += ' AND Specialization LIKE ?';
    params.push(`%${specialization}%`);
  }
  if (name) {
    query += ' AND (FirstName LIKE ? OR LastName LIKE ?)';
    params.push(`%${name}%`, `%${name}%`);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
