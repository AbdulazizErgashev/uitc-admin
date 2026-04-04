import axios from './axios';

// Login
export const login = async (phone, password) => {
  const response = await axios.post('/auth/login', { phone, password });
  return response.data;
};

// Register (for initial admin creation)
export const register = async (full_name, phone, password, confirm_password) => {
  const response = await axios.post('/auth/register', { full_name, phone, password, confirm_password });
  return response.data;
};

// Get current user profile
export const getMe = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};

// Update current user profile
export const updateMe = async (data) => {
  const response = await axios.patch('/auth/me', data);
  return response.data;
};