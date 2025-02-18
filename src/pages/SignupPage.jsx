/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 눈 아이콘 추가

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
  position: relative;
`;

const inputContainerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const inputStyle = css`
  flex: 1;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const errorMessageStyle = css`
  color: red;
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const eyeIconStyle = css`
  position: absolute;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #007aff;
`;

const buttonStyle = (enabled) => css`
  width: 100%;
  padding: 1rem;
  background-color: ${enabled ? '#001f5c' : '#aaa'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${enabled ? 'pointer' : 'not-allowed'};
`;

const SignUpPage = ({ closeSignUpModal }) => {
  const serverUrl = 'http://localhost:3000/users';
  const { setUser } = useAuth();

  const [step, setStep] = useState(1);

  // 입력 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gender, setGender] = useState('');
  const [nickname, setNickname] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // 상태 변경을 위한 useEffect
  const [showEmail, setShowEmail] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showStudentId, setShowStudentId] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showNickname, setShowNickname] = useState(false);

  useEffect(() => {
    if (name.length > 1) setShowEmail(true);
  }, [name]);

  useEffect(() => {
    if (email.includes('@')) setShowPasswordField(true);
  }, [email]);

  useEffect(() => {
    if (password.length >= 8) setShowConfirmPassword(true);
  }, [password]);

  useEffect(() => {
    if (department.length > 2) setShowStudentId(true);
  }, [department]);

  useEffect(() => {
    if (studentId.length >= 6) setShowGender(true);
  }, [studentId]);

  useEffect(() => {
    if (gender) setShowNickname(true);
  }, [gender]);

  const isStepOneValid =
    name && email && password && confirmPassword === password;
  const isStepTwoValid = department && studentId && gender && nickname;

  const handleNextStep = () => {
    if (step === 1 && isStepOneValid) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      department,
      studentId,
      gender,
      nickname,
    };

    try {
      await axios.post(serverUrl, newUser);
      alert('회원가입이 완료되었습니다.');
      setUser(newUser);
      closeSignUpModal();
    } catch (e) {
      alert('회원가입에 실패했습니다');
      console.log('회원가입 실패', e);
    }
  };

  return (
    <div css={modalOverlayStyle} onClick={closeSignUpModal}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="text"
                value={name}
                placeholder="이름"
                onChange={(e) => setName(e.target.value)}
                css={inputStyle}
              />
              {showEmail && (
                <input
                  type="email"
                  value={email}
                  placeholder="이메일"
                  onChange={(e) => setEmail(e.target.value)}
                  css={inputStyle}
                />
              )}
              {showPasswordField && (
                <div css={inputContainerStyle}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                    css={inputStyle}
                  />
                  <span
                    css={eyeIconStyle}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              )}
              {showConfirmPassword && (
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="비밀번호 확인"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  css={inputStyle}
                />
              )}
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!isStepOneValid}
                css={buttonStyle(isStepOneValid)}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                value={department}
                placeholder="학과"
                onChange={(e) => setDepartment(e.target.value)}
                css={inputStyle}
              />
              {showStudentId && (
                <input
                  type="text"
                  value={studentId}
                  placeholder="학번"
                  onChange={(e) => setStudentId(e.target.value)}
                  css={inputStyle}
                />
              )}
              {showGender && (
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  css={inputStyle}
                >
                  <option value="">성별 선택</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
              )}
              {showNickname && (
                <input
                  type="text"
                  value={nickname}
                  placeholder="닉네임"
                  onChange={(e) => setNickname(e.target.value)}
                  css={inputStyle}
                />
              )}
              <button
                type="submit"
                disabled={!isStepTwoValid}
                css={buttonStyle(isStepTwoValid)}
              >
                회원가입
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
