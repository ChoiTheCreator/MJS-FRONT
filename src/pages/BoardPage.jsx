/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';

const boardPageStyle = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: calc(100vh - 150px); // 화면 높이를 최소 100vh로 설정
  padding: 0;
  margin: 0;
  overflow-y: hidden;
  background-color: #f9f9f9;
`;

const mainSectionStyle = css`
  flex-grow: 1;
  width: 86%;
  max-width: 2000px;
  margin: 20px auto;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
`;

const headingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const headingStyle = css`
  color: #001f5c;
  font-size: 2rem;
`;

const writeButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #001f5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: #003cb3;
  }

  svg {
    font-size: 1.2rem;
  }
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
  const navigate = useNavigate();
  return (
    <div css={boardPageStyle}>
      <div css={mainSectionStyle}>
        <div css={headingContainerStyle}>
          <h2 css={headingStyle}>자유 게시판</h2>
          <Link to="/edit" css={writeButtonStyle}>
            <FaPen />
            글쓰기
          </Link>
        </div>
        <div css={postListStyle}>
          {/* 더미 데이터임 */}
          {[...Array(7)].map((_, index) => (
            <div
              onClick={() => navigate(`/board/${index + 1}`)}
              key={index}
              css={postItemStyle}
            >
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
