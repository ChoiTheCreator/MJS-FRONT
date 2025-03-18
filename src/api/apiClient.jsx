import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get('accessToken');
    // const refreshToken = cookies.get('refreshToken');

    if (accessToken) {
      // config.headers['ACCESS-AUTH-KEY'] = `Bearer ${accessToken}`;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // if (refreshToken) {
    //   config.headers['REFRESH-AUTH-KEY'] = `Bearer ${refreshToken}`;
    // }

    console.log(
      'API 요청:',
      config.method,
      config.baseURL + config.url,
      config.headers
    );
    return config;
  },
  (error) => {
    // console.error('요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (API 응답을 받은 후 실행)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 발생 시 -> 토큰 갱신 시도
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.warn('! 401 Unauthorized: 토큰 갱신 시도...');
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); // 🔄 재요청
      } catch (refreshError) {
        // console.error('토큰 갱신 실패:', refreshError);
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' })
        // localStorage.removeItem('token');
        // localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    // 응답 에러 로그
    // console.error(
    //   '응답 오류:',
    //   error.response?.status || '알 수 없음',
    //   error.response?.data || '응답 없음'
    // );
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');
    // const refreshToken = localStorage.getItem('refreshToken');
    // const accessToken = localStorage.getItem('token');

    if (!refreshToken) {
      throw new Error('Refresh Token이 없습니다.');
    }

    const response = await axios.post(
      import.meta.env.VITE_API_BASE_URL + '/auth/refresh', // ✅ 환경변수 적용
      {},
      {
        headers: {
          'ACCESS-AUTH-KEY': `Bearer ${accessToken}`,
          'REFRESH-AUTH-KEY': `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    if (newAccessToken)
      cookies.set('accessToken', newAccessToken, { path: '/' })
    // localStorage.setItem('token', newAccessToken);
    if (newRefreshToken)
      cookies.set('refreshToken', newRefreshToken, { path: '/' })
    // localStorage.setItem('refreshToken', newRefreshToken);

    // console.log('🔄 토큰 갱신 성공! 새 액세스 토큰:', newAccessToken);
    return newAccessToken;
  } catch (error) {
    // console.error(
    //   '❌ 리프레시 토큰 갱신 실패:',
    //   error.response?.data || error.message
    // );
    throw error;
  }
};

// ✅ 최종 API 클라이언트 내보내기
export default apiClient;
