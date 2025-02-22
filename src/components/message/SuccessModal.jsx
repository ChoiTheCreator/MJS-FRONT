/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import logoImg from '../../IMG/schoolLogoWithNewColor.png';
import { useNavigate } from 'react-router-dom';

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
  background-color: #002f6c; /* 남색 배경 */
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  color: white; /* 흰색 글씨 */
  position: relative;
`;

const logoStyle = css`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
`;

const closeButtonStyle = css`
  background-color: white;
  color: #002f6c; /* 남색 */
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 500);
    return () => clearTimeout(timer);
  }, [onclose]);
  return (
    <div css={modalOverlayStyle} onClick={onClose}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <img src={logoImg} alt="학교 로고" css={logoStyle} />
        <h2>{message}</h2>
        <button onClick={onClose} css={closeButtonStyle}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
