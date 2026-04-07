import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { TeamMemberSchema } from "../../utils/validationSchemas";
import {
  useTeamMember,
  useCreateTeamMember,
  useUpdateTeamMember,
} from "../../hooks/useTeam";

export default function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data: memberData } = useTeamMember(id);
  const member = memberData?.data;

  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TeamMemberSchema),
  });

  useEffect(() => {
    if (isEdit && member) {
      reset({
        ...member,
        expertise: member.expertise?.join(", ") || "",
        achievements: member.achievements?.join(", ") || "",
      });
      setPreview(member.image);
    }
  }, [member, isEdit, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.expertise) {
      data.expertise = data.expertise
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    if (data.achievements) {
      data.achievements = data.achievements
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== "") {
        if (Array.isArray(data[key])) {
          data[key].forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    if (imageFile) formData.append("image", imageFile);

    if (isEdit) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/team") },
      );
    } else {
      createMutation.mutate(formData, { onSuccess: () => navigate("/team") });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {isEdit ? "Edit Team Member" : "Create Team Member"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* NAME & ROLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <input
              {...register("role")}
              placeholder="Position / Role"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* BIO */}
        <div>
          <label className="block text-gray-700 mb-1">Bio</label>
          <textarea
            {...register("bio")}
            placeholder="Short biography..."
            rows={4}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-gray-700 mb-1">Profile Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-full mt-3 border"
            />
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email address"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* EXPERTISE */}
        <div>
          <label className="block text-gray-700 mb-1">Expertise</label>
          <input
            {...register("expertise")}
            placeholder="Node.js, React, Prisma"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* ACHIEVEMENTS */}
        <div>
          <label className="block text-gray-700 mb-1">Achievements</label>
          <input
            {...register("achievements")}
            placeholder="Award 1, Award 2"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium transition"
        >
          {createMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : "Save Member"}
        </button>
      </form>
    </div>
  );
}
