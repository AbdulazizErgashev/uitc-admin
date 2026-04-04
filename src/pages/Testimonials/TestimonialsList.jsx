import React, { useState } from 'react';
import { useTestimonials, useDeleteTestimonial } from '../../hooks/useTestimonials';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function TestimonialsList() {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, testimonial: null });

  const { data: testimonials, isLoading, error, isError } = useTestimonials();
  const deleteTestimonialMutation = useDeleteTestimonial();

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Quote', render: (row) => row.quote?.substring(0, 50) + '...' },
    { header: 'Rating', key: 'rating' },
    { header: 'Featured', render: (row) => row.featured ? 'Yes' : 'No' },
  ];

  const actions = (testimonial) => (
    <div className="flex space-x-2">
      <Link to={`/testimonials/edit/${testimonial.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, testimonial })}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = () => {
    if (deleteModal.testimonial) {
      deleteTestimonialMutation.mutate(deleteModal.testimonial.id);
      setDeleteModal({ isOpen: false, testimonial: null });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message || 'Failed to load testimonials'}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link to="/testimonials/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Testimonial
        </Link>
      </div>
      <Table columns={columns} data={testimonials} actions={actions} />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, testimonial: null })}
        title="Delete Testimonial"
      >
        <p>Are you sure you want to delete testimonial from {deleteModal.testimonial?.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDeleteModal({ isOpen: false, testimonial: null })}
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
