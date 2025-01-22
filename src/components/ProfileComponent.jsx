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
  align-items: center; /* 수직 중앙 정렬 */
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 420px;
`;

const profileImageStyle = css`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem; /* 오른쪽 여백 */
`;

const profileInfoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 내용 수직 중앙 정렬 */
`;

const profileNameStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: #001f5c;
  margin-bottom: 0.3rem;
`;

const profileEmailStyle = css`
  font-size: 0.9rem;
  color: #555;
`;

const logoutButtonStyle = css`
  margin-top: 0.5rem;
  margin-left: 25px;
  padding: 0.5rem 1rem;
  background-color: navy;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #001542;
  }
`;

const ProfileComponent = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();
  const serverUrl = 'http://localhost:4000/users';

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && user?.id) {
        try {
          const response = await axios.get(serverUrl);
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
      <div css={profileContainerStyle}>
        <div css={profileCardStyle}>
          <h3 css={profileNameStyle}>로그인이 필요합니다.</h3>
          <button
            css={logoutButtonStyle}
            style={{ backgroundColor: '#001f5c' }}
            onClick={() => navigate('/login')}
          >
            -> 로그인하러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div css={profileContainerStyle}>
      <div css={profileCardStyle}>
        <img
          css={profileImageStyle}
          src={user?.profileImage || 'https://via.placeholder.com/60'}
          alt="Profile"
        />
        <div css={profileInfoStyle}>
          <h4 css={profileNameStyle}>{user?.name || '이름 없음'}</h4>
          <p css={profileEmailStyle}>{user?.email || '이메일 없음'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
