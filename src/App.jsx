/** @jsxImportSource @emotion/react */
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // `BrowserRouter` 제거
import { Global, css } from '@emotion/react';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

// 전역 스타일
const globalStyle = css`
  body,
  html,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', 'Arial', sans-serif;
    background-color: #f5f7fa;
  }
`;

const App = () => {
  return (
    <>
      <Global styles={globalStyle} /> {/* 전역 스타일 적용 */}
      <Routes>
        {/* Layout 적용되는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Route>
        {/* Layout 미적용 페이지 */}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
        <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
      </Routes>
    </>
  );
};

export default App;
