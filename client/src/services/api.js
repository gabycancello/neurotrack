import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Para permitir envio de cookies e autenticação
});

export default api;