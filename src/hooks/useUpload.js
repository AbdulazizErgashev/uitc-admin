import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api/upload';
import toast from 'react-hot-toast';

// Upload file
export const useUpload = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast.success('File uploaded successfully');
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to upload file');
    },
  });
};