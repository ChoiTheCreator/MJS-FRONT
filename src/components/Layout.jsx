/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderComponent from './HeaderComponent';

//test 주석 for clone repo
const pageLayout = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const containerLayout = css`
  padding-left: 8%;
  padding-right: 8%;
`;

const Layout = () => {
  return (
    <div css={pageLayout}>
      <Navbar />
      <div css={containerLayout}>
        <HeaderComponent />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
