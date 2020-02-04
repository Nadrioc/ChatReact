import React from 'react';
import logo from '../../assets/images/Logo.svg'
import './Header.css'

export const Header = () => {
  return (
    <div className="flex header-container">
  	   <div className="logo-container">
    			<img className="logo" alt="Modern Health" src={logo} />
  	   </div>
    </div>
  );
}

