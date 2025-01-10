import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import Layout from './components/Layout'; // Layout import
import BoardPage from './pages/BoardPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Routes>
      {/* Layout 적용되는 페이지 
      공통되는 부분 */}
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Route>
      {/* Layout 미적용 페이지 */}
      <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
  );
};

export default App;
