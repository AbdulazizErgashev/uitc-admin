import React, { useState } from "react";
import { useTeam, useDeleteTeamMember } from "../../hooks/useTeam";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

export default function TeamList() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    member: null,
  });

  const { data: team, isLoading, error, isError } = useTeam();
  const deleteTeamMutation = useDeleteTeamMember();

  const columns = [
    { header: "Name", key: "name" },
    { header: "Role", key: "role" },
    { header: "Email", key: "email" },
    {
      header: "Image",
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          "No image"
        ),
    },
    {
      header: "Bio",
      render: (row) => (row.bio ? row.bio.slice(0, 40) + "..." : "-"),
    },
  ];

  const actions = (member) => (
    <div className="flex space-x-2">
      <Link
        to={`/team/edit/${member.id}`}
        className="text-blue-600 hover:text-blue-900 font-medium"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, member })}
        className="text-red-600 hover:text-red-900 font-medium"
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = () => {
    if (deleteModal.member) {
      deleteTeamMutation.mutate(deleteModal.member.id);
      setDeleteModal({ isOpen: false, member: null });
    }
  };

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading team members...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error: {error?.message || "Failed to load team"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">Team Members</h1>
        <Link
          to="/team/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Member
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} data={team} actions={actions} />
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, member: null })}
        title="Delete Team Member"
      >
        <p>Are you sure you want to delete {deleteModal.member?.name}?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setDeleteModal({ isOpen: false, member: null })}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
