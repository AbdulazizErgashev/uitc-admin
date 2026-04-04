import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial, addTestimonialComment } from '../api/testimonials';
import toast from 'react-hot-toast';

// Get testimonials list
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    select: (data) => Array.isArray(data) ? data : data?.data || [],
  });
};

// Get single testimonial
export const useTestimonial = (id) => {
  return useQuery({
    queryKey: ['testimonial', id],
    queryFn: () => getTestimonial(id),
    enabled: !!id,
  });
};

// Create testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create testimonial');
    },
  });
};

// Update testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial'] });
      toast.success('Testimonial updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update testimonial');
    },
  });
};

// Delete testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
    },
  });
};

// Add comment to testimonial
export const useAddTestimonialComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => addTestimonialComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial'] });
      toast.success('Comment added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add comment');
    },
  });
};