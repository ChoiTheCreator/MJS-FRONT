import apiClient from "./apiClient";

export const getBoards = (page = 0, size = 10) => {
  return apiClient.get("/boards", {
    params: {
      page,
      size,
    }
  }).then(response => {
    console.log(response.data)
  })
}
