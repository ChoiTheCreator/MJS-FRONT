// components/MyongjiNews.jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { use, useEffect } from 'react';
import { useState } from 'react';
import LoadingComponent from './util/LoadingComponent';
import apiClient from '../api/apiClient';

const newsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
`;

const newsCardStyle = css`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const newsImageStyle = css`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 15px;
`;

const newsContentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const newsTitleStyle = css`
  font-size: 1.1rem;
  font-weight: bold;
  color: #001f5c;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const newsSummaryStyle = css`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const newsMetaStyle = css`
  font-size: 0.8rem;
  color: #777;
`;

const categoryTagStyle = css`
  background: navy;
  color: white;
  padding: 3px 8px;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 12px;
  align-self: flex-start;
`;

const MyongjiNews = () => {
  const [newsData, setNewsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Request Parameter 필요 (매개변수 이름 category)
    const fetchNewsInfo = async (category) => {
      try {
        const response = await apiClient.get('/news', {
          params: { category: category },
        });
        setNewsInfo(response.data);
        setLoading(false);
        return response.data;
      } catch (error) {
        console.log('명대신문 데이터 서버 오류', error);
      }
    };
    //REPORT
    fetchNewsInfo('REPORT');
  }, []);

  if (loading) {
    return (
      <LoadingComponent message="명대신문 컨텐츠를 불러오고 있습니다."></LoadingComponent>
    );
  }
  return (
    <div css={newsContainerStyle}>
      <h2>📢 최신 뉴스</h2>
      {loading ? (
        <LoadingComponent message="뉴스 데이터를 불러오는 중..." />
      ) : newsData.length > 0 ? (
        newsData.map((news, index) => (
          <div key={index} css={newsCardStyle}>
            <img src={news.imageUrl} alt="뉴스 썸네일" css={newsImageStyle} />
            <div css={newsContentStyle}>
              <span css={categoryTagStyle}>{news.category}</span>
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                css={newsTitleStyle}
              >
                {news.title}
              </a>
              <p css={newsSummaryStyle}>{news.summary}</p>
              <span css={newsMetaStyle}>
                🗓 {news.date} | 📰 {news.reporter}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>📭 표시할 뉴스가 없습니다.</p>
      )}
    </div>
  );
};

export default MyongjiNews;
