/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'; // 눈 아이콘 추가
import apiClient from '../api/apiClient';

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

const passwordErrorStyle = css`
  color: red;
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const passwordConfirmStyle = css`
  color: #28a745; /* 연두색 */
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const successIconStyle = css`
  font-size: 3rem;
  color: #001f5c;
  margin-bottom: 1rem;
`;

const SignUpPage = ({ closeSignUpModal }) => {
  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSignUpComplete, setIsSignUpcomplete] = useState(false);

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
  const [passwordError, setPasswordError] = useState('');

  //비밀번호 검증 정규식 (영문,숫자, 그리고 특수문자도 가능요)
  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

  //비밀번호가 입력칸이 바뀔때 -> effect passWord 상태를 최신화 (의존성 배열에 password추가)
  useEffect(() => {
    if (password.length > 0 && !PASSWORD_REGEX.test(password)) {
      setPasswordError(
        '비밀번호는 영문, 숫자, 특수문자 포함 8-16자여야 합니다.'
      );
    } else {
      setPasswordError('');
    }
  }, [password]);
  // 상태 변경을 위한 useEffect
  const [showEmail, setShowEmail] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showStudentId, setShowStudentId] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showNickname, setShowNickname] = useState(false);

  //영은 요청 다음거 보여주는 useEffect.. 상태변경보단 이게 나음. showX 를 의존해서 바꿈
  useEffect(() => {
    if (name.length > 2) setShowEmail(true);
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

  //요청한 스텝바이스텝을 위한 상태값 (1 상태)
  const isStepOneValid =
    //첫번째 네개의 값이 다 채워지면 1상태
    name && email && password && confirmPassword === password;

  //(2상태) 두번째 네개의 값이 다 채워지면 2상태
  const isStepTwoValid = department && studentId && gender && nickname;

  const handleNextStep = () => {
    if (step === 1 && isStepOneValid) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //서버에 보낼 객체값가공
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
      await apiClient.post('/members', newUser);
      setUser(newUser);
      //submit되면 새로운 모달로 바뀌야지
      setIsSignUpcomplete(true);
    } catch (e) {
      alert('회원가입에 실패했습니다');
      console.log('회원가입 실패', e);
    }
  };

  return (
    <div css={modalOverlayStyle} onClick={closeSignUpModal}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {isSignUpComplete ? (
          <div>
            <FaCheck css={successIconStyle} />
            <h2>회원가입을 축하합니다!</h2>
            <button onClick={closeSignUpModal} css={buttonStyle(true)}>
              확인
            </button>
          </div>
        ) : (
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
                {/* 비밀번호의 형식을 갖추지 않고 쓸 경우의 오류 */}
                {passwordError && password.length > 1 ? (
                  <span css={passwordErrorStyle}>{passwordError}</span>
                ) : null}
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

                {/* 확인 비밀번호를 틀릴경우  */}
                {confirmPassword && confirmPassword !== password ? (
                  <p css={passwordErrorStyle}>비밀번호가 일치하지 않습니다.</p>
                ) : confirmPassword && confirmPassword === password ? (
                  <p css={passwordConfirmStyle}>확인되었습니다!</p>
                ) : null}
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
                    <option value="MALE">남</option>
                    <option value="FEMALE">여</option>
                    <option value="OTHERS">Others</option>
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
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
