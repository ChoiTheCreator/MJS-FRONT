import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
} from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // 로그인한 사용자 정보 저장
  const [accessToken, setAccessToken] = useState(null); //빠른 접근을 위해 일단 메모리 (상태에다가 저장한다)
  const [uuid, setUuid] = useState(null);

  //새로고침 시 로그인흔적을 파악하는 부분임 -> sessionStorage
  //1. 로그인 상태 (토큰)
  //2. uuid
  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    const storedUuid = localStorage.getItem(uuid);

    setAccessToken(storedToken);

    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setUuid(storedUuid);
  }, []);

  //글로벌 회원가입 함수
  //서버에서 현재 로그인을 할때는 uuid를 주지 않으므로 따로 로컬스토리지에다가 저장한다.
  const signup = async (userData) => {
    try {
      const data = await signupApi(userData);
      const uuid = data.uuid;
      localStorage.setItem('uuid', uuid);
      console.log('uuid 저장완료 ', uuid);

      setUuid(uuid);
    } catch (error) {
      console.log('x 회원가입 실패', error);
      throw error;
    }
  };

  //글로벌 로그인 함수
  //authContext에서 loginApi(login in authApi.jsx)함수를 빌려쓴 글로벌 로그인함수 창조 -> 얘로 실제 로그인 통신함

  //새로고침시 로그인 흔적 사라지는거 방지 (보안 상 http 쿠키랑 쓰는게 좋긴한데) 일단 session storage에 저장한다.
  const login = async (userInfo) => {
    try {
      const data = await loginApi(userInfo); //결과물로 data.accessToken과 data.refreshToken을 줄거야.
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);

      sessionStorage.setItem('accessToken', data.accessToken);

      const storedUuid = localStorage.getItem('uuid');

      if (storedUuid) {
        setUuid(storedUuid);
      } else {
        console.warn('로그인은 성공했지만, uuid가 없습니다.');
      }
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
      await logoutApi(accessToken); // 서버에 로그아웃 요청 -> 로컬스토로지를 헤더에 넣어줘야하므로, 요래함

      sessionStorage.removeItem('accessToken'); // 만약 localStorage에 저장했다면 제거
      setAccessToken(null);
      setUser(null);
      setIsLoggedIn(false);
      setUuid(null);

      console.log('👋 로그아웃 완료');
    } catch (error) {
      console.error('❌ 로그아웃 context logout 함수의 실패:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        uuid,
        setUuid,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
