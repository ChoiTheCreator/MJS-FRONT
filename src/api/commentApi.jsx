import apiClient from "./apiClient";

export const getBoardComments = async (boardUuid, page, size) => {
  try {
    const response = await apiClient.get(`/boards/${boardUuid}/comments`, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postBoardComment = async (boardUuid, memberUuid, content) => {
  try {
    const response = await apiClient.post(`/boards/${boardUuid}/comments/member/${memberUuid}`, {
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
