/** @jsxImportSource @emotion/react */
import Avatar from '@components/Avatar';
import { css } from '@emotion/react';

export default function ProfileEditPage() {

  return (
    <div css={pageLayout}>
      <div css={containerLayout}>
        <div css={boxLayout}>
          <span css={headingStyle}>
            내 프로필 수정
          </span>
          <div css={css`width: 100%; display: flex; justify-content: center;`}>
            <div css={css`display:flex; flex-direction:column; gap: 1rem; align-items: center;`}>
              <span css={css`font-size: 1.125rem; font-weight: 600;`}>
                프로필 사진
              </span>
              <Avatar size={64} />
            </div>
          </div>
          <div css={css`display: flex; flex-direction: column; gap: 0.5rem;`}>
            <div>
              <span>
                이름
              </span>

            </div>
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
