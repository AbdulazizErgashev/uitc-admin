import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeam, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember } from '../api/team';
import toast from 'react-hot-toast';

// Get team list
export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: getTeam,
    select: (data) => Array.isArray(data) ? data : data?.data || [],
  });
};

// Get single team member
export const useTeamMember = (id) => {
  return useQuery({
    queryKey: ['teamMember', id],
    queryFn: () => getTeamMember(id),
    enabled: !!id,
  });
};

// Create team member
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create team member');
    },
  });
};

// Update team member
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTeamMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['teamMember'] });
      toast.success('Team member updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update team member');
    },
  });
};

// Delete team member
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete team member');
    },
  });
};