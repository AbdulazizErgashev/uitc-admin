import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseSchema } from '../../utils/validationSchemas';
import { useCourse, useCreateCourse, useUpdateCourse } from '../../hooks/useCourses';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: course } = useCourse(id);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(CourseSchema),
  });

  useEffect(() => {
    if (isEdit && course) {
      reset(course);
    }
  }, [course, isEdit, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateCourseMutation.mutate({ id, data }, {
        onSuccess: () => navigate('/courses'),
      });
    } else {
      createCourseMutation.mutate(data, {
        onSuccess: () => navigate('/courses'),
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Course' : 'Create Course'}</h1>
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border rounded"
            rows="4"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            {...register('duration')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={createCourseMutation.isLoading || updateCourseMutation.isLoading}
        >
          {createCourseMutation.isLoading || updateCourseMutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
