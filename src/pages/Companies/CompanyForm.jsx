import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { CompanySchema } from "../../utils/validationSchemas";
import {
  useCompany,
  useCreateCompany,
  useUpdateCompany,
} from "../../hooks/useCompanies";

export default function CompanyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [logoFile, setLogoFile] = useState(null);

  const { data: company } = useCompany(id);
  const createCompanyMutation = useCreateCompany();
  const updateCompanyMutation = useUpdateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CompanySchema),
  });

  useEffect(() => {
    if (isEdit && company) {
      reset({
        name: company.name || "",
        website: company.website || "",
        description: company.description || "",
      });
    }
  }, [company, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogoFile(file);
  };

  const onSubmit = (data) => {
    if (!logoFile && !isEdit) {
      alert("Logo faylini tanlang!");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    if (logoFile) formData.append("logo", logoFile);

    if (isEdit) {
      updateCompanyMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/companies") },
      );
    } else {
      createCompanyMutation.mutate(formData, {
        onSuccess: () => navigate("/companies"),
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {isEdit ? "Edit Company" : "Create Company"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Company Name</label>
          <input
            {...register("name")}
            placeholder="Enter company name"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="block text-gray-700 mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {logoFile && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {logoFile.name}
            </p>
          )}
          {isEdit && company?.logo_url && !logoFile && (
            <img
              src={company.logo_url}
              alt="Current logo"
              className="w-20 h-20 mt-2 object-cover rounded"
            />
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-700 mb-1">Website</label>
          <input
            {...register("website")}
            placeholder="https://example.com"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Short description of the company..."
            rows={4}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            createCompanyMutation.isLoading || updateCompanyMutation.isLoading
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium transition"
        >
          {createCompanyMutation.isLoading || updateCompanyMutation.isLoading
            ? "Saving..."
            : "Save Company"}
        </button>
      </form>
    </div>
  );
}
