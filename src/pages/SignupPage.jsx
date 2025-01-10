/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const modalContentStyle = css`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const closeButtonStyle = css`
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const SignUpPage = ({ closeModal }) => {
  return (
    <div css={modalOverlayStyle} onClick={closeModal}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button css={closeButtonStyle} onClick={closeModal}>
          &times;
        </button>
        <h2>회원가입</h2>
        <form>
          <input
            type="text"
            placeholder="이름"
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <input
            type="email"
            placeholder="이메일"
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <button
            type="submit"
            css={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#001f5c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
