// Updated App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import LoginPage from './LoginPage';
import DoctorSignUp from './DoctorSignUp';
import PatientSignUp from './PatientSignUp';
import FindDoctor from './FindDoctor'; // Added FindDoctor component
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup/doctor" element={<DoctorSignUp />} />
                    <Route path="/signup/patient" element={<PatientSignUp />} />
                    <Route path="/find-doctor" element={<FindDoctor />} /> {/* New Route */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
