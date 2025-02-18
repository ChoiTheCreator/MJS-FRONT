/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaCheckCircle } from 'react-icons/fa';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContentStyle = css`
  background-color: #d4edda; /* 연두색 배경 */
  color: #155724;
  padding: 1.5rem;
  border-radius: 8px;
  width: 320px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const checkIconStyle = css`
  font-size: 40px;
  color: #155724;
  margin-bottom: 1rem;
`;

const buttonStyle = css`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #155724;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #0b3d2e;
  }
`;

const GlobalMessageModal = ({ message, onClose }) => {
  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        <FaCheckCircle css={checkIconStyle} />
        <p>{message}</p>
        <button css={buttonStyle} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default GlobalMessageModal;
