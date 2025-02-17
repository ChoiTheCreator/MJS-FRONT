import apiClient from "./apiClient";

// 게시글 목록 조회 API
export const fetchPosts = async (page = 0, size = 10) => {
  try {
    const response = await apiClient.get('/api/posts', {
      params: {
        page, // 서버에서 페이지 번호를 받을 파라미터
        size, // 서버에서 페이지 사이즈(한 페이지당 게시글 수)를 받을 파라미터
      },
    });
    return response.data; // 백엔드에서 주는 전체 JSON 응답
  } catch (error) {
    throw error; // 에러를 상위로 던져서 컴포넌트에서 처리하도록 함
  }
};
