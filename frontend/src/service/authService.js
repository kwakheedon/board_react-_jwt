import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

export const signUpAPI = async (formData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, formData);
  return response.data;
};
