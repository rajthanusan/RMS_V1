import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from './assets/images/features-icon-3.png';

export default function Header({ isHeaderVisible, role }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   
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


  return (
    <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
      <div className="container">
        <button className="logo">
          <img src={logo} width="70" height="70" alt="RMS - Home" />
        </button>

        <nav className="navbar" data-navbar>
          <button className="close-btn" aria-label="Close menu" data-nav-toggler>
            <IoCloseOutline aria-hidden="true" />
          </button>

          <a href="/" className="logo">
            <img src="./assets/images/logo.svg" width="160" height="50" alt="RMS - Home" />
          </a>

         </nav>
      </div>
    </header>
  );
}
