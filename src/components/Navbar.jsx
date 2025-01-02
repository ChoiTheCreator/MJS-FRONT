import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';
import logo from '../IMG/schoolLogo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고 */}
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="logo-text">MJS</span>
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
