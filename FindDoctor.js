import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FindDoctor.css';

const FindDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5002/doctors');
                setDoctors(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };
        fetchDoctors();
    }, []);
    return (
        <div className="find-doctor-container">
            <h1>Find a Doctor</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="doctor-grid">
                    {doctors.map((doctor) => (
                        <div className="doctor-card" key={doctor.DoctorID}>
                            <h2>{doctor.FirstName} {doctor.LastName}</h2>
                            <p>Specialization: {doctor.Specialization}</p>
                            <p>Experience: {doctor.Experience} years</p>
                            <p>Education: {doctor.Education}</p>
                            <p>Satisfied Patients: {doctor.SatisfiedPatients}%</p>
                            <p>Fee: {doctor.Fee}</p>
                            <p>Availability: {doctor.Availability}</p>
                            <button>Book Appointment</button>
                            <button>Patient Feedback</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindDoctor;