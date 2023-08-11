import React, { useState } from 'react';
// import './styles.css';
// import favicon from './favicon.ico'


const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">CodeEstimator</a>
        {/* <img src={favicon} alt="logo" height={100} width={80} /> */}

      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><a href="/index">Home</a></li>
          <li><a href="/">Profile</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="toggle-icon"></span>
        <span className="toggle-icon"></span>
        <span className="toggle-icon"></span>
      </button>
    </nav>
  );
};

export default NavigationBar;
