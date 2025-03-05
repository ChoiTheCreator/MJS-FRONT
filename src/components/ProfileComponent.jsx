/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

import dummyImg from '../IMG/Myself.jpeg';
import { FaExternalLinkAlt } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import LoadingComponent from './util/LoadingComponent';

const profileContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 700px;
  border-radius: 12px;
  margin-left: 100px;
  padding: 15px;
  background-color: white;
  font-family: 'Poppins', 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const profileTopSectionStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const profileLoginSectionStyle = css`
  ${profileTopSectionStyle}; /* ✅ 기존 스타일을 상속 */
  flex-direction: column;
`;

const profileInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const profileImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const userDetailsStyle = css`
  display: flex;
  flex-direction: column;
`;

const userNameStyle = css`
  font-size: 1rem;
  font-weight: bold;
  color: #000;
`;

const userEmailStyle = css`
  font-size: 0.8rem;
  color: #777;
`;

const iconStyle = css`
  font-size: 1rem;
  color: #555;
  cursor: pointer;
`;

const dividerStyle = css`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
`;

const navigationStyle = css`
  display: flex;
  justify-content: space-around;
  font-size: 0.9rem;
  font-weight: bold;

  span {
    cursor: pointer;
    &:nth-of-type(2) {
      color: #0055ff; /* MYiCap 강조 */
    }
    &:nth-of-type(3) {
      color: #ff6600; /* Office365 강조 */
    }
  }
`;

const loginMessageStyle = css`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const loginButtonStyle = css`
  background-color: #001f5c;
  color: white;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: darkblue;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProfileComponent = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser, uuid, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    //실제 활용하는 로그아웃
    logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log('현재 uuid:', uuid); // uuid 값 확인
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await apiClient.get(`/members/${uuid}`);
          console.log('uuid 데이터는', response.data);

          setUser(response.data.data);
          setLoading(false);
          console.log(user.name);
        } catch (error) {
          console.error('서버 통신 오류:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, user?.id, setUser, uuid]);

  //독립적인 렌더컴포넌트의 위치 스타일이 구린 이슈
  if (loading) {
    return (
      <div style={{ marginLeft: '300px' }}>
        <LoadingComponent message="프로필 정보 로딩중입니다."></LoadingComponent>
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <div css={profileContainerStyle}>
          <div css={profileTopSectionStyle}>
            {/* 프로필 이미지 & 유저 정보 */}
            <div css={profileInfoStyle}>
              <img css={profileImageStyle} src={dummyImg} alt="Profile" />
              <div css={userDetailsStyle}>
                <span css={userNameStyle}>{user?.name || '이름 없음'}</span>
                <span css={userEmailStyle}>{user?.email || '이메일 없음'}</span>
              </div>
            </div>
            {/* 오른쪽 외부 링크 아이콘 */}

            <FaExternalLinkAlt css={iconStyle} onClick={handleLogoutClick} />
          </div>

          {/* 구분선 */}
          <div css={dividerStyle}></div>

          {/* 네비게이션 메뉴 */}
          <div css={navigationStyle}>
            <span>MSI</span>
            <span>MYiCap</span>
            <span>Office365</span>
            <span>MyPage</span>
          </div>
        </div>
      ) : (
        <div css={profileContainerStyle}>
          <div css={profileLoginSectionStyle}>
            <div css={loginMessageStyle}>
              커뮤니티 이용을 위한
              <span style={{ color: ' navy', fontWeight: 'bold' }}>
                {' '}
                로그인{' '}
              </span>
              이 필요합니다!
            </div>
            <button css={loginButtonStyle} onClick={handleLoginClick}>
              {' '}
              로그인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
// 방금 이렇게 local storage에 uuid (사용자 파라미터) 로그인 상태 를 각 로컬 스토리지, 세션 스트로지에 저장하여 리렌더링 시의 상태를 유지하는 과정, 그 상태를 통해 useEffect로 fetching을 하고난 후, Ux 증진을 위해
