import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { TestimonialSchema } from "../../utils/validationSchemas";
import {
  useTestimonial,
  useCreateTestimonial,
  useUpdateTestimonial,
} from "../../hooks/useTestimonials";

export default function TestimonialsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [videoFile, setVideoFile] = useState(null);

  const { data: testimonial } = useTestimonial(id);
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(TestimonialSchema),
  });

  const tags = watch("tags") || [];

  useEffect(() => {
    if (isEdit && testimonial) {
      reset(testimonial);
    }
  }, [testimonial, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setValue('video_url', ''); // Clear URL when file selected
    }
  };

  const onSubmit = (data) => {
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
    if (videoFile) {
      formData.append('video', videoFile);
    }

    if (isEdit) {
      updateMutation.mutate(
        { id, data: formData },
        {
          onSuccess: () => navigate("/testimonials"),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/testimonials"),
      });
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Testimonial" : "Create Testimonial"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Course ID</label>
          <input
            {...register("course_id")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.course_id && (
            <p className="text-red-500 text-sm">{errors.course_id.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Company ID</label>
          <input
            {...register("company_id")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.company_id && (
            <p className="text-red-500 text-sm">{errors.company_id.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quote</label>
          <textarea
            {...register("quote")}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          />
          {errors.quote && (
            <p className="text-red-500 text-sm">{errors.quote.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Long Quote</label>
          <textarea
            {...register("long_quote")}
            className="w-full px-3 py-2 border rounded"
            rows="5"
          />
          {errors.long_quote && (
            <p className="text-red-500 text-sm">{errors.long_quote.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            {...register("rating", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
            min="1"
            max="5"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {videoFile && <p className="text-sm text-gray-600">Selected: {videoFile.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            {...register("video_url")}
            className="w-full px-3 py-2 border rounded"
            placeholder="Or enter URL directly"
          />
          {errors.video_url && (
            <p className="text-red-500 text-sm">{errors.video_url.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 px-2 py-1 rounded flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tag"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register("featured")} className="mr-2" />
            Featured
          </label>
          {errors.featured && (
            <p className="text-red-500 text-sm">{errors.featured.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={createMutation.isLoading || updateMutation.isLoading}
        >
          {createMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : "Save"}
        </button>
      </form>
    </div>
  );
}
