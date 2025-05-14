import React from 'react';
import { Link } from 'react-router-dom';
import "./Profile";
import './Navbar.css';
import { FaHome, FaPlus, FaUser, FaUserEdit } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="custom-navbar">
            <div className="navbar-left">
                <span className="logo">🎬 Short</span>
            </div>
            <div className="navbar-right">
                <a href="/" className="nav-item">
                    <FaHome />
                    <span>Home</span>
                </a>
                <a href="/Upload" className="nav-item">
                    <FaPlus />
                    <span>Upload</span>
                </a>
                <a href="/Profile" className="nav-item">
                    <FaUser />
                    <span>Profile</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
