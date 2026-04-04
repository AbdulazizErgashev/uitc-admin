import axios from './axios';

// Get testimonials list
export const getTestimonials = async () => {
  const response = await axios.get('/testimonials');
  return response.data;
};

// Get single testimonial
export const getTestimonial = async (id) => {
  const response = await axios.get(`/testimonials/${id}`);
  return response.data;
};

// Create testimonial (authenticated)
export const createTestimonial = async (testimonialData) => {
  const config = testimonialData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.post('/testimonials', testimonialData, config);
  return response.data;
};

// Update testimonial (authenticated)
export const updateTestimonial = async (id, testimonialData) => {
  const config = testimonialData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.patch(`/testimonials/${id}`, testimonialData, config);
  return response.data;
};

// Delete testimonial (authenticated)
export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`/testimonials/${id}`);
  return response.data;
};

// Add comment to testimonial
export const addTestimonialComment = async (id, commentData) => {
  const response = await axios.post(`/testimonials/${id}/comment`, commentData);
  return response.data;
};