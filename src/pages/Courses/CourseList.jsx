import React, { useState } from "react";
import { useCourses, useDeleteCourse } from "../../hooks/useCourses";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

export default function CourseList() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    course: null,
  });

  const { data: courses, isLoading, error, isError } = useCourses();
  const deleteCourseMutation = useDeleteCourse();

  const columns = [
    { header: "Name", key: "name" },
    {
      header: "Description",
      render: (row) => row.description?.substring(0, 50) + "...",
    },
    { header: "Duration", key: "duration" },
  ];

  const actions = (course) => (
    <div className="flex space-x-2">
      <Link
        to={`/courses/edit/${course.id}`}
        className="text-blue-600 hover:text-blue-900 font-medium"
      >
        Edit
      </Link>
      <button
        onClick={() => setDeleteModal({ isOpen: true, course })}
        className="text-red-600 hover:text-red-900 font-medium"
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

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading courses...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error: {error?.message || "Failed to load courses"}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">Courses</h1>
        <Link
          to="/courses/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Course
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} data={courses} actions={actions} />
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        title="Delete Course"
      >
        <p>Are you sure you want to delete {deleteModal.course?.name}?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setDeleteModal({ isOpen: false, course: null })}
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
