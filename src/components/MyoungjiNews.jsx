// components/MyongjiNews.jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const newsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
  color: #333;

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #001f5c;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 5px 0;

      a {
        text-decoration: none;
        color: #0055ff;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const MyongjiNews = () => {
  return (
    <div css={newsContainerStyle}>
      <h4>명대 신문</h4>
      <ul>
        <li>
          <a href="#">[공지] 남가좌 12월 27일 공연 소식</a>
        </li>
        <li>
          <a href="#">[공지] 전자신청에 앞서, 전통 춤의 이야기</a>
        </li>
        <li>
          <a href="#">[성공] 데이터 축제 성과 발표</a>
        </li>
      </ul>
    </div>
  );
};

export default MyongjiNews;
