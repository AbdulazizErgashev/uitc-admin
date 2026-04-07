import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { CourseSchema } from "../../utils/validationSchemas";
import {
  useCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../../hooks/useCourses";

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: course } = useCourse(id);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CourseSchema),
  });

  useEffect(() => {
    if (isEdit && course) {
      reset(course);
    }
  }, [course, isEdit, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateCourseMutation.mutate(
        { id, data },
        { onSuccess: () => navigate("/courses") },
      );
    } else {
      createCourseMutation.mutate(data, {
        onSuccess: () => navigate("/courses"),
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {isEdit ? "Edit Course" : "Create Course"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Course Name</label>
          <input
            {...register("name")}
            placeholder="Enter course name"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Short description of the course..."
            rows={4}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 mb-1">Duration</label>
          <input
            {...register("duration")}
            placeholder="e.g., 3 months"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            createCourseMutation.isLoading || updateCourseMutation.isLoading
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium transition"
        >
          {createCourseMutation.isLoading || updateCourseMutation.isLoading
            ? "Saving..."
            : "Save Course"}
        </button>
      </form>
    </div>
  );
}
