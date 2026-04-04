import axios from './axios';

// Get team members list
export const getTeam = async () => {
  const response = await axios.get('/team-members');
  return response.data;
};

// Get single team member
export const getTeamMember = async (id) => {
  const response = await axios.get(`/team-members/${id}`);
  return response.data;
};

// Create team member (admin only)
export const createTeamMember = async (teamData) => {
  const config = teamData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.post('/team-members', teamData, config);
  return response.data;
};

// Update team member (admin only)
export const updateTeamMember = async (id, teamData) => {
  const config = teamData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const response = await axios.patch(`/team-members/${id}`, teamData, config);
  return response.data;
};

// Delete team member (admin only)
export const deleteTeamMember = async (id) => {
  const response = await axios.delete(`/team-members/${id}`);
  return response.data;
};