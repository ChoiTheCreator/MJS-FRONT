/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getNews } from '../../api/newsApi';
import LoadingComponent from '../../components/util/LoadingComponent';

const newsDetailContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
`;
const tabsContainerStyle = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 2px solid #ddd;
  align-items: flex-start;
`;

const tabStyle = (isActive) => css`
  display: flex;
  flex-direction: row;
  text-align: center;
  color: gray;
  padding: 20px;
  cursor: pointer;
  border-bottom: ${isActive ? '3px solid navy' : '3px solid transparent'};
  &:hover {
    background-color: #eef1ff;
  }
`;
const newsImageStyle = css`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
`;
const newsCardStyle = css`
  display: flex;
  flex-direction: row;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;
const newsContentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const newsTitleStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: #001f5c;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const newsSummaryStyle = css`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const newsLinkStyle = css`
  text-decoration: none;
`;

const NewsPage = () => {
  const [newsData, setNewsData] = useState({ REPORT: [], SOCIETY: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('REPORT');

  useEffect(() => {
    const fetchNews = async (category) => {
      try {
        const response = await getNews(category);
        setNewsData((prev) => ({
          ...prev,
          [category]: response.data.content,
        }));
        setLoading(false);
      } catch (error) {
        console.log('news 상세 페이지 fetching 실패');
      }
    };
    fetchNews('REPORT');
    fetchNews('SOCIETY');
  }, []);

  const activeNews = newsData[activeTab] || [];
  const slicedNews = activeNews.slice(0, 9);

  if (loading) {
    return <LoadingComponent message="명대신문 다운 받는중입니다." />;
  }

  return (
    <div css={newsDetailContainerStyle}>
      <h1 style={{ color: 'navy' }}>명대신문</h1>
      <div css={tabsContainerStyle}>
        <div
          css={tabStyle(activeTab === 'REPORT')}
          onClick={() => setActiveTab('REPORT')}
        >
          보도자료
        </div>
        <div
          css={tabStyle(activeTab === 'SOCIETY')}
          onClick={() => setActiveTab('SOCIETY')}
        >
          사회자료
        </div>
      </div>

      {slicedNews.length > 0 ? (
        slicedNews.map((news, idx) => (
          <div key={idx} css={newsCardStyle}>
            <img
              css={newsImageStyle}
              src={news.imageUrl || '/default-placeholder.png'}
              alt="뉴스 이미지 없음"
            />
            <div css={newsContentStyle}>
              <h2 css={newsTitleStyle}>
                <a
                  css={newsLinkStyle}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={news.link}
                >
                  {news.title}
                </a>
              </h2>
              <p css={newsSummaryStyle}>{news.summary}</p>
            </div>
          </div>
        ))
      ) : (
        <p>표시할 뉴스가 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default NewsPage;
