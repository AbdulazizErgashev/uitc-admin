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
      setValue("video_url", "");
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    if (videoFile) {
      formData.append("video", videoFile);
    }

    if (isEdit) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/testimonials") },
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
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl transition-all hover:shadow-3xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {isEdit ? "Edit Testimonial" : "Create Testimonial"}
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Course & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course ID</label>
            <input
              {...register("course_id")}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.course_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company ID</label>
            <input
              {...register("company_id")}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.company_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_id.message}
              </p>
            )}
          </div>
        </div>

        {/* Quotes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quote</label>
          <textarea
            {...register("quote")}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="3"
          />
          {errors.quote && (
            <p className="text-red-500 text-sm mt-1">{errors.quote.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Long Quote</label>
          <textarea
            {...register("long_quote")}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="5"
          />
          {errors.long_quote && (
            <p className="text-red-500 text-sm mt-1">
              {errors.long_quote.message}
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            {...register("rating", { valueAsNumber: true })}
            min="1"
            max="5"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Video */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {videoFile && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {videoFile.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            {...register("video_url")}
            placeholder="Or enter URL directly"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.video_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.video_url.message}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tag and press Enter"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Featured */}
        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Featured</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          {createMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : "Save"}
        </button>
      </form>
    </div>
  );
}
