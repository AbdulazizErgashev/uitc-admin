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
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, item })}
        className="text-red-600 hover:text-red-900"
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

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load portfolio"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Link
          to="/portfolio/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Portfolio Item
        </Link>
      </div>
      <Table columns={columns} data={portfolio} actions={actions} />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Portfolio Item"
      >
        <p>Are you sure you want to delete {deleteModal.item?.title}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDeleteModal({ isOpen: false, item: null })}
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
