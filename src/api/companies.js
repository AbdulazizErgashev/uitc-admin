import axios from "./axios";

// Get all companies
export const getCompanies = async () => {
  const response = await axios.get("/companies");
  return Array.isArray(response.data)
    ? response.data
    : response.data?.data || [];
};

// Get single company
export const getCompany = async (id) => {
  const response = await axios.get(`/companies/${id}`);
  return response.data;
};

// Create company (admin)
export const createCompany = async (companyData) => {
  const config =
    companyData instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
  const response = await axios.post("/companies", companyData, config);
  return response.data;
};

// Update company (admin)
export const updateCompany = async (id, companyData) => {
  const config =
    companyData instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
  const response = await axios.patch(`/companies/${id}`, companyData, config);
  return response.data;
};

// Delete company (admin)
export const deleteCompany = async (id) => {
  const response = await axios.delete(`/companies/${id}`);
  return response.data;
};
