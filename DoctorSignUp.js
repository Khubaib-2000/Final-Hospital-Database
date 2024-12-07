import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorSignUp.css';

const DoctorSignUp = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        cnic: '',
        specialization: '',
        gender: '',
        surgeon: false,
        yearsOfExperience: '',
        education: '',
        fee: '',
        availability: '',
        satisfiedPatients: '',
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
        console.log('Form data before submitting:', userData); // Add this for debugging
        
        try {
            const response = await axios.post('http://localhost:5002/signup/doctor', userData);
            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => navigate('/find-doctor'), 3000); // Redirect to "Find a Doctor"
            }
        } catch (error) {
            console.error('Sign-up error:', error.response ? error.response.data : error);
            alert('Sign Up Failed: ' + (error.response?.data.message || 'Server error'));
        }
    };

    return (
        <div className="signup-container">
            <h1>Doctor Sign Up</h1>
            {success ? (
                <div className="success-message">Sign-up successful! Redirecting...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={userData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleChange} required />
                    <input type="date" name="dob" placeholder="Date of Birth" value={userData.dob} onChange={handleChange} required />
                    <input type="text" name="cnic" placeholder="CNIC" value={userData.cnic} onChange={handleChange} required />
                    <input type="text" name="specialization" placeholder="Specialization" value={userData.specialization} onChange={handleChange} required />
                    <select name="gender" value={userData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="checkbox" name="surgeon" checked={userData.surgeon} onChange={(e) => setUserData({ ...userData, surgeon: e.target.checked })} />
                    <label>Surgeon</label>
                    <input type="number" name="yearsOfExperience" placeholder="Years of Experience" value={userData.yearsOfExperience} onChange={handleChange} required />
                    <input type="text" name="education" placeholder="Education" value={userData.education} onChange={handleChange} required />
                    <input type="number" name="fee" placeholder="Fee" value={userData.fee} onChange={handleChange} required />
                    <textarea name="availability" placeholder="Availability" value={userData.availability} onChange={handleChange} required />
                    <input type="number" name="satisfiedPatients" placeholder="Patient Satisfaction (%)" value={userData.satisfiedPatients} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default DoctorSignUp;

