import React from 'react';
import { FaBullhorn, FaSearch } from 'react-icons/fa';
import ProfileComponent from './ProfileComponent'; // 프로필 컴포넌트 import
import '../styles/HeaderComponent.scss';

const HeaderComponent = () => {
  return (
    <div className="header-container">
      <div className="left-section">
        {/* 강조 알림과 검색창을 함께 */}
        <div className="highlight-and-search">
          <div className="highlight-banner">
            <FaBullhorn className="highlight-icon" />
            <span>최원빈 기말고사때 소울푸드 6일 연속감 ㅋㅋ</span>
          </div>

          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="전체 검색창입니다."
              className="search-input"
            />
            <button className="search-btn">검색</button>
          </div>
        </div>
      </div>

      {/* 프로필 */}
      <div className="profile-wrapper">
        <ProfileComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
