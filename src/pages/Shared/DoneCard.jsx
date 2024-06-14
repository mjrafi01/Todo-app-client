import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';
import { useOnProgress, useDoneList, useTodoList } from '../../hooks/useOnProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTasks, faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
AOS.init();

// Initialize A
export const DoneCard = ({
  title,
  description,
  priority,
  deadline,
  id,
}) => {
  const { user } = useAuth();
  const [, refetchOnProgress] = useOnProgress();
  const [refetchTodo] = useTodoList();
  const [doneList, refetchDoneList] = useDoneList();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    priority,
    deadline,
  });

  const priorityClass = {
    Low: 'text-green-500',
    Moderate: 'text-yellow-500',
    High: 'text-red-500',
  }[priority] || 'text-gray-500';

  const handleEditClick = () => {
    setFormData({
      title,
      description,
      priority,
      deadline,
    });
    setEditModalOpen(true);
    setDropdownOpen(false); // Close dropdown after opening edit modal
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, deadline } = formData;

    axiosSecure.patch(`/doneCollection/${id}`, {
      title,
      description,
      priority,
      deadline,
    })
      .then((res) => {
        console.log('Task updated:', res.data);
        refetchDoneList();
        setEditModalOpen(false); // Close modal after successful update

        // SweetAlert success message
        Swal.fire('Updated!', 'Task has been updated.', 'success');
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        // SweetAlert error message
        Swal.fire('Error!', 'Failed to update task.', 'error');
      });
  };

  const handleDeleteClick = async () => {
    console.log(`Delete clicked for task ${id}`);
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/doneCollection/${id}`);
        console.log(`Deleted task with id ${id}`, res.data);
        await refetchDoneList();
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error(`Error deleting task with id ${id}`, error);
        Swal.fire('Error!', 'An error occurred while deleting the task.', 'error');
      }
    }
  };

  const handleMoveToInProgressClick = () => {
    console.log(`Move to In Progress clicked for task ${id}`);
    const onProgressItem = {
      title,
      description,
      priority,
      deadline,
      email: user.email,
    };

    axiosSecure
      .post('/onProgressCollection', onProgressItem)
      .then((res) => {
        console.log('Task moved to On Progress:', res.data);
        axiosSecure
          .delete(`/doneCollection/${id}`)
          .then((res) => {
            console.log(`Deleted task with id ${id}`, res.data);
            refetchOnProgress(); // Refresh onProgress list after deletion
            refetchDoneList(); // Refresh doneList after deletion
          })
          .catch((error) => {
            console.error(`Error deleting task with id ${id}`, error);
          });
      })
      .catch((error) => {
        console.error('Error moving task to On Progress:', error);
      });
  };

  const handleMoveToTodoClick = () => {
    const onTodoItem = {
      title,
      description,
      priority,
      deadline,
      email: user.email,
    };

    axiosSecure
      .post('/todoCollection', onTodoItem)
      .then((res) => {
        console.log('Task moved to To-Do:', res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task moved to To-Do successfully.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        axiosSecure
          .delete(`/doneCollection/${id}`)
          .then((res) => {
            console.log(`Deleted task with id ${id}`, res.data);
            refetchDoneList();
            refetchTodo()
          })
          .catch((error) => {
            console.error(`Error deleting task with id ${id}`, error);
          });
      })
      .catch((error) => {
        console.error('Error moving task to To-Do:', error);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div  data-aos="fade-up" className="relative">
      <div className="card bg-white shadow-lg rounded-lg p-4 mb-4">
        <div className="card-body relative">
          <div className="absolute top-2 right-2">
            <button onClick={toggleDropdown} className="btn btn-outline btn-secondary mb-4">
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-20">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditClick}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDeleteClick}>
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
          <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
          <p className="mb-2 text-gray-700">{description}</p>
          <p className={`mb-2 font-semibold ${priorityClass}`}>Priority: {priority}</p>
          <p className="mb-2 text-gray-500">Deadline: {new Date(deadline).toLocaleDateString()}</p>
          <div className="card-actions flex justify-end space-x-2">
            <button className="btn btn-outline btn-blue hover:bg-blue-500 hover:text-white" onClick={handleMoveToTodoClick}>
              <FontAwesomeIcon icon={faTasks} /> Move to To-Do
            </button>
            <button className="btn btn-outline btn-green hover:bg-green-500 hover:text-white" onClick={handleMoveToInProgressClick}>
              <FontAwesomeIcon icon={faCheck} /> Move to In Progress
            </button>
          </div>
        </div>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
