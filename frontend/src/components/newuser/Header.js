import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/features-icon-3.png';


export default function Header({ isHeaderVisible, role }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole === role) {
      setIsLoggedIn(true);
    }
  }, [role]);

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
      <div className="container">
        <button className="logo">
          <img src={logo} width="70" height="70" alt="RMS - Home" />
        </button>

        <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>
          <button className="close-btn" aria-label="Close menu" onClick={closeNav}>
            <IoCloseOutline aria-hidden="true" />
          </button>

          <a href="/" className="logo">
            <img src={logo} width="160" height="50" alt="RMS - Home" />
          </a>

          <ul className="navbar-list">
            {['Home', 'Menus', 'About Us', 'Gallery', 'Event'].map((item, index) => (
              <li key={index} className="navbar-item">
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`navbar-link hover-underline ${item === 'Home' ? 'active' : ''}`}
                  onClick={closeNav} // Close the nav menu when clicking a link
                >
                  <div className="separator"></div>
                  <span className="span">{item}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <p className="headline-1 navbar-title">Visit Us</p>
            <address className="body-4">
              123 Foodie Lane, Colombo 00500,<br />
              Sri Lanka
            </address>
            <p className="body-4 navbar-text">Open: 9:30 am - 2:30 pm</p>
            <a href="mailto:booking@rms.com" className="body-4 sidebar-link">booking@rms.com</a>

            <div className="separator"></div>

            <p className="contact-label">Booking Request</p>
            <a href="tel:+ +94771123456" className="body-1 contact-number hover-underline">
              +94-771-123456
            </a>
          </div>
        </nav>

        <button className="btn btn-secondary" onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}>
          <span className="text text-1">{isLoggedIn ? 'Logout' : 'Login'}</span>
          <span className="text text-2" aria-hidden="true">{isLoggedIn ? 'Logout' : 'Login'}</span>
        </button>

        <button className="nav-open-btn" aria-label="Open menu" onClick={toggleNav}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>

        <div className={`overlay ${isNavOpen ? 'active' : ''}`} onClick={closeNav}></div>
      </div>
    </header>
  );
}
