import apiClient from './apiClient';

export const signup = async (userData) => {
  console.log('🚀 회원가입 요청 시작...');
  console.log('🔗 요청 URL:', `${import.meta.env.VITE_API_URL}/members`);
  console.log('📤 요청 데이터:', userData);

  try {
    const response = await apiClient.post('/members', userData);
    console.log('✅ 회원가입 성공!');
    console.log('📥 응답 데이터:', response.data);
    return response.data;
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
  console.log('🔗 요청 URL:', `${import.meta.env.VITE_API_URL}/members`);
  console.log('📤 요청 데이터:', userData);

  try {
    const response = await apiClient.post('/auth/login', userInfo);
    console.log('✅ 회원가입 성공!');
    console.log('📥 응답 데이터:', response.data);

    //아마 여기서 키 두개 줘야함
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

export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post(
      '/auth/refresh',
      {},
      { withCredentials: true }
    );
    return response.data; // { accessToken }
  } catch (error) {
    console.error('🚨 Access Token 갱신 실패:', error);
    throw error;
  }
};
