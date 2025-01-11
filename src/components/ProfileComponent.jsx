/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext import

const profileComponentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  .login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

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

  .login-btn,
  .signup-btn {
    width: 100%;
    padding: 10px 20px;
    margin-top: 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-btn {
    background-color: #ffffff;
    border: 1px solid #001f5c;
    color: #001f5c;

    &:hover {
      background-color: #f0f4ff;
    }
  }

  .signup-btn {
    background-color: #001f5c;
    color: white;

    &:hover {
      background-color: #001542;
    }
  }
`;

const ProfileComponent = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // AuthContext에서 로그인 상태 가져오기
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 처리
    alert('로그아웃되었습니다.');
  };

  const handleLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleSignUp = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div css={profileComponentStyle}>
      {isLoggedIn ? (
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
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="로그아웃"
          >
            <FiLogOut />
          </button>
        </div>
      ) : (
        <div className="login-card">
          <h3>커뮤니티 이용을 위한 로그인이 필요합니다!</h3>
          <button className="login-btn" onClick={handleLogin}>
            로그인
          </button>
          <button className="signup-btn" onClick={handleSignUp}>
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
