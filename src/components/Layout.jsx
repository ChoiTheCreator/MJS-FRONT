import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderComponent from './HeaderComponent';
import '../styles/Layout.scss';

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <HeaderComponent />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
