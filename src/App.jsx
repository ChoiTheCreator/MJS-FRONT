/** @jsxImportSource @emotion/react */
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom'; // `BrowserRouter` 제거
import { Global, css } from '@emotion/react';
import Layout from './components/Layout';
import BoardDetailPage from './pages/board/BoardDetailPage';
import BoardListPage from './pages/board/BoardListPage';
import BoardWritePage from './pages/board/BoardWritePage';
import StartPage from './pages/StartPage';
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
  }
`;

const App = () => {
  return (
    <>
      <AuthProvider>
        <Global styles={globalStyle} /> {/* 전역 스타일 적용 */}
        <Routes>
          {/* Layout 적용되는 페이지 */}
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />

            {/* url parameter 활용하여, 자유게시판목록 디테일 들어감 */}
            <Route path="/board" element={<BoardListPage />} />
            <Route path="/board/:uuid" element={<BoardDetailPage />} />
            <Route path="/board/write" element={<BoardWritePage />} />
          </Route>

          {/* Layout 미적용 페이지 */}
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
          <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
