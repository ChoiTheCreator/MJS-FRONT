/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const profileComponentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .profile-card {
    display: flex;
    align-items: center;
    gap: 15px;

    .profile-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-details {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .profile-name {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 5px;
        color: #001f5c;
      }

      .profile-email {
        font-size: 0.85rem;
        color: #777;
      }
    }

    .profile-edit-btn {
      margin-left: auto;
      background-color: #001f5c;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;

      &:hover {
        background-color: #003cb3;
      }
    }
  }

  .profile-navbar {
    border-top: 1px solid #ddd;
    padding-top: 10px;

    .profile-links {
      display: flex;
      justify-content: space-around;
      list-style: none;
      padding: 0;
      margin: 0;

      .profile-link {
        font-size: 0.9rem;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 600;
        color: #001f5c;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #f0f4ff;
        }

        &:active {
          color: #003cb3;
        }
      }
    }
  }
`;

const ProfileComponent = () => {
  return (
    <div css={profileComponentStyle}>
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
