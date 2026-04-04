import React, { useState } from 'react';
import { useTeam, useDeleteTeamMember } from '../../hooks/useTeam';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function TeamList() {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, member: null });

  const { data: team, isLoading, error, isError } = useTeam();
  const deleteTeamMutation = useDeleteTeamMember();

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Role', key: 'role' },
    { header: 'Email', key: 'email' },
    { header: 'Bio', render: (row) => row.bio?.substring(0, 50) + '...' },
  ];

  const actions = (member) => (
    <div className="flex space-x-2">
      <Link to={`/team/edit/${member.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, member })}
        className="text-red-600 hover:text-red-900"
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message || 'Failed to load team'}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Team</h1>
        <Link to="/team/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Team Member
        </Link>
      </div>
      <Table columns={columns} data={team} actions={actions} />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, member: null })}
        title="Delete Team Member"
      >
        <p>Are you sure you want to delete {deleteModal.member?.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDeleteModal({ isOpen: false, member: null })}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
