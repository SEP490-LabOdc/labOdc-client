import { jwtDecode } from "jwt-decode"

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export const getAuthTokens = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    return { accessToken, refreshToken }
}

export const clearAuthTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN)
}

export const getUserIdFromToken = (accessToken: string) => {
    const user: {
        role: string,
        userId: string,
        sub: string,
        iat: number,
        exp: number
    } = jwtDecode(accessToken)
    return user.userId
}