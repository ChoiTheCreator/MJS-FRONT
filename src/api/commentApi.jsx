import apiClient from "./apiClient";

export const getBoardComments = async (boardUuid) => {
  try {
    const response = await apiClient.get(`/boards/${boardUuid}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postBoardComment = async (boardUuid, content) => {
  if (!content)
    throw new Error("내용을 입력해 주세요");

  try {
    const response = await apiClient.post(`/boards/${boardUuid}/comments`, {
      content
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteBoardComment = async (commentUuid) => {
  try {
    const response = await apiClient.delete(`/boards/comments/${commentUuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
