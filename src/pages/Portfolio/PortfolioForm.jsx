import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  PortfolioSchema,
  PortfolioCategory,
} from "../../utils/validationSchemas";
import {
  usePortfolioItem,
  useCreatePortfolioItem,
  useUpdatePortfolioItem,
} from "../../hooks/usePortfolio";

export default function PortfolioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [mediaFile, setMediaFile] = useState(null);

  const { data: item } = usePortfolioItem(id);
  const createMutation = useCreatePortfolioItem();
  const updateMutation = useUpdatePortfolioItem();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(PortfolioSchema),
  });

  const tags = watch("tags") || [];

  useEffect(() => {
    if (isEdit && item) reset({ ...item });
  }, [item, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setMediaFile(file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        if (Array.isArray(data[key]))
          data[key].forEach((tag) => formData.append(`${key}[]`, tag));
        else formData.append(key, data[key]);
      }
    });

    if (mediaFile) formData.append("media", mediaFile);

    if (isEdit)
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/portfolio") },
      );
    else
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/portfolio"),
      });
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) setValue("tags", [...tags, tag]);
  };
  const removeTag = (tagToRemove) =>
    setValue(
      "tags",
      tags.filter((t) => t !== tagToRemove),
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">
        {isEdit ? "Edit Portfolio Item" : "Create Portfolio Item"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            {...register("title")}
            placeholder="Enter title"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Short description..."
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            {...register("category")}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {Object.values(PortfolioCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, " ").toUpperCase()}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Platform */}
        <div>
          <label className="block text-gray-700 mb-1">Platform</label>
          <input
            {...register("platform")}
            placeholder="e.g., Web, Mobile"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-gray-700 mb-1">URL</label>
          <input
            {...register("url")}
            placeholder="https://example.com"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>

        {/* Media */}
        <div>
          <label className="block text-gray-700 mb-1">Media</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          {mediaFile && (
            <p className="text-gray-600 text-sm mt-1">
              Selected: {mediaFile.name}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
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
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium transition"
        >
          {createMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : "Save Portfolio Item"}
        </button>
      </form>
    </div>
  );
}
