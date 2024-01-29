// LoginLayout.js
import React from 'react';
import Header from './MainTheme/Header';
import test from "../assets/images/sidetest.png"
import { useSiteContext } from '../contexts/SiteProvider';
import './MainLayoutStyle.css'


const MainLayout = ({ children }) => {
  const { user, setUser } = useSiteContext();
  const handleLogout = () => {
    setUser();
  }
  return (
    <div className="container smart-pdf-container">
      <div className="full-main">
        <Header user={user} handleLogout={handleLogout} />      
      </div>
      <main className='smart-mainlayout-middle p-5'>{children}</main>
      <footer className='smart-pdf-footer' >

      </footer>
    </div>
  );
};

export default MainLayout;