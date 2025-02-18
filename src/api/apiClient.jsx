import axios from 'axios';

// ✅ 환경변수 값 확인 (서버 실행 후 브라우저 콘솔에서 확인)
console.log('🚀 API Base URL:', import.meta.env.VITE_API_BASE_URL);

// ✅ Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ 환경변수 적용 (Vite)
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('🛠 Axios Client 생성됨:', apiClient);

// ✅ 요청 인터셉터 (API 요청 전에 실행)
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      config.headers['ACCESS-AUTH-KEY'] = `BEARER ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['REFRESH-AUTH-KEY'] = `BEARER ${refreshToken}`;
    }

    // 📡 API 요청 로그
    console.log(
      '📡 API 요청:',
      config.method.toUpperCase(),
      config.baseURL + config.url,
      config.headers
    );
    return config;
  },
  (error) => {
    console.error('❌ 요청 오류:', error);
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터 (API 응답을 받은 후 실행)
apiClient.interceptors.response.use(
  (response) => {
    // ✅ 응답 로그
    console.log('✅ API 응답:', response.status, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ❌ 401 오류 발생 시 -> 토큰 갱신 시도
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.warn('⚠️ 401 Unauthorized: 토큰 갱신 시도...');
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['ACCESS-AUTH-KEY'] = `BEARER ${newAccessToken}`;
        return apiClient(originalRequest); // 🔄 재요청
      } catch (refreshError) {
        console.error('❌ 토큰 갱신 실패:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    // ❌ 응답 에러 로그
    console.error(
      '❌ 응답 오류:',
      error.response?.status || '알 수 없음',
      error.response?.data || '응답 없음'
    );
    return Promise.reject(error);
  }
);

// ✅ 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('token');

    if (!refreshToken) {
      throw new Error('❌ Refresh Token이 없습니다.');
    }

    const response = await axios.post(
      import.meta.env.VITE_API_BASE_URL + '/auth/refresh', // ✅ 환경변수 적용
      {},
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken}`,
        },
      }
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    if (newAccessToken) localStorage.setItem('token', newAccessToken);
    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

    console.log('🔄 토큰 갱신 성공! 새 액세스 토큰:', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error(
      '❌ 리프레시 토큰 갱신 실패:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ 최종 API 클라이언트 내보내기
export default apiClient;
