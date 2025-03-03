/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const loadingContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  color: #555;
`;

const spinnerStyle = css`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 31, 92, 0.3);
  border-top: 4px solid #001f5c;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingComponent = ({ message = '불러오는 중...' }) => {
  return (
    <div css={loadingContainerStyle}>
      <div css={spinnerStyle}></div>
      <p style={{ color: 'navy', fontWeight: 'bold' }}>{message}</p>
    </div>
  );
};

export default LoadingComponent;
