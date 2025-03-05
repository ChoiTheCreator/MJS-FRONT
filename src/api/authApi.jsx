import apiClient from './apiClient';

export const signup = async (userData) => {
  console.log('🚀 회원가입 요청 시작...');
  console.log('🔗 요청 URL:', `${import.meta.env.VITE_API_URL}/members`);
  console.log('📤 요청 데이터:', userData);

  try {
    const response = await apiClient.post('/members', userData);
    console.log('✅ 회원가입 성공!');
    console.log('📥 응답 데이터:', response.data);
    console.log('📥 응답 내부 데이터:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ 회원가입 요청 실패!');
    console.error('🔗 요청 URL:', `${import.meta.env.VITE_API_URL}/members`);
    console.error('📤 요청 본문:', userData);
    console.error('❌ HTTP 상태 코드:', error.response?.status || '알 수 없음');
    console.error('📥 응답 데이터:', error.response?.data || '응답 없음');
    console.error('📛 전체 에러 메시지:', error.message);

    throw error;
  }
};

export const login = async (userInfo) => {
  console.log('🚀 로그인 요청 시작...');
  console.log('📤 요청 데이터:', userInfo);

  try {
    const response = await apiClient.post('/auth/login', userInfo);
    console.log('✅ 회원가입 성공!');
    console.log('📥 응답 데이터:', response.data);

    //아마 여기서 키 두개 줘야
    return response.data;
  } catch (error) {
    console.error('❌ 로그인 요청 실패!');
    console.error('🔗 요청 URL:', `${import.meta.env.VITE_API_URL}/auth/login`);
    console.error('📤 요청 본문:', userInfo);
    console.error('❌ HTTP 상태 코드:', error.response?.status || '알 수 없음');
    console.error('📥 응답 데이터:', error.response?.data || '응답 없음');
    console.error('📛 전체 에러 메시지:', error.message);
  }
};

//로그아웃 기능
export const logout = async () => {
  try {
    //쿠키 기반 인증을 지원해놨기에 (url,data,config(추가적인 설정))
    //이 부분에서 로그아웃을 할때 withCredentials : true를 설정함
    console.log('🚀 로그아웃 요청 시작...');
    const response = await apiClient.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error('❌ 로그아웃 요청 실패!');
    console.error('❌ HTTP 상태 코드:', error.response?.status || '알 수 없음');
    console.error('📥 응답 데이터:', error.response?.data || '응답 없음');
    console.error('📛 전체 에러 메시지:', error.message);

    throw error;
  }
};

//일단 리프레쉬 갱신 api는 만들긴했는데, 아직 명세서에는 없음!
// export const refreshAccessToken = async () => {
//   try {
//     const response = await apiClient.post(
//       '/auth/refresh',
//       {},
//       { withCredentials: true }
//     );
//     return response.data; // { accessToken } -> 서버에서 새로 준 값이겠다.
//     //서버에서 새로 준 이 accessToken은 authContext에서 호출한다.
//   } catch (error) {
//     console.error('🚨 Access Token 갱신 실패:', error);
//     throw error;
//   }
// };
