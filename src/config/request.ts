// src/config/request.ts (Fixed)
import axios from "axios";
import { BASE_URL } from "@/const";
import { useAuthStore } from "@/stores/auth-store";

const apiRequest = axios.create({
  baseURL: BASE_URL,
});

const refreshApiRequest = axios.create({
  baseURL: BASE_URL,
});

apiRequest.interceptors.request.use(
  (config) => {
    // ✅ Always get fresh token from store
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = useAuthStore.getState();

      if (refreshToken) {
        try {
          const userId = localStorage.getItem("user_id") || "";
          const newToken = await refreshAccessToken(refreshToken, userId);

          // ✅ Update store (will trigger socket reconnect)
          useAuthStore.getState().setAccessToken(newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return apiRequest(originalRequest);

        } catch (error) {
          console.error('Token refresh failed:', error);
          useAuthStore.getState().logout();
          window.location.href = "/sign-in";
          return Promise.reject(error);
        }
      } else {
        useAuthStore.getState().logout();
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken: string, userId: string) {
  const { data } = await refreshApiRequest.post("/api/v1/auth/refresh", {
    userId,
    refreshToken
  });
  return data.data.accessToken;
}

export default apiRequest;
