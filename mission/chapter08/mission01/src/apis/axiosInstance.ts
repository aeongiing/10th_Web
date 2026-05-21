import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance = axios.create({ baseURL: BASE_URL });

let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.request.use((config) => {
  const stored = localStorage.getItem('accessToken');
  const token = stored ? (JSON.parse(stored) as string) : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshPromise) {
          const stored = localStorage.getItem('refreshToken');
          const refreshToken = stored ? (JSON.parse(stored) as string) : null;
          if (!refreshToken) throw new Error('No refresh token');

          refreshPromise = axios
            .post<{ data: { accessToken: string; refreshToken: string } }>(
              `${BASE_URL}/auth/refresh`,
              { refresh: refreshToken }
            )
            .then(({ data }) => {
              localStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
              localStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken));
              return data.data.accessToken;
            })
            .finally(() => { refreshPromise = null; });
        }

        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
