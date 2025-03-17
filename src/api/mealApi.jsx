import apiClient from './apiClient';

export const getWeeklyMenu = async () => {
  try {
    const response = await apiClient.get('/weeklymenus');
    return response.data.data;
  } catch (error) {
    throw error;
    console.log('식단 메뉴 fetching 중 에러발생', error);
  }
};
