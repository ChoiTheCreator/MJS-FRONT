/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../IMG/schoolLogo.png';

// 색상 변수
const navbarBgColor = '#002f6c';
const textColor = '#ffffff';
const hoverBgColor = 'rgba(255, 255, 255, 0.2)';
const borderRadius = '5px';

const navbarStyle = css`
  width: 100%;
  background-color: ${navbarBgColor};
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 1000;

  .navbar-container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
    }

    .logo-text {
      color: ${textColor};
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .hamburger-menu {
    display: none;
    font-size: 1.8rem;
    color: ${textColor};
    cursor: pointer;

    @media (max-width: 1024px) {
      display: block;
      margin-left: 20px; /* 햄버거 메뉴와 로고 사이 간격 추가 */
    }
  }

  .menu {
    display: flex;
    list-style: none;
    gap: 20px;

    @media (max-width: 1024px) {
      display: none;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      padding: 10px 0;
      background-color: ${navbarBgColor};
    }

    li {
      a {
        color: ${textColor};
        text-decoration: none;
        font-size: 1rem;
        padding: 8px 16px;
        border-radius: ${borderRadius};
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: ${hoverBgColor};
        }
      }
    }
  }

  .menu-open {
    display: flex !important;
  }

  @media (max-width: 1024px) {
    .logo {
      padding-right: 15px; /* 로고와 햄버거 메뉴 사이의 간격을 넓히기 위한 패딩 */
    }
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav css={navbarStyle}>
      <div className="navbar-container">
        {/* 로고 */}
        <div className="logo">
          <img src={logo} alt="Logo" />
          <Link to={'/main'}>
            <span className="logo-text">MJS</span>
          </Link>
        </div>

        {/* 햄버거 메뉴 */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </div>

        {/* 메뉴 */}
        <ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
          <li>
            <Link to="/info">학과정보</Link>
          </li>
          <li>
            <Link to="/cafeteria">식단</Link>
          </li>
          <li>
            <Link to="/market">벼룩시장</Link>
          </li>
          <li>
            <Link to="/break">제휴</Link>
          </li>
          <li>
            <Link to="/notices">공지사항</Link>
          </li>
          <li>
            <Link to="/board">자유게시판</Link>
          </li>
          <li>
            <Link to="/reviews">취업후기</Link>
          </li>
          <li>
            <Link to="/fun">띵지위키</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
