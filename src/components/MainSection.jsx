import React from 'react';
import '../styles/MainSection.scss';

const MainSection = () => {
  return (
    <div className="main-section">
      {/* 검색창 */}
      <div className="search-bar">
        <input type="text" placeholder="전체 검색합니다." />
        <button>검색</button>
      </div>

      {/* 오늘의 식단과 사용자 정보 */}
      <div className="top-section">
        <div className="today-menu">
          <h3>오늘의 식단</h3>
          <p>
            자장면, 추가밥, 순두부김치국, 맛조개탕수육, 어묵볶음, 배추김치,
            매실차
          </p>
        </div>
        <div className="user-info">
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <div>
            <h4>남태품</h4>
            <p>남태품 / skaqhf00@mju.ac.kr</p>
          </div>
        </div>
      </div>

      {/* 공지사항 */}
      <div className="announcements">
        <h3>학사일정</h3>
        <ul>
          <li>
            [명지통합치료연구센터] 2025-1 등록 근로장학생 모집 안내 → 링크 연결
          </li>
          <li>
            [명지통합치료연구센터] 2025-1 등록 근로장학생 모집 안내 → 링크 연결
          </li>
        </ul>
      </div>

      {/* 명지대 뉴스 및 실시간 검색 */}
      <div className="bottom-section">
        <div className="news">
          <h3>명지대 뉴스</h3>
          <ul>
            <li>[공지] 남남과 12월 27일 공연...</li>
            <li>[성공적] 명지대 축제 성료...</li>
          </ul>
        </div>
        <div className="search-trends">
          <h3>실시간 검색 순위</h3>
          <ol>
            <li>1. 학식</li>
            <li>2. 전과 관련 안내</li>
            <li>3. 정종문 교수님</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
