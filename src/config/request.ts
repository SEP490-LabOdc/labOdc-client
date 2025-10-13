import axios from 'axios'

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          const newToken = await refreshAccessToken(refreshToken)
          localStorage.setItem('access_token', newToken)
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return apiRequest(originalRequest)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          localStorage.clear()
          window.location.href = '/login'
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  },
)

async function refreshAccessToken(refreshToken: string) {
  const userId = localStorage.getItem('user_id')
  const response = await apiRequest.post('/api/v1/auth/refresh', {
    userId,
    refreshToken,
  })
  return response.data.accessToken
}

export default apiRequest