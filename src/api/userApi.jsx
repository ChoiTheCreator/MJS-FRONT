import apiClient from '@api/apiClient'

export const deleteUserAccount = async (password) => {
  try {
    const response = await apiClient.delete('/members/info', {
      password,
    })
    console.log(response)
  } catch (e) {
    throw e
  }
}
