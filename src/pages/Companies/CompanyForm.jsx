import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { CompanySchema } from '../../utils/validationSchemas';
import { useCompany, useCreateCompany, useUpdateCompany } from '../../hooks/useCompanies';

export default function CompanyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [logoFile, setLogoFile] = useState(null);

  const { data: company } = useCompany(id);
  const createCompanyMutation = useCreateCompany();
  const updateCompanyMutation = useUpdateCompany();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(CompanySchema),
  });

  useEffect(() => {
    if (isEdit && company) {
      reset(company);
    }
  }, [company, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const onSubmit = (data) => {
    if (!logoFile) {
      alert('Logo faylini tanlang!');
      return;
    }
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key]);
    });
    formData.append('logo', logoFile);

    if (isEdit) {
      updateCompanyMutation.mutate({ id, data: formData }, {
        onSuccess: () => navigate('/companies'),
      });
    } else {
      createCompanyMutation.mutate(formData, {
        onSuccess: () => navigate('/companies'),
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Company' : 'Create Company'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {logoFile && <p className="text-sm text-gray-600">Selected: {logoFile.name}</p>}
        </div>
        {/* Logo URL field removed */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            {...register('website')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            {...register('color')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border rounded"
            rows="4"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={createCompanyMutation.isLoading || updateCompanyMutation.isLoading}
        >
          {createCompanyMutation.isLoading || updateCompanyMutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
