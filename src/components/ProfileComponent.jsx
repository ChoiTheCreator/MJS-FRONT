/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const profileContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  font-family: 'Poppins', 'Arial', sans-serif;
`;

const profileCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 420px;
  text-align: center;
`;

const profileTextStyle = css`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #001f5c;

  a {
    color: #001f5c;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
`;

const buttonStyle = css`
  margin-top: 0.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #001f5c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #001542;
  }

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
`;

//로그인 강제 컴포넌트 스타일 조정
const loginComponentStyle = css`
  ${profileTextStyle};
  margin-top: 20px;
  margin-left: 80px;
`;

const ProfileComponent = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && user?.id) {
        try {
          const response = await axios.get('http://localhost:4000/users');
          const currentUser = response.data.find((u) => u.id === user.id);

          if (currentUser) {
            setUser(currentUser); // 사용자 정보 업데이트
          } else {
            console.error('사용자를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('서버 통신 오류:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, user?.id, setUser]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // 사용자 정보 초기화
    alert('로그아웃되었습니다.');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      //스타일 재활용 한 loginComponentStyle
      <div css={loginComponentStyle}>
        <div css={profileCardStyle}>
          <p css={profileTextStyle}>
            커뮤니티 이용을 위한 로그인이 필요합니다!
          </p>
          <button css={buttonStyle} onClick={() => navigate('/login')}>
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div css={profileContainerStyle}>
      <div css={profileCardStyle}>
        <img
          css={css`
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
          `}
          src={user?.profileImage || 'https://via.placeholder.com/60'}
          alt="Profile"
        />
        <h4
          css={css`
            font-size: 1.2rem;
            font-weight: bold;
            color: #001f5c;
            margin-bottom: 0.3rem;
          `}
        >
          {user?.name || '이름 없음'}
        </h4>
        <p
          css={css`
            font-size: 0.9rem;
            color: #555;
          `}
        >
          {user?.email || '이메일 없음'}
        </p>
        <button css={buttonStyle} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
