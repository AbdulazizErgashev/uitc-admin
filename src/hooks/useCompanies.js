import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../api/companies";
import toast from "react-hot-toast";

/**
 * Fetch all companies
 */
export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    select: (data) => (Array.isArray(data) ? data : data?.data || []),
    staleTime: 1000 * 60 * 5, // 5 daqiqa cache
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to load companies");
    },
  });
};

/**
 * Fetch single company by ID
 */
export const useCompany = (id) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to load company");
    },
  });
};

/**
 * Create new company (supports FormData)
 */
export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createCompany(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create company");
    },
  });
};

/**
 * Update existing company (supports FormData)
 */
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCompany(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", variables.id] });
      toast.success("Company updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update company");
    },
  });
};

/**
 * Delete company by ID
 */
export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete company");
    },
  });
};
