import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "../config/backend";

export const $privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$privateApi.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return req;
});

$privateApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Пропускаем обработку 401 для эндпоинтов входа и регистрации и первоначального запроса на обновление токенов
    const isAuthRequest =
      originalRequest.url?.includes("/signin") ||
      originalRequest.url?.includes("/signup");
    const isStartRefreshRequest = originalRequest.url?.includes("/refresh")

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest &&
      !isStartRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newToken = refreshResponse.data?.accessToken;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return $privateApi(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
