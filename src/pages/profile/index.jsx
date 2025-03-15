/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate()
  // const { userId } = useParams()

  return (
    <div css={pageLayout}>
      <div css={containerLayout}>
        <div css={boxLayout}>
          <div css={css`width: 100%; display: flex; justify-content: space-between;`}>
            <span css={headingStyle}>
              내 프로필
            </span>
            <Link to={`/profile/edit`} css={linkStyle} style={{ color: '#999999' }}>
              <span>
                편집
              </span>
            </Link>
          </div>
          <div css={css`width: 100%; padding: 0.5rem; display: flex; gap: 1rem;`}>
            <img
              src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"
              alt="임시 이미지"
              css={css`width: 64px; height: 64px; border-radius: 20px;`} />
            <div css={css`flex: 1; display: flex; flex-direction: column; gap: 0.5rem;`}>
              <span css={css`font-weight: 600;`}>
                박재욱
              </span>
              <span css={css`font-size: 0.875rem; font-weight: 300;`}>
                otsu9110@mju.ac.kr
              </span>
              <span css={css`font-size: 0.875rem; font-weight: 300; color: #999999;`}>
                융합소프트웨어학부 | 60190439 | 재학생
              </span>
            </div>
          </div>
        </div>
        <div css={boxLayout}>
          <div css={css`display: flex; gap: 2rem;`}>
            <span css={headingStyle}>
              내 활동
            </span>
            <span css={css`color: #999999;`}>
              작성한 게시물 13개, 댓글 244개
            </span>
          </div>
          <div css={css`display: flex; flex-direction: column; gap: 1.5rem; padding: 0.25rem;`}>
            <Link css={linkStyle}>
              <span>게시물</span>
            </Link>
            <Link css={linkStyle}>
              <span>좋아요 누른 게시물</span>
            </Link>
          </div>
        </div>
        <div css={boxLayout}>
          <span css={headingStyle}>
            이용안내
          </span>
          <div css={css`display: flex; flex-direction: column; gap: 1.5rem; padding: 0.25rem;`}>
            <Link css={linkStyle}>
              <span>공지사항</span>
            </Link>
            <Link css={linkStyle}>
              <span>자주찾는 질문</span>
            </Link>
            <Link css={linkStyle} to={'/profile/inquery'}>
              <span>문의하기</span>
            </Link>
            <Link css={linkStyle}>
              <span>서비스 이용약관</span>
            </Link>
            <Link css={linkStyle}>
              <span>개인정보 처리방침</span>
            </Link>
            <Link css={linkStyle}>
              <span>이용 제한 내역</span>
            </Link>
          </div>
        </div>
      </div>
    </div >
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
  gap: 1.75rem;
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
  
  &:hover {
    text-decoration: underline;
  }
`
