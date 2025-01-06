/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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

    .logout-btn {
      margin-left: auto;
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: #001f5c;
      font-size: 1.5rem;

      &:hover {
        color: #ff4d4d;
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
  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = () => {
    // auth 로직: 로그아웃 처리 (로컬 스토리지 제거 등)
    localStorage.removeItem('userToken');
    alert('로그아웃되었습니다.');
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div css={profileComponentStyle}>
      <div className="profile-card">
        <img
          className="profile-image"
          src="https://via.placeholder.com/80"
          alt="Profile"
        />
        <div className="profile-details">
          <h4 className="profile-name">남보라</h4>
          <p className="profile-email">skaqhfk00@mju.ac.kr</p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="로그아웃">
          <FiLogOut />
        </button>
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
