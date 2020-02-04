import React from 'react';
import logo from '../../assets/images/logo.png'
import './Header.css'

export const Header = () => {
  return (
    <div className="flex header-container">
    	<img className="logo" alt="Modern Health Logo" src={logo} />
      <h1>Modern Health</h1>
    </div>
  );
}

