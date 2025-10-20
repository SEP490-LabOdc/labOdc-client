import axios from "axios";
import { BASE_URL } from "@/const";

const apiRequest = axios.create({
  baseURL: BASE_URL,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const userId: string = localStorage.getItem("user_id") || "";
          const newToken = await refreshAccessToken(refreshToken, userId);
          localStorage.setItem("access_token", newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return apiRequest(originalRequest);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          localStorage.clear();
          window.location.href = "/sign-in";
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken: string, userId: string) {
  const { data } = await apiRequest.post("/api/v1/auth/refresh", {
    userId,
    refreshToken
  });
  return data.data.accessToken;
}

export default apiRequest;