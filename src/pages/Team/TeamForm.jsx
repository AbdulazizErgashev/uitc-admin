import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamMemberSchema } from '../../utils/validationSchemas';
import { useTeamMember, useCreateTeamMember, useUpdateTeamMember } from '../../hooks/useTeam';

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [imageFile, setImageFile] = useState(null);

  const { data: member } = useTeamMember(id);
  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(TeamMemberSchema),
  });

  useEffect(() => {
    if (isEdit && member) {
      reset(member);
    }
  }, [member, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const onSubmit = (data) => {
    if (!imageFile) {
      alert('Image faylini tanlang!');
      return;
    }
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key]);
    });
    formData.append('image', imageFile);

    if (isEdit) {
      updateMutation.mutate({ id, data: formData }, {
        onSuccess: () => navigate('/team'),
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate('/team'),
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Team Member' : 'Create Team Member'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input {...register('name')} className="w-full px-3 py-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input {...register('role')} className="w-full px-3 py-2 border rounded" />
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea {...register('bio')} className="w-full px-3 py-2 border rounded" rows="3" />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Long Bio</label>
          <textarea {...register('long_bio')} className="w-full px-3 py-2 border rounded" rows="5" />
          {errors.long_bio && <p className="text-red-500 text-sm">{errors.long_bio.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {imageFile && <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" {...register('email')} className="w-full px-3 py-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        {/* Add more fields as needed */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={createMutation.isLoading || updateMutation.isLoading}
        >
          {createMutation.isLoading || updateMutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
