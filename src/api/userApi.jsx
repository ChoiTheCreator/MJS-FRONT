import apiClient from '@api/apiClient'

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/members/info')
    return response.data
  } catch (e) {
    console.error('error on userApi.jsx', e)
    throw e
  }
}

export const patchUserInfo = async (data) => {
  try {
    const response = await apiClient.patch('/members/info', {

    })
    console.log(response.data)
    return response.data
  } catch (e) {
    console.error('error on userApi.jsx', e)
    throw e
  }
}

export const patchUserPassword = async (data) => {
  try {
    const response = await apiClient.patch('/members/info/password', {

    })
    console.log(response.data)
    return response.data
  } catch (e) {
    console.error('error on userApi.jsx', e)
    throw e
  }
}

export const deleteUserAccount = async (password) => {
  try {
    const response = await apiClient.delete('/members/info', {
      password,
    })
    console.log(response)
  } catch (e) {
    console.error('error on userApi.jsx', e)
    throw e
  }
}
