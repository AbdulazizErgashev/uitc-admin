import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCompanies, useDeleteCompany } from "../../hooks/useCompanies";
import Table from "../../components/Table";
import Modal from "../../components/Modal";

export default function CompanyList() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    company: null,
  });

  const { data: companies, isLoading, error, isError } = useCompanies();
  const deleteCompanyMutation = useDeleteCompany();

  // Table columns
  const columns = [
    { header: "Name", key: "name" },
    { header: "Website", key: "website" },
    {
      header: "Description",
      render: (row) =>
        row.description ? row.description.substring(0, 50) + "..." : "",
    },
    {
      header: "Logo",
      render: (row) =>
        row.logo_url ? (
          <img
            src={row.logo_url}
            alt={row.name}
            className="w-10 h-10 object-cover rounded"
          />
        ) : (
          "No Logo"
        ),
    },
  ];

  // Row actions
  const actions = (company) => (
    <div className="flex space-x-2">
      <Link
        to={`/companies/edit/${company.id}`}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, company })}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </div>
  );

  // Handle delete
  const handleDelete = () => {
    if (deleteModal.company) {
      deleteCompanyMutation.mutate(deleteModal.company.id);
      setDeleteModal({ isOpen: false, company: null });
    }
  };

  // Loading / Error states
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error: {error?.message || "Failed to load companies"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link
          to="/companies/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Company
        </Link>
      </div>

      <Table columns={columns} data={companies} actions={actions} />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, company: null })}
        title="Delete Company"
      >
        <p>Are you sure you want to delete {deleteModal.company?.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDeleteModal({ isOpen: false, company: null })}
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
