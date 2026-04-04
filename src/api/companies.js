import axios from './axios';

// Get companies list
export const getCompanies = async () => {
  const response = await axios.get('/companies');
  return response.data;
};

// Get single company
export const getCompany = async (id) => {
  const response = await axios.get(`/companies/${id}`);
  return response.data;
};

// Create company (admin only)
export const createCompany = async (companyData) => {
  const config = companyData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.post('/companies', companyData, config);
  return response.data;
};

// Update company (admin only)
export const updateCompany = async (id, companyData) => {
  const config = companyData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.patch(`/companies/${id}`, companyData, config);
  return response.data;
};

// Delete company (admin only)
export const deleteCompany = async (id) => {
  const response = await axios.delete(`/companies/${id}`);
  return response.data;
};