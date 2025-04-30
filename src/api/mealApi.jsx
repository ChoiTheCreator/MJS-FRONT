import apiClient from './apiClient';

export const getWeeklyMenu = async () => {
  try {
    const response = await apiClient.get('/menus');
    return response.data.data;
  } catch (error) {
    console.log('식단 메뉴 fetching 중 에러발생, 실제 컴포넌트로 전달', error);
    throw error;
  }
};
