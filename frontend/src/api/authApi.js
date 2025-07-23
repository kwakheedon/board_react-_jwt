import apiClient from './apiClient';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8089/api/api';

export const signup = async (userData) => {
  const response = await apiClient.post('/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const logout = async (refreshToken) => {
  await axios.post(`${API_BASE_URL}/logout`, { refreshToken });
};
