// NavigationBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../logo/logo.jpg';

const NavigationBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
        onSearch(searchTerm);
        setSearchTerm('');
    };
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <div className="circle">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </div>
                </Link>

                <span className="site-name">BEYOND THE WORDS</span>

            </div>
            <div className="site-info">
                <span className="golden-text">
                    "Signs That Connect, Conversations That Matter! "
                </span>
            </div>
            <div className="active-webcam-button">
                <Link to="/webcam">Webcam</Link>
            </div>
            <div className="search-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
                    />
                    <button type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
