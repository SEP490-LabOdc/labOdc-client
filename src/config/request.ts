import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "@/const";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  data?: unknown;
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}

interface QueueItem {
  resolve: (value?: string) => void;
  reject: (error?: Error) => void;
}

const apiRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const refreshApiRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token || undefined);
    }
  });

  failedQueue = [];
};

apiRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (originalRequest._retry) {
        handleAuthenticationFailure('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return Promise.reject(error);
      }

      const { refreshToken } = useAuthStore.getState();
      if (isRefreshing || !refreshToken) {
        if (!isRefreshing) {
          handleAuthenticationFailure('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        }
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token?: string) => {
              if (token && originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(apiRequest(originalRequest));
              } else {
                reject(new Error('Token refresh failed'));
              }
            },
            reject: (err?: Error) => reject(err || new Error('Queue processing failed'))
          });
        });
      }

      // Thử refresh token
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userId = localStorage.getItem("user_id") || "";
        const newToken = await refreshAccessToken(refreshToken, userId);

        useAuthStore.getState().setAccessToken(newToken);
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return apiRequest(originalRequest);

      } catch (refreshError) {
        processQueue(new Error('Token refresh failed'), null);

        handleAuthenticationFailure('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


const handleAuthenticationFailure = (message: string): void => {
  useAuthStore.getState().logout();
  if (typeof window !== 'undefined') {
    toast.error(message, {
      duration: 2000,
    });

    setTimeout(() => {
      window.location.href = '/sign-in';
    }, 2000);
  }
};

async function refreshAccessToken(refreshToken: string, userId: string) {
    const { data } = await refreshApiRequest.post<RefreshTokenResponse>(
      "/api/v1/auth/refresh",
      {
        userId,
        refreshToken
      }
    );

    return data.data.accessToken;
}

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export default apiRequest;
