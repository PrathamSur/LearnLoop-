// src/utils/axiosInstance.js
import axios from 'axios';

// 🚨 FIX: Changed from 5000 to 3000
const API_BASE_URL = "http://localhost:3000/api"; 

// 1. Create a custom instance of Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add a request interceptor to automatically attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;