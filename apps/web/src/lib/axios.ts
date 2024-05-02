import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const authInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const refreshToken = async () => {
  return authInstance.get('/auth/refresh').then((res) => res.data.accessToken);
};

authInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => Promise.reject(error),
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      if (accessToken) {
        authInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return authInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
