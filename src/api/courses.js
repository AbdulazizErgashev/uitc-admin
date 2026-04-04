import axios from './axios';

// Get courses list
export const getCourses = async () => {
  const response = await axios.get('/courses');
  return response.data;
};

// Get single course
export const getCourse = async (id) => {
  const response = await axios.get(`/courses/${id}`);
  return response.data;
};

// Create course (admin only)
export const createCourse = async (courseData) => {
  const response = await axios.post('/courses', courseData);
  return response.data;
};

// Update course (admin only)
export const updateCourse = async (id, courseData) => {
  const response = await axios.patch(`/courses/${id}`, courseData);
  return response.data;
};

// Delete course (admin only)
export const deleteCourse = async (id) => {
  const response = await axios.delete(`/courses/${id}`);
  return response.data;
};