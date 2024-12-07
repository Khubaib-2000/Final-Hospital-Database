import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import { Link } from 'react-router-dom'; // Ensure Link is imported properly
import './Login.css';

const Login = () => {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState(''); // Add userType state
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (!userType) {
      setError('Please select user type (Doctor or Patient)');
      return;
    }
  
    console.log('Login request:', { cnic, password, userType }); // Debugging
  
    try {
      const response = await axios.post('http://localhost:5002/login', { cnic, password, userType });
      console.log('Response:', response.data); // Debugging
  
      if (response.status === 200) {
        const { userType, firstName, userId } = response.data;
  
        localStorage.setItem(
          'user',
          JSON.stringify({ userType, firstName, userId })
        );
  
        setSuccessMessage('Login successful!');
  
        setTimeout(() => {
          if (userType === 'doctor') {
            navigate('/doctor-dashboard'); // Doctor dashboard
          } else if (userType === 'patient') {
            navigate('/patient-dashboard'); // Patient dashboard
          }
        }, 1500);
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      console.error('Login error:', err); // Debugging
      setError(err.response?.data?.message || 'Server error occurred');
    }
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="CNIC"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* User type selection */}
        <div className="user-type-selection">
          <label>
            <input
              type="radio"
              name="userType"
              value="doctor"
              onChange={() => setUserType('doctor')}
              checked={userType === 'doctor'}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="patient"
              onChange={() => setUserType('patient')}
              checked={userType === 'patient'}
            />
            Patient
          </label>
        </div>

        <button type="submit">Login</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
      {error && <p className="error-message">{error}</p>} {/* Error message */}

      {/* Navigation to sign-up pages */}
      <div className="signup-options">
        <p>Not registered yet? Sign up as:</p>
        <div className="signup-buttons">
          <Link to="/signup/doctor" className="signup-link">Doctor</Link>
          <Link to="/signup/patient" className="signup-link">Patient</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
