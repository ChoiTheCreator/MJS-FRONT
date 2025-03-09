/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getNotice } from '../api/noticeApi';
import LoadingComponent from './util/LoadingComponent';

const tabContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const tabHeaderStyle = css`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
`;

const tabButtonStyle = (isActive) => css`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${isActive ? '#001f5c' : 'transparent'};
  color: ${isActive ? 'white' : '#333'};
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${isActive ? '#001542' : '#f0f0f0'};
  }
`;

const tabContentStyle = css`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: '일반공지', category: 'general' },
    { label: '학사공지', category: 'academic' },
    { label: '장학공지', category: 'scholarship' },
    { label: '진로공지', category: 'career' },
    { label: '학생활동', category: 'activity' },
    { label: '학칙개정', category: 'rule' },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotice({ category: tabs[activeTab].category });
        setNotices(data);
        setLoading(false);
      } catch (error) {
        console.log('공지사항 실제 Fetching 중 오류 발생', error);
      }
    };
    fetchNotices();
  }, [activeTab]);

  if (loading) {
    return (
      <LoadingComponent message="공지사항을 불러오고 있습니다."></LoadingComponent>
    );
  }

  return (
    <div css={tabContainerStyle}>
      <div css={tabHeaderStyle}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            css={tabButtonStyle(activeTab === index)}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div css={tabContentStyle}>
        {notices.length > 0 ? (
          notices.map((notice, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              {notice.title}
              {notice.date}
              {notice.category}
              {notice.link}
            </div>
          ))
        ) : (
          <div>공지사항이 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
