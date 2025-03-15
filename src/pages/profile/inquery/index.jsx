/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// 문의하기 페이지 디자인
export default function InqueryPage() {
  const [content, setContent] = useState()

  const handleSubmit = () => {
    console.log(content)
  }

  return (
    <div css={pageLayout}>
      <div css={containerLayout}>
        <div css={boxLayout}>
          <span css={headingStyle}>
            문의하기
          </span>
          <div css={css`padding: 0.25rem; display: flex; flex-direction: column; gap: 2rem;`}>
            <Link css={linkStyle}>
              <span>
                내 계정
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                아이디, 비밀번호, 개인정보, 닉네임 등
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                시간표
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                시간표 설명이 들어갑니다
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                커뮤니티 이용
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                커뮤니티 설명이 들어갑니다
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                개인정보
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                개인정보 설명이 들어갑니다
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                신고 / 이용제한
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                신고 설명이 들어갑니다
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                게시물 신고센터
              </span>
              <span style={{ fontSize: '0.875rem', color: 'grey' }}>
                게시물 신고센터 설명이 들어갑니다
              </span>
            </Link>
            <div css={css`border-top: 1px solid #ccc;`} />
            <Link css={linkStyle}>
              <span>
                서비스 이용 문의
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                제휴 문의
              </span>
            </Link>
            <Link css={linkStyle}>
              <span>
                광고 문의
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const pageLayout = css`
  width: 100%;
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const containerLayout = css`
  width: 600px; 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  gap: 2rem;
`

const boxLayout = css`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 2.5rem;
`

const headingStyle = css`
  color: #012968; 
  font-size: 1.25rem; 
  font-weight: bold;
`

const linkStyle = css`
  color: inherit; 
  text-decoration: none; 
  font-size: 1.125rem; 
  font-weight: 400; 
  
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
