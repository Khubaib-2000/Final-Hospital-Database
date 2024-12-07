import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Fetch user data from localStorage on component mount and listen for updates
  useEffect(() => {
    // Function to update state based on the localStorage
    const updateUserFromLocalStorage = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser) {
        setUser(loggedInUser); // Set user data if logged in
      }
    };

    // Initial check when component mounts
    updateUserFromLocalStorage();

    // Listen for changes to localStorage (via custom event)
    window.addEventListener('storage', updateUserFromLocalStorage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', updateUserFromLocalStorage);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle user sign out
  const handleSignOut = () => {
    localStorage.removeItem('user'); // Remove user from local storage
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/find-doctor" className="navbar-link">Find a Doctor</Link></li>
        <li><Link to="#appointments" className="navbar-link">Appointments</Link></li>
        <li><Link to="#contact" className="navbar-link">Contact Us</Link></li>
        <li>
          <form className="search-form">
            <input
              type="text"
              placeholder="Search for doctors, specialties..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </li>
        {/* Conditionally render Login/Sign Up or User Name & Sign Out */}
        {user ? (
          <>
            <li>
              <span className="navbar-link">Hello, {user.firstName}</span>
            </li>
            <li>
              <button onClick={handleSignOut} className="signout-button">Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-signup-button">
              Login/Sign Up
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
