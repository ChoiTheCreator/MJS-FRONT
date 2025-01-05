import React from 'react';
import '../styles/BoardPage.scss';

const BoardPage = () => {
  return (
    <div className="main-page">
      <div className="main-section">
        <h2>자유 게시판</h2>
        <div className="post-list">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="post-item">
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
