import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientSignUp.css';

const PatientSignUp = () => {
  const [userData, setUserData] = useState({
    name: '',
    dob: '',
    cnic: '',
    gender: '',
    medicalHistory: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submitting:', userData); // Debugging step

    try {
        const response = await axios.post('http://localhost:5002/signup/patient', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (response.status === 201) {
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        }
    } catch (error) {
        console.error('Sign-up error:', error.response ? error.response.data : error);
        alert('Sign Up Failed: ' + (error.response?.data.message || 'Server error'));
    }
};


  return (
    <div className="signup-container">
      <h1>Patient Sign Up</h1>
      {success ? (
        <div className="success-message">Sign-up successful! Redirecting...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={userData.dob}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cnic"
            placeholder="CNIC"
            value={userData.cnic}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={userData.medicalHistory}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default PatientSignUp;
