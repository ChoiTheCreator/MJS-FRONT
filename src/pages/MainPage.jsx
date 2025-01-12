/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TabComponent from '../components/TabComponent';
import WeatherComponent from '../components/WeatherComponent';
import RankingComponent from '../components/RankingComponent';

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
        {/* 학사 공지에 TabComponent 삽입 */}
        <div css={contentBoxStyle}>
          <h3>학사 공지</h3>
          <TabComponent />
        </div>
        <div css={contentBoxStyle}>
          <h3>명지대 뉴스</h3>
          <p>뉴스 섹션 내용을 추가하세요.</p>
        </div>
      </div>

      {/* 오른쪽 섹션 */}
      <div css={rightSectionStyle}>
        {/* **프로필 카드 조건부 렌더링** */}

        {/* 오른쪽 섹션 */}
        <div css={rightSectionStyle}>
          <div css={contentBoxStyle}>
            <WeatherComponent /> {/* 현재 날씨 컴포넌트 */}
          </div>

          <div css={contentBoxStyle}>
            <RankingComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
