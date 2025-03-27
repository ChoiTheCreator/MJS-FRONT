// ### useSignUpForm 훅의 역할

// - 회원가입 폼 전체 로직을 상태 기반으로 관리하는 컨트롤러 훅
// - 입력값 상태, 단계 전환, 유효성 검사, 조건부 렌더링, 제출 처리까지 전반적인 흐름을 담당함
// - 컴포넌트(SignUpPage)는 이 훅에서 제공하는 값만 사용해 UI를 렌더링하도록 설계됨
import { useEffect, useState } from 'react';
import { verifyMjuEmail, verifyPassword } from '@/util/verifyRegex';
import { useAuth } from '@/context/AuthContext';

const useSignupForm = () => {
  const [step, setStep] = useState(1);
  const [isSignUpComplete, setIsSignUpcomplete] = useState(false);
  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isMjuEmail, setIsMjuMail] = useState(false);
  const [MjuEmailError, setMjuEmailError] = useState('');

  //입력상태 통일 (여러개의 useState로 setState 처리하는것 보다 이게 훨씬 효율적)
  //또한 서버에 전송할때 이렇게 묶는게 훨씬 효율적
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    studentId: '',
    gender: '',
    nickname: '',
  });

  const {
    name,
    email,
    password,
    confirmPassword,
    department,
    studentId,
    gender,
    nickname,
  } = formData;

  const handleChange = (stateAttribute) => (e) => {
    setFormData((prev) => ({ ...prev, [stateAttribute]: e.target.value }));
  };

  //비밀번호가 입력칸이 바뀔때 -> effect passWord 상태를 최신화 (의존성 배열에 password추가)
  useEffect(() => {
    if (!verifyPassword(password))
      setPasswordError(
        '비밀번호는 영문, 숫자, 특수문자 포함 8-16자여야 합니다.'
      );
    else {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!verifyMjuEmail(email)) {
      setShowPasswordField(false);
      setIsMjuMail(false);
      setMjuEmailError(
        '이메일 형식은 명지대학교의 공식 학생 이메일이어야만 합니다.'
      );
    }
    if (verifyMjuEmail(email)) {
      setShowPasswordField(true);
      setMjuEmailError('');
    }
  }, [email]);

  useEffect(() => {
    if (name.length >= 2) setShowEmail(true);
  }, [name]);

  useEffect(() => {
    if (password.length >= 8) setShowConfirmPassword(true);
    else setShowConfirmPassword(false);
  }, [password]);

  useEffect(() => {
    if (department.length > 2) setShowStudentId(true);
    else setShowStudentId(false);
  }, [department]);

  useEffect(() => {
    if (studentId.length >= 6) setShowGender(true);
    else setShowGender(false);
  }, [studentId]);

  useEffect(() => {
    if (gender) setShowNickname(true);
    else setShowNickname(false);
  }, [gender]);

  //요청한 스텝바이스텝을 위한 상태값 (1 상태)
  const isStepOneValid =
    //첫번째 네개의 값이 다 채워지면 1상태
    name && email && password && confirmPassword && isMjuEmail;
  password === confirmPassword;

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
      await signup(newUser);
      setIsSignUpcomplete(true);
      //회원가입 성공하면 로그인 페이지로 리다리엑션
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (e) {
      alert('회원가입에 실패했습니다.');
      console.log('회원가입 실패', e);
    }
  };

  return {
    step,
    isSignUpComplete,
    formData,
    handleChange,
    handleNextStep,
    handleSubmit,
    isStepOneValid,
    isStepTwoValid,
    showPassword,
    setShowPassword,
    passwordError,
    MjuEmailError,
    showEmail,
    showPasswordField,
    showConfirmPassword,
    showStudentId,
    showGender,
    showNickname,
  };
};

export default useSignupForm;
