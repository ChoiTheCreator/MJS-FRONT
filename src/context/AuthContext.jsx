import React, { createContext, useContext, useEffect, useState } from 'react';

import { login as loginApi, logout as logoutApi } from '../api/authApi';
import apiClient from '../api/apiClient';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // 로그인한 사용자 정보 저장

  //토큰을 사실 여러가지 방식으로 저장할수 있으나,
  //빠른 접근을 위해 일단 메모리 (상태에다가 저장한다) => xss 공격또한 방지가능요
  const [accessToken, setAccessToken] = useState(null);

  //글로벌 로그인 함수
  //authContext에서 loginApi함수를 빌려쓴 글로벌 로그인함수 창조 -> 얘로 실제 로그인 통신함
  const login = async (userInfo) => {
    try {
      const data = await loginApi(userInfo); //결과물로 data.accessToken과 data.refreshToken을 줄거야.
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
      console.log(
        '✅ 로그인 성공 현재 사용자의 접근토큰은 메모리에 안전하게 저장되었습니다. :',
        data.accessToken
      );
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      throw error;
    }
  };

  //글로벌 로그아웃 함수
  const logout = async () => {
    try {
      await logoutApi(); // 서버에 로그아웃 요청

      // ✅ 클라이언트에서 Access Token 삭제
      setAccessToken(null);
      localStorage.removeItem('accessToken'); // 만약 localStorage에 저장했다면 제거

      // ✅ 로그인 상태 초기화
      setUser(null);
      setIsLoggedIn(false);

      console.log('👋 로그아웃 완료');
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    }
  };

  //API 요청시, accessToken 자동포함하게 하는 (인터셉터 차용 로직)
  //모든 API에 config.header에 AccessToken 헤더 자동 추가
  //단, 이 로직은 accessToken이 존재할 경우에만 헤더에 자동 추가

  //매우 중요한 코드 : 로그인 이후 모든 apiClient를 활용하는 API 요청을 애가 관리함.
  //apiClient를 사용하는 모든 API 요청은 자동으로 AccessToken을 포함하기 때문
  //만약 다른 api에서 어떤 api함수를 실행하며, 얘가 API요청을 감지하고 AccessToken을 줌

  //axios 공식문서의 axios객체는 프로미스로 되어있기에, 이를 맞춰서 async/await을 쓰지않고 프로미스 객체를 반환해야함
  // useEffect(() => {
  //   apiClient.interceptors.request.use(
  //     (config) => {
  //       if (accessToken) {
  //         config.headers.Authorization = `Bearer ${accessToken}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );
  // }, [accessToken]);

  /*
  AcceesToken 자동갱신 로직 (RefreshToken 사용)
  -> 이 로직은 AccessToken의 잔여시간이 만료될때만 발동 (401 에러 unauthorized)
  -> refreshAccessToken()를 실행하여, 새로운 AccessToken을 받는 구조
  -> 만약 refreshToken 마저 만료되었다면 로그아웃을 실행한다.

  */
  // useEffect(() => {
  //   apiClient.interceptors.response.use(
  //     (response) => {
  // 정상적인 응답이면 그대로 반환 (첫번째 파라미터 함수 -> 성공시)
  //       return response;
  //     },
  //두번째 파라미터 함수
  //     async (error) => {
  //  401 Unauthorized 에러 발생 → Access Token 만료됨
  //       if (error.response?.status === 401) {
  //         console.log('🔄 Access Token 만료됨. 새로운 토큰 요청 중...');

  //         try {
  // ✅ 새 Access Token 요청 (Refresh Token 사용)
  //           const data = await refreshAccessToken();

  // ✅ 새로운 Access Token을 저장
  //           setAccessToken(data.accessToken);

  // ✅ 실패했던 요청에 새 Access Token을 추가하여 다시 요청
  //           error.config.headers.Authorization = `Bearer ${data.accessToken}`;
  //           return apiClient.request(error.config);
  //         } catch (refreshError) {
  //           console.error('🚨 Refresh Token도 만료됨. 로그아웃 실행');
  //           logout(); // ✅ Refresh Token 만료 → 로그아웃
  //         }
  //       }

  // ✅ 다른 종류의 에러는 그대로 반환  * apiClient.interceptor 에러 쓸대는 그냥 error가 아닌
  //Promise.reject 써줘야함
  //       return Promise.reject(error);
  //     }
  //   );
  // }, [accessToken]); // Access Token이 변경될 때마다 실행됨

  /**
   * ✅ 새로고침 시 세션 복구 (Refresh Token 이용)
   * - 사용자가 새로고침하면 메모리에 저장된 Access Token이 사라짐
   * - 이를 해결하기 위해, `refreshAccessToken()`을 호출하여 새 Access Token을 받아옴
   */
  // useEffect(() => {
  //   const restoreSession = async () => {
  //     try {
  //       console.log('🔄 새로고침 시 Access Token 복구 중...');
  //       const data = await refreshAccessToken(); // 서버에서 새 Access Token 요청

  // 🔹 새 Access Token을 저장하여 로그인 상태 복구
  //       setAccessToken(data.accessToken);
  //       setIsLoggedIn(true);
  //     } catch (error) {
  //       console.error('🚨 세션 복구 실패:', error);
  //     }
  //   };

  //   restoreSession(); // 앱이 실행될 때 자동 실행
  // }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
