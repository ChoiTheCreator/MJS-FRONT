/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderComponent from './HeaderComponent';

const layoutContainerStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main-content {
    flex: 1;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
`;

const Layout = () => {
  return (
    <div css={layoutContainerStyle}>
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
