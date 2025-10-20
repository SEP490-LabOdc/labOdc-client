import { create } from 'zustand'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER_ID = 'user_id'

interface AuthUser {
  role: string,
  userId: string,
  sub: string,
  iat: number,
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    refreshToken: string
    setTokens: (accessToken: string, refreshToken: string) => void
    setAccessToken: (accessToken: string) => void
    logout: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const initAccessToken = localStorage.getItem(ACCESS_TOKEN) || ''
  const initRefreshToken = localStorage.getItem(REFRESH_TOKEN) || ''
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initAccessToken,
      refreshToken: initRefreshToken,
      setTokens: (accessToken, refreshToken) =>
        set((state) => {
          localStorage.setItem(ACCESS_TOKEN, accessToken)
          localStorage.setItem(REFRESH_TOKEN, refreshToken)
          return {
            ...state,
            auth: { ...state.auth, accessToken, refreshToken },
          }
        }),
      setAccessToken: (accessToken) =>
        set((state) => {
          localStorage.setItem(ACCESS_TOKEN, accessToken)
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      logout: () =>
        set((state) => {
          localStorage.removeItem(ACCESS_TOKEN)
          localStorage.removeItem(REFRESH_TOKEN)
          localStorage.removeItem(USER_ID)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '', refreshToken: '' },
          }
        }),
      reset: () =>
        set((state) => {
          localStorage.removeItem(ACCESS_TOKEN)
          localStorage.removeItem(REFRESH_TOKEN)
          localStorage.removeItem(USER_ID)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '', refreshToken: '' },
          }
        }),
    },
  }
})