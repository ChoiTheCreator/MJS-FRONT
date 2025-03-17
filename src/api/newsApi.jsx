import apiClient from './apiClient';

export const getNews = async (category) => {
  try {
    const response = await apiClient.get('/news', { params: { category } });
    return response.data;
  } catch (error) {
    console.log('뉴스 fetching 중 에러발생, 실제 컴포넌트로 전달', error);
    throw error;
  }
};
