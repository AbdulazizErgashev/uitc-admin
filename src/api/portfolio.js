import axios from "./axios";

// Get all portfolio items
export const getPortfolio = async () => {
  const res = await axios.get("/portfolio");
  return res.data;
};

// Get single portfolio item
export const getPortfolioItem = async (id) => {
  const res = await axios.get(`/portfolio/${id}`);
  return res.data;
};

// Create portfolio item
export const createPortfolioItem = async (portfolioData) => {
  const config =
    portfolioData instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
  const res = await axios.post("/portfolio", portfolioData, config);
  return res.data;
};

// Update portfolio item
export const updatePortfolioItem = async (id, portfolioData) => {
  const config =
    portfolioData instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
  const res = await axios.patch(`/portfolio/${id}`, portfolioData, config);
  return res.data;
};

// Delete portfolio item
export const deletePortfolioItem = async (id) => {
  const res = await axios.delete(`/portfolio/${id}`);
  return res.data;
};
