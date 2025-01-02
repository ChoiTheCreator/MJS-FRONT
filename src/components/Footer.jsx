import React from 'react';
import '../styles/Footer.scss';

import logo from '../IMG/schoolLogo.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <span className="footer-logo-text">MJS NOVA</span>
        </div>
        <div className="footer-links">
          <ul>
            <li>이용 약관</li>
            <li>개인정보 처리방침</li>
            <li>문의하기</li>
          </ul>
        </div>
        <div className="footer-copyright">
          <p>© 2025 MJS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
