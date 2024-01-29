import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import logo from "../../assets/images/image.png"
const Header = ({ user, handleLogout }) => {



  return (
    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="#">
         React Examples
      </a>
      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">       
      </div>
      <div className="navbar-end">      
      </div>
    </div>
  </nav>
  
  );
};

export default Header;

/*
 <a className="navbar-content smart-pdf-site-title">
          Soft Digi Solutions
        </a>
*/