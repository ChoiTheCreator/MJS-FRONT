/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../IMG/schoolLogoWithNewColor.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Poppins', 'Arial', sans-serif;
  animation: ${fadeIn} 1s ease-in-out;
`;

const logoStyle = css`
  width: 120px;
  height: 120px;
  object-fit: contain;
  background-color: transparent;
  margin-bottom: 1rem;
`;

const titleStyle = css`
  font-size: 2rem;
  font-weight: 600;
  color: #001f5c;
  margin-bottom: 2rem;
`;

const buttonStyle = css`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #001f5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #001542;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #000f35;
    transform: translateY(0);
  }
`;

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div css={containerStyle}>
        <img src={logoImg} alt="학교 로고" css={logoStyle} />
        <h1 css={titleStyle}> MyoungJi Search NOVA </h1>
        <button css={buttonStyle} onClick={() => navigate('/login')}>
          시작하기
        </button>
      </div>
    </>
  );
};

export default StartPage;
