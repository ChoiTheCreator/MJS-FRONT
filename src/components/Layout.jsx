/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderComponent from './HeaderComponent';

const Layout = () => {
  return (
    <div css={css`display: flex; flex-direction: column; min-height: 100vh;`}>
      <Navbar />
      <div
        css={css`
          flex: 1; 
          width: 1280px; 
          display: flex;
          flex-direction: column;
          margin: 0 auto; 
          box-sizing: border-box;
        `}
      >
        <HeaderComponent />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
