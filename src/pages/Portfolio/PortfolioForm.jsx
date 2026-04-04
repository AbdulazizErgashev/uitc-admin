import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { PortfolioSchema } from '../../utils/validationSchemas';
import { usePortfolioItem, useCreatePortfolioItem, useUpdatePortfolioItem } from '../../hooks/usePortfolio';

export default function PortfolioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [mediaFile, setMediaFile] = useState(null);

  const { data: item } = usePortfolioItem(id);
  const createMutation = useCreatePortfolioItem();
  const updateMutation = useUpdatePortfolioItem();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(PortfolioSchema),
  });
  const tags = watch('tags') || [];

  useEffect(() => {
    if (isEdit && item) {
      reset(item);
    }
  }, [item, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const onSubmit = (data) => {
    if (!mediaFile) {
      alert('Media faylini tanlang!');
      return;
    }
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].forEach(item => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    formData.append('media', mediaFile);

    if (isEdit) {
      updateMutation.mutate({ id, data: formData }, {
        onSuccess: () => navigate('/portfolio'),
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate('/portfolio'),
      });
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Portfolio Item' : 'Create Portfolio Item'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input {...register('title')} className="w-full px-3 py-2 border rounded" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register('description')} className="w-full px-3 py-2 border rounded" rows="3" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input {...register('category')} className="w-full px-3 py-2 border rounded" />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Platform</label>
          <input {...register('platform')} className="w-full px-3 py-2 border rounded" />
          {errors.platform && <p className="text-red-500 text-sm">{errors.platform.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL</label>
          <input {...register('url')} className="w-full px-3 py-2 border rounded" />
          {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Media</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {mediaFile && <p className="text-sm text-gray-600">Selected: {mediaFile.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 px-2 py-1 rounded flex items-center">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-red-500">&times;</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tag"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(e.target.value);
                e.target.value = '';
              }
            }}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register('is_public')} className="mr-2" />
            Is Public
          </label>
          {errors.is_public && <p className="text-red-500 text-sm">{errors.is_public.message}</p>}
        </div>
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
