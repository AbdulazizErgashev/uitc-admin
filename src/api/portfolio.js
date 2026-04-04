import axios from './axios';

// Get portfolio list
export const getPortfolio = async () => {
  const response = await axios.get('/portfolio');
  return response.data;
};

// Get single portfolio item
export const getPortfolioItem = async (id) => {
  const response = await axios.get(`/portfolio/${id}`);
  return response.data;
};

// Create portfolio item (authenticated)
export const createPortfolioItem = async (portfolioData) => {
  const config = portfolioData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.post('/portfolio', portfolioData, config);
  return response.data;
};

// Update portfolio item (authenticated)
export const updatePortfolioItem = async (id, portfolioData) => {
  const config = portfolioData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.patch(`/portfolio/${id}`, portfolioData, config);
  return response.data;
};

// Delete portfolio item (authenticated)
export const deletePortfolioItem = async (id) => {
  const response = await axios.delete(`/portfolio/${id}`);
  return response.data;
};