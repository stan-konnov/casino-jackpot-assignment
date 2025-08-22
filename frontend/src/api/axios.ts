import axios from 'axios';

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VER}`,
});

/**
 * Unwrap the response data
 * and make sure error message is propagated
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Unknown error';
    return Promise.reject(new Error(message));
  },
);
