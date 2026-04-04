import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getPortfolio,
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../api/portfolio";

// Get portfolio list
export const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    select: (data) => (Array.isArray(data) ? data : data?.data || []),
  });
};

// Get single portfolio item
export const usePortfolioItem = (id) => {
  return useQuery({
    queryKey: ["portfolioItem", id],
    queryFn: () => getPortfolioItem(id),
    enabled: !!id,
  });
};

// Create portfolio item
export const useCreatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Portfolio item created successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create portfolio item",
      );
    },
  });
};

// Update portfolio item
export const useUpdatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePortfolioItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolioItem"] });
      toast.success("Portfolio item updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update portfolio item",
      );
    },
  });
};

// Delete portfolio item
export const useDeletePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Portfolio item deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete portfolio item",
      );
    },
  });
};
