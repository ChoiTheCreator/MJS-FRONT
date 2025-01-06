/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../IMG/schoolLogo.png';

// 색상 변수
const navbarBgColor = '#002f6c';
const textColor = '#ffffff';
const hoverColor = 'rgba(255, 255, 255, 0.8)';
const hoverBgColor = 'rgba(255, 255, 255, 0.2)';
const borderRadius = '5px';

// 스타일 정의
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

  .menu {
    display: flex;
    list-style: none;
    gap: 20px;

    li {
      a {
        color: ${textColor};
        text-decoration: none;
        font-size: 1rem;
        padding: 8px 16px;
        border-radius: ${borderRadius};
        transition: all 0.3s ease-in-out;

        &:hover {
          color: ${navbarBgColor};
          background-color: ${hoverBgColor};
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transform: scale(1.05);
        }
      }
    }
  }
`;

const Navbar = () => {
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

        {/* 메뉴 */}
        <ul className="menu">
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
            <Link to="/fun">땡지위키</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
