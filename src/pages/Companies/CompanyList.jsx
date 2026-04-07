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

  const actions = (company) => (
    <div className="flex space-x-2">
      <Link
        to={`/companies/edit/${company.id}`}
        className="text-blue-600 hover:text-blue-900 font-medium"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, company })}
        className="text-red-600 hover:text-red-900 font-medium"
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = () => {
    if (deleteModal.company) {
      deleteCompanyMutation.mutate(deleteModal.company.id);
      setDeleteModal({ isOpen: false, company: null });
    }
  };

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading companies...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error: {error?.message || "Failed to load companies"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">Companies</h1>
        <Link
          to="/companies/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Company
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} data={companies} actions={actions} />
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, company: null })}
        title="Delete Company"
      >
        <p>Are you sure you want to delete {deleteModal.company?.name}?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setDeleteModal({ isOpen: false, company: null })}
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
