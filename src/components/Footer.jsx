/*eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import logo from '../IMG/schoolLogo.png';

const footerStyle = css`
  width: 100vw;
  background-color: #002f6c;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const footerContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const footerLogoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 40px;
    height: 40px;
  }

  .footer-logo-text {
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const footerLinksStyle = css`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;

    li {
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #99ccff;
        text-decoration: underline;
      }
    }
  }
`;

const footerCopyrightStyle = css`
  p {
    color: #d1d1d1;
    font-size: 0.75rem;
    text-align: right;
  }
`;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <div css={footerContainerStyle}>
        <div css={footerLogoStyle}>
          <img src={logo} alt="Logo" />
          <span className="footer-logo-text">MJS NOVA</span>
        </div>
        <div css={footerLinksStyle}>
          <ul>
            <li>이용 약관</li>
            <li>개인정보 처리방침</li>
            <li>문의하기</li>
          </ul>
        </div>
        <div css={footerCopyrightStyle}>
          <p>© 2025 MJS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
