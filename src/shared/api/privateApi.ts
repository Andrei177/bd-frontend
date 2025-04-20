import axios, { AxiosError } from "axios";
import { API_URL } from "../config/backend";

export const $privateApi = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

$privateApi.interceptors.request.use(req => {
    if(localStorage.getItem("accessToken")){
        req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    }
    return req;
})

$privateApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      
      // Проверяем, что это 401 ошибка и что запрос еще не повторялся
      if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true; // Помечаем запрос как повторный
        
        try {
          // Пытаемся обновить токен
          const refreshResponse = await $privateApi.get("/auth/refresh");
          
          // Если обновление прошло успешно, обновляем токен в localStorage
          if (refreshResponse.data.accessToken) {
            localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          }
          
          // Обновляем заголовок Authorization для оригинального запроса
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
          
          // Повторяем оригинальный запрос с новым токеном
          return $privateApi(originalRequest);
        } catch (refreshError) {

          localStorage.removeItem("accessToken");

          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );