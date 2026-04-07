import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { usePortfolio, useDeletePortfolioItem } from "../../hooks/usePortfolio";

export default function PortfolioList() {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const { data: portfolio, isLoading, error, isError } = usePortfolio();
  const deleteMutation = useDeletePortfolioItem();

  const columns = [
    { header: "Title", key: "title" },
    { header: "Category", key: "category" },
    { header: "Platform", key: "platform" },
    {
      header: "URL",
      render: (row) => (
        <a
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit
        </a>
      ),
    },
    {
      header: "Media",
      render: (row) =>
        row.media_url ? (
          <img
            src={row.media_url}
            alt={row.title}
            className="w-20 h-20 object-cover rounded"
          />
        ) : (
          "No image"
        ),
    },
  ];

  const actions = (item) => (
    <div className="flex space-x-2">
      <Link
        to={`/portfolio/edit/${item.id}`}
        className="text-blue-600 hover:text-blue-900 font-medium"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, item })}
        className="text-red-600 hover:text-red-900 font-medium"
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = () => {
    if (deleteModal.item) {
      deleteMutation.mutate(deleteModal.item.id);
      setDeleteModal({ isOpen: false, item: null });
    }
  };

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading portfolio...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error: {error?.message || "Failed to load portfolio"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">Portfolio</h1>
        <Link
          to="/portfolio/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Portfolio Item
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} data={portfolio} actions={actions} />
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Portfolio Item"
      >
        <p>Are you sure you want to delete {deleteModal.item?.title}?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setDeleteModal({ isOpen: false, item: null })}
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
