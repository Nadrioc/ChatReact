import React from 'react';
import logo from '../../assets/images/Logo.svg';
import './Header.css';

export const Header = () => {
  return (
    <div className="flex full-width">
  	   <div className="header-logo-container">
    			<img className="header-logo" alt="Modern Health" src={logo} />
  	   </div>
    </div>
  );
}

