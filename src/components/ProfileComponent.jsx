import React from 'react';
import '../styles/ProfileComponent.scss';

const ProfileComponent = () => {
  return (
    <div className="profile-component">
      <div className="profile-card">
        <img
          className="profile-image"
          src="https://via.placeholder.com/80"
          alt="Profile"
        />
        <div className="profile-details">
          <h4 className="profile-name">최원빈</h4>
          <p className="profile-email">wonbin109@mju.ac.kr</p>
        </div>
        <button className="profile-edit-btn">프로필 수정</button>
      </div>

      <div className="profile-navbar">
        <ul className="profile-links">
          <li>
            <a href="#MSI" className="profile-link">
              MSI
            </a>
          </li>
          <li>
            <a href="#MyiCap" className="profile-link">
              MYiCap
            </a>
          </li>
          <li>
            <a href="#Office365" className="profile-link">
              Office365
            </a>
          </li>
          <li>
            <a href="#MyPage" className="profile-link">
              MyPage
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
