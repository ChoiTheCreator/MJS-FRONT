/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import axios from 'axios';
//회원가입 페이지에는 setUser라는 user를 저장하는 글로벌 상태변경 함수만을 가져온다.
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { use } from 'react';
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

const SignUpPage = ({ closeSignUpModal }) => {
  const serverUrl = 'http://localhost:3000/users';
  //로딩 상태 명시하기
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const { setUser } = useAuth();

  // **onChange 핸들러**
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //userId는 매우 고유한 Date.now() 활용
    const userId = Date.now();
    const newUser = {
      id: userId,
      name,
      email,
      password,
    };

    try {
      await axios.post(serverUrl, newUser);

      alert('회원가입이 완료되었습니다.');
      //1. context 변경함수를 활용하여 글로벌리 저장한다.
      setUser(newUser);
      setName('');
      setEmail('');
      setPassword('');
      closeSignUpModal();
    } catch (e) {
      alert('회원가입에 실패했습니다');
      console.log('회원가입 실패', e);
    } finally {
      setLoading(false);
      setName('');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <div css={modalOverlayStyle} onClick={closeSignUpModal}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button css={closeButtonStyle} onClick={closeSignUpModal}>
          &times;
        </button>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="이름"
            onChange={handleNameChange}
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={handleEmailChange}
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            css={{ width: '100%', marginBottom: '1rem', padding: '0.8rem' }}
          />
          <button
            type="submit"
            css={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#aaa' : '#001f5c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? '처리 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
