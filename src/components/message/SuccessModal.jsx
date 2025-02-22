/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from '@emotion/react';
import logoImg from '../../IMG/schoolLogoWithNewColor.png';

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
  border-radius: 10px;
  width: 100%;
  max-width: 700px;
  text-align: center;
  position: relative;
`;

const logoStyle = css`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
`;

const modalMessageStyle = css`
  font-weight: bold;
  color: navy;
`;

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // 1초 후 자동 닫힘

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        <img src={logoImg} alt="학교 로고" css={logoStyle} />
        <h2 css={modalMessageStyle}>{message}</h2>
      </div>
    </div>
  );
};

export default SuccessModal;
