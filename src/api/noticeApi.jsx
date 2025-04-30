import apiClient from './apiClient';

//
export const getNotice = async ({
  category,
  year = new Date().getFullYear(),
  page = 0,
  size = 5,
}) => {
  try {
    const response = await apiClient.get('/notices', {
      params: { category, year, page, size },
    });
    // console.log('공지사항 받은 데이터', response.data);
    return response.data;
  } catch (error) {
    console.log('공지사항 fetching 과정속의 ', error);
    throw error;
  }
};
