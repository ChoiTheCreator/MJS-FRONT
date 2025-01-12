/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

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

  const tabs = [
    { label: '학사일정', content: '학사일정 내용 표시' },
    { label: '일반공지', content: '일반공지 내용 표시' },
    { label: '학사공지', content: '학사공지 내용 표시' },
    { label: '장학공지', content: '장학공지 내용 표시' },
    { label: '진로공지', content: '진로공지 내용 표시' },
    { label: '학생활동', content: '학생활동 내용 표시' },
    { label: '학칙개정', content: '학칙개정 내용 표시' },
  ];

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
      <div css={tabContentStyle}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabComponent;
