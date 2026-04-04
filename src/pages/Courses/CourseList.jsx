import React, { useState } from 'react';
import { useCourses, useDeleteCourse } from '../../hooks/useCourses';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function CourseList() {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, course: null });

  const { data: courses, isLoading, error, isError } = useCourses();
  const deleteCourseMutation = useDeleteCourse();

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Description', render: (row) => row.description?.substring(0, 50) + '...' },
    { header: 'Duration', key: 'duration' },
  ];

  const actions = (course) => (
    <div className="flex space-x-2">
      <Link to={`/courses/edit/${course.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, course })}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = () => {
    if (deleteModal.course) {
      deleteCourseMutation.mutate(deleteModal.course.id);
      setDeleteModal({ isOpen: false, course: null });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message || 'Failed to load courses'}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link to="/courses/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Course
        </Link>
      </div>
      <Table columns={columns} data={courses} actions={actions} />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        title="Delete Course"
      >
        <p>Are you sure you want to delete {deleteModal.course?.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDeleteModal({ isOpen: false, course: null })}
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
