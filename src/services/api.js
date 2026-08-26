import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api",
  timeout: 60000,
});

export function getApiError(error, fallback) {
  return error.response?.data?.error || fallback;
}
