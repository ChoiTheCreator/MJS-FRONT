import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import Layout from './components/Layout'; // Layout import
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import TestPage from './pages/TestPage';

const App = () => {
  return (
    <Routes>
      {/* Layout 적용되는 페이지 
      공통되는 부분 */}
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
      {/* Layout 미적용 페이지 */}
    </Routes>
  );
};

export default App;
