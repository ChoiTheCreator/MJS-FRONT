/*eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const boardPageStyle = css`
  width: 100vw;
  height: calc(100vh - 150px);
  padding: 0;
  margin: 0;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const mainSectionStyle = css`
  width: 86%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const headingStyle = css`
  color: #001f5c;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
`;

const postListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const postItemStyle = css`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #f9f9f9;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 10px;
    font-size: 1.5rem;
    color: #001f5c;
  }

  p {
    margin-bottom: 10px;
    color: #333;
    font-size: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    font-size: 0.9rem;
    color: #777;

    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

const BoardPage = () => {
  return (
    <div css={boardPageStyle}>
      <div css={mainSectionStyle}>
        <h2 css={headingStyle}>자유 게시판</h2>
        <div css={postListStyle}>
          {[...Array(7)].map((_, index) => (
            <div key={index} css={postItemStyle}>
              <h3>자전거 타고 꿈 가는 방법 알려준다 ㅋㅋ</h3>
              <p>
                미리보기가 들어갑니다. 미리보기가 들어갑니다. 미리보기가
                들어갑니다.
              </p>
              <div className="post-info">
                <span>♥ 5</span>
                <span>💬 15</span>
                <span>👁 234</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
