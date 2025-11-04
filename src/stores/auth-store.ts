import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface AuthUser {
  role: string,
  userId: string,
  sub: string,
  iat: number,
  exp: number
}

interface AuthState {
  user: AuthUser | null
  accessToken: string
  refreshToken: string
  setTokens: (accessToken: string, refreshToken: string) => void
  setAccessToken: (accessToken: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

const initializeAuth = () => {
  const accessToken = localStorage.getItem('access_token') || ''
  const refreshToken = localStorage.getItem('refresh_token') || ''
  let user: AuthUser | null = null

  if (accessToken) {
    try {
      user = jwtDecode<AuthUser>(accessToken)

      if (!user.userId || !user.role) {
        throw new Error('Invalid token structure')
      }
    } catch {
      localStorage.clear()
      return { user: null, accessToken: '', refreshToken: '' }
    }
  }

  return { user, accessToken, refreshToken }
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set, get) => {
    const { user, accessToken, refreshToken } = initializeAuth()

    return {
      user,
      accessToken,
      refreshToken,

      setTokens: (accessToken, refreshToken) => {
        const user: AuthUser = jwtDecode<AuthUser>(accessToken)

        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('user_id', user.userId)

        set({ accessToken, refreshToken, user })
      },

      setAccessToken: (accessToken) => {
        const user: AuthUser = jwtDecode<AuthUser>(accessToken)

        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('user_id', user.userId)

        set({ accessToken, user })
      },

      logout: () => {
        localStorage.clear()
        set({ user: null, accessToken: '', refreshToken: '' })
      },

      isAuthenticated: () => !!get().accessToken && !!get().user
    }
  })
)
