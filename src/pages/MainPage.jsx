/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const mainPageContainerStyle = css`
  width: 100vw;
  padding: 40px 0;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 왼쪽 2/3, 오른쪽 1/3 */
  gap: 20px;
`;

const leftSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const rightSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const contentBoxStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 150px;
`;

const profileCardStyle = (isLoggedIn) => css`
  background-color: ${isLoggedIn ? '#001f5c' : '#ffffff'};
  color: ${isLoggedIn ? '#ffffff' : '#000000'};
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${isLoggedIn
    ? '0 4px 8px rgba(0, 31, 92, 0.2)'
    : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  text-align: center;
`;

const buttonStyle = css`
  padding: 10px 20px;
  background-color: #001f5c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #001542;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // 로그인 상태와 상태 변경 함수

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 시 상태 변경
  };

  return (
    <div css={mainPageContainerStyle}>
      <div css={leftSectionStyle}>
        <div css={contentBoxStyle}>
          <h3>검색 및 배너</h3>
          <p>여기에 검색창과 강조 배너를 추가하세요.</p>
        </div>
        <div css={contentBoxStyle}>
          <h3>학사 공지</h3>
          <p>공지사항 탭 내용을 추가하세요.</p>
        </div>
        <div css={contentBoxStyle}>
          <h3>명지대 뉴스</h3>
          <p>뉴스 섹션 내용을 추가하세요.</p>
        </div>
      </div>

      <div css={rightSectionStyle}>
        {/* **프로필 카드 조건부 렌더링** */}
        <div css={profileCardStyle(isLoggedIn)}>
          {isLoggedIn ? (
            <>
              <h2>환영합니다, 사용자님!</h2>
              <p>프로필 정보를 여기에 표시할 수 있습니다.</p>
              <button css={buttonStyle} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <h3>로그인 필요</h3>
              <p>로그인 후 프로필 정보를 확인할 수 있습니다.</p>
              <button css={buttonStyle} onClick={() => navigate('/login')}>
                로그인하기
              </button>
            </>
          )}
        </div>
        <div css={contentBoxStyle}>
          <h3>날씨 정보</h3>
          <p>날씨 정보를 추가하세요.</p>
        </div>
        <div css={contentBoxStyle}>
          <h3>실시간 검색 순위</h3>
          <p>검색 순위를 표시합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
