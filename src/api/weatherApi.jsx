import apiClient from './apiClient';

export const weatherFetch = async () => {
  console.log('🚀 날씨 요청 시작...');

  try {
    const response = await apiClient.get('/weather');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 날씨 요청 실패!');
    console.error('❌ HTTP 상태 코드:', error.response?.status || '알 수 없음');
    console.error('📥 응답 데이터:', error.response?.data || '응답 없음');
    console.error('📛 전체 에러 메시지:', error.message);
    throw error;
  }
};
