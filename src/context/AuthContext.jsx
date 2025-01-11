import React, { createContext, useContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider: 로그인 상태를 전역으로 제공
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅: Context 값을 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
