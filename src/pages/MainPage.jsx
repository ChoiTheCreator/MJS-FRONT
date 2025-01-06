/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

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
  gap: 20px; /* 내부 요소 간격 */
`;

const rightSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 내부 요소 간격 */
`;

const contentBoxStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 150px; /* 최소 높이 */
`;

const MainPage = () => {
  return (
    <div css={mainPageContainerStyle}>
      {/* 왼쪽 3개의 박스 */}
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

      {/* 오른쪽 3개의 박스 */}
      <div css={rightSectionStyle}>
        <div css={contentBoxStyle}>
          <h3>프로필 카드</h3>
          <p>프로필 정보</p>
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
